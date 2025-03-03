import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

import Text, { Size } from 'src/shared/text';

describe('Text Component', () => {
    it('renders without crashing', () => {
        const component = create(<Text>test</Text>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders children correctly', () => {
        const component = create(<Text>{'Test'} </Text>);
        const tree = component.toJSON();
        expect(tree?.children[0]).toBe('Test');
    });

    it('applies custom font size', () => {
        const component = create(<Text fontSize={Size.Large}>Test</Text>);
        const tree = component.toJSON();
        expect(tree?.props?.fontSize).toBe(24);
    });

    it('applies custom font color', () => {
        const component = create(<Text color="blue">Test</Text>);
        const tree = component.toJSON();
        expect(tree?.props?.color).toBe('blue');
    });

    it('triggers onClick handler when clicked', () => {
        const handleClick = jest.fn();
        const component = create(<Text onClick={handleClick}>Clickable</Text>);
        const tree = component.root;
        tree.props.onClick();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom fontFamily', () => {
        const component = create(<Text fontFamily="Arial">Custom Font </Text>);
        const tree = component.toJSON();
        expect(tree?.props?.fontFamily).toBe('Arial');
    });
    it('applies text decoration properties correctly', () => {
        const textDecorationLine = 'underline';
        const textDecorationColor = 'blue';
        const textDecorationStyle = 'dotted';

        // Render the Text component with the specified text decoration properties
        const { getByText } = render(
            <Text
                textDecorationLine={textDecorationLine}
                textDecorationColor={textDecorationColor}
                textDecorationStyle={textDecorationStyle}
            >
                Hello
            </Text>
        );
        const renderedText = getByText('Hello');
        expect(renderedText).toHaveStyle(
            `text-decoration-line: ${textDecorationLine}`
        );
        expect(renderedText).toHaveStyle(
            `text-decoration-color: ${textDecorationColor}`
        );
        expect(renderedText).toHaveStyle(
            `text-decoration-style: ${textDecorationStyle}`
        );
    });

    it('applies text transform correctly', () => {
        const textTransform = 'uppercase';
        const { getByText } = render(
            <Text textTransform={textTransform}>Hello</Text>
        );
        const renderedText = getByText('Hello');
        expect(renderedText).toHaveStyle(`text-transform: ${textTransform}`);
    });
});
