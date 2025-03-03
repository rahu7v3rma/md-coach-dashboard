import {
    RenderResult,
    fireEvent,
    render,
    screen
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ClientInfo from '..';
import { useAppChat } from 'src/contexts/appChat';

jest.mock('src/navigation');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(() => mockNavigate)
}));

const mockChannelId = 'mockChannelId';
jest.mock('src/contexts/appChat', () => ({
    useAppChat: jest.fn()
}));
(useAppChat as jest.Mock).mockImplementation(() => ({
    chatClient: {
        userID: 1,
        queryChannels: jest.fn(() => Promise.resolve([{ cid: mockChannelId }]))
    }
}));

const props = {
    profileImg: 'profileImg',
    age: 'age',
    type: 'type'
};
global.URL.createObjectURL = jest.fn(() => props.profileImg);

const setup = async () => {
    let view!: RenderResult;
    await act(() => (view = render(<ClientInfo {...props} />)));
    const profileImage = view.container.querySelector(
        `img[src="${props.profileImg}"]`
    );
    await act(() => fireEvent.load(profileImage as HTMLElement));
    return view;
};

test('snapshot', async () => {
    const view = await setup();
    expect(view.asFragment()).toMatchSnapshot();
});

test('renders ClientInfo component with all props', async () => {
    const view = await setup();
    expect(view).toBeTruthy();
});

test('handleChatClick is not called when chatClient is null', async () => {
    (useAppChat as jest.Mock).mockImplementationOnce(() => ({
        chatClient: null
    }));
    const view = await setup();
    const chatButton = view.container.querySelector('button');
    await act(() => fireEvent.click(chatButton as HTMLElement));
    expect(mockNavigate).not.toBeCalled();
});

test('clicking the "Chat" button calls handleChatClick', async () => {
    const view = await setup();
    const chatButton = view.container.querySelector('button');
    await act(() => fireEvent.click(chatButton as HTMLElement));
    expect(mockNavigate).toBeCalledWith('/chat', {
        state: { channelId: mockChannelId }
    });
});

test('profile image is displayed when profileImg is provided', async () => {
    const view = await setup();
    const profileImage = view.container.querySelector(
        `img[src="${props.profileImg}"]`
    );
    expect(profileImage).toBeVisible();
});

test('profile image is not displayed when profileImg is null', async () => {
    let view!: RenderResult;
    await act(
        () => (view = render(<ClientInfo {...props} profileImg={null} />))
    );
    const profileImage = view.container.querySelector(
        `img[src="${props.profileImg}"]`
    );
    expect(profileImage).not.toBeInTheDocument();
    const defaultAvatar = screen.queryByAltText('avatar');
    expect(defaultAvatar).toBeInTheDocument();
});
