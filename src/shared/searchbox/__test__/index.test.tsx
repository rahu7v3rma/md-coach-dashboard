import 'jest-styled-components';
import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import SearchBox, { SearchBoxContainer, SearchIcon } from '..';
import Icon from '../../../assets/search-icon-green.svg';
import store from '../../../store';
import { Colors } from 'src/utils/colors';

const navigate = jest.fn();

describe('SearchBox', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    });

    it('SearchBox snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBox />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('SearchBox renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBox />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('renders the search icon and input element', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBox />
                </BrowserRouter>
            </Provider>
        );
        let icon = tree.root.findByProps({
            src: Icon
        }).props;
        expect(icon).toBeTruthy();
        let input = tree.root.findByProps({ placeholder: 'Search' }).props;
        expect(input).toBeTruthy();
    });

    it('calls the onChange callback when text is typed', async () => {
        const onChange = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBox onChange={onChange} />
                </BrowserRouter>
            </Provider>
        );
        let input = tree.root.findByProps({ placeholder: 'Search' }).props;
        await act(() => input.onChange({ target: { value: '1' } }));
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('applies styles correctly to the search box', async () => {
        const tree = create(<SearchBoxContainer />).toJSON();
        expect(tree).toHaveStyleRule('display', 'flex');
        expect(tree).toHaveStyleRule('align-items', 'center');
        expect(tree).toHaveStyleRule('background', Colors.extra.white);
        expect(tree).toHaveStyleRule('width', '350px');
        expect(tree).toHaveStyleRule('padding', '19px 23px');
        expect(tree).toHaveStyleRule('border-radius', '16px');
    });

    it('applies styles correctly to the search icon', async () => {
        const tree = create(<SearchIcon />).toJSON();
        expect(tree).toHaveStyleRule('width', '18px');
        expect(tree).toHaveStyleRule('height', '18px');
        expect(tree).toHaveStyleRule('margin-right', '11px');
    });

    it('calls onChange with the correct value when text is typed', async () => {
        const onChange = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBox onChange={onChange} />
                </BrowserRouter>
            </Provider>
        );
        let input = tree.root.findByProps({ placeholder: 'Search' }).props;
        await act(() => input.onChange({ target: { value: 'jest' } }));
        expect(onChange).toHaveBeenCalledWith('jest');
    });

    it('does not call onChange when text is not typed', async () => {
        const onChange = jest.fn();
        create(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBox onChange={onChange} />
                </BrowserRouter>
            </Provider>
        );
        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
