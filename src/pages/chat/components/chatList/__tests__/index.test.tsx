import { cleanup, render, screen, act as tlAct } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
import { StreamChat, User } from 'stream-chat';
import { Chat as StreamChatComponent } from 'stream-chat-react';

import ChatList from '..';
import store from 'src/store';

const userId = 'weathered-fire-2';
const userName = 'weathered';
const searchText = 'some-search-text';
const user: User = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`
};

const apiKey = 'dz5f4d5kzrue';
const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoid2VhdGhlcmVkLWZpcmUtMiIsImV4cCI6MTY5NzMxNjYyMH0.VOblsnzaKCGpqz4vPtNzQRJCLY0-SLu_HtWIBdPFTIw';

const mockChatClient = new StreamChat(apiKey);
mockChatClient.connectUser(user, userToken);
const mockChannels = [
    {
        cid: 'channel1',
        data: { name: 'Channel 1' }
    },
    {
        cid: 'channel2',
        data: { name: 'Channel 2' }
    }
];

const channelPreviewInfo = {
    displayImage: 'displayImage',
    displayTitle: 'displayTitle',
    isOnline: true
};
const mockChannelPreviewProps = mockChannels.map((ch) => ({
    active: false,
    channel: ch,
    setActiveChannel: jest.fn(),
    lastMessage: 'Last message text',
    latestMessage: 'Latest message text',
    unread: 2
}));
const mockNavigate = jest.fn();
jest.mock('src/shared', () => ({
    Text: ({ children }: { children: ReactNode }) => <>{children}</>,
    Button: ({ children }: { children: ReactNode }) => <>{children}</>,
    PlatformImage: ({ children }: { children: ReactNode }) => <>{children}</>,
    Avatar: ({ children }: { children: ReactNode }) => <>{children}</>
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(() => mockNavigate)
}));
jest.mock('src/hooks', () => ({
    useInitChatClient: jest.fn().mockImplementation(() => ({
        chatClient: mockChatClient
    }))
}));

jest.mock('src/contexts/appChat', () => ({
    useAppChat: () => {
        return {
            chatClient: mockChatClient,
            setActiveChatChannel: jest.fn()
        };
    }
}));

jest.mock('src/pages/chat/hooks', () => ({
    useChannelPreviewInfo: () => channelPreviewInfo
}));

jest.mock('stream-chat-react', () => ({
    ...jest.requireActual('stream-chat-react'),
    useChatContext: () => ({
        client: mockChatClient,
        setActiveChannel: jest.fn()
    }),
    usePaginatedChannels: () =>
        Promise.resolve({
            channels: mockChannels,
            hasNextPage: false,
            loadNextPage: jest.fn(),
            setChannels: jest.fn()
        }),

    ChannelList: jest.fn(({ Preview }) => {
        return mockChannelPreviewProps.map((channelPreview) => (
            <Preview {...channelPreview} />
        ));
    })
}));
const ChatTest = () => (
    <Provider store={store}>
        <StreamChatComponent client={mockChatClient}>
            <ChatList
                createGroupClick={() => jest.fn()}
                createMemberClick={() => jest.fn()}
            />
        </StreamChatComponent>
    </Provider>
);
describe('<ChatList />', () => {
    let tree: ReactTestRenderer;
    beforeEach(async () => {
        tree = create(<ChatTest />);
    });
    it('Should render component correctly with no errors', async () => {
        expect(tree).toBeTruthy();
    });

    it('Should render ChatList component with SearchBar', async () => {
        const searchBar = tree.root.findByProps({ placeholder: 'Search' });
        expect(searchBar).toBeTruthy();
    });

    it('Should compute channelFilters correctly based on searchTerm and client data', async () => {
        let searchBar = tree.root.findByProps({ placeholder: 'Search' });
        await act(() =>
            searchBar.props.onChange({ target: { value: searchText } })
        );
        searchBar = tree.root.findByProps({ placeholder: 'Search' });
        const channelFilters = tree.root.findByProps({
            setActiveChannelOnMount: false
        }).props.filters;
        expect(channelFilters.type).toBe('messaging');
        expect(channelFilters.members.$in.length).toBe(1);
        expect(channelFilters.members.$in[0]).toBe(userId);
        expect(channelFilters.$or.length).toBe(2);
        expect(channelFilters.$or[0].name.$autocomplete).toBe(searchText);
        expect(channelFilters.$or[1]['member.user.name'].$autocomplete).toBe(
            searchText
        );
    });

    it('Should render ChannelList component with correct filters and options', () => {
        const channelList = tree.root.findByProps({
            setActiveChannelOnMount: false
        });
        expect(channelList).toBeTruthy();
        expect(channelList.props.filters.type).toBe('messaging');
        expect(channelList.props.filters.members.$in.length).toBe(1);
        expect(channelList.props.filters.members.$in[0]).toBe(userId);
        expect(channelList.props.options.state).toBe(true);
        expect(channelList.props.options.presence).toBe(true);
        expect(channelList.props.options.limit).toBe(10);
    });

    it('Should render ChatListItem component with the correct props', async () => {
        render(<ChatTest />);
        await tlAct(async () => {
            const channelsByTitle = await screen.findAllByText(
                channelPreviewInfo.displayTitle
            );
            const channelsByUnreadCount = await screen.findAllByText(2);
            expect(channelsByTitle.length).toBe(mockChannelPreviewProps.length);
            expect(channelsByUnreadCount.length).toBe(
                mockChannelPreviewProps.length
            );
        });
    });

    it('Should update searchTerm correctly when the SearchBar is used', async () => {
        let searchBar = tree.root.findByProps({ placeholder: 'Search' });
        expect(searchBar.props.value).toBe('');
        await act(() =>
            searchBar.props.onChange({ target: { value: searchText } })
        );
        searchBar = tree.root.findByProps({ placeholder: 'Search' });
        expect(searchBar.props.value).toBe(searchText);
    });

    afterAll(() => {
        jest.clearAllMocks();
        cleanup();
    });
});
