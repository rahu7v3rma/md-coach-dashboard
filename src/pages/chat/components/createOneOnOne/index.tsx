import { FunctionComponent, useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';

import Close from '../../../../assets/images/Close.png';
import AddGroupMembers from '../addGroupMembers';
import { Colors } from 'src/utils/colors';

const Modal = styled.div`
    width: 304px;
    height: auto;
    background: ${Colors.extra.white};
    border: 1px solid ${Colors.theme.lightSkyBlue};
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
    color: ${Colors.extra.blackText};
`;

const CloseIcon = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;
`;

const Divider = styled.div`
    height: 0px;
    border: 1.5px solid ${Colors.extra.aliceBlue};
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
    margin-top: 20px;
`;

type Props = {
    client: StreamChat;
    onClose?: () => void;
};

const CreateOneOnOne: FunctionComponent<Props> = ({
    client,
    onClose
}: Props) => {
    const { setActiveChannel } = useChatContext();

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const handleMemberClick = useCallback(
        (memberId: string) => {
            const channel = client.channel('messaging', {
                members: [memberId, client.userID!]
            });
            channel.create().then(() => {
                setActiveChannel(channel);
                handleClose();
            });
        },
        [client, handleClose, setActiveChannel]
    );

    return (
        <Modal>
            <Header>
                <Title id="title">Select a member</Title>
                <CloseIcon id="closeButton" src={Close} onClick={handleClose} />
            </Header>
            <AddGroupMembers
                onMemberClick={handleMemberClick}
                client={client}
            />
            <Divider />
        </Modal>
    );
};

export default CreateOneOnOne;
