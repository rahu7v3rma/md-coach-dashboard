import { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftArrow from '../../assets/left-arrow.svg';
import { useAppDispatch } from '../../hooks';
import { UserSelectors, resetPassword } from '../../reducers/user';
import Loader from '../../shared/loader';

import { Success } from './components';
import {
    Button,
    Container,
    Content,
    Description,
    EmailInput,
    ErrorText,
    Page,
    ReturnArrow,
    ReturnToSignInText,
    Title
} from './styles';

type Props = Record<string, never>;

const ResetPassword: FunctionComponent<Props> = ({}: Props) => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { loading } = UserSelectors();

    const goToLoginPage = () => {
        navigate('/');
    };

    const submit = useCallback(() => {
        if (!email) return;

        const client = `coach-dashboard@${process.env.REACT_APP_VERSION}`;
        dispatch(resetPassword({ email, client }))
            .unwrap()
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                setIsError(true);
                setErrorMessage(
                    error?.status === 400
                        ? 'Please enter a valid email address'
                        : 'An unknown error has occurred'
                );
            });
    }, [email, dispatch]);

    return (
        <Page>
            <Container>
                <Content>
                    {!success ? (
                        <>
                            <Title>Forgot password</Title>

                            {loading ? (
                                <Loader />
                            ) : (
                                <>
                                    {isError && (
                                        <ErrorText>{errorMessage}</ErrorText>
                                    )}

                                    <Description>
                                        We will send a recovery link to your
                                        email
                                    </Description>
                                    <EmailInput
                                        type="email"
                                        placeholder="Email*"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                    />

                                    <Button onClick={() => submit()}>
                                        Send recovery link
                                    </Button>
                                    <ReturnToSignInText onClick={goToLoginPage}>
                                        <ReturnArrow
                                            src={LeftArrow}
                                            alt="return arrow"
                                        />
                                        Return to Sign In
                                    </ReturnToSignInText>
                                </>
                            )}
                        </>
                    ) : (
                        <Success email={email} />
                    )}
                </Content>
            </Container>
        </Page>
    );
};

export default ResetPassword;
