import { Tabs } from 'react-tabs';
import styled from 'styled-components';

import { Button } from 'src/shared';
import { Colors } from 'src/utils/colors';

export const TabsStyled = styled(Tabs)`
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 0px;
    overflow: hidden;
    background: ${Colors.extra.white};
    height: 100%;
    max-width: 372px;
    width: -webkit-fill-available;
    & .react-tabs__tab-list {
        display: flex;
    }
    & .react-tabs__tab {
        display: flex;
        justify-content: center;
        width: 100%;
        border: 1px solid transparent;
        border-bottom: none;
        bottom: -1px;
        position: relative;
        list-style: none;
        padding: 6px 12px;
        cursor: pointer;
        font-weight: 500;
        color: ${Colors.theme.primary};
        font-size: 14px;
        align-items: center;
        & .tab_svg {
            fill: ${Colors.theme.primary};
        }
    }

    & .react-tabs__tab:focus-visible {
        outline: none;
    }

    .react-tabs__tab--selected {
        background: ${Colors.theme.primary};
        color: ${Colors.extra.white};
        font-size: 14px;
        align-items: center;
        & .tab_svg {
            fill: ${Colors.extra.white};
        }
    }

    & .react-tabs__tab-panel {
        width: 100%;
        display: none;
    }

    & .react-tabs__tab-panel--selected {
        height: calc(100% - 55px);
        display: block;
    }

    .react-tabs__tab-list {
        border-bottom: 1px solid #f5f5fa;
        margin: 0 0 10px;
        padding: 0;
        height: 44px;
    }
`;

export const middleTabStyle = {
    borderRight: '1px solid rgb(245, 245, 250)',
    borderLeft: '1px solid rgb(245, 245, 250)'
};

export const TabText = styled('span')`
    margin-left: 9px;
`;

export const TabContainer = styled('div')(
    ({ padding = '16px' }: { padding?: string }) => `
    padding: ${padding};
    height: 100%;
    overflow: scroll;
`
);

export const StyledButton = styled(Button)`
    font-weight: 500;
    font-family: 'Poppins';
`;
