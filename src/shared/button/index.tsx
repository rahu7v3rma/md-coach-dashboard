import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styled from 'styled-components';

import { Size } from '../text';
import { Colors } from 'src/utils/colors';

const StyledButton = styled.button<ButtonProps>`
    border: ${(props) => props.border || '1px solid'};
    border-radius: ${(props) => props.borderRadius || '12px'};
    font-size: ${(props) => `${props.fontSize || Size.X2Small}px`};
    padding: ${(props) => props.padding || '1em 1.5em'};
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height};

    ${(props) =>
        props.disabled
            ? `
                color: ${props.color || Colors.theme.gray};
                background: ${props.backgroundColor || Colors.theme.primary};
                border-color: ${props.borderColor || Colors.theme.primary};
            `
            : `
                color: ${props.color || Colors.extra.white};
                background-color: ${
                    props.backgroundColor || Colors.theme.primary
                };
                border-color: ${props.borderColor || Colors.theme.primary};
                cursor: pointer;
                &:hover {
                    transform: scale(1.01);
                }
            `}

    ${(props) =>
        props.isBoxShadow
            ? `box-shadow: ${
                  props.boxShadow ||
                  `0px 2px 0px ${Colors.extra.oceanBlue}
            `
              };`
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
