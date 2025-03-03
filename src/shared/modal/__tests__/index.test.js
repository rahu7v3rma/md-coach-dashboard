import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import Modal from '..';

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

describe('Modal', () => {
    it('Modal matches the snapshot', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('Modal renders without crashing', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={true} />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toBeTruthy();
    });

    it('Modal renders the modal content when open', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={true} children />
                </BrowserRouter>
            </Provider>
        );

        const modalBackdrop = tree.root.findByProps({
            id: 'modalBackdrop'
        }).props;

        const modalContent = tree.root.findByProps({
            id: 'modalContent'
        }).props;
        expect(modalBackdrop).toBeTruthy();
        expect(modalContent).toBeTruthy();
    });

    it('Modal does not render the modal content when closed ', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={false} />
                </BrowserRouter>
            </Provider>
        );
        let modalBackdrop, modalContent;
        try {
            modalBackdrop = tree.root.findByProps({
                id: 'modalBackdrop'
            }).props;
            modalContent = tree.root.findByProps({
                id: 'modalContent'
            }).props;
        } catch (error) {}

        expect(modalBackdrop).toBeFalsy();
        expect(modalContent).toBeFalsy();
    });

    it('Modal calls onClose when the backdrop is clicked', () => {
        const mockOnClose = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={true} onClose={mockOnClose} />
                </BrowserRouter>
            </Provider>
        );
        const modalBackdrop = tree.root.findByProps({
            id: 'modalBackdrop'
        }).props;
        act(() => modalBackdrop.onClick());
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('Modal calls onClose when the close button is clicked', () => {
        const mockOnClose = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={true} onClose={mockOnClose} />
                </BrowserRouter>
            </Provider>
        );
        const modalCloseButton = tree.root.findByProps({
            id: 'modalCloseButton'
        }).props;

        act(() => modalCloseButton.onClick());
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('Modal applies a box shadow by default', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={true} />
                </BrowserRouter>
            </Provider>
        );
        const modalContent = tree.root.findByProps({
            id: 'modalContent'
        }).props;
        expect(modalContent.isBoxShadow).toBe(true);
    });

    it('Modal does not apply a box shadow when isBoxShadow is set to false', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Modal open={true} isBoxShadow={false} />
                </BrowserRouter>
            </Provider>
        );
        const modalContent = tree.root.findByProps({
            id: 'modalContent'
        }).props;
        expect(modalContent.isBoxShadow).toBe(false);
    });
});
