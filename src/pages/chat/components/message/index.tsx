import {
    FunctionComponent,
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Attachment,
    MessageOptions,
    MessageTimestamp,
    ReactionSelector,
    useActionHandler,
    useChatContext,
    useMessageContext,
    useUserRole
} from 'stream-chat-react';

import ReadIcon from 'src/assets/read-icon.svg';
import SentIcon from 'src/assets/sent-icon.svg';
import { Modal } from 'src/shared';

import {
    BubbleContainer,
    ChatMessageWrapper,
    ListItems,
    MainContent,
    MessageAvatar,
    MessageContent,
    MessageHeader,
    MessageReaction,
    MessageSender,
    MessageStatus,
    Row,
    Timestamp,
    TotalMessageReaction,
    UserName
} from './styles';

type Props = {};

const Message: FunctionComponent<Props> = () => {
    const { client, channel } = useChatContext();
    const {
        message,
        isReactionEnabled,
        reactionSelectorRef,
        readBy,
        showDetailedReactions
    } = useMessageContext();
    const { isMyMessage } = useUserRole(message);

    const [isDisplayUsers, setDisplayUsers] = useState(false);
    const messageWrapperRef = useRef(null);
    const readStatusIcon = useMemo(() => {
        if (
            !message ||
            !isMyMessage ||
            message.type === 'error' ||
            message.status === 'sending'
        ) {
            return null;
        }

        const justReadByMe =
            readBy?.length === 1 && readBy[0].id === client.user?.id;

        // even though this is not the behaviour seen in stream's examples,
        // it seems that only the latest messages which are not yet read by
        // everyone arrive with `readBy` array values. this seems to be the
        // correct logic
        if (readBy?.length === 0 || !justReadByMe) {
            return <img src={ReadIcon} alt="read-icon" />;
        } else if (message.status === 'received') {
            return <img src={SentIcon} alt="sent-icon" />;
        } else {
            return null;
        }
    }, [message, isMyMessage, readBy, client.user?.id]);

    const didLike = useMemo(() => {
        return message?.own_reactions?.filter(
            (reaction) => reaction.type === 'like'
        );
    }, [message?.own_reactions]);

    const likeReactionsUsersList = useMemo(() => {
        return message?.latest_reactions
            ?.filter((item) => item.type === 'like')
            ?.map((reaction: any) => ({
                image: reaction?.user?.image,
                name: reaction?.user?.name
            }));
    }, [message?.latest_reactions]);

    const onSendLikeReaction = useCallback(async () => {
        if (Number(didLike?.length) < 1) {
            // @ts-ignore
            await channel.sendReaction(message?.id, {
                type: 'like'
            });
        } else {
            // @ts-ignore
            await channel.deleteReaction(message?.id, 'like');
        }
    }, [channel, didLike?.length, message?.id]);

    const handleAction = useActionHandler(message);

    return (
        <>
            <ChatMessageWrapper isSender={isMyMessage}>
                <BubbleContainer isSender={isMyMessage}>
                    <MessageAvatar
                        path={message.user?.image}
                        width={40}
                        height={40}
                        online={message.user?.online}
                    />
                    <MainContent>
                        <MessageOptions
                            displayLeft={false}
                            messageWrapperRef={messageWrapperRef}
                        />
                        {showDetailedReactions && isReactionEnabled && (
                            <ReactionSelector ref={reactionSelectorRef} />
                        )}
                        <MessageHeader>
                            <MessageSender>{message.user?.name}</MessageSender>
                            <MessageStatus>
                                <Timestamp>
                                    <MessageTimestamp />
                                </Timestamp>
                                {readStatusIcon}
                            </MessageStatus>
                        </MessageHeader>
                        <MessageContent>{message?.text}</MessageContent>
                        {message?.reaction_counts?.like && (
                            <TotalMessageReaction
                                onClick={() => setDisplayUsers(true)}
                                isSender={isMyMessage}
                            >
                                {message?.reaction_counts?.like} 👍
                            </TotalMessageReaction>
                        )}
                        {message.attachments && (
                            <Attachment
                                attachments={message.attachments}
                                actionHandler={handleAction}
                            />
                        )}
                    </MainContent>
                </BubbleContainer>
                <MessageReaction
                    isLiked={Boolean(didLike?.length)}
                    onClick={onSendLikeReaction}
                >
                    👍
                </MessageReaction>
            </ChatMessageWrapper>
            <Modal
                open={isDisplayUsers}
                onClose={() => setDisplayUsers(false)}
                isBoxShadow={false}
            >
                <ListItems>
                    {likeReactionsUsersList?.map((user: any) => (
                        <Row>
                            <MessageAvatar
                                path={user?.image}
                                width={40}
                                height={40}
                            />
                            <UserName>{user?.name}</UserName>
                        </Row>
                    ))}
                </ListItems>
            </Modal>
        </>
    );
};

export default Message;
