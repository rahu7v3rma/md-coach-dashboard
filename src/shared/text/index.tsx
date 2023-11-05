import { FunctionComponent } from 'react';
import styled from 'styled-components';

export enum Size {
    XXXXSmall = 11,
    XXXSmall = 12,
    XXSmall = 14,
    XSmall = 16,
    Small = 18,
    Medium = 20,
    Large = 24,
    XLarge = 28,
    XXLarge = 30,
    XXXLarge = 34,
    XXXXLarge = 38
}

export type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

const StyledText = styled.p<Props>`
    color: ${(p) => p.color};
    font-size: ${(p) => p.fontSize || Size.XXSmall}px;
    font-weight: ${(p) => p.fontWeight};
    text-align: ${(p) => p.textAlign};
    text-decoration-line: ${(p) => p.textDecorationLine};
    text-decoration-color: ${(p) => p.textDecorationColor};
    text-decoration-style: ${(p) => p.textDecorationStyle};
    text-decoration-thickness: ${(p) => p.textDecorationThickness};
    text-transform: ${(p) => p.textTransform};
    text-indent: ${(p) => p.textIndent}px;
    letter-spacing: ${(p) => p.lineSpacing}px;
    line-height: ${(p) => p.lineHeight};
    word-spacing: ${(p) => p.wordSpacing}px;
    text-shadow: ${(p) => p.textShadow};
    margin: 0;
    width: ${(p) => p.width};
    font-family: ${(p) => p.fontFamily};
    margin-right: ${(p) => p.marginRight}px;
    margin-left: ${(p) => p.marginLeft}px;
`;

type Props = {
    children?: React.ReactNode;
    color?: string;
    fontSize?: Size;
    fontWeight?: FontWeight;
    textAlign?: 'center' | 'left' | 'right' | 'justify';
    textDecorationLine?:
        | 'overline'
        | 'line-through'
        | 'underline'
        | 'underline overline';
    textDecorationColor?: string;
    textDecorationStyle?: 'solid' | 'wavy' | 'double' | 'dotted' | 'dashed';
    textDecorationThickness?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    textIndent?: number;
    lineSpacing?: number;
    lineHeight?: string;
    wordSpacing?: number;
    textShadow?: string;
    width?: string;
    fontFamily?: string;
    marginRight?: number;
    marginLeft?: number;
    onClick?: React.MouseEventHandler<HTMLParagraphElement>;
};

const Text: FunctionComponent<Props> = ({ children, ...props }: Props) => {
    return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
