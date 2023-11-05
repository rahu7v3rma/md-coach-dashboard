import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import Sidebar from '..';
import { logoutUser } from '../../../reducers/user';
import * as auth from '../../../services/auth';
import store from '../../../store';

const navigate = jest.fn();
const mockRequestPermissions = jest.fn();

jest.mock('../../../hooks', () => ({
    useAppDispatch: () => {
        return jest.fn().mockImplementation(() => {
            return {
                unwrap: jest.fn().mockImplementation(() => {
                    return Promise.resolve({});
                })
            };
        });
    },
    useNotificationsPermissions: jest
        .fn()
        .mockImplementationOnce(() => {
            return {
                hasPermissions: true
            };
        })
        .mockImplementation(() => {
            return {
                hasPermissions: false
            };
        })
}));

jest.mock('../../../services/notification', () => ({
    requestPermissions: jest.fn().mockImplementation(() => {
        mockRequestPermissions();
    })
}));

const mockApiResponse = () => {
    (fetch as any).mockResponse(() => {
        return Promise.resolve(
            JSON.stringify({
                id_token: '',
                refresh_token: '',
                access_token: '',
                data: {}
            })
        );
    });
};

describe('SideBar', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
    });

    it('does not display the notification notice when permissions are present', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        // notification permission mock for permission
        let notificationNotice = tree.root.findAllByProps({
            children:
                'Notifications are disabled. Click here to grant required permissions'
        });
        expect(notificationNotice.length).toBe(0);
    });

    it('SideBar snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('SideBar renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('renders the logo and menu items', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        let logoIcon = tree.root.findByProps({
            alt: 'MD Icon'
        }).props;
        expect(logoIcon).toBeTruthy();
        let sideBarClientItem = tree.root.findByProps({
            name: 'My Clients'
        }).props;
        expect(sideBarClientItem).toBeTruthy();
        let sideBarChatItem = tree.root.findByProps({
            name: 'Chat'
        }).props;
        expect(sideBarChatItem).toBeTruthy();
    });

    it('displays a notification notice when permissions are missing', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        // notification permission mock for missing permission
        let notificationNotice = tree.root.findByProps({
            children:
                'Notifications are disabled. Click here to grant required permissions'
        }).props;
        expect(notificationNotice).toBeTruthy();
    });

    it('requests permissions when the notice is clicked', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        // notification permission mock for missing permission
        let notificationNotice = tree.root.findByProps({
            children:
                'Notifications are disabled. Click here to grant required permissions'
        }).props;
        expect(notificationNotice).toBeTruthy();
        await act(() => notificationNotice.onClick());
        expect(mockRequestPermissions).toHaveBeenCalledTimes(1);
    });

    it('user can logout successfull', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        );
        let input = tree.root.findByProps({
            id: 'logoutBtn'
        }).props;
        const resetAuthSpyOn = jest.spyOn(auth, 'resetAuthToken');
        await act(() => input.onClick());
        expect(navigate).toHaveBeenCalledWith('/');
        mockApiResponse();
        await store.dispatch(logoutUser({}));
        expect(resetAuthSpyOn).toHaveBeenCalledTimes(1);
    });
});
