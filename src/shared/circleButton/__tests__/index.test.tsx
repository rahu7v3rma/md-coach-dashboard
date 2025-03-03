import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import CircleButton from '..';

const mockClick = jest.fn();
const mockKeyDown = jest.fn();

beforeEach(() => {
    render(<CircleButton />);
});

afterEach(cleanup);

test('should render without errors', async () => {
    expect(screen).toBeTruthy();
});

test('should render an image if provided', async () => {
    const tree = render(<CircleButton image="http://image_link" />);
    expect((tree.getByRole('img') as HTMLImageElement).src).toEqual(
        'http://image_link/'
    );
});

test('should render a notification dot if "isNotif" is true', async () => {
    const tree = render(<CircleButton isNotif={true} />);
    expect(tree.container.querySelector('.dot')).not.toBeNull();
});

test('should apply the correct styles based on "isRight" true', async () => {
    const tree = render(<CircleButton isNotif={true} />);
    expect(
        window.getComputedStyle(tree.container.querySelector('.dot') as Element)
            .right
    ).toEqual('0px');
});

test('should apply the correct styles based on "isRight" false', async () => {
    const tree = render(<CircleButton isNotif={true} isRight={false} />);
    expect(
        window.getComputedStyle(tree.container.querySelector('.dot') as Element)
            .left
    ).toEqual('0px');
});

test('should handle click events', async () => {
    const tree = render(<CircleButton onClick={mockClick} />);
    fireEvent.click(tree.container.children[0]);
    expect(mockClick).toBeCalled();
});

test('should handle keydown events', async () => {
    const tree = render(<CircleButton onKeyDown={mockKeyDown} />);
    fireEvent.keyDown(tree.container.children[0]);
    expect(mockKeyDown).toBeCalled();
});
