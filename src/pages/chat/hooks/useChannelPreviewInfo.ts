import { useEffect, useState } from 'react';
import type { Channel } from 'stream-chat';
import { useChatContext } from 'stream-chat-react';

import {
    getChannelDisplayImage,
    getChannelDisplayTitle,
    getChannelIsOnline
} from '../../../services/chat';

type Props = {
    channel: Channel;
};

const useChannelPreviewInfo = ({ channel }: Props) => {
    const { client } = useChatContext('ChannelPreview');

    const [displayTitle, setDisplayTitle] = useState<string | undefined>(
        getChannelDisplayTitle(channel, client.user)
    );
    const [displayImage, setDisplayImage] = useState<string | undefined>(
        getChannelDisplayImage(channel, client.user)
    );
    const [isOnline, setIsOnline] = useState<boolean>(
        getChannelIsOnline(channel, client.user)
    );

    useEffect(() => {
        const handleEvent = () => {
            setDisplayTitle((currentDisplayTitle) => {
                const newDisplayTitle = getChannelDisplayTitle(
                    channel,
                    client.user
                );
                return currentDisplayTitle !== newDisplayTitle
                    ? newDisplayTitle
                    : currentDisplayTitle;
            });
            setDisplayImage((currentDisplayImage) => {
                const newDisplayImage = getChannelDisplayImage(
                    channel,
                    client.user
                );
                return currentDisplayImage !== newDisplayImage
                    ? newDisplayImage
                    : currentDisplayImage;
            });
            setIsOnline(getChannelIsOnline(channel, client.user));
        };

        client.on('channel.updated', handleEvent);

        return () => {
            client.off('channel.updated', handleEvent);
        };
    }, [client, channel]);

    return {
        displayImage: displayImage,
        displayTitle: displayTitle,
        isOnline: isOnline
    };
};

export default useChannelPreviewInfo;
