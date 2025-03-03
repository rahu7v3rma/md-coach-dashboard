import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from 'src/hooks';
import { logoutUser } from 'src/reducers/user';
import Button from 'src/shared/button';
import Text, { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 186px;
    margin-top: auto;
    padding: 0px 30px 0px 30px;
`;

const LogoutContainer = styled.div`
    display: flex;
    border: 1px solid ${Colors.extra.lighter};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 146px;
    width: 100%;
    margin-bottom: auto;
    border-radius: 30px;
    background: ${Colors.theme.primaryLightest};
    padding: 16px;
    gap: 16px;
`;

const LogoutTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 58px;
    width: 100%;
    gap: 6px;
`;

type Props = Record<string, never>;

const Logout: FunctionComponent<Props> = ({}: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogoutClick = useCallback(() => {
        dispatch(logoutUser({}))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [dispatch, navigate]);
    return (
        <>
            <Container>
                <LogoutContainer>
                    <LogoutTextContainer>
                        <Text lineHeight="20px" fontWeight="600">
                            Logout
                        </Text>
                        <Text
                            fontWeight="500"
                            fontSize={Size.X4Small}
                            lineHeight="16px"
                            textAlign="center"
                            color={Colors.theme.gray}
                        >
                            Click below to log out of the dashboard
                        </Text>
                    </LogoutTextContainer>
                    <Button
                        id="logoutBtn"
                        onClick={onLogoutClick}
                        height="40px"
                        padding="0px"
                    >
                        <Text
                            lineHeight="18px"
                            fontWeight="600"
                            fontSize={Size.X3Small}
                        >
                            Logout
                        </Text>
                    </Button>
                </LogoutContainer>
            </Container>
        </>
    );
};

export default Logout;
