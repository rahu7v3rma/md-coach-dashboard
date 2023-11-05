import { FunctionComponent, useMemo, useState } from 'react';
import { ChannelFilters } from 'stream-chat';
import {
    ChannelList,
    ChannelPreviewUIComponentProps,
    useChatContext
} from 'stream-chat-react';

import ChatListItem from '../chatListItem';
import SearchBar from '../searchBar';

import { ListContainer, Wrapper } from './styles';

type Props = {
    createGroupClick?: () => void;
    createMemberClick?: () => void;
};

const ChatList: FunctionComponent<Props> = ({}: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { client } = useChatContext();

    const channelFilters = useMemo(() => {
        const filters: ChannelFilters = {
            type: 'messaging',
            members: { $in: [client.userID!] }
        };

        if (searchTerm) {
            filters['$or'] = [
                { name: { $autocomplete: searchTerm } },
                { 'member.user.name': { $autocomplete: searchTerm } }
            ];
        }

        return filters;
    }, [client, searchTerm]);

    return (
        <Wrapper>
            <SearchBar onSearch={setSearchTerm} />

            <ListContainer>
                <ChannelList
                    filters={channelFilters}
                    sort={{ last_message_at: -1 }}
                    options={{ state: true, presence: true, limit: 10 }}
                    Preview={({
                        active,
                        channel,
                        setActiveChannel,
                        lastMessage,
                        latestMessage,
                        unread
                    }: ChannelPreviewUIComponentProps) => (
                        <ChatListItem
                            key={`channel-${channel.id}`}
                            channel={channel}
                            active={active}
                            setActiveChannel={setActiveChannel}
                            lastMessage={lastMessage}
                            latestMessage={latestMessage}
                            unread={unread}
                        />
                    )}
                    setActiveChannelOnMount={false}
                />
            </ListContainer>
        </Wrapper>
    );
};

export default ChatList;
