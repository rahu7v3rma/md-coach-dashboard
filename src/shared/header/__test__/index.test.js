import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import Header from '..';
import { appRouter } from '../../../navigation';
import { notificationAction } from '../../../services/notification';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

const notificationArray = [
    {
        id: 2,
        title: 'Andew Tomson',
        description: 'Sent you a photo',
        image: null,
        date_time: '2023-02-08T12:12:12Z',
        read_flag: false,
        action: 'chat',
        type: 'message.new',
        payload: 123
    }
];

const state = {
    notification: {
        notifications: {
            list: notificationArray
        }
    },
    user: {}
};

const store = mockStore(() => state);

describe('Header', () => {
    it('user will redirected to chat screen on notification click', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        const spyNavigate = jest.spyOn(appRouter, 'navigate');
        const container = tree.root.findByProps({
            id: 'notificationContainer'
        }).props;
        await act(() => container.onClick());
        expect(spyNavigate).toHaveBeenCalledWith('/chat', {
            state: { channelId: 123 }
        });
    });
    it('user will redirected to profile screen on notification click', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        const container = tree.root.findByProps({
            id: 'notificationContainer'
        }).props;
        await act(() => container.onClick());
        notificationAction('lesson.completed', 1);
        expect(window.location.pathname).toBe('/client/1');
    });
});
