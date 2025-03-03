import moment from 'moment';
import { FunctionComponent, useMemo } from 'react';
import type { UserResponse } from 'stream-chat';

import {
    ChannelAvatar,
    GroupMemberDetailView,
    GroupMemberName,
    GroupMemberStatus,
    Wrapper
} from './styles';

interface Props {
    user?: UserResponse;
}

const GroupDetailsMemberListItem: FunctionComponent<Props> = ({
    user
}: Props) => {
    const userLastActiveTimeString = useMemo(() => {
        if (user?.last_active) {
            return moment(user?.last_active).fromNow(false);
        } else {
            return null;
        }
    }, [user?.last_active]);

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
        </Wrapper>
    );
};

export default GroupDetailsMemberListItem;
