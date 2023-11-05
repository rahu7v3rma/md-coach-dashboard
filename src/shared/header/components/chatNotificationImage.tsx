import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Channel } from 'stream-chat';
import styled from 'styled-components';

import { useAppChat } from '../../../contexts/appChat';
import { getChannelDisplayImage } from '../../../services/chat';
import { Avatar } from '../../../shared';

const NotificationAvatar = styled(Avatar)`
    width: 32px;
    height: 32px;
`;

type Props = {
    channelId: string;
};

const ChatNotificationImage: FunctionComponent<Props> = ({
    channelId
}: Props) => {
    const { chatClient } = useAppChat();

    const [chatChannel, setChatChannel] = useState<Channel | null>(null);

    useEffect(() => {
        if (chatClient !== null && chatClient.userID) {
            if (chatClient.activeChannels[channelId]) {
                setChatChannel(chatClient.activeChannels[channelId]);
            } else {
                chatClient
                    .queryChannels({
                        cid: { $eq: channelId },
                        members: { $in: [chatClient.userID] }
                    })
                    .then((channels) => {
                        if (channels.length > 0) {
                            setChatChannel(channels[0]);
                        }
                    });
            }
        } else {
            setChatChannel(null);
        }
    }, [chatClient, channelId]);

    const displayImage = useMemo(() => {
        if (chatClient === null || chatChannel === null) {
            return undefined;
        } else {
            return getChannelDisplayImage(chatChannel, chatClient.user);
        }
    }, [chatClient, chatChannel]);

    return (
        <NotificationAvatar
            path={displayImage}
            width={32}
            height={32}
            online={false}
        />
    );
};

export default ChatNotificationImage;
