import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
import { StreamChat } from 'stream-chat';

import AddGroupMembers from 'src/pages/chat/components/addGroupMembers';
import store from 'src/store';
import { chatUserList } from 'src/utils/mockData';

const navigate = jest.fn();

const client = {
    queryUsers: jest.fn().mockResolvedValue({ users: chatUserList })
};
describe('AddGroupMembers', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('AddGroupMembers snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <AddGroupMembers client={client as any as StreamChat} />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('AddGroupMembers renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <AddGroupMembers client={client as any as StreamChat} />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('renders search input and members list', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const searchInput = tree?.root.findByProps({
            placeholder: 'Search'
        }).props;
        expect(searchInput).toBeTruthy();
        const memberItem = tree?.root.findAllByProps({
            id: 'memberItem-0'
        })[0].props;
        expect(memberItem).toBeTruthy();
    });

    it('filters members when typing in the search input', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberName = tree?.root.findByProps({
            id: 'memberName-0'
        }).props;
        expect(memberName?.children).not.toBe('Mor Customer #39');
        const searchInput = tree?.root.findByProps({
            placeholder: 'Search'
        }).props;
        await act(() =>
            searchInput?.onChange({ target: { value: 'Mor Customer #39' } })
        );
        const memberNameUpdated = tree?.root.findByProps({
            id: 'memberName-0'
        }).props;
        expect(memberNameUpdated?.children).toBe('Mor Customer #39');
    });

    it('handles member checkbox change', async () => {
        let tree: ReactTestRenderer | undefined;
        const onCheckedMembersChange = jest.fn();
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers
                            onCheckedMembersChange={onCheckedMembersChange}
                            client={client as any as StreamChat}
                        />
                    </BrowserRouter>
                </Provider>
            );
        });
        const checkbox = tree?.root.findByProps({
            id: 'checkbox-0'
        }).props;
        await act(() => checkbox?.onChange({ target: { checked: true } }));
        const ids = [];
        ids.push(chatUserList[0].id);
        expect(onCheckedMembersChange).toHaveBeenCalledWith(ids);
    });

    it('invokes onMemberClick callback when a member is clicked', async () => {
        let tree: ReactTestRenderer | undefined;
        const onMemberClick = jest.fn();
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers
                            onMemberClick={onMemberClick}
                            client={client as any as StreamChat}
                        />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberItem = tree?.root.findByProps({
            id: 'memberItem-0'
        }).props;
        await act(() => memberItem?.onClick());
        expect(onMemberClick).toHaveBeenCalledWith(chatUserList[0].id);
    });

    it('displays member name or ID if name is undefined', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberName = tree?.root.findByProps({
            id: 'memberName-0'
        }).props;
        expect(memberName?.children).toBe(chatUserList[0].name);
        const memberId = tree?.root.findByProps({
            id: 'memberName-1'
        }).props;
        expect(memberId?.children).toBe(chatUserList[1].id);
    });

    it('displays "Online" status for online members', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberStatus = tree?.root.findByProps({
            id: 'memberStatus-0'
        }).props;
        expect(memberStatus?.children).toBe('Online');
    });

    it('displays "Offline" status for guest members', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberStatus = tree?.root.findByProps({
            id: 'memberStatus-2'
        }).props;
        expect(memberStatus?.children).toBe('Offline');
    });

    it('displays "Offline" status for offline members', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberStatus = tree?.root.findByProps({
            id: 'memberStatus-1'
        }).props;
        expect(memberStatus?.children).not.toBe('Online');
    });

    it('handles members last active time', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberStatus = tree?.root.findByProps({
            id: 'memberStatus-1'
        }).props;
        expect(memberStatus?.children).toBe('7 days ago');
    });

    it('does not show checkboxes when onCheckedMembersChange is not provided', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const checkbox = tree?.root.findAllByProps({
            id: 'checkbox-0'
        });
        expect(checkbox?.length).toBe(0);
    });

    it('displays default image when member avatar is not provided', async () => {
        let tree: ReactTestRenderer | undefined;
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddGroupMembers client={client as any as StreamChat} />
                    </BrowserRouter>
                </Provider>
            );
        });
        const memberAvatar = tree?.root.findByProps({
            id: 'memberAvatar-0'
        }).props;
        expect(memberAvatar?.src).not.toBe(null);
    });
});
