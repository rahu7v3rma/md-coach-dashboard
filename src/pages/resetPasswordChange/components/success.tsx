import { FunctionComponent } from 'react';
import styled from 'styled-components';

import Tick from '../../../assets/images/Tick.svg';
import { Colors } from 'src/utils/colors';

type Props = Record<string, never>;

const SuccessImage = styled.div`
    box-sizing: border-box;
    width: 96px;
    height: 96px;
    background: ${Colors.theme.primary};
    border: 1px solid ${Colors.extra.chineseWhite};
    border-radius: 32px;
    margin-top: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TickImage = styled.img`
    width: 28px;
    height: 20px;
`;

const SuccessTitle = styled.h1`
    width: 335px;
    height: 72px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    color: ${Colors.extra.darkLiver};
    margin-top: 40px;
    margin-bottom: 40px;
`;

const Success: FunctionComponent<Props> = ({}: Props) => {
    return (
        <>
            <SuccessImage>
                <TickImage src={Tick} />
            </SuccessImage>
            <SuccessTitle>Password successfully {<br />} created!</SuccessTitle>
        </>
    );
};

export default Success;
