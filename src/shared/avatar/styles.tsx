import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const DefaultAvatar = styled.img``;

export const Wrapper = styled.div<{ online?: boolean }>`
    position: relative;

    ${({ online }) =>
        online &&
        `
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 11px;
                height: 11px;
                border-radius: 50%;
                background: ${Colors.theme.primary};
                border: 2px solid ${Colors.extra.white};
                z-index: 1;
            }
    `}
`;

export const ImageContainer = styled.div<{ editable?: boolean }>`
    position: relative;
    overflow: hidden;
    border-radius: 50%;

    ${({ editable }) =>
        editable &&
        `
            cursor: pointer;
    `}
`;

export const EditOverlay = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    width: 100%;
    height: 100%;

    ${ImageContainer}:hover & {
        visibility: visible;
    }
`;

export const FileInput = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
`;
