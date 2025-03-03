import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: ${Colors.extra.white1};
    overflow: hidden;
`;

export const AllRightsText = styled.span`
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    color: ${Colors.theme.gray};
    margin: 2em auto;
`;

export const FormCard = styled('div')`
    background: ${Colors.extra.white};
    border: 1px solid ${Colors.extra.aliceBlue};
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3em 4em 2em 4em;
    gap: 12px;
    width: 470px;
    max-width: 4700px;
    height: auto;

    @media (max-width: 500px) {
    }
`;

export const TitleText = styled.span`
    font-family: 'Poppins';
    font-weight: 800;
    font-size: 28px;
    line-height: 36px;
    color: ${Colors.extra.darkLiver};
    text-align: center;
    margin-bottom: 0.5em;
`;

export const DetailsText = styled.span`
    color: ${Colors.extra.davysGrey};
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    margin: 0 auto;
`;

export const Text = styled.span`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: ${Colors.extra.darkLiver};
    margin: 0px;
    padding: 0px;
    text-align: center;
    margin-bottom: 48px;
`;

export const Spacer = styled.span`
    margin-top: 25px;
`;
