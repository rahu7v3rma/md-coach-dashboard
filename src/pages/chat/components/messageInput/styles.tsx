import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 12px 12px;
`;

export const IconButton = styled.button`
    margin: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${Colors.extra.aliceBlue};
    border-width: 0.5px 0.5px 2px 0.5px;
    border-style: solid;
    border-color: ${Colors.theme.lightSkyBlue};
    display: flex;
    align-items: center;
    justify-content: center;
    &.attachment {
        margin-right: 8px;
    }
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
`;

export const InputContainer = styled.div`
    border: 1.5px solid ${Colors.theme.lightSkyBlue};
    border-radius: 16px;
    height: 48px;
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    align-items: center;
    margin-left: 16px;
    padding-right: 8px;
`;

export const Input = styled.input`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${Colors.extra.blackText};
    flex: 1;
    caret-color: ${Colors.extra.slateBlue};
    border: none;
    margin-left: 12px;
    margin-right: 12px;
    :focus-visible {
        outline: none;
    }
`;

export const ChatTools = styled.div`
    margin-top: auto;
    padding: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5em;

    &&& .rfu-file-upload-button {
        width: 40px;
        height: 40px;
        border-radius: 2em;
        position: relative;
        background: ${Colors.extra.lighter};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    &&& .str-chat__textarea textarea {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: ${Colors.extra.blackText};
        flex: 1;
        caret-color: ${Colors.extra.slateBlue};
        border: none;
        margin-right: 12px;

        :focus-visible {
            outline: none;
        }

        &::placeholder {
            color: ${Colors.theme.gray};
            letter-spacing: 0;
            font-size: 14px;
        }

        &:focus {
            outline: none !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none;
        }
    }

    &&& .rfu-file-upload-button svg {
        fill: ${Colors.extra.slateBlue};
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    background: ${Colors.extra.white};
    width: 100%;
    padding: 0;
    padding-right: 15px;
    border-width: 1.5px;
    border-style: solid;
    border-color: ${Colors.theme.primaryLight};
    border-radius: 16px;
    overflow: hidden;
`;

export const EmojiSelectWrapper = styled.div`
    .str-chat__input--emojipicker {
        left: 0;
    }
`;

export const QuotedContainer = styled.div`
    box-shadow: 0px -7px 3px -3px rgba(0, 0, 0, 0.19);
    padding-left: 1em;
    & .quoted-message-preview-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        & .str-chat__square-button {
            background-color: transparent;
            cursor: pointer;
            border: none;
        }
    }
    & .quoted-message-preview-content {
        display: flex;
        align-items: flex-end;
        & div.quoted-avatar {
            height: 32px;
        }
    }
    & .quoted-message-preview-content-inner {
        padding: 4px 8px;
        margin-bottom: 2px;
    }
`;

export const InputWrapperContainer = styled.div`
    width: -webkit-fill-available;
`;

export const ChatToolsWrapper = styled.div``;
