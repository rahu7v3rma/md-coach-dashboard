import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

import CloseIcon from '../../assets/close-icon.svg';
import { Colors } from 'src/utils/colors';

const ModalContainer = styled('div')<{ isBoxShadow: Boolean }>`
    min-height: 60px;
    min-width: 60px;
    background: ${Colors.extra.white};
    position: fixed;
    display: flex;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    border: 1px solid ${Colors.theme.lightSkyBlue};
    border-radius: 8px;
    box-shadow: ${(props) => (props.isBoxShadow ? '0 0 152px black' : 'unset')};
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
`;

const CloseButton = styled.img`
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 101;
    cursor: pointer;
`;

type Props = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    isBoxShadow?: boolean;
};

const Modal: FunctionComponent<Props> = ({
    open,
    onClose,
    children,
    isBoxShadow = true
}: Props) => {
    if (open) {
        return (
            <>
                <Backdrop id="modalBackdrop" onClick={onClose} />
                <ModalContainer id="modalContent" isBoxShadow={isBoxShadow}>
                    <CloseButton
                        id="modalCloseButton"
                        src={CloseIcon}
                        onClick={onClose}
                    />
                    {children}
                </ModalContainer>
            </>
        );
    } else {
        return null;
    }
};

export default Modal;
