import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useChannelStateContext } from 'stream-chat-react';

import Close from '../../../../assets/close-icon.svg';
import EditGroup from '../../../../assets/edit-group-icon.svg';
import { useChannelPreviewInfo } from '../../hooks';
import EditGroupMembers from '../editGroupMembers';
import GroupDetailsMemberListItem from '../groupDetailsMemberListItem';
import RenameGroupContainer from '../renameGroup';

import {
    ChatMembers,
    ChatTitle,
    CloseIcon,
    DividerLine,
    EditGroupText,
    EditIcon,
    GroupAvatar,
    HorizontalContainer,
    SideTitle,
    TeamMemberList,
    Wrapper
} from './styles';

type Props = {
    onCollapseButtonClick?: Function;
};

const GroupSideDetails: FunctionComponent<Props> = ({
    onCollapseButtonClick
}: Props) => {
    const { channel } = useChannelStateContext();

    const { displayImage, displayTitle } = useChannelPreviewInfo({
        channel
    });

    const [showModal, setShowModal] = useState(false);
    const [showRenameGroup, setShowRenameGroup] = useState(false);

    const isOneOnOne = useMemo(() => {
        return (
            !channel.data?.name &&
            Object.values(channel?.state.members).length === 2
        );
    }, [channel]);

    const handleCloseButtonClick = useCallback(() => {
        onCollapseButtonClick && onCollapseButtonClick();
    }, [onCollapseButtonClick]);

    const handleRenameConfirm = useCallback(
        (name: string) => {
            channel.updatePartial({ set: { name } });
            setShowRenameGroup(false);
        },
        [channel]
    );

    const handleRenameCancel = useCallback(() => {
        setShowRenameGroup(false);
    }, []);

    const handleNewAvatar = useCallback(
        (newAvatarPath: string) => {
            channel.updatePartial({ set: { image: newAvatarPath } });
        },
        [channel]
    );

    return (
        <Wrapper>
            <HorizontalContainer>
                <SideTitle>Information about chat</SideTitle>
                <CloseIcon src={Close} onClick={handleCloseButtonClick} />
            </HorizontalContainer>
            <HorizontalContainer>
                <GroupAvatar
                    path={displayImage}
                    width={40}
                    height={40}
                    editable={!isOneOnOne}
                    onNewAvatarUpload={handleNewAvatar}
                />
                <ChatTitle>{displayTitle}</ChatTitle>
                {!isOneOnOne && (
                    <EditIcon
                        onClick={() => {
                            setShowModal(false);
                            setShowRenameGroup(true);
                        }}
                        src={EditGroup}
                        alt="EditGroup"
                    />
                )}
            </HorizontalContainer>
            <DividerLine />
            {!isOneOnOne && (
                <>
                    <HorizontalContainer>
                        <EditGroupText>Edit group</EditGroupText>
                    </HorizontalContainer>
                    <DividerLine />
                    <HorizontalContainer>
                        <ChatMembers>Chat members</ChatMembers>
                    </HorizontalContainer>
                </>
            )}
            <TeamMemberList>
                {Object.keys(channel.state.members).map((memberId: string) => (
                    <GroupDetailsMemberListItem
                        key={`member-${memberId}`}
                        user={channel.state.members[memberId].user}
                    />
                ))}
            </TeamMemberList>

            {showModal && (
                <EditGroupMembers
                    currentMembers={Object.keys(channel.state.members)}
                    onClose={() => setShowModal(false)}
                    onAddMembers={(selectedMemberIds) => {
                        channel.addMembers(selectedMemberIds).then(() => {
                            setShowModal(false);
                        });
                    }}
                />
            )}
            {showRenameGroup && (
                <RenameGroupContainer
                    name={channel.data?.name || ''}
                    onRename={handleRenameConfirm}
                    onClose={handleRenameCancel}
                />
            )}
        </Wrapper>
    );
};

export default GroupSideDetails;
