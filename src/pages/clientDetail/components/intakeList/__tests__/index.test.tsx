import { render, screen } from '@testing-library/react';

import IntakeList from '..';
import { Colors } from 'src/utils/colors';

const mocks = {
    list: Array.from({ length: 2 }, (_, i) => ({
        question: `question${i + 1}`,
        answer: `answer${i + 1}`
    })),
    width: 100,
    height: 100
};

jest.mock('src/navigation');

test('Snapshot', () => {
    const view = render(<IntakeList list={mocks.list} />);
    expect(view.asFragment()).toMatchSnapshot();
});

test('renders IntakeList component with a list of OnboardingAnswers', () => {
    render(<IntakeList list={mocks.list} />);
    mocks.list.forEach((listItem) => {
        expect(screen.getByText(`${listItem.question}:`)).toBeInTheDocument();
        expect(screen.getByText(listItem.answer)).toBeInTheDocument();
    });
});

test('renders IntakeList component with an empty list', () => {
    const view = render(<IntakeList list={[]} />);
    expect(view.container).toBeEmptyDOMElement();
});

test('alternating cards have the correct styles', () => {
    const { container } = render(<IntakeList list={mocks.list} />);
    const cards = container.querySelectorAll('div');
    cards.forEach((card, index) =>
        expect(card).toHaveStyle(
            `background-color:${
                index % 2 ? Colors.extra.off_white : Colors.extra.white
            };`
        )
    );
});

test('renders IntakeList component with custom width and height', () => {
    const { container } = render(
        <IntakeList
            list={mocks.list}
            width={mocks.width}
            height={mocks.height}
        />
    );
    const cards = container.querySelectorAll('div');
    cards.forEach((card) => {
        expect(card).toHaveStyle(
            `width:${mocks.width}%;height:${mocks.height}%`
        );
    });
});
