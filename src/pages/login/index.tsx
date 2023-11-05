import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MDIcon from '../../assets/md-logo-white.svg';
import { useAppDispatch } from '../../hooks';
import {
    UserSelectors,
    login,
    refreshProfileSession
} from '../../reducers/user';
import { hasAuthToken } from '../../services/auth';
import { Button, Input, Loader } from '../../shared';

import {
    AllRightsText,
    ErrorText,
    ForgotText,
    LoginCard,
    LogoText,
    Wrapper
} from './styles';

type Props = Record<string, never>;

const Login: FunctionComponent<Props> = ({}: Props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { loading } = UserSelectors();

    useEffect(() => {
        if (hasAuthToken()) {
            navigate('/clients');
        }
    }, [navigate]);

    const goToResetPassword = () => {
        navigate('/reset-password');
    };

    const onChangeEmail = useCallback((value: string) => {
        setEmail(value);
        setIsEmailError(!value);
    }, []);

    const onChangePassword = useCallback((value: string) => {
        setPassword(value);
        setIsPasswordError(!value);
    }, []);

    const onLoginSubmit = useCallback(() => {
        setIsEmailError(!email);
        setIsPasswordError(!password);

        if (email && password) {
            dispatch(login({ email, password }))
                .unwrap()
                .then((_: any) => {
                    setIsError(false);
                    setErrorMessage('');

                    // load tokens and navigate to an authorized page
                    dispatch(refreshProfileSession({}));
                    navigate('/clients');
                })
                .catch((error) => {
                    setIsError(true);
                    if (error.status === 401) {
                        setErrorMessage('Incorrect username or password');
                    } else {
                        setErrorMessage('An unknown error has occurred');
                    }
                });
        }
    }, [email, password, dispatch, navigate]);

    return (
        <Wrapper>
            <LoginCard>
                <img src={MDIcon} alt="MD Logo" />
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <LogoText>
                            Welcome to
                            <br /> Mastering Programs
                        </LogoText>

                        {isError && <ErrorText>{errorMessage}</ErrorText>}

                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={onChangeEmail}
                            isError={isEmailError}
                            errorMessage={'Email is required'}
                        />
                        <Input
                            placeholder="password"
                            isPassword
                            value={password}
                            onChange={onChangePassword}
                            isError={isPasswordError}
                            errorMessage={'Password is required'}
                        />

                        <ForgotText onClick={goToResetPassword}>
                            Forgot password?
                        </ForgotText>

                        <Button onClick={onLoginSubmit}> Sign In</Button>
                    </>
                )}
                <AllRightsText>
                    © 20ХХ - 2022. All Rights Reserved. Mastering Programs{' '}
                </AllRightsText>
            </LoginCard>
        </Wrapper>
    );
};

export default Login;
