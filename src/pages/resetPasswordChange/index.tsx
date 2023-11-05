import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import MDIcon from '../../assets/md-logo-white.svg';
import { useAppDispatch } from '../../hooks';
import {
    UserSelectors,
    resetPasswordChange,
    resetPasswordVerify
} from '../../reducers/user';
import Button from '../../shared/button';
import Input from '../../shared/input';
import Loader from '../../shared/loader';
import { ErrorText } from '../resetPassword/styles';

import { InvalidToken, Success } from './components';
import {
    AllRightsText,
    FormCard,
    Spacer,
    Text,
    TitleText,
    Wrapper
} from './styles';

type Props = Record<string, never>;

const ResetPasswordChange: FunctionComponent<Props> = ({}: Props) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { loading } = UserSelectors();

    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [inputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInvalidToken, setIsInvalidToken] = useState(false);

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    useEffect(() => {
        dispatch(resetPasswordVerify({ code: code || '' }))
            .unwrap()
            .catch((err: any) => {
                if (err.data.code === 'bad_token') {
                    setIsInvalidToken(true);
                } else {
                    setErrorMessage('An unknown error has occurred');
                }
            });
    }, [dispatch, code]);

    const handleResetPasswordClick = async () => {
        setErrorMessage(null);
        setInputError(false);

        if (newPassword === '' || repeatPassword === '') {
            setInputError(true);
            return false;
        }

        if (newPassword !== repeatPassword) {
            setInputError(true);
            return false;
        }

        dispatch(
            resetPasswordChange({ code: code || '', password: newPassword })
        )
            .unwrap()
            .then(() => {
                setIsSuccess(true);
            })
            .catch((err) => {
                if (err.status === 400 && err.data.code === 'bad_token') {
                    setIsInvalidToken(true);
                } else if (
                    err.status === 400 &&
                    err.data.code === 'password_does_not_conform'
                ) {
                    setErrorMessage(
                        'Password must be at least 8 characters long, contain letters, not be a common password and not be similar to your email'
                    );
                } else {
                    setErrorMessage('An unknown error has occurred');
                }
            });
    };

    return (
        <Wrapper>
            <FormCard>
                {loading ? (
                    <Loader />
                ) : isSuccess ? (
                    <Success />
                ) : isInvalidToken ? (
                    <InvalidToken />
                ) : (
                    <>
                        <img src={MDIcon} alt="MD Logo" />
                        <TitleText>Welcome to Mastering Programs!</TitleText>
                        <Text>
                            Create a password to complete {'\n'} the
                            registration
                        </Text>
                        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                        <Input
                            placeholder="Password*"
                            isPassword
                            value={newPassword}
                            onChange={setNewPassword}
                        />
                        <Input
                            placeholder="Repeat Password*"
                            isPassword
                            value={repeatPassword}
                            onChange={setRepeatPassword}
                            errorMessage={`*Password don't match.`}
                            isError={inputError}
                        />
                        <Spacer />

                        <Button onClick={handleResetPasswordClick}>
                            Reset
                        </Button>
                        <AllRightsText>
                            {' '}
                            © 20ХХ - 2022. All Rights Reserved. Mastering
                            Diabetes{' '}
                        </AllRightsText>
                    </>
                )}
            </FormCard>
        </Wrapper>
    );
};

export default ResetPasswordChange;
