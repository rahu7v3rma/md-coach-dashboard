import styled from 'styled-components';

import { PlatformImage, Text } from '../../shared';
import { Colors } from '../../utils/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const LogBookView = styled.div`
    flex: 1;
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

export const AssessmentView = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.65;
    overflow: hidden;
`;

export const AssessmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
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
    color: ${Colors.extra.blackText};
    font-weight: 600;
    word-break: break-word;
`;

export const SubTitleText = styled(Text)`
    font-size: 13px;
    color: ${Colors.extra.blackText};
    font-weight: 600;
    margin-top: 19px;
    margin-left: 9px;
`;

export const MedicationDoseText = styled.span`
    font-size: 13px;
    font-weight: 600;
    margin-left: 10px;
`;

export const SubTitle = styled(Text)`
    font-size: 13px;
    color: ${Colors.extra.darkLiver};
    font-weight: 700;
    margin-top: 3px;
    margin-left: 9px;
`;

export const SubView = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LessonView = styled.div`
    display: flex;
    flex-direction: column;
`;
export const ScrollTabView = styled.div(
    ({ display }: { display?: boolean }) => `
    display: ${display ? 'flex' : 'none'};
    flex-direction: row;
    background-color: ${Colors.extra.white};
    align-items: center;
    border-radius: 12px;
    overflow: scroll;
    overflow-x: hidden;
`
);

export const IconView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: ${Colors.extra.white};
    width: 48px;
    height: 48px;
    border-radius: 12px;
    cursor: pointer;
`;
export const ArrowRightView = styled.div`
    display: flex;
    position: absolute;
    right: 40px;
    padding-right: 10px;
    background-color: ${Colors.extra.white};
    cursor: pointer;
`;
export const FoodImg = styled(PlatformImage)`
    background: ${Colors.extra.gainsboro};
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
    color: ${Colors.extra.darkLiver};
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
`;
export const BackIconImg = styled.img`
    width: 24px;
    height: 24px;
`;

export const LogBookItemContainer = styled.div`
    margin-bottom: 10px;
    cursor: pointer;
`;

export const MainContentWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    gap: 32px;
    height: 100%;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 32px;
`;
