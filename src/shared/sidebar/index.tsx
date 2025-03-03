import { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';

import ChatIcon from '../../assets/chat-icon-green.svg';
import ClientIcon from '../../assets/client-icon-green.svg';
import LeftIcon from '../../assets/images/left.png';
import RightIcon from '../../assets/images/right.png';
import Icon from '../../assets/md-icon-green.svg';
import { useAppDispatch, useNotificationsPermissions } from '../../hooks';
import { requestPermissions } from '../../services/notification';
import { Colors } from '../../utils/colors';
import Text, { Size } from '../text';
import { UserSelectors, toggleSidebar } from 'src/reducers/user';

import { Logout, PageItem } from './components';

const SidebarContainer = styled.div<{
    isOpen: boolean;
}>`
    ${({ isOpen }) => (isOpen ? `width: 240px;` : `width: 80px;`)};
    background: ${Colors.extra.white};
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: width 0.6s;
    ${({ isOpen }) =>
        isOpen ? `align-items: flex-start;` : `align-items: center;`};
`;

const MainContainer = styled.div`
    z-index: 2;
    backdrop-filter: blur(4px);
    width: 100%;
`;

const LogoText = styled.p`
    font: 700 16px/22px 'Poppins', sans-serif;
    color: ${Colors.theme.primary};
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 132px;
`;

const LogoContainerDivider = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 1px;
    background-color: ${Colors.theme.primaryLight};
`;

const PageList = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
`;

const LogoImage = styled.img<{
    isOpen: boolean;
}>`
    width: 48px;
    height: 48px;
    ${({ isOpen }) =>
        isOpen ? `margin: 0px 16px 0 0px;` : `margin: 0px 0px 0px 0px;`};
`;

const NotificationsNotice = styled(Text)`
    padding: 16px;
    cursor: pointer;
`;

const RowContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

const ExpandIcon = styled.img`
    width: 18px;
    height: 18px;
    tint-color: ${Colors.theme.primaryLight};
    cursor: pointer;
`;

type Props = Record<string, never>;

const Sidebar: FunctionComponent<Props> = ({}: Props) => {
    const { isSideBarOpen } = UserSelectors();
    const { hasPermissions } = useNotificationsPermissions();
    const dispatch = useAppDispatch();

    const toggleSidebar1 = useCallback(() => {
        dispatch(toggleSidebar({ isOpen: !isSideBarOpen }));
    }, [dispatch, isSideBarOpen]);

    const handleNotificationsNoticeClick = useCallback(() => {
        requestPermissions();
    }, []);

    return (
        <SidebarContainer isOpen={isSideBarOpen}>
            <MainContainer>
                <LogoContainer>
                    <LogoImage
                        isOpen={isSideBarOpen}
                        src={Icon}
                        alt="MD Icon"
                    />
                    {isSideBarOpen && (
                        <LogoText>
                            Mastering <br />
                            Programs
                        </LogoText>
                    )}
                </LogoContainer>
                <RowContainer>
                    <LogoContainerDivider />
                    <ExpandIcon
                        src={isSideBarOpen ? LeftIcon : RightIcon}
                        onClick={toggleSidebar1}
                    />
                </RowContainer>

                <PageList>
                    <PageItem
                        name={isSideBarOpen ? 'My Clients' : ''}
                        path="/clients"
                        icon={ClientIcon}
                    />
                    <PageItem
                        name={isSideBarOpen ? 'Chat' : ''}
                        path="/chat"
                        icon={ChatIcon}
                    />
                </PageList>

                {!hasPermissions && isSideBarOpen && (
                    <NotificationsNotice
                        color={Colors.extra.error}
                        fontSize={Size.X3Small}
                        fontWeight="500"
                        onClick={handleNotificationsNoticeClick}
                    >
                        Notifications are disabled. Click here to grant required
                        permissions
                    </NotificationsNotice>
                )}
            </MainContainer>
            {isSideBarOpen && <Logout />}
        </SidebarContainer>
    );
};

export default Sidebar;
