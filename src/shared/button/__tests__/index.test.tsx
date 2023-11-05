import { render } from '@testing-library/react';
import { act, create } from 'react-test-renderer';

import Button from '..';

describe('Button', () => {
    it('Button should renders without errors', () => {
        const tree = create(<Button />);
        expect(tree).toBeTruthy();
    });

    it('Button should render children', () => {
        const tree = create(
            <Button>
                <div id="buttonContent" />
            </Button>
        );

        const buttonContent = tree.root.findByProps({
            id: 'buttonContent'
        }).props;
        expect(buttonContent).toBeTruthy();
    });

    it('Button should apply custom styles when props are provided', () => {
        const { getByTestId } = render(
            <Button
                testID={'buttonContent'}
                backgroundColor="#f00"
                color="#f00"
                fontSize={14}
                width="100%"
                height="100%"
                padding="10px"
                isBoxShadow={true}
                borderRadius="10px"
                borderColor="#f00"
            />
        );
        const buttonContent = getByTestId('buttonContent');
        expect(buttonContent).toHaveStyle(
            `background-color: #f00;color: #f00;border-color: #f00;font-size: 14px;width: 100%;height: 100%;padding: 10px;border-radius: 10px;box-shadow:0px 2px 0px #5a3dbf;`
        );
    });

    it('Button should handle click events', () => {
        const mockOnClick = jest.fn();
        const tree = create(
            <Button id={'buttonContent'} onClick={mockOnClick} />
        );
        const buttonContent = tree.root.findByProps({
            id: 'buttonContent'
        }).props;
        act(() => buttonContent.onClick());
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('Button should have the correct styles when disabled ', () => {
        const { getByTestId } = render(
            <Button
                testID={'buttonContent'}
                color="#f00"
                backgroundColor="#f00"
                borderColor="#f00"
                disabled={true}
            />
        );
        const buttonContent = getByTestId('buttonContent');
        expect(buttonContent).toHaveStyle(
            `background: #f00;color: #f00;border-color: #f00;`
        );
    });
});
