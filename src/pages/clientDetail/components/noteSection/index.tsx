import {
    FunctionComponent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'src/hooks';
import {
    ClientSelectors,
    addNote,
    deleteNote,
    editNote,
    getNotes
} from 'src/reducers/client';
import { Size } from 'src/shared/text';
import { Note } from 'src/types/note';
import { Colors } from 'src/utils/colors';

import NoteContainer from './noteContainer';
import {
    LastNotesText,
    NoteInput,
    RootContainer,
    currentNoteStyle,
    previousNoteStyle
} from './styles';

interface Props {
    setEdit: (edit: boolean) => void;
    edit: boolean;
}

const NoteSection: FunctionComponent<Props> = ({ setEdit, edit }: Props) => {
    const dispatch = useAppDispatch();
    const { id, group_id } = useParams();
    const { notes } = ClientSelectors();

    const { list, next_page_number, has_next } = notes[id as string] || {};

    const [message, setMessage] = useState<string>('');
    const [editedId, setEditedId] = useState<number | null>(null);
    const [messageDate, setMessageDate] = useState<Date | undefined>(undefined);
    const [note, setNote] = useState<Note | undefined>(undefined);

    useEffect(() => {
        dispatch(
            getNotes({
                page: 1,
                limit: 10,
                clientId: id as string
            })
        );
    }, [dispatch, id]);

    const loadMoreData = useCallback(() => {
        dispatch(
            getNotes({
                page: next_page_number as number,
                limit: 10,
                clientId: id as string
            })
        )
            .unwrap()
            .catch((err) => {
                alert(err.message);
            });
    }, [dispatch, id, next_page_number]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (
                (event.key === 'Enter' && !event.shiftKey) ||
                (event.key === 'Escape' && message.trim())
            ) {
                let newNote = {
                    id:
                        editedId === null
                            ? Math.floor(Math.random() * 1000)
                            : editedId,
                    client_id: id ?? '',
                    content: message,
                    created_at: messageDate || new Date()
                };
                if (editedId !== null) {
                    dispatch(editNote(newNote));
                } else {
                    dispatch(addNote(newNote));
                }
                setEdit(false);
                setEditedId(null);
                setMessage('');
            }
        },
        [dispatch, id, message, messageDate, setEdit, editedId]
    );

    useEffect(() => {
        if (edit) {
            if (editedId) {
                setEdit(false);
                return;
            }
            setMessageDate(undefined);
            setNote(undefined);
        }
    }, [edit, editedId, setEdit]);

    const notes_client = useMemo(() => {
        if (id && notes[id]) {
            return [...notes[id].list].sort((first, second) => {
                return second.created_at > first.created_at ? 1 : -1;
            });
        }
        return [];
    }, [id, notes]);

    const ondeleteNote = useCallback(
        (noteId: number) => {
            dispatch(
                deleteNote({
                    id: noteId,
                    clientId: id ?? ''
                })
            );
        },
        [id, dispatch]
    );

    return (
        <RootContainer>
            {(edit && !editedId) ||
            (editedId !== null && editedId === note?.id) ? (
                <NoteInput
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    rows={5}
                    cols={35}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                note?.content && (
                    <NoteContainer
                        id={note.id}
                        style={currentNoteStyle}
                        date={note.created_at}
                        onDoubleClick={(children, date) => {
                            setMessage(children);
                            setMessageDate(date);
                            setEditedId(note.id);
                        }}
                        onDeleteNote={ondeleteNote}
                    >
                        {note.content}
                    </NoteContainer>
                )
            )}
            <LastNotesText
                fontFamily="Poppins"
                fontWeight="500"
                fontSize={Size.X3Small}
                color={Colors.extra.sub_title_text}
            >
                Last {!group_id ? 'Comments' : 'Notes'}:
            </LastNotesText>
            <InfiniteScroll
                dataLength={list?.length || 10}
                next={loadMoreData}
                hasMore={has_next}
                scrollableTarget="notesDiv"
                loader={<h4>Loading...</h4>}
                data-testid="infinite-scroll"
            >
                {notes_client.map((noteClient) =>
                    !edit &&
                    editedId !== null &&
                    editedId === noteClient?.id ? (
                        <NoteInput
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            rows={5}
                            cols={35}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <NoteContainer
                            id={noteClient.id}
                            key={noteClient.id}
                            style={previousNoteStyle}
                            date={noteClient.created_at}
                            onDoubleClick={(children, date) => {
                                setMessage(children);
                                setMessageDate(date);
                                setEditedId(noteClient.id);
                            }}
                            onDeleteNote={ondeleteNote}
                        >
                            {noteClient.content}
                        </NoteContainer>
                    )
                )}
            </InfiniteScroll>
        </RootContainer>
    );
};

export default NoteSection;
