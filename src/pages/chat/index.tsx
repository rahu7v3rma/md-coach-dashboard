import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chat as StreamChatComponent } from 'stream-chat-react';

import '@stream-io/stream-chat-css/dist/css/index.css';

import CalendarIcon from '../../assets/images/chat-calendar.png';
import { useAppChat } from '../../contexts/appChat';
import { useAppDispatch } from '../../hooks';
import { getProfile } from '../../reducers/user';
import { hasAuthToken } from '../../services/auth';
import { DashboardLayout, Text } from '../../shared';
import { Colors } from '../../utils/colors';
import { Size } from 'src/shared/text';

import {
    ChatList,
    ChatContainer as ChatMessageContainer,
    CreateGroup,
    CreateOneOnOne
} from './components';
import { useFormattedCurrentTime } from './hooks';
import useWindowDimensions from './hooks/useWindowDimensions';
import {
    ChatContainer,
    PageContent,
    PageHeader,
    TimeContainer,
    TimeLabel
} from './styles';

type Props = Record<string, never>;

type NavigationState = {
    channelId?: string;
};

const Chat: FunctionComponent<Props> = ({}: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const channelId = (locationState as NavigationState)?.channelId;
    const { height } = useWindowDimensions();

    const [showCreateGroupPopup, setShowCreateGroupPopup] =
        useState<boolean>(false);
    const [showCreateMemberPopup, setShowCreateMemberPopup] =
        useState<boolean>(false);

    const { chatClient } = useAppChat();

    const { currentTime } = useFormattedCurrentTime('dddd h:mm A', true);

    useEffect(() => {
        if (!hasAuthToken()) {
            navigate('/');
        }

        dispatch(getProfile({}));
    }, [navigate, dispatch]);

    return (
        <DashboardLayout>
            {chatClient && (
                <StreamChatComponent client={chatClient}>
                    <PageContent>
                        <PageHeader>
                            <Text
                                color={Colors.extra.darkLiver}
                                fontSize={Size.X2Large}
                                fontWeight="700"
                                lineHeight="36px"
                            >
                                Chat
                            </Text>
                            <TimeContainer>
                                <img alt="calendar" src={CalendarIcon} />
                                <TimeLabel>{currentTime}</TimeLabel>
                            </TimeContainer>
                        </PageHeader>
                        <ChatContainer height={height}>
                            <ChatList
                                createGroupClick={() =>
                                    setShowCreateGroupPopup(true)
                                }
                                createMemberClick={() =>
                                    setShowCreateMemberPopup(true)
                                }
                            />
                            <ChatMessageContainer
                                initialChannelId={channelId}
                            />
                        </ChatContainer>
                    </PageContent>

                    {showCreateGroupPopup && (
                        <CreateGroup
                            client={chatClient}
                            onClose={() => setShowCreateGroupPopup(false)}
                        />
                    )}
                    {showCreateMemberPopup && (
                        <CreateOneOnOne
                            client={chatClient}
                            onClose={() => setShowCreateMemberPopup(false)}
                        />
                    )}
                </StreamChatComponent>
            )}
        </DashboardLayout>
    );
};

export default Chat;
