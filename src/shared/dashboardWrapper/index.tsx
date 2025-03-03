import moment from 'moment';
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackCircleImg from 'src/assets/images/back.svg';
import { useAppDispatch } from 'src/hooks';
import {
    NotificationSelectors,
    getNotification
} from 'src/reducers/notification';
import Header from 'src/shared/header';
import Sidebar from 'src/shared/sidebar';
import Text, { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background: ${Colors.extra.white1};
    overflow: hidden;
`;

const MainContentWrapper = styled.div(
    ({ background }: { background: string }) => `
    min-width: 200px;
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${background};
    overflow-x: scroll;
`
);

const Body = styled.div(
    ({ padding }: { padding: string }) => `
    padding: ${padding};
    overflow: scroll;
`
);

const BackImg = styled.img`
    width: 60px;
    height: 60px;
    cursor: pointer;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 40px 0px 40px;
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
`;

interface Props {
    children?: React.ReactNode;
    shouldScroll?: boolean;
    isBack?: boolean;
    isDisplaySearchBox?: boolean;
}

const DashboardLayout: FunctionComponent<Props> = ({
    children,
    shouldScroll,
    isBack = false,
    isDisplaySearchBox = true
}) => {
    const dispatch = useAppDispatch();
    const { notifications } = NotificationSelectors();
    const { hasNext, nextPageNumber } = notifications;
    const [hidden, setHidden] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getNotification({ page: 1, limit: 10 }));
        const interval = setInterval(() => {
            if (hidden) {
                dispatch(getNotification({ page: 1, limit: 10 }));
            }
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch, hidden]);

    const handleToggle = useCallback(() => {
        setHidden(!hidden);
    }, [hidden]);

    const handleScroll = useCallback(() => {
        if (hasNext) {
            dispatch(getNotification({ page: nextPageNumber, limit: 10 }));
        }
    }, [hasNext, nextPageNumber, dispatch]);

    const onClose = () => {
        setHidden(true);
    };

    const onBackHandler = () => {
        navigate('/clients', { replace: true });
    };

    return (
        <Wrapper>
            <Sidebar />
            <MainContentWrapper
                background={
                    isBack ? Colors.extra.main_background : Colors.extra.white1
                }
                style={shouldScroll ? { overflow: 'hidden' } : undefined}
            >
                {!isBack ? (
                    <Header
                        handleToggle={handleToggle}
                        handleScroll={handleScroll}
                        hidden={hidden}
                        isDisplaySearchBox={isDisplaySearchBox}
                        onClose={onClose}
                    />
                ) : (
                    <HeaderContainer>
                        <TextContainer>
                            <BackImg
                                data-testid="backbutton"
                                src={BackCircleImg}
                                onClick={onBackHandler}
                            />
                            <Text
                                fontSize={Size.Large}
                                fontWeight="600"
                                lineHeight="32px"
                                color={Colors.extra.black}
                            >
                                {`${moment().format(
                                    'dddd'
                                )} | ${moment().format('h:mm a')}`}
                            </Text>
                        </TextContainer>
                        <Header
                            isDisplaySearchBox={isDisplaySearchBox}
                            hideProfile={true}
                            handleToggle={handleToggle}
                            handleScroll={handleScroll}
                            hidden={hidden}
                            onClose={onClose}
                        />
                    </HeaderContainer>
                )}
                <Body
                    padding={isBack ? '24px 40px 40px 40px' : '40px'}
                    style={
                        shouldScroll
                            ? { flex: 1, overflow: 'hidden' }
                            : undefined
                    }
                >
                    {children}
                </Body>
            </MainContentWrapper>
        </Wrapper>
    );
};

export default DashboardLayout;
