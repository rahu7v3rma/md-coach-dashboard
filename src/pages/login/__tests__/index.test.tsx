import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen } from '@testing-library/react';
import userEvt from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Login from '..';
import userReducer from 'src/reducers/user';
import * as api from 'src/services/api';

const mockStore = configureStore({
    reducer: {
        user: userReducer
    }
});

jest.unmock('src/hooks');

jest.mock('src/navigation');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

beforeEach(() => {
    render(
        <Provider store={mockStore}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
    );
});
afterEach(cleanup);

test('empty fields submit', async () => {
    await userEvt.click(screen.getByText('Sign In'));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
});

test('server error 401', async () => {
    jest.spyOn(api, 'login').mockRejectedValue({
        status: 401
    });

    await userEvt.type(screen.getByPlaceholderText('Email'), 'invalidEmail');
    await userEvt.type(
        screen.getByPlaceholderText('password'),
        'invalidPassword'
    );
    await userEvt.click(screen.getByText('Sign In'));

    expect(
        await screen.findByText('Incorrect username or password')
    ).toBeInTheDocument();
});

test('server error unknown', async () => {
    jest.spyOn(api, 'login').mockRejectedValue({
        status: 500
    });

    await userEvt.type(screen.getByPlaceholderText('Email'), 'invalidEmail');
    await userEvt.type(
        screen.getByPlaceholderText('password'),
        'invalidPassword'
    );
    await userEvt.click(screen.getByText('Sign In'));

    expect(
        await screen.findByText('An unknown error has occurred')
    ).toBeInTheDocument();
});

test('forgot password', async () => {
    await userEvt.click(screen.getByText('Forgot password?'));

    expect(mockNavigate).toBeCalledWith('/reset-password');
});

test('submit success', async () => {
    jest.spyOn(api, 'login').mockResolvedValue(true);
    jest.spyOn(api, 'refreshProfileSession').mockResolvedValue(true);

    await userEvt.type(screen.getByPlaceholderText('Email'), 'validEmail');
    await userEvt.type(
        screen.getByPlaceholderText('password'),
        'validPassword'
    );
    await userEvt.click(screen.getByText('Sign In'));

    expect(mockNavigate).toBeCalledWith('/clients');
});
