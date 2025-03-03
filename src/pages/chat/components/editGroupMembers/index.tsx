import { FunctionComponent, useCallback, useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import AddGroupMembers from '../addGroupMembers';

import {
    ButtonsView,
    CloseIconBtn,
    HDevider,
    Popup,
    PopupActionButton,
    PopupHeading,
    PopupTitle,
    Wrapper
} from './styles';

const CloseIcon = './assets/icons/Close.png';

type Props = {
    defaultSelectedMembers?: Array<string>;
    onClose?: () => void;
    onAddMembers?: (selectedMembers: Array<string>) => void; // It will return the selected members id array
    currentMembers: Array<string>;
};

const EditGroupMembers: FunctionComponent<Props> = ({
    onClose,
    onAddMembers,
    currentMembers
}: Props) => {
    const { client } = useChatContext();
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
    const closeCallBack = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const onAddMembersCallBack = useCallback(() => {
        onAddMembers && onAddMembers(selectedMemberIds);
    }, [onAddMembers, selectedMemberIds]);

    const handleCheckedMembersChange = useCallback(
        (checkedMemberIds: string[]) => {
            setSelectedMemberIds(checkedMemberIds);
        },
        []
    );
    return (
        <Wrapper>
            <Popup onClick={(event) => event.stopPropagation()}>
                <PopupHeading>
                    <PopupTitle>Add members</PopupTitle>
                    <CloseIconBtn onClick={closeCallBack}>
                        <img alt="close" src={CloseIcon} />
                    </CloseIconBtn>
                </PopupHeading>
                <AddGroupMembers
                    currentMembers={currentMembers}
                    onCheckedMembersChange={handleCheckedMembersChange}
                    client={client}
                />

                <HDevider />

                <ButtonsView>
                    <PopupActionButton
                        className="cancel"
                        onClick={closeCallBack}
                    >
                        Cancel
                    </PopupActionButton>
                    <PopupActionButton
                        className="next"
                        onClick={onAddMembersCallBack}
                    >
                        Add Members
                    </PopupActionButton>
                </ButtonsView>
            </Popup>
        </Wrapper>
    );
};

export default EditGroupMembers;
