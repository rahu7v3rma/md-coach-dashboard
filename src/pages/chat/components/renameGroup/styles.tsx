import styled, { css } from 'styled-components';

export const Modal = styled.div`
    width: 304px;
    height: auto;
    background: #ffffff;
    border: 1px solid #d3e6f8;
    border-radius: 16px;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: 0 0 152px black;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`;

export const Title = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #271a51;
`;

export const CloseIcon = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;
`;

export const GroupName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
`;

export const CameraIcon = styled.img`
    width: 48px;
    height: 48px;
    cursor: pointer;
`;

export const TextInput = styled.input`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 16px;
    gap: 44px;
    width: 196px;
    height: 48px;
    border: 1.5px solid #d3e6f8;
    border-radius: 16px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 1;
    margin-left: 12px;
`;

export const Divider = styled.div`
    height: 0px;
    border: 1.5px solid #eef4fa;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
    margin-top: 20px;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 24px;
`;

const CommonButtonStyles = css`
    flex: 1;
    padding: 9px 12px;
    border-width: 1px 1px 2px 1px;
    border-style: solid;
    border-radius: 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;
`;

export const CancelButton = styled.button`
    background: #eef4fa;
    border-color: #d3e6f8;
    color: #6e51d0;
    margin-right: 6px;
    ${CommonButtonStyles};
`;

export const NextButton = styled.button`
    background: #6e51d0;
    border-color: #5a3dbf;
    color: #ffffff;
    margin-left: 6px;
    ${CommonButtonStyles};
`;
