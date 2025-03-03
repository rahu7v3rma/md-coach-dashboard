import styled from 'styled-components';

import { Avatar } from 'src/shared';
import { Colors } from 'src/utils/colors';

export const BubbleContainer = styled('div')<{ isSender: Boolean }>`
    max-width: 80%;
    position: relative;
    height: auto;
    margin: 1em;
    margin-bottom: 0.5em;
    padding: 8px;
    background: ${(props) =>
        props.isSender ? Colors.theme.primaryLightest : Colors.extra.light2};
    border-radius: ${(props) =>
        props.isSender ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};
    box-sizing: border-box;
    cursor: pointer;
    align-self: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};

    display: flex;
    flex-direction: row;

    .str-chat__message-text-inner {
        position: relative;
        flex: 1;
        display: block;
        min-height: 32px;
        font-size: 15px;
        color: ${Colors.extra.black};
        border-radius: 0;
        border: 0px;
        margin-left: 0;

        p {
            font-size: 15px;
            line-height: 18px;
            color: ${Colors.extra.black};
            margin-bottom: 0;
        }
    }

    .str-chat__message-attachment--card--no-image
        > .str-chat__message-attachment-card {
        margin-top: 0;
    }
`;

export const ChatMessageWrapper = styled('div')<{ isSender: Boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.isSender ? 'row-reverse' : 'row')};
    justify-content: ${(props) => (props.isSender ? 'right ' : 'left')};
    align-items: center;
    &:hover {
        & .str-chat__message-simple__actions__action {
            display: flex;
        }
    }
    & .str-chat__message-reactions-list-item .latest-user img {
        max-width: 100%;
    }
`;

export const MainContent = styled.div`
    max-width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-inline-start: 8px;
`;

export const MessageHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const MessageSender = styled.h4`
    font-size: 16px;
    color: ${Colors.extra.darkLiver};
    margin: 0;
    padding-inline-end: 8px;
`;

export const MessageStatus = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

export const Timestamp = styled.div`
    font-size: 11px;
    color: ${Colors.theme.gray};
`;

export const MessageContent = styled.pre`
    font-family: 'Poppins';
    font-size: 14px;
    color: ${Colors.extra.davysGrey};
    max-width: 100%;
    white-space: pre-wrap;
`;

export const MessageAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
`;

export const MessageReaction = styled('span')<{ isLiked: Boolean }>`
    margin-top: 0;
    padding: 3px;
    cursor: pointer;
    background-color: transparent;
`;

export const ReactionsListWrapper = styled('div')`
    .str-chat__reaction-list ul {
        list-style: none;
        display: flex;
        gap: 2px;
        align-items: center;
    }
`;

export const TotalMessageReaction = styled('span')<{ isSender: Boolean }>`
    position: absolute;
    bottom: 0;
    margin-bottom: -2%;
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 40%;
    background-color: lightgray;
    right: ${(props) => (props.isSender ? 0 : 'unset')};
`;

export const ListItems = styled.div`
    margin-top: 15%;
    margin-bottom: 2%;
    padding: 10px 20px;
    max-height: 250px;
    overflow-y: scroll;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const UserName = styled.p`
    font-size: 14px;
    margin-left: 12px;
    line-height: 20px;
    font-weight: bold;
    color: ${Colors.extra.davysGrey};
    max-width: 100%;
    word-wrap: break-word;
`;

export const MessageOptionsWrapper = styled.div`
    & .str-chat__message-actions-box {
        left: 0px;
    }
`;

export const QuotedMessageWrapper = styled.div`
    margin-top: 14px;
    & .quoted-message {
        gap: 2px;
    }
    & div.quoted-avatar {
        height: 32px;
    }
`;
