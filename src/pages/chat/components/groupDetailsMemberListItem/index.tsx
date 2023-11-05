import { MenuItem } from '@szhsin/react-menu';
import moment from 'moment';
import { FunctionComponent, useCallback, useMemo } from 'react';
import type { UserResponse } from 'stream-chat';

import Dots from 'src/assets/dots-icon.svg';

import {
    ChannelAvatar,
    GroupMemberDetailView,
    GroupMemberName,
    GroupMemberStatus,
    Menu,
    OpenMenu,
    Wrapper
} from './styles';

interface Props {
    user?: UserResponse;
    onRemoveMember?: () => void;
}

const GroupDetailsMemberListItem: FunctionComponent<Props> = ({
    user,
    onRemoveMember
}: Props) => {
    const userLastActiveTimeString = useMemo(() => {
        if (user?.last_active) {
            return moment(user?.last_active).fromNow(false);
        } else {
            return null;
        }
    }, [user?.last_active]);

    const handleRemoveClick = useCallback(() => {
        onRemoveMember && onRemoveMember();
    }, [onRemoveMember]);

    return (
        <Wrapper>
            <ChannelAvatar
                path={user?.image as string}
                width={40}
                height={40}
            />
            <GroupMemberDetailView>
                <GroupMemberName>{user?.name}</GroupMemberName>
                <GroupMemberStatus id="memberStatus" online={user?.online}>
                    {user?.online ? 'Online' : userLastActiveTimeString}
                </GroupMemberStatus>
            </GroupMemberDetailView>
            <Menu menuButton={<OpenMenu alt="dots" src={Dots} />}>
                <MenuItem id="menuItem" onClick={handleRemoveClick}>
                    Remove from group
                </MenuItem>
            </Menu>
        </Wrapper>
    );
};

export default GroupDetailsMemberListItem;
