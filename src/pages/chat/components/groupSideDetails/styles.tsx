import styled from 'styled-components';

import { Avatar } from 'src/shared';
import { Colors } from 'src/utils/colors';

export const Wrapper = styled.div`
    width: 280px;
    padding: 0 20px 0 20px;
`;

export const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 72px;
    border-radius: 12px;
`;

export const SideTitle = styled.div`
    flex: 1;
    height: 22px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${Colors.extra.black};
`;

export const CloseIcon = styled.img`
    width: 15px;
    height: 15px;
`;

export const EditIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const ChatTitle = styled.div`
    flex: 1;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    color: ${Colors.extra.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DividerLine = styled.div`
    width: 100%;
    height: 0px;
    margin-left: 10px;
    border-top: 1.5px solid #eef4fa;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
`;

export const EditGroupText = styled.div`
    flex: 1;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: ${Colors.extra.black};
    order: 0;
`;

export const ChatMembers = styled.div`
    flex: 1;
    height: 22px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: ${Colors.extra.black};
`;

export const AddMemberIcon = styled.img`
    height: 27px;
    cursor: pointer;
`;

export const TeamMemberList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const GroupAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
`;
