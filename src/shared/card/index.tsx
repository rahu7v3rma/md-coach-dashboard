import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

const StyledCard = styled.div<Props>`
    cursor: ${(p) => (p.onClick ? 'pointer' : 'default')};
    background: ${(p) => p.backgroundColor || Colors.extra.white};
    border-width: ${(p) => p.borderWidth || '1px'};
    border-bottom-width: ${(p) => p.borderBottomWidth || '1px'};
    border-color: ${(p) => p.borderColor || '#ffffff'};
    border-style: ${(p) => p.borderStyle};
    border-color: ${(p) => p.borderColor || Colors.extra.white};
    border-bottom: ${(p) => p.borderBottom || 'none'};
    border-bottom-color: ${(p) =>
        p.borderBottomColor || Colors.extra.border_bottom_color};
    border-radius: ${(p) => p.borderRadius || '16px'};
    box-sizing: border-box;
    display: flex;
    flex-direction: ${(p) => p.flexDirection || 'row'};
    justify-content: ${(p) => p.justifyContent};
    align-items: ${(p) => p.alignItems || 'flex-start'};
    padding: ${(p) => p.padding || '16px 12px'};
    gap: 12px;
    width: ${(p) => p.width || '100%'};
    height: ${(p) => p.height || 'auto'};
    margin-top: ${(p) => p.marginTop}px;
    &:nth-child(2) {
        margin-left: ${(p) => p.marginleft}px;
    }
    :nth-last-child(2) {
        margin-right: ${(p) => p.marginleft}px;
    }
`;

type Props = {
    children?: React.ReactNode;
    backgroundColor?: string;
    borderWidth?: string;
    borderColor?: string;
    borderBottomColor?: string;
    borderBottom?: string;
    borderStyle?: string;
    borderRadius?: string;
    padding?: string;
    width?: string;
    height?: string;
    justifyContent?:
        | 'center'
        | 'flex-end'
        | 'space-around'
        | 'space-between'
        | 'space-evenly';
    alignItems?: 'center' | 'flex-end';
    marginTop?: number;
    marginleft?: number;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    onClick?: () => void;
    borderBottomWidth?: string;
};

const Card: FunctionComponent<Props> = (props: Props) => {
    const { children, onClick, ...others } = props;
    return (
        <StyledCard {...others} onClick={onClick}>
            {children}
        </StyledCard>
    );
};

export default Card;
