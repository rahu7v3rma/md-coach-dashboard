import { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div<Props>`
    background: ${(p) => p.backgroundColor || '#ffffff'};
    border-width: ${(p) => p.borderWidth || '1px'};
    border-style: ${(p) => p.borderStyle || 'solid'};
    border-color: ${(p) => p.borderColor || '#ffffff'};
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
`;

type Props = {
    children?: React.ReactNode;
    backgroundColor?: string;
    borderWidth?: string;
    borderColor?: string;
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
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    onClick?: () => void;
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
