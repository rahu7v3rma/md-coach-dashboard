import { FunctionComponent, useMemo, useRef, useState } from 'react';
import { ReactionResponse } from 'stream-chat';
import {
    Attachment,
    CommonEmoji,
    EmojiSetDef,
    MessageOptions,
    MessageTimestamp,
    MinimalEmoji,
    ReactionSelector,
    SimpleReactionsList,
    useActionHandler,
    useChatContext,
    useMessageContext,
    useUserRole
} from 'stream-chat-react';
import { QuotedMessage } from 'stream-chat-react/dist/components/Message/QuotedMessage';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

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
    MessageOptionsWrapper,
    MessageSender,
    MessageStatus,
    QuotedMessageWrapper,
    ReactionsListWrapper,
    Row,
    Timestamp,
    UserName
} from './styles';

type Props = {};
const commonEmoji: CommonEmoji = {
    custom: true,
    emoticons: [],
    short_names: []
};

const emojiSetDef: EmojiSetDef = {
    imageUrl: '',
    sheetColumns: 2,
    sheetRows: 3,
    sheetSize: 64,
    spriteUrl: 'https://getstream.imgix.net/images/emoji-sprite.png'
};

const customReactions: MinimalEmoji[] = [
    {
        colons: ':+1:',
        id: '+1',
        name: 'Thumbs Up',
        sheet_x: 0,
        sheet_y: 0,
        ...commonEmoji,
        ...emojiSetDef
    },
    {
        colons: ':heart:',
        id: 'heart',
        name: 'Heart',
        sheet_x: 1,
        sheet_y: 2,
        ...commonEmoji,
        ...emojiSetDef
    },
    {
        colons: ':muscle:',
        id: 'muscle',
        name: 'Muscle',
        sheet_x: 1,
        sheet_y: 0,
        ...commonEmoji,
        ...emojiSetDef
    },
    {
        colons: ':smile:',
        id: 'slightly_smiling_face',
        name: 'Smile Face',
        sheet_x: 0,
        sheet_y: 2,
        ...commonEmoji,
        ...emojiSetDef
    },
    {
        colons: ':cry:',
        id: 'cry',
        name: 'cry',
        sheet_x: 0,
        sheet_y: 1,
        ...commonEmoji,
        ...emojiSetDef
    },
    {
        colons: ':raised_hands:',
        id: 'raised_hands',
        name: 'raised_hands',
        sheet_x: 1,
        sheet_y: 0,
        ...commonEmoji,
        ...emojiSetDef
    }
];
const Message: FunctionComponent<Props> = () => {
    const { client } = useChatContext();
    const { message, reactionSelectorRef, readBy, showDetailedReactions } =
        useMessageContext();
    const { isMyMessage } = useUserRole(message);

    const [clickedReactionId, setClickedReactionId] = useState<string>('');
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

    const reactedUsersList: {
        image?: string;
        name?: string;
        reactionId?: string;
    }[] = useMemo(() => {
        return (message?.latest_reactions || []).map(
            (reaction: ReactionResponse) => ({
                image: reaction?.user?.image as string,
                name: reaction?.user?.name,
                reactionId: reaction?.type
            })
        );
    }, [message?.latest_reactions]);
    const handleAction = useActionHandler(message);
    const [reactionsObject, reactionsCounts] = useMemo<
        [
            {
                [key: string]: ReactionResponse<DefaultStreamChatGenerics>;
            },
            { [key: string]: number }
        ]
    >(() => {
        const _reactionsCounts: { [key: string]: number } = {};
        const _reactionsObject: {
            [key: string]: ReactionResponse<DefaultStreamChatGenerics>;
        } = {};
        for (const latestReaction of message.latest_reactions || []) {
            if (latestReaction.type && latestReaction) {
                if (!_reactionsCounts[latestReaction.type]) {
                    _reactionsCounts[latestReaction.type] = 0;
                }
                _reactionsObject[latestReaction.type] = latestReaction;
                _reactionsCounts[latestReaction.type]++;
            }
        }
        return [_reactionsObject, _reactionsCounts];
    }, [message]);
    const MemoizedAttachments = useMemo(() => {
        return () => {
            if (!message.attachments) {
                return null;
            }
            return (
                <Attachment
                    attachments={message.attachments}
                    actionHandler={handleAction}
                />
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message.id]);
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
                        {showDetailedReactions && (
                            <ReactionSelector
                                reactionOptions={customReactions}
                                ref={reactionSelectorRef}
                            />
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
                        <QuotedMessageWrapper>
                            <QuotedMessage />
                        </QuotedMessageWrapper>
                        <MemoizedAttachments />
                        <MessageContent>{message?.text}</MessageContent>
                        {message?.latest_reactions && (
                            <ReactionsListWrapper>
                                {customReactions.map(
                                    (reaction: MinimalEmoji) =>
                                        reactionsObject[reaction.id] &&
                                        reactionsObject[reaction.id].score && (
                                            <SimpleReactionsList
                                                key={reaction.id}
                                                reaction_counts={{
                                                    [reaction.id]:
                                                        reactionsCounts[
                                                            reaction.id
                                                        ] || 0
                                                }}
                                                reactionOptions={
                                                    customReactions
                                                }
                                                reactions={[
                                                    reactionsObject[reaction.id]
                                                ]}
                                                handleReaction={async () =>
                                                    setClickedReactionId(
                                                        reaction.id
                                                    )
                                                }
                                            />
                                        )
                                )}
                            </ReactionsListWrapper>
                        )}
                    </MainContent>
                </BubbleContainer>

                <MessageOptionsWrapper>
                    <MessageOptions
                        displayLeft={false}
                        messageWrapperRef={messageWrapperRef}
                    />
                </MessageOptionsWrapper>
            </ChatMessageWrapper>
            <Modal
                open={clickedReactionId !== ''}
                onClose={() => setClickedReactionId('')}
                isBoxShadow={false}
            >
                <ListItems>
                    {reactedUsersList
                        ?.filter(
                            (reactedUser) =>
                                reactedUser.reactionId === clickedReactionId
                        )
                        ?.map((user: any) => (
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
