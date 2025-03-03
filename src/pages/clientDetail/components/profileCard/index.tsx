import moment from 'moment';
import React, { FunctionComponent, useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';

import ClientContact from '../clientContact';
import ClientInfo from '../clientInfo';
import LessonCard from '../lessonCard';
import ChatIcon from 'src/assets/chat-icon-white.svg';
import { Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import {
    ChatButton,
    ChatButtonWrapper,
    Client,
    ClientInfoWrapper,
    ContactInformation,
    Icon,
    NextLesson
} from './styles';

type Props = {
    navigate: NavigateFunction;
    chatClient: any;
    userInfo: any;
};

const ProfileCard: FunctionComponent<Props> = ({
    navigate,
    chatClient,
    userInfo
}: Props) => {
    const { next_lesson: nextLesson = {} } = userInfo || {};

    const handleChatClick = useCallback(() => {
        if (chatClient?.userID) {
            chatClient
                .queryChannels({
                    members: { $eq: [chatClient.userID, userInfo?.chatId] }
                })
                .then((channels: any) => {
                    if (channels.length > 0) {
                        navigate('/chat', {
                            state: { channelId: channels[0].cid }
                        });
                    }
                });
        }
    }, [chatClient, navigate, userInfo?.chatId]);
    return (
        <Client>
            <ClientInfoWrapper>
                <ClientInfo
                    profileImg={userInfo?.image}
                    age={`
                            Age: 
                            ${
                                userInfo?.date_of_birth
                                    ? moment()
                                          .diff(
                                              moment(userInfo.date_of_birth),
                                              'years'
                                          )
                                          .toString()
                                    : 'NA'
                            }
                        `}
                    type={userInfo?.diabetes_type || 'NA'}
                />
            </ClientInfoWrapper>
            <ContactInformation>
                <Text
                    fontSize={Size.X3Small}
                    fontWeight="500"
                    lineHeight="18px"
                    color={Colors.theme.gray}
                >
                    Contact Information:
                </Text>
                <ClientContact
                    phoneNumber={userInfo?.contact_number || 'NA'}
                    email={userInfo?.email || 'NA'}
                />
            </ContactInformation>
            <NextLesson>
                <Text
                    fontSize={Size.X3Small}
                    fontWeight="500"
                    lineHeight="18px"
                    color={Colors.theme.gray}
                >
                    Next Lesson:
                </Text>
                <LessonCard
                    lesson={`Lesson ${nextLesson?.order || 0}`}
                    title={nextLesson?.lesson?.title}
                />
            </NextLesson>
            <ChatButtonWrapper>
                <ChatButton onClick={handleChatClick}>
                    <Icon src={ChatIcon} />
                    <Text
                        fontSize={Size.X2Small}
                        fontWeight="500"
                        lineHeight="20px"
                        color={Colors.theme.primaryLightest}
                    >
                        Chat
                    </Text>
                </ChatButton>
            </ChatButtonWrapper>
        </Client>
    );
};

export default ProfileCard;
