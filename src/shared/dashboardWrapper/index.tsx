import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';

import { useAppDispatch } from 'src/hooks';
import {
    NotificationSelectors,
    getNotification
} from 'src/reducers/notification';
import Header from 'src/shared/header';
import Sidebar from 'src/shared/sidebar';
import { Colors } from 'src/utils/colors';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background: ${Colors.extra.white1};
    overflow: hidden;
`;

const MainContentWrapper = styled.div`
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${Colors.extra.white1};
`;

const Body = styled.div`
    padding: 40px;
`;

interface Props {
    children?: React.ReactNode;
    shouldScroll?: boolean;
}

const DashboardLayout: FunctionComponent<Props> = ({
    children,
    shouldScroll
}) => {
    const dispatch = useAppDispatch();
    const { notifications } = NotificationSelectors();
    const { hasNext, nextPageNumber } = notifications;
    const [hidden, setHidden] = useState(true);

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

    return (
        <Wrapper>
            <Sidebar />
            <MainContentWrapper
                style={shouldScroll ? { overflow: 'hidden' } : undefined}
            >
                <Header
                    handleToggle={handleToggle}
                    handleScroll={handleScroll}
                    hidden={hidden}
                    onClose={onClose}
                />
                <Body
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
