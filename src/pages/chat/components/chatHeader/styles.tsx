import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    background: ${Colors.extra.lighter};
    border-radius: 16px 16px 0px 0px;
    display: flex;
    flex-direction: row;
    padding: 12px 12px 30px;
    margin-left: -1.5px;
    margin-right: -1.5px;
`;

export const ChatTitle = styled.div`
    flex: 1;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: ${Colors.extra.black};
    display: flex;
    overflow-x: hidden;
    white-space: pre-wrap
    word-wrap: break-word;
    word-break: break-all;
`;

export const ButtonsGroup = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Button = styled.button`
    width: 20px;
    height: 20px;
    background: transparent;
    padding: 0;
    border: none;
    margin: 0 6px;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;
