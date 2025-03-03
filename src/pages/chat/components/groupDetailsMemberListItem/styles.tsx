import { Menu as MenuInner } from '@szhsin/react-menu';
import { menuItemSelector, menuSelector } from '@szhsin/react-menu/style-utils';
import styled, { keyframes } from 'styled-components';

import Avatar from '../../../../shared/avatar';
import { Colors } from '../../../../utils/colors';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 16px;
`;

export const GroupMemberDetailView = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 12px;
`;

export const GroupMemberName = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${Colors.extra.darkLiver};
    margin: 0;
`;

export const GroupMemberStatus = styled('p')<{ online?: boolean }>`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: ${({ online }) =>
        online ? Colors.extra.darkLiver : Colors.theme.gray};
    margin: 0;
    margin-top: 2px;
`;

export const OpenMenu = styled.img`
    cursor: pointer;
`;

const menuShow = keyframes`
    from {
        opacity: 0;
    }
`;

const menuHide = keyframes`
    to {
        opacity: 0;
    }
`;

export const Menu = styled(MenuInner)`
    ${menuSelector.name} {
        font-size: 0.925rem;
        user-select: none;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 6px;
        min-width: 10rem;
        z-index: 11111;
    }

    ${menuSelector.stateOpening} {
        animation: ${menuShow} 0.15s ease-out;
    }

    ${menuSelector.stateClosing} {
        animation: ${menuHide} 0.2s ease-out forwards;
    }

    ${menuItemSelector.name} {
        border-radius: 6px;
        padding: 0.375rem 0.625rem;
        list-style-type: none;
        background-color: ${Colors.extra.white};
    }

    ${menuItemSelector.hover} {
        color: ${Colors.extra.white};
        background-color: ${Colors.extra.blueJeans};
    }
`;

export const ChannelAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
`;
