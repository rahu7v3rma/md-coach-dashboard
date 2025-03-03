import { FunctionComponent } from 'react';
import styled from 'styled-components';

import Tick from '../../../assets/images/Tick.svg';
import { Colors } from 'src/utils/colors';

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
`;

const SuccessDescription = styled.p`
    width: 325px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: ${Colors.extra.davysGrey};
    padding: 0px;
    margin: 0px;
`;

const Email = styled.span`
    color: blue;
    text-decoration: underline;
`;

type Props = {
    email: string;
};

const Success: FunctionComponent<Props> = ({ email }: Props) => {
    return (
        <>
            <SuccessImage>
                <TickImage src={Tick} />
            </SuccessImage>
            <SuccessTitle>
                Forgot Password
                <SuccessDescription>
                    We sent a recovery link to you at {<br />}{' '}
                    <Email>{email}</Email>
                </SuccessDescription>
            </SuccessTitle>
        </>
    );
};

export default Success;
