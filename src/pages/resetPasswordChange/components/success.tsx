import { FunctionComponent } from 'react';
import styled from 'styled-components';

import Tick from '../../../assets/images/Tick.svg';

type Props = Record<string, never>;

const SuccessImage = styled.div`
    box-sizing: border-box;
    width: 96px;
    height: 96px;
    background: #72996b;
    border: 1px solid #dfeed8;
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
    color: #4d4f4d;
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
