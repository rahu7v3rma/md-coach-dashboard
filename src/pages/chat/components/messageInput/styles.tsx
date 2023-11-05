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
    background: #eef4fa;
    border-width: 0.5px 0.5px 2px 0.5px;
    border-style: solid;
    border-color: #d3e6f8;
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
    border: 1.5px solid #d3e6f8;
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
    color: #271a51;
    flex: 1;
    caret-color: #6e51d0;
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
        color: #271a51;
        flex: 1;
        caret-color: #6e51d0;
        border: none;
        margin-right: 12px;

        :focus-visible {
            outline: none;
        }

        &::placeholder {
            color: #a4aaaf;
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
        fill: #7053d0;
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    background: #ffffff;
    width: 100%;
    padding: 0;
    padding-right: 15px;
    border-width: 1.5px;
    border-style: solid;
    border-color: ${Colors.extra.light};
    border-radius: 16px;
    overflow: hidden;
`;

export const EmojiSelectWrapper = styled.div`
    .str-chat__input--emojipicker {
        left: 0;
    }
`;
