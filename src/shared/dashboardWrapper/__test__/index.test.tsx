import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import store from '../../../store';
import * as notification from 'src/reducers/notification';
import DashboardLayout from 'src/shared/dashboardWrapper';
import Header from 'src/shared/header';

const navigate = jest.fn();
const mockGetNotification = jest.fn();
jest.mock('src/reducers/notification', () => ({
    NotificationSelectors: jest
        .fn()
        .mockImplementationOnce(() => ({
            loading: false,
            notifications: {
                hasNext: false
            },
            unreadCount: 0
        }))
        .mockImplementation(() => ({
            loading: true,
            notifications: {
                hasNext: true,
                nextPageNumber: 1
            },
            unreadCount: 0
        })),
    getNotification: jest.fn().mockImplementation(() => mockGetNotification())
}));

describe('DashboardLayout', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
    });

    // notification selector mock once with hasNext false so no more notifications are there
    it('handleScroll does not dispatch notification retrieval action when there are no more notifications', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout>
                        <div id="child" />
                    </DashboardLayout>
                </BrowserRouter>
            </Provider>
        );
        let header = tree.root.findByType(Header).props;
        const getNotification = jest.spyOn(notification, 'getNotification');
        await act(() => header.handleScroll());
        expect(getNotification).not.toHaveBeenCalled();
    });

    // notification selector mock with hasNext true so more notifications are there
    it('handleScroll dispatches notification retrieval action when there are more notifications', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout>
                        <div id="child" />
                    </DashboardLayout>
                </BrowserRouter>
            </Provider>
        );
        let header = tree.root.findByType(Header).props;
        await act(() => header.handleScroll());
        expect(mockGetNotification).toHaveBeenCalled();
    });

    it('DashboardLayout snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('DashboardLayout renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('DashboardLayout renders its children', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout>
                        <div id="child" />
                    </DashboardLayout>
                </BrowserRouter>
            </Provider>
        );
        let child = tree.root.findByProps({
            id: 'child'
        }).props;
        expect(child).toBeTruthy();
    });

    it('handleToggle toggles the "hidden" state', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout>
                        <div id="child" />
                    </DashboardLayout>
                </BrowserRouter>
            </Provider>
        );
        let header = tree.root.findByType(Header).props;
        expect(header.hidden).toBe(true);
        await act(() => header.handleToggle());
        let headerHide = tree.root.findByType(Header).props;
        expect(headerHide.hidden).toBe(false);
    });
});
