import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Page = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background: ${Colors.extra.white1};
`;

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: auto;
    background: ${Colors.extra.white};
    border-radius: 32px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 72.5px;
    margin-right: 72.5px;
    margin-top: 64px;
    margin-bottom: 32px;
`;

export const Logo = styled.img`
    width: 44px;
    height: 33px;
`;

export const Title = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    color: ${Colors.extra.darkLiver};
    margin-top: 55px;
`;

export const Description = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${Colors.extra.darkLiver};
    margin: 0px;
    padding: 0px;
`;

export const EmailInput = styled.input`
    width: 100%;
    height: 56px;
    background: ${Colors.extra.white};
    border-width: 1px 1px 3px 1px;
    border-style: solid;
    border-color: ${Colors.theme.lightSkyBlue};
    border-radius: 14px;
    outline: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    padding-left: 20px;
    margin-top: 48px;
    cursor: pointer;
`;

export const Button = styled.button`
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    background: ${Colors.theme.primary};
    border-bottom: 3px solid ${Colors.extra.oceanBlue};
    border-radius: 16px;
    margin-top: 24px;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${Colors.extra.white};
    cursor: pointer;
`;

export const CopyRights = styled.span`
    width: 100%;
    height: 18px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: ${Colors.theme.gray};
    text-align: center;
    mix-blend-mode: normal;
    margin-top: 48px;
`;
export const ErrorText = styled.span`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 16x;
    line-height: 36px;
    color: ${Colors.extra.red};
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`;

export const ReturnToSignInText = styled.span`
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    width: 100%;
    padding: 0 1em;
    text-decoration-line: underline;
    color: ${Colors.theme.primary};
    cursor: pointer;
    margin-top: 48px;
    margin-bottom: 60px;
`;

export const ReturnArrow = styled.img`
    margin-right: 0.5em;
`;
