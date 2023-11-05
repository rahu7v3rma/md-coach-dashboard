import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

import { UserSelectors, refreshProfileSession } from '../reducers/user';
import { hasAuthToken } from '../services/auth';

import { useAppDispatch } from './';

const useInitChatClient = () => {
    const dispatch = useAppDispatch();

    const { chatProfile } = UserSelectors();

    const [chatClient, setChatClient] = useState<StreamChat | null>(null);
    const [awaitingConnection, setAwaitingConnection] =
        useState<boolean>(false);

    useEffect(() => {
        const setupClient = async (apiKey: string, userId: string) => {
            const user = {
                id: userId
            };

            try {
                const client = StreamChat.getInstance(apiKey);

                await client.connectUser(user, () => {
                    return dispatch(refreshProfileSession({}))
                        .unwrap()
                        .then((updatedChatProfile) => updatedChatProfile.token);
                });

                return client;
            } catch (error: any) {
                console.log(
                    `An error occurred while connecting the user: ${error?.message}`
                );

                return undefined;
            }
        };

        // if the chat client has a value in the field userID, a user is
        // already connected and we can skip trying to connect the user again.
        // awaitingConnection is used as a lock here so that only one call to
        // setupClient is made at a time
        if (chatProfile && !chatClient?.userID && !awaitingConnection) {
            setAwaitingConnection(true);
            setupClient(chatProfile.apiKey, chatProfile.userId).then(
                (client) => {
                    if (client) {
                        setChatClient(client);
                    }
                }
            );
        } else if (!chatProfile && hasAuthToken()) {
            dispatch(refreshProfileSession({}));
        }
    }, [chatClient, awaitingConnection, chatProfile, dispatch]);

    return {
        chatClient
    };
};

export default useInitChatClient;
