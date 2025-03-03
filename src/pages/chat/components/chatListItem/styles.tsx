import styled from 'styled-components';

import { Avatar } from 'src/shared';
import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div<{ active?: boolean }>`
    display: flex;
    flex-direction: row;
    height: 62px;

    border-radius: 12px;
    padding: 0 12px;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    ${({ active }) =>
        active &&
        `
            background: ${Colors.theme.primaryLightest};
    `};
`;

export const ContainerRight = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    overflow: hidden;
`;

export const NameTimeView = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

export const Name = styled.h1`
    margin: 0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    flex: 1;
    color: ${Colors.extra.darkLiver};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
`;

export const MessageTime = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 22px;
    color: ${Colors.theme.gray};
`;

export const LastMessageCountView = styled.div`
    display: flex;
    flex-direction: row;
`;

export const LastMessage = styled.div`
    margin: 0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    color: ${Colors.theme.gray};
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 12px;
    max-width: 100%;

    p {
        margin: 0;
    }
`;

export const MessageCount = styled.div`
    width: 16px;
    height: 16px;
    background: ${Colors.theme.primary};
    border-radius: 50%;
    display: flex;
    color: ${Colors.extra.white};
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
`;

export const ChannelAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
`;
