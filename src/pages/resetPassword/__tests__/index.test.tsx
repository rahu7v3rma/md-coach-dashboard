import {
    RenderResult,
    act,
    fireEvent,
    render,
    screen
} from '@testing-library/react';
import React from 'react';

import ResetPassword from '..';
import { UserSelectors, resetPassword } from 'src/reducers/user';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => mockNavigate)
}));

const mockDispatch = jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve())
}));
jest.mock('src/hooks', () => ({
    useAppDispatch: jest.fn(() => mockDispatch)
}));

jest.mock('src/reducers/user', () => ({
    UserSelectors: jest.fn(jest.fn(() => ({ loading: false }))),
    resetPassword: jest.fn()
}));

process.env.REACT_APP_VERSION = '^18.2.0';

let view!: RenderResult;
beforeEach(() => {
    view = render(<ResetPassword />);
});

test('renders the reset password form properly', () => {
    [
        'Forgot password',
        'We will send a recovery link to your email',
        'Send recovery link',
        'Return to Sign In'
    ].forEach((text) => {
        expect(screen.getByText(text)).toBeVisible();
    });
    expect(screen.getByPlaceholderText('Email*')).toBeVisible();
});

test('handles email input change properly', async () => {
    const mockEmail = 'reset@password.com';
    const emailInputBeforeChange = screen.getByPlaceholderText('Email*');
    expect(emailInputBeforeChange).toHaveAttribute('value', '');
    await act(() =>
        fireEvent.change(emailInputBeforeChange, {
            target: { value: mockEmail }
        })
    );
    const emailInputAfterChange = screen.getByPlaceholderText('Email*');
    expect(emailInputAfterChange).toHaveAttribute('value', mockEmail);
});

test('displays loader properly during the loading state', () => {
    ['svg', 'circle'].forEach((element) => {
        expect(view.container.querySelector(element)).toBeNull();
    });
    view.unmount();
    (UserSelectors as jest.Mock).mockReturnValueOnce({ loading: true });
    view = render(<ResetPassword />);
    ['svg', 'circle'].forEach((element) => {
        expect(view.container.querySelector(element)).toBeVisible();
    });
});

const submitForm = async () => {
    const emaiInput = screen.getByPlaceholderText('Email*');
    await act(() =>
        fireEvent.change(emaiInput, {
            target: { value: 'reset@password.com' }
        })
    );
    const sendRecoveryLink = screen.queryByText('Send recovery link');
    await act(() => fireEvent.click(sendRecoveryLink!));
};

test('displays error message on form submission error', async () => {
    view.unmount();
    const errorMessage = 'internal server error';
    mockDispatch.mockReturnValueOnce({
        unwrap: jest.fn(() =>
            Promise.reject({ code: 500, message: errorMessage })
        )
    });
    render(<ResetPassword />);
    await act(() => submitForm());
    const errorText = await screen.findByText(errorMessage);
    expect(errorText).toBeVisible();
});

test('handles form submission properly', async () => {
    await act(() => submitForm());
    expect(mockDispatch).toBeCalledWith((resetPassword as jest.Func)());
});

test('navigates to the login page on "Return to Sign In" click', async () => {
    const returnToSignIn = screen.getByText('Return to Sign In');
    await act(() => fireEvent.click(returnToSignIn));
    expect(mockNavigate).toBeCalledWith('/');
});
