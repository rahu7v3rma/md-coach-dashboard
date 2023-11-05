import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import CheckBox from '..';

test('renders CheckBox component with initial unchecked state', () => {
    const { container } = render(<CheckBox />);
    const button = container.querySelector('button');
    const image = container.querySelector('img');
    expect(button).not.toHaveClass('checked');
    expect(image).toBeFalsy();
});

test('triggers onChange callback when the CheckBox is clicked', () => {
    const onChange = jest.fn();
    const { container } = render(<CheckBox onChange={onChange} />);
    const button = container.querySelector('button');
    act(() => fireEvent.click(button as HTMLElement));
    expect(onChange).toBeCalledWith(true);
});

test('updates the checked state correctly when the CheckBox is clicked', () => {
    const { container } = render(<CheckBox />);
    let button = container.querySelector('button');
    act(() => fireEvent.click(button as HTMLElement));
    button = container.querySelector('button');
    expect(button).toHaveClass('checked');
    const image = container.querySelector('img');
    expect(image).toBeTruthy();
});

test('displays the check icon when the CheckBox is checked', () => {
    const { container } = render(<CheckBox checked={true} />);
    const image = container.querySelector('img');
    expect(image?.getAttribute('src')).toBe('./assets/icons/check.png');
});

test('handles the absence of onChange prop correctly in CheckBox component', () => {
    const { container } = render(<CheckBox />);
    let button = container.querySelector('button');
    act(() => fireEvent.click(button as HTMLElement));
    button = container.querySelector('button');
    expect(button).toHaveClass('checked');
    const image = container.querySelector('img');
    expect(image).toBeTruthy();
});
