import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    font-size: 13px;
    font-weight: 400;
    padding: 20px 16px;
    border-top: 1px solid ${Colors.theme.primaryLight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${Colors.extra.white};
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
`;

export const PaginationButton = styled.button`
    background-color: ${Colors.theme.primaryLighter};
    color: ${Colors.theme.primary};
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    margin: 0 15px;
    cursor: pointer;
    &.disabled {
        background-color: ${Colors.theme.primaryLighter};
        color: ${Colors.theme.primaryLight};
        cursor: default;
    }
`;

export const Select = styled.select`
    background-color: ${Colors.theme.primaryLighter};
    color: ${Colors.theme.primary};
    font-size: 14px;
    font-weight: 500;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    outline: none !important;
    margin-left: 20px;
`;
