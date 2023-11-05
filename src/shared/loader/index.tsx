import { FunctionComponent } from 'react';
import styled from 'styled-components';

export const StyledLoader = styled.svg`
    animation: rotate 2s linear infinite;
    width: 25px;
    height: 25px;

    & .path {
        stroke: #5652bf;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;

type Props = Record<string, never>;

const Loader: FunctionComponent<Props> = ({}: Props) => {
    return (
        <StyledLoader viewBox="0 0 50 50">
            <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
            />
        </StyledLoader>
    );
};

export default Loader;
