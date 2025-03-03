import 'jest-styled-components';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

import Loader, { StyledLoader } from '..';
import store from '../../../store';

describe('Loader', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Loader snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Loader />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('Loader renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Loader />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('should have the correct CSS animations', async () => {
        const tree = create(<StyledLoader />).toJSON();
        expect(tree).toHaveStyleRule('animation', 'rotate 2s linear infinite');
    });

    it('should have the correct circle attributes', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Loader />
                </BrowserRouter>
            </Provider>
        );
        const circle = tree.root.findByProps({
            className: 'path'
        }).props;
        expect(circle.cx).toBe('25');
        expect(circle.cy).toBe('25');
        expect(circle.r).toBe('20');
        expect(circle.fill).toBe('none');
        expect(circle.strokeWidth).toBe('4');
    });

    it('should have the correct SVG attributes', async () => {
        const tree = create(<StyledLoader />).toJSON();
        expect(tree).toHaveStyleRule('animation', 'rotate 2s linear infinite');
        expect(tree).toHaveStyleRule('width', '25px');
        expect(tree).toHaveStyleRule('height', '25px');
    });
});
