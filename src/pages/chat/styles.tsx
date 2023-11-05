import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const PageContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    height: 100%;
    margin-bottom: 24px;
`;

export const ChatContainer = styled.div<{
    height: number;
}>`
    display: flex;
    background-color: #fff;
    padding: 10px;
    border: 1px solid ${Colors.extra.lighter};
    border-radius: 16px;
    ${({ height }) => `height: ${height - 200}px;`}
`;

export const PageHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

export const TimeContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TimeLabel = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${Colors.extra.black};
    margin-left: 11px;
`;
