import { act, create } from 'react-test-renderer';

import CreateOneOnOne from '../index';
import { useAppChat } from 'src/contexts/appChat';
import { chatUserList } from 'src/utils/mockData';

export let mockUnwrap = jest.fn().mockImplementation(() => {
    return Promise.resolve({});
});

export const mockDispatch = jest.fn().mockImplementation(() => {
    return {
        unwrap: mockUnwrap
    };
});

export const mockChannelId = 'mockChannelId';
export const channelCreateMock = jest.fn().mockResolvedValue({});

export const mockChatClient = jest.fn().mockImplementation(() => ({
    userID: 'e455062a4ec9ccef9a3d651fb9b2c7b25f983dbcc9c90be976b0996bcbd3cc6c',
    chat_id: 1,
    queryChannels: jest.fn().mockImplementation(() => {
        return Promise.resolve([
            {
                cid: 99
            }
        ]);
    }),
    activeChannels: {
        mockChannelId
    },
    queryUsers: jest.fn().mockResolvedValue({ users: chatUserList }),
    channel: jest.fn().mockImplementation(() => ({ create: channelCreateMock }))
}));

jest.mock('src/contexts/appChat', () => ({
    useAppChat: () => {
        return {
            chatClient: mockChatClient()
        };
    }
}));

jest.mock('stream-chat-react', () => ({
    useChatContext: () => {
        return {
            setActiveChannel: jest.fn()
        };
    }
}));

describe('CreateGroup', () => {
    const { chatClient } = useAppChat();
    it('CreateOneOnOne renders the create one-on-one modal properly ', () => {
        if (chatClient) {
            const tree = create(<CreateOneOnOne client={chatClient} />);
            expect(tree).toBeTruthy();
        }
    });

    it('CreateOneOnOne displays the title properly', async () => {
        if (chatClient) {
            let tree: any;
            await act(async () => {
                tree = create(<CreateOneOnOne client={chatClient} />);
            });
            const title = tree.root.findByProps({
                id: 'title'
            }).props;
            expect(title.children).toBe('Select a member');
        }
    });

    it('CreateOneOnOne handles close button click properly', async () => {
        if (chatClient) {
            const onHandleClose = jest.fn();
            let tree: any;
            await act(async () => {
                tree = create(
                    <CreateOneOnOne
                        client={chatClient}
                        onClose={onHandleClose}
                    />
                );
            });
            const closeButton = tree.root.findByProps({
                id: 'closeButton'
            }).props;
            await act(() => {
                closeButton.onClick();
            });
            expect(onHandleClose).toHaveBeenCalled();
        }
    });

    it('CreateOneOnOne handles member click properly', async () => {
        if (chatClient) {
            let tree: any;
            await act(async () => {
                tree = create(<CreateOneOnOne client={chatClient} />);
            });
            const memberItem = tree.root.findByProps({
                id: 'memberItem-0'
            }).props;
            await act(async () => memberItem.onClick());
            expect(channelCreateMock).toHaveBeenCalled();
        }
    });
});
