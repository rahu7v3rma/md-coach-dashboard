import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

const CircleContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 2em;
    position: relative;
    background: ${Colors.theme.primaryLighter};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ButtonImg = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
`;

const Dot = styled('div')<{ dotPosition: boolean }>`
    background: #4dba0b;
    width: 10px;
    height: 10px;
    border-radius: 2em;
    position: absolute;
    top: 0;
    ${(props) => (props.dotPosition ? 'right: 0;' : 'left: 0;')};
    border: 2px solid #fff;
`;

interface Props {
    children?: React.ReactNode;
    image?: string;
    isNotif?: boolean;
    isRight?: boolean;
    size?: string;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler<HTMLSpanElement>;
}

const CircleButton: FunctionComponent<Props> = ({
    children,
    image,
    isNotif,
    onClick,
    onKeyDown,
    isRight = true
}: Props) => {
    return (
        <CircleContainer
            onClick={onClick && onClick}
            onKeyDown={onKeyDown && onKeyDown}
        >
            {isNotif && <Dot dotPosition={isRight} className="dot" />}
            {image && <ButtonImg src={image} />}
            {children}
        </CircleContainer>
    );
};

export default CircleButton;
