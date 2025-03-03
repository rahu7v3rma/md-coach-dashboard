import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    background: ${Colors.extra.white1};
`;

export const MainContent = styled.div`
    position: relative;
    flex: 0 0 80%;
`;

/* Main Notification Styling */

export const Title = styled.p`
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    color: ${Colors.extra.blackText};
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
`;

export const NotificationList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 20%;
    max-width: 250px;
    height: 100%;
    overflow-y: auto;
    padding-right: 1em;
`;

export const NotificationContent = styled.div`
    flex: 0 0 80%;
    width: 100%;
    height: 100%;
`;

export const PlaceholderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const PlaceholderFox = styled.img`
    transform: scale(0.8);
`;

export const PlaceholderText = styled.span`
    color: ${Colors.extra.slateBlue};
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    margin-top: 1em;
`;

export const NotificationWrapper = styled.div`
    padding-left: 1.5em;
`;

/** End of Main Notification Main Styling */

/** Start of Notification Item */

export const NotificationContainer = styled.div`
    display: flex;
    padding: 0.5em 0.25em;
    cursor: pointer;
    width: 100%;
    margin-bottom: 0.25em;
    box-sizing: border-box;

    &:hover {
        opacity: 0.8;
    }
`;

export const DisplayName = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1em;
`;

export const NameTitle = styled.span`
    color: ${Colors.extra.blackText};
    font-weight: 600;
    font-size: 13px;
`;

export const Subtitle = styled.span`
    color: ${Colors.theme.gray};
    font-size: 11px;
`;

export const TimeText = styled.span`
    color: ${Colors.theme.gray};
    font-size: 11px;
    margin-left: auto;
`;
