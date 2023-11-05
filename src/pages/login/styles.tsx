import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: #f5f8fb;
    overflow: hidden;
`;

export const LoginCard = styled('div')`
    background: ${Colors.extra.white};
    border: 1px solid #eef4fa;
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

export const LogoText = styled.span`
    font-family: 'Poppins';
    font-weight: 800;
    font-size: 28px;
    line-height: 36px;
    color: ${Colors.extra.black};
    text-align: center;
    margin-bottom: 0.5em;
`;

export const ErrorText = styled.span`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 16x;
    line-height: 36px;
    color: #ff0000;
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`;

export const ForgotText = styled.span`
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    width: 100%;
    padding: 0 1em;
    text-decoration-line: underline;
    color: ${Colors.theme.primary};
    cursor: pointer;
`;

export const AllRightsText = styled.span`
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    color: #a4aaaf;
    margin: 2em auto;
`;

export const SelfInput = styled.span`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: ${Colors.extra.white};
    width: 100%;
    padding: 0.85em 1em;
    border-style: solid;
    border-color: #d3e6f8;
    border-radius: 14px;
    overflow: hidden;
    box-sizing: content-box;
    cursor: pointer;
    :focus {
        border: 2px solid ${Colors.extra.black};
    }
`;
