import {
    RenderResult,
    act,
    cleanup,
    fireEvent,
    render,
    waitFor
} from '@testing-library/react';
import * as StreamChatReact from 'stream-chat-react';

import EditGroupMembers from 'src/pages/chat/components/editGroupMembers';
import { chatUserList, currentMembers } from 'src/utils/mockData';

const client = {
    queryUsers: jest.fn().mockImplementation(() => {
        return Promise.resolve({ users: chatUserList });
    })
};

let tree: RenderResult;
const mockOnClose = jest.fn();
const mockOnAddMembers = jest.fn();

describe('EditGroupMembers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(StreamChatReact, 'useChatContext').mockImplementation(
            () => ({ client } as any as StreamChatReact.ChatContextValue)
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('render properly', async () => {
        tree = render(<EditGroupMembers currentMembers={currentMembers} />);

        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );

        chatUserList.forEach((user, idx) => {
            user.name &&
                expect(
                    tree.container.querySelector(`#memberName-${idx}`)
                        ?.innerHTML
                ).toEqual(user.name);
        });
    });

    it('GroupMembers snapshot', async () => {
        tree = render(<EditGroupMembers currentMembers={currentMembers} />);

        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );

        expect(tree).toMatchSnapshot();
    });

    it('renders the EditGroupMembers component with the correct title', async () => {
        tree = render(<EditGroupMembers currentMembers={currentMembers} />);
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        expect(tree.container.querySelector('h1')?.innerHTML).toEqual(
            'Add members'
        );
    });

    it('renders the EditGroupMembers component with close button', async () => {
        tree = render(<EditGroupMembers currentMembers={currentMembers} />);
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        expect((tree.getByAltText('close') as HTMLImageElement).src).toContain(
            'assets/icons/Close.png'
        );
    });

    it('renders the EditGroupMembers component with cancel button', async () => {
        tree = render(<EditGroupMembers currentMembers={currentMembers} />);
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        expect(
            tree.container.getElementsByClassName('cancel')[0]
        ).toBeInTheDocument();
    });

    it('renders the EditGroupMembers component with add members button', async () => {
        tree = render(<EditGroupMembers currentMembers={currentMembers} />);
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        expect(
            tree.container.getElementsByClassName('next')[0]
        ).toBeInTheDocument();
    });

    it('triggers onClose callback correctly when the CloseIcon or the Cancel button is clicked', async () => {
        tree = render(
            <EditGroupMembers
                currentMembers={currentMembers}
                onClose={mockOnClose}
            />
        );
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        await act(() => fireEvent.click(tree.getByAltText('close')));
        expect(mockOnClose).toBeCalledTimes(1);
        await act(() =>
            fireEvent.click(tree.container.getElementsByClassName('cancel')[0])
        );
        expect(mockOnClose).toBeCalledTimes(2);
    });

    it('triggers onAddMembers callback correctly when the Add Members button is clicked', async () => {
        tree = render(
            <EditGroupMembers
                currentMembers={currentMembers}
                onAddMembers={mockOnAddMembers}
                onClose={mockOnClose}
            />
        );
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        await act(() =>
            fireEvent.click(tree.container.getElementsByClassName('next')[0])
        );
        expect(mockOnAddMembers).toBeCalled();
    });

    it('passes necessary props to AddGroupMembers component and handles checked members correctly', async () => {
        const randomElements: string[] = [];
        [...Array(6).keys()].forEach(() => {
            let newElement = Math.floor(Math.random() * 30);
            if (
                !randomElements.includes(
                    `${chatUserList[newElement].id}#${newElement}`
                )
            ) {
                randomElements.push(
                    `${chatUserList[newElement].id}#${newElement}`
                );
            }
        });

        tree = render(
            <EditGroupMembers
                currentMembers={currentMembers}
                onAddMembers={mockOnAddMembers}
                onClose={mockOnClose}
            />
        );
        await waitFor(() =>
            expect(
                tree.container.querySelector('#memberName-0')
            ).toBeInTheDocument()
        );
        randomElements.forEach(async (el) => {
            await act(() =>
                fireEvent.click(
                    tree.container.querySelector(
                        `#checkbox-${el.split('#')[1]}`
                    ) as Element
                )
            );
        });
        await act(() =>
            fireEvent.click(tree.container.getElementsByClassName('next')[0])
        );
        expect(mockOnAddMembers).toBeCalledWith(
            randomElements.map((el) => el.split('#')[0])
        );
    });
});
