import moment from 'moment';
import {
    BaseSyntheticEvent,
    FunctionComponent,
    useEffect,
    useState
} from 'react';
import { StreamChat, UserResponse } from 'stream-chat';
import styled from 'styled-components';

import Avatar from '../../../../assets/images/Avatar.png';
import Search from '../../../../assets/images/Search.png';

const SearchDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    height: 48px;
    background: #f5f8fb;
    border-width: 1px 1px 2px 1px;
    border-style: solid;
    border-color: #d3e6f8;
    border-radius: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SearchIcon = styled.img`
    width: 18px;
    height: 18px;
`;

const SearchInput = styled.input`
    width: 100%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #a4aaaf;
    border: none;
    outline: none;
    flex: 1;
    background: #f5f8fb;
    padding-left: 11px;
`;

const GroupMembers = styled.div`
    height: 264px;
    overflow-y: scroll;
`;

const AddGroupMember = styled.div<{
    pointer: boolean;
}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;

    ${({ pointer }) =>
        pointer
            ? `cursor: pointer;
    transition: filter 0.3s ease 0.3s;`
            : ''};
`;

const MemberAvatar = styled.img`
    width: 48px;
    height: 48px;
`;

const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 12px;
`;

const MemberName = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #271a51;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MemberStatus = styled.span`
    width: 162px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #3a9a00;
    padding-top: 2px;
`;

const MemberCheckbox = styled.input`
    width: 18px;
    height: 18px;
`;

type Props = {
    client: StreamChat;
    onCheckedMembersChange?: (memberIds: string[]) => void;
    onMemberClick?: (memberId: string) => void;
    currentMembers?: Array<string>;
};
const AddGroupMembers: FunctionComponent<Props> = ({
    client,
    onCheckedMembersChange,
    onMemberClick,
    currentMembers
}: Props) => {
    const [allMembers, setAllMembers] = useState<UserResponse[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<UserResponse[]>([]);
    const [checkedMemberIds, setCheckedMemberIds] = useState<string[]>([]);

    useEffect(() => {
        client.queryUsers({}).then((data: { users: Array<UserResponse> }) => {
            const exludingSelfUserAndExistingMembers = data.users.filter(
                (u) => {
                    return (
                        client.userID !== u.id &&
                        (!currentMembers || currentMembers.indexOf(u.id) === -1)
                    );
                }
            );
            setAllMembers(exludingSelfUserAndExistingMembers);
            setFilteredMembers(exludingSelfUserAndExistingMembers);
        });
    }, [client, currentMembers]);

    const filterMembers = (name: string) => {
        const filtered = allMembers.filter((item: UserResponse) => {
            // undefined names should always be filtered out
            if (item.name !== undefined) {
                const itemData = item.name.toUpperCase();
                const searchFilterData = name.toUpperCase();
                return itemData.indexOf(searchFilterData) > -1;
            }

            return false;
        });

        setFilteredMembers(filtered);
    };

    const handleCheckBox = (event: BaseSyntheticEvent, memberId: string) => {
        const currentCheckedMemberIds = [...checkedMemberIds];

        if (event.target.checked) {
            currentCheckedMemberIds.push(memberId);
        } else {
            const memberIndex = currentCheckedMemberIds.indexOf(memberId);
            if (memberIndex > -1) {
                currentCheckedMemberIds.splice(memberIndex, 1);
            }
        }

        setCheckedMemberIds(currentCheckedMemberIds);
        onCheckedMembersChange!(currentCheckedMemberIds);
    };

    const renderGroupMembers = () => {
        return filteredMembers.map((item: UserResponse, index: number) => {
            return (
                <AddGroupMember
                    key={index}
                    id={`memberItem-${index}`}
                    pointer={!!onMemberClick}
                    onClick={() => onMemberClick && onMemberClick(item.id)}
                >
                    <MemberAvatar id={`memberAvatar-${index}`} src={Avatar} />
                    <MemberInfo>
                        <MemberName id={`memberName-${index}`}>
                            {item.name ? item.name : item.id}
                        </MemberName>
                        <MemberStatus
                            id={`memberStatus-${index}`}
                            style={{
                                color: item.online ? '#3a9a00' : '#A4AAAF'
                            }}
                        >
                            {item.role === 'guest'
                                ? 'Offline'
                                : item.online
                                ? 'Online'
                                : moment(item.last_active).fromNow()}
                        </MemberStatus>
                    </MemberInfo>
                    {!!onCheckedMembersChange && (
                        <MemberCheckbox
                            type="checkbox"
                            id={`checkbox-${index}`}
                            checked={checkedMemberIds.indexOf(item.id) > -1}
                            onChange={(e) => handleCheckBox(e, item.id)}
                        />
                    )}
                </AddGroupMember>
            );
        });
    };

    return (
        <>
            <SearchDiv>
                <SearchIcon src={Search} />
                <SearchInput
                    placeholder="Search"
                    onChange={(e) => filterMembers(e.target.value)}
                />
            </SearchDiv>
            <GroupMembers id="group_members">
                {renderGroupMembers()}
            </GroupMembers>
        </>
    );
};

export default AddGroupMembers;
