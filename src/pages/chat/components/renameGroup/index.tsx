import { FunctionComponent, useCallback, useState } from 'react';

import Close from '../../../../assets/images/Close.png';
//import Camera from '../../../../assets/users/camera-icon.svg';

import {
    Buttons,
    //CameraIcon,
    CancelButton,
    CloseIcon,
    Divider,
    GroupName,
    Header,
    Modal,
    NextButton,
    TextInput,
    Title
} from './styles';

type Props = {
    name: string;
    onClose: () => void;
    onRename: (name: string) => void;
};

const RenameGroupContainer: FunctionComponent<Props> = ({
    name,
    onClose,
    onRename
}: Props) => {
    const [groupName, setGroupName] = useState<string>(name);

    const handleRenameClick = useCallback(() => {
        onRename(groupName);
    }, [onRename, groupName]);

    const handleCloseClick = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Modal>
            <Header>
                <Title id="title_text">Edit group details</Title>
                <CloseIcon
                    id="close_icon"
                    src={Close}
                    onClick={handleCloseClick}
                />
            </Header>
            <GroupName>
                {/*<CameraIcon src={Camera} />*/}
                <TextInput
                    id="group_input"
                    onChange={(e) => setGroupName(e.target.value)}
                    value={groupName}
                />
            </GroupName>
            <Divider />
            <Buttons>
                <CancelButton id="btn_cancel" onClick={handleCloseClick}>
                    Cancel
                </CancelButton>
                <NextButton id="btn_rename" onClick={handleRenameClick}>
                    Next
                </NextButton>
            </Buttons>
        </Modal>
    );
};

export default RenameGroupContainer;
