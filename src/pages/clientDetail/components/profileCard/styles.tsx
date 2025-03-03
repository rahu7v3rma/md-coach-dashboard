import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Client = styled.div`
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: space-between;
    background-color: ${Colors.extra.white};
    border-radius: 24px;
    margin-top: 0px;
    padding: 20px;
    width: -webkit-fill-available;
    height: fit-content;
`;

export const ClientInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

export const ContactInformation = styled.div`
    display: flex;
    flex-direction: column;
`;

export const NextLesson = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ChatButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const ChatButton = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    background-color: ${Colors.theme.primary};
    border-radius: 10px;
    width: 97px;
    height: 40px;
    cursor: pointer;
`;

export const Icon = styled.img``;
