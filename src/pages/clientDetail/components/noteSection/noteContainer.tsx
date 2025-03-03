import moment from 'moment';
import { FunctionComponent, useCallback } from 'react';

import DeleteSvg from 'src/assets/delete.svg';
import { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import {
    CommentMeta,
    DateText,
    NoteText,
    NoteWrapper,
    StyledButton,
    TextWrapper
} from './styles';

interface Props {
    id: number;
    children: string;
    date: Date;
    style: React.CSSProperties;
    onDoubleClick: (children: string, date: Date) => void;
    onDeleteNote: (id: number) => void;
}

const NoteContainer: FunctionComponent<Props> = ({
    id,
    children,
    date,
    style,
    onDoubleClick,
    onDeleteNote
}: Props) => {
    const editNote = useCallback(
        (e: React.MouseEvent) => {
            if (e.detail === 2) {
                onDoubleClick(children, date);
            }
        },
        [children, date, onDoubleClick]
    );

    return (
        <NoteWrapper>
            <TextWrapper style={style}>
                <NoteText
                    fontFamily="Poppins"
                    fontWeight="400"
                    fontSize={Size.X2Small}
                    color={Colors.extra.black}
                    onClick={editNote}
                >
                    {children}
                </NoteText>
            </TextWrapper>
            <CommentMeta>
                <DateText
                    fontFamily="Poppins"
                    fontWeight="500"
                    fontSize={Size.X3Small}
                    color={Colors.extra.sub_title_text}
                >
                    {moment(date).format('MMM D, YYYY [at] h:mm:ss A')}
                </DateText>
                <StyledButton
                    width="30px"
                    height="30px"
                    padding="0px"
                    borderRadius="8px"
                    onClick={() => onDeleteNote(id)}
                >
                    <img src={DeleteSvg} alt="delete" />
                </StyledButton>
            </CommentMeta>
        </NoteWrapper>
    );
};

export default NoteContainer;
