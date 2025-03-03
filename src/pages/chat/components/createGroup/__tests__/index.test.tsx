import { act, create } from 'react-test-renderer';

import CreateGroup from '..';
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
    channel: jest
        .fn()
        .mockImplementation(() => ({ create: () => Promise.resolve({}) }))
}));

jest.mock('src/contexts/appChat', () => ({
    useAppChat: () => {
        return {
            chatClient: mockChatClient(),
            setActiveChatChannel: jest.fn()
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

    it('CreateGroup renders the CreateGroup component with the initial title and button title', () => {
        if (chatClient) {
            const tree = create(<CreateGroup client={chatClient} />);

            const title = tree.root.findByProps({
                id: 'title'
            }).props;
            const buttonTitle = tree?.root.findByProps({
                id: 'buttonTitle'
            }).props;

            expect(title.children).toBe('Create a new group');
            expect(buttonTitle.children).toBe('Next');
        }
    });

    it('CreatGroup triggers handleClose function correctly when the close icon or the Cancel button is clicked', () => {
        if (chatClient) {
            const handleClose = jest.fn();
            const tree = create(
                <CreateGroup client={chatClient} onClose={handleClose} />
            );

            const closeIcon = tree.root.findByProps({
                id: 'closeIcon'
            }).props;
            const cancelButton = tree.root.findByProps({
                id: 'cancelButton'
            }).props;

            act(() => {
                closeIcon.onClick();
                cancelButton.onClick();
            });

            expect(handleClose).toHaveBeenCalledTimes(2);
        }
    });

    it('CreateGroup updates the title and buttonTitle correctly when the handleNext function is called ', async () => {
        if (chatClient) {
            let tree: any;

            await act(async () => {
                tree = create(<CreateGroup client={chatClient} />);
            });
            const groupName = tree.root.findByProps({
                id: 'groupName'
            }).props;
            await act(async () =>
                groupName.onChange({ target: { value: 'test' } })
            );

            const nextButton = tree.root.findByProps({
                id: 'buttonTitle'
            });

            await act(async () => nextButton.props.onClick());

            const title = tree.root.findByProps({
                id: 'title'
            }).props;

            expect(title.children).toBe('Add group members');
            expect(nextButton.props.children).toBe('Create Group');
        }
    });

    it('CreatGroup updates the selectedMemberIds correctly when the handleCheckedMembersChange function is called ', async () => {
        if (chatClient) {
            let tree: any;
            await act(async () => {
                tree = await create(<CreateGroup client={chatClient} />);
            });

            const groupName = tree.root.findByProps({
                id: 'groupName'
            }).props;
            await act(async () =>
                groupName.onChange({ target: { value: 'test' } })
            );

            const nextButton = tree.root.findByProps({
                id: 'buttonTitle'
            });

            await act(async () => nextButton.props.onClick());

            const checkBox = tree.root.findByProps({
                id: 'checkbox-0'
            }).props;

            await act(async () =>
                checkBox.onChange({
                    target: { checked: true }
                })
            );

            expect(nextButton.props.disabled).toBe(false);
        }
    });

    it('CreateGroup creates a new group and sets the active channel correctly when the handleAddGroupMember function is called ', async () => {
        if (chatClient) {
            const setActiveChannel = jest.fn();

            jest.spyOn(
                require('stream-chat-react'),
                'useChatContext'
            ).mockImplementation(() => ({
                setActiveChannel: setActiveChannel
            }));

            let tree: any;
            await act(async () => {
                tree = await create(<CreateGroup client={chatClient} />);
            });

            const groupName = tree.root.findByProps({
                id: 'groupName'
            }).props;

            await act(async () =>
                groupName.onChange({ target: { value: 'test' } })
            );
            const nextButton = tree.root.findByProps({
                id: 'buttonTitle'
            });
            await act(async () => nextButton.props.onClick());

            const checkBox = tree.root.findByProps({
                id: 'checkbox-0'
            }).props;

            await act(async () =>
                checkBox.onChange({
                    target: { checked: true }
                })
            );
            await act(async () => nextButton.props.onClick());

            expect(setActiveChannel).toHaveBeenCalled();
        }
    });
});
