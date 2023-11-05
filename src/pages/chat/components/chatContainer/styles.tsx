import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Container = styled.div`
    min-height: 60vh;
    height: auto;
    width: 100%;
    margin-left: 16px;
    overflow: hidden;
`;

export const MessageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-width: 0px 1.5px 1.5px 1.5px;
    border-style: solid;
    border-color: ${Colors.extra.lighter};
    border-radius: 16px;
    height: 100%;
    background: #fff;

    &&& .str-chat.messaging {
        background: #fff;
        border-radius: 0 0 16px 16px;
        height: 100%;
    }

    &&& .str-chat__main-panel {
        padding: 0px;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    gap: 0.5em;
`;
