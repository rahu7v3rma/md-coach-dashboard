import styled from 'styled-components';

import { Button, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

export const DateText = styled(Text)`
    line-height: 18px;
`;

export const NoteText = styled(Text)`
    line-height: 20px;
    word-break: break-all;
    white-space: normal;
    cursor: default;
`;

export const LastNotesText = styled(Text)`
    line-height: 18px;
    margin-bottom: 16px;
`;

export const NoteInput = styled('textarea')`
    width: -webkit-fill-available;
    background: linear-gradient(
        0deg,
        ${Colors.extra.latest_note_background},
        ${Colors.extra.latest_note_background}
    );
    border: 1px solid ${Colors.extra.green_light};
    padding: 16px;
    scroll-padding: 16px;
    border-radius: 10px;
    color: #4d4f4d;
    resize: none;
    font-size: ${Size.X2Small}px;
    font-weight: 400;
    font-family: Poppins;
    :focus-visible {
        outline: ${Colors.theme.primary} auto 1px;
    }
`;

export const NoteWrapper = styled('div')`
    gap: 12px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const TextWrapper = styled('div')``;

export const RootContainer = styled('div')`
    height: 100%;
    width: 100%;
    margin-top: 24px;
`;

export const currentNoteStyle = {
    background: `linear-gradient(0deg, ${Colors.extra.latest_note_background}, ${Colors.extra.latest_note_background})`,
    border: `1px solid ${Colors.extra.green_light}`,
    padding: '16px',
    borderRadius: '10px'
};

export const previousNoteStyle = {
    background: Colors.extra.note_background,
    padding: '16px',
    borderRadius: '10px'
};

export const DeleteIcon = styled.img`
    width: 15px;
    height: 15px;
    cursor: pointer;
    border-radius: 4px;
    border: solid ${Colors.extra.white};
    box-shadow: 0 1px 1px 0 ${Colors.extra.black02};
    :hover {
        box-shadow: 0 1px 1px 0 ${Colors.extra.black04};
    }
    position: absolute;
    top: 5px;
    right: 10px;
`;

export const IconWrapper = styled.div`
    height: 15px;
    position: relative;
`;

export const StyledButton = styled(Button)`
    align-items: center;
    display: flex;
    justify-content: center;
`;

export const CommentMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
