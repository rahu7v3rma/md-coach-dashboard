import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppChatProvider } from '../../contexts/appChat';
import { useInitChatClient } from '../../hooks';
import { notificationAction } from '../../services/notification';
import { NOTIFICATION_TYPE } from '../../utils/constants';

type Props = {
    children?: React.ReactNode;
};

const ChatManager: FunctionComponent<Props> = ({ children }: Props) => {
    const { chatClient } = useInitChatClient();

    const navigate = useNavigate();

    const [activeChatChannel, setActiveChatChannel] = useState<string | null>(
        null
    );

    const eventUnsubscribe = useRef<() => void>();

    useEffect(() => {
        if (chatClient) {
            const { unsubscribe } = chatClient.on((event) => {
                if (
                    // `notification.message_new` is sent when channels aren't
                    // watched, `message.new` is sent when channels are watched
                    // (aka when the chat page is open)
                    event.type === 'notification.message_new' ||
                    event.type === 'message.new'
                ) {
                    // don't show a notification if the site is currently
                    // displayed (aka the active tab and window) and the new
                    // message is in the current active channel
                    if (
                        document.visibilityState === 'hidden' ||
                        !activeChatChannel ||
                        activeChatChannel !== event.channel_id
                    ) {
                        const title =
                            event.channel?.name === undefined
                                ? `Message from ${event.message?.user?.name}`
                                : `Message in group ${event.channel?.name}`;
                        const truncatedContent =
                            event.message?.text &&
                            event.message?.text.length > 50
                                ? `${event.message.text.slice(0, 50)}...`
                                : event.message?.text;
                        const body =
                            event.channel?.name !== undefined
                                ? `${event.message?.user?.name}: ${truncatedContent}`
                                : truncatedContent;

                        // show notification
                        const notification = new Notification(title, { body });

                        notification.addEventListener('click', () => {
                            notificationAction(
                                NOTIFICATION_TYPE.STREAM_CHAT_MESSAGE,
                                event.cid ?? null
                            );
                        });
                    }
                }
            });

            eventUnsubscribe.current = unsubscribe;
        }

        return () => {
            eventUnsubscribe.current?.();
        };
    }, [chatClient, activeChatChannel, navigate]);

    return (
        <AppChatProvider value={{ chatClient, setActiveChatChannel }}>
            {children}
        </AppChatProvider>
    );
};

export default ChatManager;
