import {
    RenderResult,
    act,
    cleanup,
    fireEvent,
    render,
    waitFor
} from '@testing-library/react';
import userEvt from '@testing-library/user-event';
import { StreamChat, User } from 'stream-chat';
import { Channel, Chat, MessageInput, Thread, Window } from 'stream-chat-react';

import CustomInput from '../../messageInput';

const someValues = [{ name: 'teresa teng' }];
const mockUploadNewFiles = jest.fn();
const mockHandleSubmit = jest.fn();

jest.setTimeout(20000);
let tree: RenderResult;

const StreamChatReal = require('stream-chat-react');

const userId = 'weathered-fire-2';
const userName = 'weathered';

const user: User = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`
};

const apiKey = 'dz5f4d5kzrue';
const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoid2VhdGhlcmVkLWZpcmUtMiIsImV4cCI6MTY5NzMxNjYyMH0.VOblsnzaKCGpqz4vPtNzQRJCLY0-SLu_HtWIBdPFTIw';

const chatClient = new StreamChat(apiKey);
chatClient.connectUser(user, userToken);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
    // add as many custom fields as you'd like
    image: 'https://www.drupal.org/files/project-images/react.png',
    name: 'Talk about React',
    members: [userId]
});

const ChatTest = () => (
    <Chat client={chatClient}>
        <Channel channel={channel} Input={CustomInput}>
            <Window>
                <MessageInput />
            </Window>
            <Thread />
        </Channel>
    </Chat>
);

beforeEach(async () => {
    tree = await act(() => render(<ChatTest />));
});

afterEach(cleanup);

describe('test message input', () => {
    test('match Snapshot', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        expect(tree).toMatchSnapshot();
    });

    test('renders the file upload button with an attach icon', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        expect(tree.getByAltText('Attach')).toBeInTheDocument();
    });

    test('renders the uploads preview component', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByLabelText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        const str = JSON.stringify(someValues);
        const blob = new Blob([str]);
        const file = new File([blob], 'values.json', {
            type: 'application/JSON'
        });
        File.prototype.text = jest.fn().mockResolvedValueOnce(str);
        const input = tree.getByLabelText('File input');
        await act(() => userEvt.upload(input, file));
        expect(
            tree.container.querySelector('.rfu-file-previewer')
        ).toBeInTheDocument();
    });

    test('enables multiple uploads', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByLabelText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        const str = JSON.stringify(someValues);
        const blob = new Blob([str]);
        const file = new File([blob], 'values.json', {
            type: 'application/JSON'
        });
        File.prototype.text = jest.fn().mockResolvedValueOnce(str);
        const input = tree.getByLabelText('File input');
        await act(() => userEvt.upload(input, file));
        await act(() => userEvt.upload(input, file));
        expect(
            tree.container.querySelectorAll('.rfu-file-previewer__file').length
        ).toEqual(2);
    });

    test('calls the uploadNewFiles function when a file is selected', async () => {
        jest.spyOn(StreamChatReal, 'useMessageInputContext').mockImplementation(
            () => ({
                uploadNewFiles: mockUploadNewFiles,
                maxFilesLeft: 10,
                handleSubmit: mockHandleSubmit
            })
        );
        tree = await act(() => render(<ChatTest />));
        await waitFor(
            () =>
                expect(
                    tree.getAllByPlaceholderText('Enter your message')[1]
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        const str = JSON.stringify(someValues);
        const blob = new Blob([str]);
        const file = new File([blob], 'values.json', {
            type: 'application/JSON'
        });
        File.prototype.text = jest.fn().mockResolvedValueOnce(str);
        const input = tree.getAllByLabelText('File input')[1];
        await act(() => userEvt.upload(input, file));
        expect(mockUploadNewFiles).toBeCalled();
    });

    test('disables the file upload button when maxFilesLeft is zero', async () => {
        jest.spyOn(StreamChatReal, 'useMessageInputContext').mockImplementation(
            () => ({
                uploadNewFiles: mockUploadNewFiles,
                maxFilesLeft: 0,
                handleSubmit: mockHandleSubmit
            })
        );
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        tree = await act(() => render(<ChatTest />));

        const inputs = tree.getAllByLabelText('File input');
        expect((inputs[1] as HTMLInputElement).disabled).toBeTruthy();
    });

    test('renders the message input with a placeholder', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
    });

    test('renders the send icon', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        const div = tree.container.querySelector('.str-chat__textarea');
        expect(
            div?.nextElementSibling?.children[0].hasAttribute('src')
        ).toBeTruthy();
    });

    test('calls the handleSubmit function when the send icon is clicked', async () => {
        jest.spyOn(StreamChatReal, 'useMessageInputContext').mockImplementation(
            () => ({
                uploadNewFiles: mockUploadNewFiles,
                maxFilesLeft: 10,
                handleSubmit: mockHandleSubmit
            })
        );
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        const div = tree.container.querySelector('.str-chat__textarea');
        div?.nextElementSibling?.children[0] &&
            fireEvent.click(div?.nextElementSibling?.children[0]);
        expect(mockHandleSubmit).toBeCalled();
    });

    test('renders the send icon', async () => {
        await waitFor(
            () =>
                expect(
                    tree.getByPlaceholderText('Enter your message')
                ).toBeInTheDocument(),
            { timeout: 5000 }
        );
        const div = tree.container.querySelector('.str-chat__textarea');
        expect(
            div?.nextElementSibling?.children[0].hasAttribute('src')
        ).toBeTruthy();
    });
});
