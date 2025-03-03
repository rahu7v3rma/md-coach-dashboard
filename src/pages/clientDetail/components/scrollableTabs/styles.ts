import styled from 'styled-components';

import rightArrowIcon from 'src/assets/right-arrow.svg';

const TitleIcon = styled.img`
    width: 22px;
    height: 22px;
`;

const RightArrow = styled.img.attrs({
    src: rightArrowIcon
})`
    margin-right: 7px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`;

const Body = styled.div`
    width: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 141px;
`;

export const Icon = styled.img`
    margin-right: 13.5px;
`;

const TimeContainer = styled(TitleContainer)``;

export { TitleIcon, RightArrow, Header, Body, TitleContainer, TimeContainer };
