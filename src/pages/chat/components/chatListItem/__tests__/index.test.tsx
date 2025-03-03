import {
    RenderResult,
    fireEvent,
    render,
    screen
} from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { ReactTestRenderer, create } from 'react-test-renderer';
import { Channel } from 'stream-chat';
import { StreamMessage } from 'stream-chat-react';

import ChatListItem from '..';
import Avatar from 'src/shared/avatar';

const channelPreviewInfo = {
    displayImage: 'displayImage',
    displayTitle: 'displayTitle',
    isOnline: true
};

jest.mock('src/pages/chat/hooks', () => ({
    useChannelPreviewInfo: () => channelPreviewInfo
}));

jest.mock('src/navigation');

const avatarImageSource = 'avatarImageSource';
global.URL.createObjectURL = () => avatarImageSource;

const props = {
    channel: 'channel',
    lastMessage: {
        text: 'channel',
        created_at: Date.now() - 1000 * 60
    },
    latestMessage: 'latestMessage',
    setActiveChannel: jest.fn(),
    unread: 10
};

let view!: RenderResult;
beforeEach(async () => {
    await act(
        () =>
            (view = render(
                <ChatListItem
                    channel={props.channel as unknown as Channel}
                    lastMessage={props.lastMessage as unknown as StreamMessage}
                    setActiveChannel={props.setActiveChannel}
                    unread={props.unread}
                />
            ))
    );
    const avatar = view.container.querySelector(
        `img[src="${avatarImageSource}"]`
    );
    await act(() => fireEvent.load(avatar as HTMLElement));
});

test('render component correctly with no errors', async () => {
    expect(view.container).not.toBeEmptyDOMElement();
});

test('renders displayTitle and messageTimeString correctly in ChatListItem component', async () => {
    expect(screen.queryByText(channelPreviewInfo.displayTitle)).toBeVisible();
    expect(
        screen.queryByText(moment(props.lastMessage.created_at).fromNow())
    ).toBeVisible();
});

test('triggers onClick function correctly when the component is clicked', async () => {
    const wrapper = view.container.firstElementChild;
    act(() => fireEvent.click(wrapper as HTMLElement));
    expect(props.setActiveChannel).toBeCalledWith(props.channel);
});

test('renders ChannelAvatar component with the correct props in ChatListItem', async () => {
    view.unmount();
    let tree!: ReactTestRenderer;
    await act(
        () =>
            (tree = create(
                <ChatListItem channel={props.channel as unknown as Channel} />
            ))
    );
    const avatar = tree.root.findByType(Avatar);
    expect(avatar.props.path).toBe(channelPreviewInfo.displayImage);
    expect(avatar.props.online).toBe(channelPreviewInfo.isOnline);
});

test('displays correct text in LastMessage component based on lastMessage and latestMessage in ChatListItem', async () => {
    expect(screen.queryByText(props.lastMessage.text)).toBeVisible();
    view.unmount();
    await act(
        () =>
            (view = render(
                <ChatListItem
                    channel={props.channel as unknown as Channel}
                    latestMessage={props.latestMessage}
                />
            ))
    );
    const avatar = view.container.querySelector(
        `img[src="${avatarImageSource}"]`
    );
    await act(() => fireEvent.load(avatar as HTMLElement));
    expect(screen.queryByText(props.latestMessage)).toBeVisible();
});

test('displays unread count correctly in ChatListItem component', async () => {
    expect(screen.queryByText(String(props.unread))).toBeVisible();
});
