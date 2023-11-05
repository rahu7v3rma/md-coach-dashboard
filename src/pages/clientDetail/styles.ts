import styled from 'styled-components';

import { PlatformImage, Text } from '../../shared';
import { Colors } from '../../utils/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const LogBookView = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 4px;
    margin-top: 30px;
    overflow: hidden;
`;

export const ClientView = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 4px;
    align-items: center;
`;

export const IntakeListView = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.65;
    overflow: hidden;
`;

export const IntakeListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    padding-right: 20px;
`;

export const LogBookContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-left: 20px;
    flex: 0.35;

    .infinite-scroll-component__outerdiv {
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        overflow: hidden;
    }
`;

export const TitleView = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TitleText = styled(Text)`
    font-size: 29px;
    color: ${Colors.extra.black_text};
    font-weight: 600;
`;

export const SubTitleText = styled(Text)`
    font-size: 13px;
    color: ${Colors.extra.black_text};
    font-weight: 600;
    margin-top: 19px;
    margin-left: 9px;
`;

export const SubTitle = styled(Text)`
    font-size: 13px;
    color: ${Colors.extra.black};
    font-weight: 700;
    margin-top: 3px;
    margin-left: 9px;
`;

export const BreakLongText = styled(Text)`
    font-size: 14px;
`;
export const SubView = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LessonView = styled.div`
    display: flex;
    flex-direction: column;
`;
export const FoodImg = styled(PlatformImage)`
    background: #dadada;
    width: 100px;
    height: 90px;
    display: flex;
    border-radius: 6px;
`;

export const FoodBigImg = styled(PlatformImage)`
    border-radius: 8px;
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
`;

export const LessonImage = styled.img`
    width: 82px;
    height: 82px;
    border-radius: 20px;
`;

export const CardHeading = styled(Text)`
    font-size: 18px;
    color: ${Colors.extra.black};
    font-weight: 600;
    margin-bottom: 18px;
`;

export const CardLogTitle = styled(CardHeading)`
    margin-bottom: 10px;
`;

export const LessionView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const BackImg = styled.img`
    width: 48px;
    height: 48px;
    cursor: pointer;
`;

export const LogBookItemContainer = styled.div`
    margin-bottom: 10px;
    cursor: pointer;
`;

export const ClientContactContainer = styled.div`
    margin-top: 50px;
    margin-right: 4%;
`;

export const HorizontalDividerLine = styled.div`
    height: 2px;
    background-color: ${Colors.extra.divider_color};
    border-radius: 2px;
    margin-left: 4px;
    margin-right: 24px;
`;

export const ClientInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
