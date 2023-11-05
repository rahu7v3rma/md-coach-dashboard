import moment from 'moment';
import { FunctionComponent, useMemo } from 'react';
import type { Channel } from 'stream-chat';
import type { StreamMessage } from 'stream-chat-react';

import { useChannelPreviewInfo } from '../../hooks';

import {
    ChannelAvatar,
    ContainerRight,
    LastMessage,
    LastMessageCountView,
    MessageCount,
    MessageTime,
    Name,
    NameTimeView,
    Wrapper
} from './styles';

interface Props {
    channel: Channel;
    active?: boolean;
    setActiveChannel?: (channel: Channel) => void;
    lastMessage?: StreamMessage;
    latestMessage?: string | JSX.Element;
    unread?: number;
}

const ChatListItem: FunctionComponent<Props> = ({
    channel,
    active,
    setActiveChannel,
    lastMessage,
    latestMessage,
    unread
}: Props) => {
    const { displayImage, displayTitle, isOnline } = useChannelPreviewInfo({
        channel
    });

    const messageTimeString = useMemo(() => {
        if (lastMessage) {
            return moment(lastMessage.created_at).fromNow();
        } else {
            return null;
        }
    }, [lastMessage]);

    return (
        <Wrapper
            active={active}
            onClick={() => {
                setActiveChannel && setActiveChannel(channel);
            }}
        >
            <ChannelAvatar
                path={displayImage}
                width={40}
                height={40}
                online={isOnline}
            />
            <ContainerRight>
                <NameTimeView>
                    <Name>{displayTitle}</Name>
                    <MessageTime>{messageTimeString}</MessageTime>
                </NameTimeView>
                <LastMessageCountView>
                    {lastMessage ? (
                        <LastMessage>
                            {lastMessage.text?.replace(
                                /(.{40})(.*)/,
                                '$1...'
                            ) || ''}
                        </LastMessage>
                    ) : (
                        <LastMessage>{latestMessage}</LastMessage>
                    )}
                    {unread ? <MessageCount>{unread}</MessageCount> : null}
                </LastMessageCountView>
            </ContainerRight>
        </Wrapper>
    );
};

export default ChatListItem;
