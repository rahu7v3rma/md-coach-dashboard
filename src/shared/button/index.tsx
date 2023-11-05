import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<ButtonProps>`
    border: ${(props) => props.border || '1px solid'};
    border-radius: ${(props) => props.borderRadius || '12px'};
    font-size: ${(props) => `${props.fontSize || 14}px`};
    padding: ${(props) => props.padding || '1em 1.5em'};
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height};

    ${(props) =>
        props.disabled
            ? `
                color: ${props.color || '#a4aaaf'};
                background: ${props.backgroundColor || '#72996b'};
                border-color: ${props.borderColor || '#72996b'};
            `
            : `
                color: ${props.color || '#fff'};
                background-color: ${props.backgroundColor || '#72996b'};
                border-color: ${props.borderColor || '#72996b'};
                cursor: pointer;
                &:hover {
                    transform: scale(1.01);
                }
            `}

    ${(props) =>
        props.isBoxShadow
            ? `box-shadow: ${props.boxShadow || '0px 2px 0px #5a3dbf'};`
            : ``}
`;

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    width?: string;
    height?: string;
    padding?: string;
    isBoxShadow?: boolean;
    borderRadius?: string;
    borderColor?: string;
    className?: string;
    id?: string;
    testID?: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string;
    height?: string;
    padding?: string;
    isBoxShadow?: boolean;
    borderRadius?: string;
    fontSize?: number;
    border?: string;
    backgroundColor?: string;
    borderColor?: string;
    boxShadow?: string;
}

const Button: FunctionComponent<Props> = ({
    children,
    onClick,
    disabled,
    color,
    backgroundColor,
    fontSize,
    width,
    height,
    padding,
    isBoxShadow,
    borderRadius,
    borderColor,
    className,
    id,
    testID
}: Props) => {
    return (
        <StyledButton
            data-testid={testID}
            id={id}
            onClick={onClick}
            disabled={disabled}
            color={color}
            backgroundColor={backgroundColor}
            fontSize={fontSize}
            width={width}
            height={height}
            padding={padding}
            isBoxShadow={isBoxShadow}
            borderRadius={borderRadius}
            borderColor={borderColor}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
