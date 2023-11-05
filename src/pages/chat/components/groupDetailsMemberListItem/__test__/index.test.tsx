import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import GroupDetailsMemberListItem from 'src/pages/chat/components/groupDetailsMemberListItem';
import store from 'src/store';
import { user } from 'src/utils/mockData';

const navigate = jest.fn();

describe('GroupDetailsMemberListItem', () => {
    beforeEach(() => {
        window.URL.createObjectURL = jest.fn();
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('GroupDetailsMemberListItem snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem />
                </BrowserRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('GroupDetailsMemberListItem renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('renders the GroupDetailsMemberListItem component with the user avatar and details', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem user={user} />
                </BrowserRouter>
            </Provider>
        );
        const avatarCompoenent = tree.root.findByProps({
            width: 40
        }).props;
        expect(avatarCompoenent.path).toBe(user.image);

        const userName = tree.root.findByProps({
            children: user.name
        }).props;
        expect(userName.children).toBe(user.name);
    });

    it('triggers handleRemoveClick function correctly when the remove option is clicked', async () => {
        const onRemoveMember = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem
                        user={user}
                        onRemoveMember={onRemoveMember}
                    />
                </BrowserRouter>
            </Provider>
        );
        const dotMenu = tree.root.findByProps({
            alt: 'dots'
        }).props;
        expect(dotMenu).toBeTruthy();
        await act(() => dotMenu.onClick({ target: { value: '' } }));

        const menuItem = tree.root.findByProps({
            id: 'menuItem'
        }).props;
        await act(() => menuItem.onClick());
        expect(onRemoveMember).toHaveBeenCalled();
    });

    it("computes userLastActiveTimeString correctly based on the user's last active time", async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem user={user} />
                </BrowserRouter>
            </Provider>
        );
        const memberStatus = tree.root.findByProps({
            id: 'memberStatus'
        }).props;
        expect(memberStatus.children).toBe(
            moment(user?.last_active).fromNow(false)
        );
    });

    it("displays the online status correctly based on the value of the 'online' property", async () => {
        user.online = true;
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem user={user} />
                </BrowserRouter>
            </Provider>
        );
        const memberStatus = tree.root.findByProps({
            id: 'memberStatus'
        }).props;
        expect(memberStatus.children).toBe('Online');
    });

    it('displays the remove option in the Menu component and triggers handleRemoveClick function', async () => {
        const onRemoveMember = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <GroupDetailsMemberListItem
                        user={user}
                        onRemoveMember={onRemoveMember}
                    />
                </BrowserRouter>
            </Provider>
        );
        const dotMenu = tree.root.findByProps({
            alt: 'dots'
        }).props;
        expect(dotMenu).toBeTruthy();
        await act(() => dotMenu.onClick({ target: { value: '' } }));

        const menuItem = tree.root.findByProps({
            id: 'menuItem'
        }).props;
        await act(() => menuItem.onClick());
        expect(onRemoveMember).toHaveBeenCalled();
    });
});
