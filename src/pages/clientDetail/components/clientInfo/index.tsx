import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ChatIcon from 'src/assets/images/chat.png';
import { useAppChat } from 'src/contexts/appChat';
import { Avatar, Button, Text } from 'src/shared';
import { Colors } from 'src/utils/colors';

const Container = styled.div`
    width: 315px;
    height: auto;
    display: flex;
    border-radius: 15px;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`;

const StatusView = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
`;

const TitleName = styled(Text)`
    font-size: 18px;
    margin-top: 5px;
    font-weight: 600;
`;

const ChatText = styled(Text)`
    font-size: 13px;
    font-weight: 600;
    color: ${Colors.theme.primary};
    margin-left: 9px;
`;

const ChatButton = styled(Button)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const ChatImg = styled.img`
    width: 19px;
    height: 19px;
`;

const ClientImage = styled(Avatar)`
    width: 90px;
    height: 90px;
`;

interface Props {
    name: string;
    profileImg: string | null;
    chatId: string;
}

const ClientInfo: FunctionComponent<Props> = ({
    name,
    profileImg,
    chatId
}: Props) => {
    const navigate = useNavigate();

    const { chatClient } = useAppChat();

    const handleChatClick = useCallback(() => {
        if (chatClient?.userID) {
            chatClient
                .queryChannels({
                    members: { $eq: [chatClient.userID, chatId] }
                })
                .then((channels) => {
                    if (channels.length > 0) {
                        navigate('/chat', {
                            state: { channelId: channels[0].cid }
                        });
                    }
                });
        }
    }, [chatClient, navigate, chatId]);

    return (
        <Container>
            <ClientImage
                path={profileImg || undefined}
                width={90}
                height={90}
            />
            <StatusView>
                <TitleName>{name}</TitleName>
                <ChatButton
                    backgroundColor={Colors.extra.white}
                    borderColor={Colors.extra.white}
                    height="40px"
                    width="97px"
                    onClick={handleChatClick}
                >
                    <ChatImg src={ChatIcon} />
                    <ChatText>Chat</ChatText>
                </ChatButton>
            </StatusView>
        </Container>
    );
};

export default ClientInfo;
