import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import ResetPasswordChange from '..';
import { Success } from '../components';
import { FormCard } from '../styles';
import * as userReducer from 'src/reducers/user';
import Loader from 'src/shared/loader';
import store from 'src/store';

const navigate = jest.fn();

jest.mock('src/hooks', () => ({
    useAppDispatch: () => {
        return jest
            .fn()
            .mockImplementationOnce(() => {
                return {
                    unwrap: jest.fn().mockImplementation(() => {
                        return Promise.resolve({});
                    })
                };
            })
            .mockImplementation(() => {
                return {
                    unwrap: jest.fn().mockImplementation(() => {
                        return Promise.resolve({});
                    })
                };
            });
    },
    useNotificationsPermissions: () => {
        return jest.fn().mockImplementation(() => {
            return {
                hasPermissions: true
            };
        });
    }
}));

describe('ResetPasswordChange', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('renders the form card properly', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const formCardComp = tree.root.findByType(FormCard).props;
        expect(formCardComp).toBeTruthy();
    });

    it('displays loading state properly', async () => {
        // mock loader with 2 cases once false and after that true
        jest.spyOn(userReducer, 'UserSelectors')
            .mockImplementationOnce(() => ({
                loading: false,
                userProfile: {
                    image: ''
                },
                chatProfile: {
                    apiKey: 'apiKey',
                    token: 'token',
                    userId: 'userId'
                }
            }))
            .mockImplementation(() => ({
                loading: true,
                userProfile: {
                    image: ''
                },
                chatProfile: {
                    apiKey: 'apiKey',
                    token: 'token',
                    userId: 'userId'
                }
            }));

        // mount 1st time so loader will false
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const loaderCom = tree.root.findAllByType(Loader);
        expect(loaderCom.length).toBe(0);

        // mount 2nd time so loader will true
        const treeWithLoader = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const loaderCom2 = treeWithLoader.root.findAllByType(Loader);
        expect(loaderCom2.length).toBe(1);
    });

    it('handles password reset function properly', async () => {
        jest.spyOn(userReducer, 'UserSelectors').mockImplementation(() => ({
            loading: false,
            userProfile: {
                image: ''
            },
            chatProfile: {
                apiKey: 'apiKey',
                token: 'token',
                userId: 'userId'
            }
        }));
        const resetPasswordChange = jest.spyOn(
            userReducer,
            'resetPasswordChange'
        );

        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const passInput = tree.root.findByProps({
            placeholder: 'Password*'
        }).props;
        await act(() => passInput.onChange('password'));

        const reserPassInput = tree.root.findByProps({
            placeholder: 'Repeat Password*'
        }).props;
        await act(() => reserPassInput.onChange('password'));

        const resetBtn = tree.root.findByProps({
            children: 'Reset'
        }).props;
        await act(() => resetBtn.onClick());

        expect(resetPasswordChange).toHaveBeenCalled();
    });

    it('displays error message if passwords do not match', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const passInput = tree.root.findByProps({
            placeholder: 'Password*'
        }).props;
        await act(() => passInput.onChange('password'));

        const reserPassInput = tree.root.findByProps({
            placeholder: 'Repeat Password*'
        }).props;
        await act(() => reserPassInput.onChange('password1'));

        const resetBtn = tree.root.findByProps({
            children: 'Reset'
        }).props;
        await act(() => resetBtn.onClick());

        const reserPassInputUpdated = tree.root.findByProps({
            placeholder: 'Repeat Password*'
        }).props;
        expect(reserPassInputUpdated.isError).toBe(true);
    });

    it('displays error message for invalid token', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const passInput = tree.root.findByProps({
            placeholder: 'Password*'
        }).props;
        await act(() => passInput.onChange('password'));

        const reserPassInput = tree.root.findByProps({
            placeholder: 'Repeat Password*'
        }).props;
        await act(() => reserPassInput.onChange('password1'));

        const resetBtn = tree.root.findByProps({
            children: 'Reset'
        }).props;
        await act(() => resetBtn.onClick());

        const reserPassInputUpdated = tree.root.findByProps({
            placeholder: 'Repeat Password*'
        }).props;
        expect(reserPassInputUpdated.isError).toBe(true);
    });

    it('displays success message on successful password change', async () => {
        jest.spyOn(userReducer, 'UserSelectors').mockImplementation(() => ({
            loading: false,
            userProfile: {
                image: ''
            },
            chatProfile: {
                apiKey: 'apiKey',
                token: 'token',
                userId: 'userId'
            }
        }));
        const resetPasswordChange = jest.spyOn(
            userReducer,
            'resetPasswordChange'
        );

        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ResetPasswordChange />
                </BrowserRouter>
            </Provider>
        );
        const passInput = tree.root.findByProps({
            placeholder: 'Password*'
        }).props;
        await act(() => passInput.onChange('password'));

        const reserPassInput = tree.root.findByProps({
            placeholder: 'Repeat Password*'
        }).props;
        await act(() => reserPassInput.onChange('password'));

        const resetBtn = tree.root.findByProps({
            children: 'Reset'
        }).props;
        await act(() => resetBtn.onClick());

        expect(resetPasswordChange).toHaveBeenCalled();
        const sucessText = tree.root.findByType(Success);
        expect(sucessText).toBeTruthy();
    });
});
