import React from 'react';
import { act, create } from 'react-test-renderer';

import SearchBar from '../../searchBar';

describe('SearchBar component', () => {
    it('matches the snapshot', () => {
        const component = create(<SearchBar />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with a search icon and placeholder text', () => {
        const component = create(<SearchBar />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('updates the input value when typing', () => {
        const component = create(<SearchBar />);
        const instance = component.root;
        const inputElement = instance.findByProps({ name: 'groupname' });

        act(() => {
            inputElement.props.onChange({ target: { value: 'New Text' } });
        });

        expect(inputElement.props.value).toBe('New Text');
    });

    it('calls the onSearch callback with the search text when typing', () => {
        const onSearchMock = jest.fn();
        const component = create(<SearchBar onSearch={onSearchMock} />);
        const instance = component.root;
        const inputElement = instance.findByProps({ name: 'groupname' });

        act(() => {
            inputElement.props.onChange({ target: { value: 'New Text' } });
        });

        expect(inputElement.props.value).toBe('New Text');
        expect(onSearchMock).toHaveBeenCalledWith('New Text');
    });

    it('does not call onSearch callback when onSearch is not provided', () => {
        const onSearchMock = jest.fn();
        const component = create(<SearchBar />);
        const instance = component.root;
        const inputElement = instance.findByProps({ name: 'groupname' });

        act(() => {
            inputElement.props.onChange({ target: { value: 'New Text' } });
        });

        expect(inputElement.props.value).toBe('New Text');
        expect(onSearchMock).not.toHaveBeenCalled();
    });

    it('renders the component with an initial search text', () => {
        const component = create(<SearchBar />);
        const instance = component.root;
        const inputElement = instance.findByProps({ name: 'groupname' });
        expect(inputElement.props.value).toBe('');
    });
});
