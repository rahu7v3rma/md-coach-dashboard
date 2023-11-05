import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

export const Popup = styled.div`
    background: rgba(110, 81, 208, 0.15);
    backdrop-filter: blur(4px);
    width: 304px;
    background: #ffffff;
    border: 1px solid #d3e6f8;
    border-radius: 16px;
    box-shadow: 0 0 152px black;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PopupHeading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const PopupTitle = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #271a51;
    flex: none;
    order: 0;
    flex-grow: 0;
    flex: 1;
    text-align: left;
    margin: 0;
`;

export const CloseIconBtn = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
`;

export const SearchBarView = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    background: #f5f8fb;
    border-width: 1px 1px 2px 1px;
    border-style: solid;
    border-color: #d3e6f8;
    border-radius: 18px;
    align-items: center;
    height: 48px;
    width: 100%;
`;

export const SearchBarIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 18px;
    margin-right: 12px;
`;
export const TextInput = styled.input.attrs(() => ({
    type: 'text'
}))`
    flex: 1;
    height: 48px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #271a51;
    border: none;
    background-color: transparent;
    margin-right: 18px;
    ::placeholder {
        color: #a4aaaf;
    }
    :focus-visible {
        outline: none;
    }
`;

export const HDevider = styled.div`
    width: 100%;
    margin-top: 20px;
    height: 1.5px;
    background-color: #eef4fa;
`;

export const ButtonsView = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;
export const PopupActionButton = styled.button`
    border-width: 1px 1px 2px 1px;
    border-style: solid;
    border-color: #d3e6f8;
    border-radius: 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    flex: 1;
    height: 36px;
    cursor: pointer;

    &.cancel {
        background-color: #eef4fa;
        color: #6e51d0;
        margin-right: 6px;
    }

    &.next {
        background-color: #6e51d0;
        color: #ffffff;
        margin-left: 6px;
    }
`;

export const TeamMemberList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
`;

export const TeamMemberView = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 16px;
    :first-child {
        margin-top: 0;
    }
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

export const TeamMemberDetailView = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 12px;
`;

export const TeamMemberName = styled.h1`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #271a51;
    margin: 0;
`;

export const TeamMemberStatus = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #a4aaaf;
    margin: 0;
    margin-top: 2px;
    &.online {
        color: #3a9a00;
    }
`;
