import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const SearchBarView = styled.div`
    display: flex;
    flex-direction: row;
    background: ${Colors.extra.white};
    border-width: 1px;
    border-style: solid;
    border-color: ${Colors.extra.lighter};
    border-radius: 16px;
    align-items: center;
    height: 48px;
    width: 100%;
    max-width: 335px;
`;

export const SearchBarIcon = styled.img`
    width: 18px;
    height: 18px;
    margin-left: 18px;
    margin-right: 11px;
`;
export const TextInput = styled.input.attrs(() => ({
    type: 'text'
}))`
    flex: 1;
    height: 48px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${Colors.extra.blackText};
    border: none;
    background-color: transparent;
    margin-right: 18px;
    ::placeholder {
        color: ${Colors.theme.gray};
    }
    :focus-visible {
        outline: none;
    }
`;
