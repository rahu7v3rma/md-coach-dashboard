import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';

import Input from '../index';

jest.mock('src/shared', () => ({
    CircleButton: ({ children }: { children: ReactNode }) => <>{children}</>
}));

const mocks = {
    onChange: jest.fn(),
    placeholder: 'mockPlaceholder',
    input: 'mockInput',
    errorMessage: 'mockErrorMessage',
    icon: 'mockIcon'
};

test('should render without errors', () => {
    const view = render(<Input />);
    expect(view).toBeTruthy();
});

test('should render with the correct placeholder', () => {
    render(<Input placeholder={mocks.placeholder} />);
    expect(screen.getByPlaceholderText(mocks.placeholder)).toBeInTheDocument();
});

test('should handle input change', () => {
    render(<Input onChange={mocks.onChange} placeholder={mocks.placeholder} />);
    const input = screen.getByPlaceholderText(mocks.placeholder);
    act(() => fireEvent.change(input, { target: { value: mocks.input } }));
    expect(mocks.onChange).toBeCalledWith(mocks.input);
});

test('should toggle password visibility', () => {
    const { container } = render(
        <Input
            isPassword={true}
            type="password"
            icon={false}
            placeholder={mocks.placeholder}
        />
    );
    let input = screen.getByPlaceholderText(mocks.placeholder);
    expect(input?.getAttribute('type')).toBe('password');
    const visibilityIcon = container.querySelector('img');
    act(() => fireEvent.click(visibilityIcon as HTMLElement));
    input = screen.getByPlaceholderText(mocks.placeholder);
    expect(input?.getAttribute('type')).toBe('text');
});

test('should display an error message', () => {
    render(<Input isError={true} errorMessage={mocks.errorMessage} />);
    expect(screen.getByText(mocks.errorMessage)).toBeInTheDocument();
});

test('should render an icon', () => {
    render(<Input icon={mocks.icon} />);
    const icon = screen.getByAltText('Send Icon');
    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute('src')).toBe(mocks.icon);
});

test('should apply the correct size styles', () => {
    const view = render(<Input size="any" />);
    expect(view.container.firstElementChild).toHaveStyle('padding: 0.35em 1em');
});
