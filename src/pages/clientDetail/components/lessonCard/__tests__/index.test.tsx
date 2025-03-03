import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import LessonCard from '..';

const mock = {
    imageUrl: 'imageUrl',
    title: 'title',
    subTitle: 'subTitle',
    time: 'time',
    onClick: jest.fn()
};

jest.mock('src/navigation');

test('Snapshot', () => {
    const view = render(<LessonCard {...mock} />);
    expect(view.asFragment()).toMatchSnapshot();
});

test('renders LessonCard component with all props', () => {
    const view = render(<LessonCard {...mock} />);
    expect(view).toBeTruthy();
});

test('renders LessonCard component with missing title, time and image props', () => {
    const view = render(<LessonCard lesson="" title="" />);
    expect(view.container.textContent).toBe('No Lesson Found');
});

test('handles image loading error', async () => {
    render(<LessonCard {...mock} />);
    let icon = screen.queryByAltText('icon');
    expect(icon).toBeInTheDocument();
    act(() => fireEvent.error(icon as HTMLElement));
    icon = screen.queryByAltText('icon');
    expect(icon).not.toBeInTheDocument();
});
