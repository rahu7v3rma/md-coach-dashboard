import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import RenameGroupContainer from 'src/pages/chat/components/renameGroup';
import store from 'src/store';

const navigate = jest.fn();

describe('RenameGroupContainer', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
    });

    it('RenameGroupContainer snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'name'}
                        onClose={() => {}}
                        onRename={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('DashboardLayout renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'name'}
                        onClose={() => {}}
                        onRename={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('renders with a title and close button', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'name'}
                        onClose={() => {}}
                        onRename={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let titleText = tree.root.findByProps({
            id: 'title_text'
        }).props;
        expect(titleText.children).toBe('Edit group details');
        let closeIcon = tree.root.findByProps({
            id: 'close_icon'
        }).props;
        expect(closeIcon).toBeTruthy();
    });

    it('updates the input value when typing', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'name'}
                        onClose={() => {}}
                        onRename={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let groupInput = tree.root.findByProps({
            id: 'group_input'
        }).props;
        await act(() =>
            groupInput.onChange({ target: { value: 'group name' } })
        );
        let groupInputUpdated = tree.root.findByProps({
            id: 'group_input'
        }).props;
        expect(groupInputUpdated.value).toBe('group name');
    });

    it('calls the onRename callback with the new group name', async () => {
        const onRename = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'name'}
                        onClose={() => {}}
                        onRename={onRename}
                    />
                </BrowserRouter>
            </Provider>
        );
        let groupInput = tree.root.findByProps({
            id: 'group_input'
        }).props;
        await act(() =>
            groupInput.onChange({ target: { value: 'group name new' } })
        );
        let btnRename = tree.root.findByProps({
            id: 'btn_rename'
        }).props;
        await act(() => btnRename.onClick());
        expect(onRename).toHaveBeenCalledWith('group name new');
    });

    it('calls the onClose callback when the close button is clicked', async () => {
        const onClose = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'name'}
                        onRename={() => {}}
                        onClose={onClose}
                    />
                </BrowserRouter>
            </Provider>
        );
        let btnCancel = tree.root.findByProps({
            id: 'btn_cancel'
        }).props;
        await act(() => btnCancel.onClick());
        expect(onClose).toHaveBeenCalled();
    });

    it('renders the component with the initial group name', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <RenameGroupContainer
                        name={'initial name'}
                        onRename={() => {}}
                        onClose={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let groupInputUpdated = tree.root.findByProps({
            id: 'group_input'
        }).props;
        expect(groupInputUpdated.value).toBe('initial name');
    });
});
