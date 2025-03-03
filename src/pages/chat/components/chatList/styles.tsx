import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    min-width: 30%;

    .str-chat-channel-list {
        background-color: transparent;
        position: inherit;
    }

    .str-chat__channel-list-messenger {
        background: transparent;
    }

    .str-chat__channel-list-messenger__main {
        padding: 0;
    }
`;

export const ListContainer = styled.div`
    margin-top: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

export const AddButton = styled.button`
    height: 40px;
    min-height: 40px;
    background: ${Colors.extra.slateBlue};
    background: ${Colors.extra.white1};
    border-width: 1px 1px 2px 1px;
    border-style: solid;
    border-color: ${Colors.theme.lightSkyBlue};
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
    margin-top: 12px;
    cursor: pointer;

    img {
        width: 12px;
        height: 12px;
        object-fit: contain;
    }
    .title {
        margin-left: 12px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: ${Colors.extra.slateBlue};
    }
`;

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
