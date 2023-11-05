import { FunctionComponent, useCallback, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useChatContext } from 'stream-chat-react';
import styled, { css } from 'styled-components';

//import Camera from '../../../../assets/images/Camera.png';
import Close from '../../../../assets/images/Close.png';
import AddGroupMembers from '../addGroupMembers';

const Modal = styled.div`
    width: 304px;
    height: auto;
    background: #ffffff;
    border: 1px solid #d3e6f8;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: 0 0 152px black;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`;

const Title = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #271a51;
`;

const CloseIcon = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;
`;

const GroupName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
`;

/*const CameraIcon = styled.img`
    width: 48px;
    height: 48px;
    cursor: pointer;
`;*/

const TextInput = styled.input`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 16px;
    gap: 44px;
    width: 196px;
    height: 48px;
    border: 1.5px solid #d3e6f8;
    border-radius: 16px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 1;
    margin-left: 12px;
`;

const Divider = styled.div`
    height: 0px;
    border: 1.5px solid #eef4fa;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
    margin-top: 20px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 24px;
`;

const CommonButtonStyles = css`
    flex: 1;
    padding: 9px 12px;
    border-width: 1px 1px 2px 1px;
    border-style: solid;
    border-radius: 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    background: #eef4fa;
    border-color: #d3e6f8;
    color: #6e51d0;
    margin-right: 6px;
    ${CommonButtonStyles};
`;

const NextButton = styled.button`
    background: ${(props) => (props.disabled ? '#D6D6D6' : '#6e51d0')};
    border-color: ${(props) => (props.disabled ? '#D6D6D6' : '#5a3dbf')};
    color: ${(props) => (props.disabled ? '#A4AAAF' : '#ffffff')};
    margin-left: 6px;
    ${CommonButtonStyles};
`;

type Props = {
    client: StreamChat;
    onClose?: () => void;
};

const CreateGroup: FunctionComponent<Props> = ({ client, onClose }: Props) => {
    const { setActiveChannel } = useChatContext();

    const [title, setTitle] = useState('Create a new group');
    const [groupName, setGroupName] = useState('');
    const [groupNameEntered, setGroupNameEntered] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('Next');
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

    const handleClose = useCallback(() => {
        setGroupName('');
        setGroupNameEntered(false);
        setTitle('Create a new group');
        setButtonTitle('Next');
        setSelectedMemberIds([]);

        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const handleNext = () => {
        if (groupName !== '') {
            setGroupNameEntered(true);
            setTitle('Add group members');
            setButtonTitle('Create Group');
        }

        if (buttonTitle === 'Create Group' && groupNameEntered) {
            handleAddGroupMember();
        }
    };

    const handleAddGroupMember = useCallback(() => {
        const channelId = `${client.userID?.substring(
            0,
            32
        )}-${new Date().valueOf()}`;

        const channel = client.channel('messaging', channelId, {
            name: groupName,
            members: [...selectedMemberIds, client.userID!]
        });
        channel.create().then(() => {
            setActiveChannel(channel);
            handleClose();
        });
    }, [client, selectedMemberIds, groupName, handleClose, setActiveChannel]);

    const handleCheckedMembersChange = useCallback(
        (checkedMemberIds: string[]) => {
            setSelectedMemberIds(checkedMemberIds);
        },
        []
    );

    return (
        <Modal>
            <Header>
                <Title id="title">{title}</Title>
                <CloseIcon id="closeIcon" src={Close} onClick={handleClose} />
            </Header>
            <>
                {!groupNameEntered ? (
                    <GroupName>
                        {/*<CameraIcon src={Camera} />*/}
                        <TextInput
                            id="groupName"
                            onChange={(e) => setGroupName(e.target.value)}
                            value={groupName}
                        />
                    </GroupName>
                ) : (
                    <AddGroupMembers
                        onCheckedMembersChange={handleCheckedMembersChange}
                        client={client}
                    />
                )}
            </>
            <Divider />
            <Buttons>
                <CancelButton id="cancelButton" onClick={() => handleClose()}>
                    Cancel
                </CancelButton>
                <NextButton
                    id="buttonTitle"
                    onClick={() => handleNext()}
                    disabled={
                        buttonTitle === 'Create Group' &&
                        selectedMemberIds.length === 0
                    }
                >
                    {buttonTitle}
                </NextButton>
            </Buttons>
        </Modal>
    );
};

export default CreateGroup;
