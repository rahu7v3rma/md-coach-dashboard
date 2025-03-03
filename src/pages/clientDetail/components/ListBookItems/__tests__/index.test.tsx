import {
    RenderResult,
    fireEvent,
    render,
    screen
} from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { act } from 'react-dom/test-utils';

import ListBookItems from '..';

jest.mock('src/navigation');
global.structuredClone = (a: any) => JSON.parse(JSON.stringify(a));

const props = {
    list: [
        {
            id: 1,
            type: `UserLesson`,
            log_time: '2023-10-`12` 00:00:00',
            duration_minutes: '120',
            activity_type: 'Running',
            intensity: '10',
            lesson: {
                icon: 'lessonIcon',
                title: 'lessonTitle'
            },
            units: 1.2345
        }
    ],
    groupTitle: moment().format('DD MMM YYYY')
};

let view!: RenderResult;
beforeEach(() => {
    view = render(<ListBookItems {...props} />);
});

test('Snapshot', () => {
    expect(view.asFragment()).toMatchSnapshot();
});

test('renders ListBookItems component with a list of log items', () => {
    const logBookItem = view.container.children[1].children[0];
    const header = logBookItem.children[0];
    const titleContainer = header.children[0];
    expect(titleContainer.children[1].textContent).toBe('Lesson Completed');
    const timeContainer = header.children[1];
    expect(timeContainer.children[0].textContent).toBe(
        moment(props.list[0].log_time, 'YYYY-MM-DD HH:mm:s').format('HH:mm')
    );
    const bodyTitleView = logBookItem.children[1].children[0];
    expect(bodyTitleView.children[0].textContent).toBe(
        String(
            parseFloat((Number(props.list[0].duration_minutes) / 60).toFixed(2))
        )
    );
    expect(bodyTitleView.children[1].textContent).toBe(
        props.list[0].units.toFixed(2)
    );
    const bodySubView = bodyTitleView.children[2];
    expect(bodySubView.children[0].textContent).toBe(props.list[0].intensity);
    expect(bodySubView.children[1].textContent).toBe(
        props.list[0].activity_type
    );
    const bodyLessonView = bodyTitleView.children[3];
    expect(bodyLessonView.children[0].getAttribute('src')).toBe(
        props.list[0].lesson.icon
    );
    expect(bodyLessonView.children[1].textContent).toBe(
        props.list[0].lesson.title
    );
});

test('renders ListBookItems component with missing data', () => {
    view.rerender(<ListBookItems list={[]} groupTitle="" />);
    expect(view.container.textContent).toBe('');
});

test('handles image loading error', () => {
    const { container } = view;
    let lessonImage = container.querySelector(
        `img[src="${props.list[0].lesson.icon}"]`
    );
    expect(lessonImage).toBeInTheDocument();
    act(() => fireEvent.error(lessonImage as HTMLElement));
    lessonImage = container.querySelector(
        `img[src="${props.list[0].lesson.icon}"]`
    );
    expect(lessonImage).not.toBeInTheDocument();
});

test('handles decimal number formatting', () => {
    expect(
        screen.queryByText(props.list[0].units.toFixed(2))
    ).toBeInTheDocument();
});

test('renders ListBookItems component with "Today" as the group title', () => {
    const { container } = view;
    const groupTitle = container.firstElementChild?.textContent;
    expect(groupTitle).toBe('Today');
});
