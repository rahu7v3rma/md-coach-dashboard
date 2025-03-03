import { RenderResult, fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import LogBookItem from '..';

const props = {
    children: <>children</>,
    icon: 'icon',
    title: 'title',
    time: '00:00',
    width: '100px',
    height: '100px',
    image: 'image',
    onClick: jest.fn()
};

jest.mock('src/navigation');
global.URL.createObjectURL = jest.fn().mockImplementation(() => props.image);

let view!: RenderResult;
beforeEach(async () => {
    await act(() => (view = render(<LogBookItem {...props} />)));
    const foodImage = view.container.querySelector(`img[src="${props.image}"]`);
    await act(() => fireEvent.load(foodImage as HTMLElement));
});

test('Snapshot', async () => {
    expect(view.asFragment()).toMatchSnapshot();
});

test('renders LogBookItem component with all props and an image', async () => {
    const card = view.container.firstElementChild;
    const [header, body] = card!.children;
    const [titleContainer, foodImage, timeContainer] = header.children;
    const [titleIcon, titleText] = titleContainer.children;
    expect(card).toHaveStyle(`width:${props.width};height:${props.height};`);
    expect(titleIcon.getAttribute('src')).toBe(props.icon);
    expect(titleText.textContent).toBe(props.title);
    expect(foodImage.firstElementChild?.getAttribute('src')).toBe(props.image);
    expect(timeContainer.firstElementChild?.textContent).toBe(props.time);
    expect(body.textContent).toBe('children');
});

test('renders LogBookItem component without an image', async () => {
    act(() => view.rerender(<LogBookItem {...props} image={undefined} />));
    const foodImage = view.container.querySelector(`img[src="${props.image}"]`);
    expect(foodImage).toBeNull();
});

test('handles click event with the onClick prop', async () => {
    const card = view.container.firstElementChild;
    await act(() => fireEvent.click(card as HTMLElement));
    expect(props.onClick).toBeCalled();
});

test('handles image modal when an image is clicked, closes image modal when the modal is closed', async () => {
    let modalContent = view.container.querySelector('#modalContent');
    expect(modalContent).toBeNull();
    const foodImage = view.container.querySelector(`img[src="${props.image}"]`);
    await act(() => fireEvent.click(foodImage?.parentElement as HTMLElement));
    modalContent = view.container.querySelector('#modalContent');
    expect(modalContent).toBeVisible();
    const modalCloseButton = view.container.querySelector('#modalCloseButton');
    await act(() => fireEvent.click(modalCloseButton as HTMLElement));
    modalContent = view.container.querySelector('#modalContent');
    expect(modalContent).toBeNull();
});
