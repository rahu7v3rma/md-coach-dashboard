import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
    Channel,
    MessageInput,
    MessageList,
    Window,
    useChatContext
} from 'stream-chat-react';

import { useAppChat } from '../../../../contexts/appChat';
import {
    ChatHeader,
    MessageInput as ChatMessageInput,
    CustomeDateSeparator,
    Message
} from '../../components';
import GroupSideDetails from '../groupSideDetails';
import { Avatar } from 'src/shared';

import { Container, MessageContainer } from './styles';

type Props = {
    initialChannelId?: string;
};

const ChatContainer: FunctionComponent<Props> = ({ initialChannelId }) => {
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    const { chatClient, setActiveChatChannel } = useAppChat();

    const [showSideDetails, setShowSideDetails] = useState<boolean>(false);

    useEffect(() => {
        setActiveChatChannel?.(activeChannel?.id || null);

        return () => {
            setActiveChatChannel?.(null);
        };
    }, [activeChannel, setActiveChatChannel]);

    useEffect(() => {
        if (chatClient && initialChannelId) {
            if (chatClient.activeChannels[initialChannelId]) {
                setActiveChannel(chatClient.activeChannels[initialChannelId]);
            } else {
                chatClient
                    .queryChannels({ cid: { $eq: initialChannelId } })
                    .then((channels) => {
                        if (channels.length > 0) {
                            setActiveChannel(channels[0]);
                        }
                    });
            }
        }
    }, [chatClient, initialChannelId, setActiveChannel]);

    const onCollapseButtonClick = () => {
        setShowSideDetails(!showSideDetails);
    };

    const CustomAvatar = useCallback(({ image }: any) => {
        return <Avatar path={image} className="quoted-avatar" />;
    }, []);

    return (
        <Container>
            <MessageContainer>
                <Channel
                    DateSeparator={CustomeDateSeparator}
                    Message={Message}
                    Input={ChatMessageInput}
                    Avatar={CustomAvatar}
                >
                    <Window>
                        <ChatHeader
                            onCollapseButtonClick={onCollapseButtonClick}
                        />
                        <MessageList messageActions={['quote', 'react']} />
                        <MessageInput />
                    </Window>
                    {showSideDetails && (
                        <GroupSideDetails
                            onCollapseButtonClick={onCollapseButtonClick}
                        />
                    )}
                </Channel>
            </MessageContainer>
        </Container>
    );
};

export default ChatContainer;
