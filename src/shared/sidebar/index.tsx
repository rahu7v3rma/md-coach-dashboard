import { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';

import ChatIcon from '../../assets/chat-icon-green.svg';
import ClientIcon from '../../assets/client-icon-green.svg';
import Icon from '../../assets/md-icon-green.svg';
import { useNotificationsPermissions } from '../../hooks';
import { requestPermissions } from '../../services/notification';
import { Colors } from '../../utils/colors';
import Text, { Size } from '../text';

import { Logout, PageItem } from './components';

const SidebarContainer = styled.div`
    width: 240px;
    background: ${Colors.extra.white};
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const MainContainer = styled.div`
    z-index: 2;
    backdrop-filter: blur(4px);
`;

const LogoText = styled.p`
    font: 700 16px/22px 'Poppins', sans-serif;
    color: ${Colors.theme.primary};
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 132px;
    border-bottom: 1px solid ${Colors.theme.primaryLight};
`;

const PageList = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
`;

const LogoImage = styled.img`
    width: 48px;
    height: 48px;
    margin: 0px 16px 0 32px;
`;

const NotificationsNotice = styled(Text)`
    padding: 16px;
    cursor: pointer;
`;

type Props = Record<string, never>;

const Sidebar: FunctionComponent<Props> = ({}: Props) => {
    const { hasPermissions } = useNotificationsPermissions();

    const handleNotificationsNoticeClick = useCallback(() => {
        requestPermissions();
    }, []);

    return (
        <SidebarContainer>
            <MainContainer>
                <LogoContainer>
                    <LogoImage src={Icon} alt="MD Icon" />
                    <LogoText>
                        Mastering <br />
                        Programs
                    </LogoText>
                </LogoContainer>

                <PageList>
                    <PageItem
                        name="My Clients"
                        path="/clients"
                        icon={ClientIcon}
                    />
                    <PageItem name="Chat" path="/chat" icon={ChatIcon} />
                </PageList>

                {!hasPermissions && (
                    <NotificationsNotice
                        color={Colors.extra.error}
                        fontSize={Size.XXXSmall}
                        fontWeight="500"
                        onClick={handleNotificationsNoticeClick}
                    >
                        Notifications are disabled. Click here to grant required
                        permissions
                    </NotificationsNotice>
                )}
            </MainContainer>
            <Logout />
        </SidebarContainer>
    );
};

export default Sidebar;
