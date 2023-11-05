import { ReactNode } from 'react';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
import {
    Attachment,
    MessageOptions,
    MessageTimestamp,
    ReactionSelector
} from 'stream-chat-react';

import 'jest-styled-components';
import Message from '..';
import {
    MessageAvatar,
    MessageContent,
    MessageReaction,
    MessageSender,
    Row,
    TotalMessageReaction,
    UserName
} from '../styles';
import ReadIcon from 'src/assets/read-icon.svg';
import { Modal } from 'src/shared';

const mockClient = {
    user: {
        id: 1
    }
};

const mockMessage = {
    id: 1,
    user: {
        name: 'name',
        image: 'image',
        online: true
    },
    type: 'regular',
    status: 'received',
    own_reactions: [{ type: 'like' }],
    latest_reactions: [
        { type: 'like', user: { image: 'image1', name: 'name1' } },
        { type: 'like', user: { image: 'image2', name: 'name2' } }
    ],
    text: 'text',
    reaction_counts: {
        like: 1
    },
    attachments: jest.fn()
};

const mockReadBy = [{ id: 1 }, { id: 2 }];

const mockDeleteReaction = jest.fn();

jest.mock('stream-chat-react', () => ({
    Attachment: jest.fn(),
    MessageOptions: jest.fn(),
    MessageTimestamp: jest.fn(),
    ReactionSelector: ({ children }: { children: ReactNode }) => (
        <>{children}</>
    ),
    useActionHandler: jest.fn(),
    useChatContext: () => ({
        client: mockClient,
        channel: {
            sendReaction: jest.fn(),
            deleteReaction: mockDeleteReaction
        }
    }),
    useMessageContext: () => ({
        message: mockMessage,
        isReactionEnabled: jest.fn(),
        reactionSelectorRef: jest.fn(),
        readBy: mockReadBy,
        showDetailedReactions: jest.fn()
    }),
    useUserRole: () => ({
        isMyMessage: jest.fn()
    })
}));

global.URL.createObjectURL = () => mockMessage.user.image;

process.env.REACT_APP_BACKEND_URL = 'process.env.REACT_APP_BACKEND_URL';

jest.mock('src/services/auth', () => ({
    AUTHORIZATION_HEADER_NAME: 'AUTHORIZATION_HEADER_NAME',
    getAuthorizationHeaderValue: () => 'getAuthorizationHeaderValue'
}));

jest.mock('src/shared', () => ({
    Modal: ({ children }: { children: ReactNode }) => <>{children}</>
}));

jest.mock('../styles');

global.console.error = () => {};

let tree!: ReactTestRenderer;
beforeEach(async () => {
    await act(() => {
        tree = create(<Message />);
    });
});

test('renders the message properly', async () => {
    expect(tree.root.findByType(MessageOptions)).toBeTruthy();
    expect(tree.root.findByType(ReactionSelector)).toBeTruthy();
    expect(tree.root.findByType(MessageTimestamp)).toBeTruthy();
});

test('displays the user avatar properly', async () => {
    const avatar = tree.root.findByProps({ path: mockMessage.user.image });
    expect(avatar.props.online).toBe(mockMessage.user.online);
});

test('displays the message content properly', async () => {
    expect(tree.root.findByType(MessageSender).props.children).toBe(
        mockMessage.user.name
    );
    expect(tree.root.findByType(MessageContent).props.children).toBe(
        mockMessage.text
    );
    expect(
        tree.root.findByType(TotalMessageReaction).props.children.join('')
    ).toBe(`${mockMessage.reaction_counts.like} 👍`);
    expect(tree.root.findByType(Attachment).props.attachments).toBe(
        mockMessage.attachments
    );
    const didLike = mockMessage.own_reactions.filter(
        (reaction) => reaction.type === 'like'
    );
    expect(tree.root.findByType(MessageReaction).props.isLiked).toBe(
        Boolean(didLike.length)
    );
});

test('handles like reaction properly', async () => {
    const messageReactionButton = tree.root.findByType(MessageReaction);
    await act(() => messageReactionButton.props.onClick());
    expect(mockDeleteReaction).toBeCalledWith(mockMessage.id, 'like');
});

test('displays like reactions users list properly', async () => {
    const totalReactionsButton = tree.root.findByType(TotalMessageReaction);
    await act(() => totalReactionsButton.props.onClick());
    const likeReactionsUsersList = mockMessage.latest_reactions
        .filter((item) => item.type === 'like')
        .map((reaction: any) => ({
            image: reaction?.user?.image,
            name: reaction?.user?.name
        }));
    const likeReactionsUsersListRows = tree.root.findAllByType(Row);
    expect(likeReactionsUsersListRows).toHaveLength(
        likeReactionsUsersList.length
    );
    likeReactionsUsersListRows.forEach((row, index) => {
        expect(row.findByType(MessageAvatar).props.path).toBe(
            likeReactionsUsersList[index].image
        );
        expect(row.findByType(UserName).props.children).toBe(
            likeReactionsUsersList[index].name
        );
    });
});

test('handles modal open/close properly', async () => {
    const totalReactionsButton = tree.root.findByType(TotalMessageReaction);
    await act(() => totalReactionsButton.props.onClick());
    const modal = tree.root.findByType(Modal);
    expect(modal.props.open).toBe(true);
    await act(() => modal.props.onClose());
    expect(modal.props.open).toBe(false);
});

test('handles read status icon display properly', async () => {
    expect(tree.root.findByProps({ alt: 'read-icon' }).props.src).toBe(
        ReadIcon
    );
});
