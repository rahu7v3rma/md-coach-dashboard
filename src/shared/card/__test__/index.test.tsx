import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import Card from '..';
import store from '../../../store';

const navigate = jest.fn();

describe('Card', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
    });

    it('Card snapshot', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Card />
                </BrowserRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('Card renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Card />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('should apply custom styles when props are provided', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Card width="335px" height="100px" />
                </BrowserRouter>
            </Provider>
        );
        let cardContainer = tree.root.findByProps({
            width: '335px'
        }).props;
        expect(cardContainer).toBeTruthy();
        expect(cardContainer.width).toBe('335px');
        expect(cardContainer.height).toBe('100px');
    });

    it('should handle click events', async () => {
        const onClick = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Card width="335px" onClick={onClick} />
                </BrowserRouter>
            </Provider>
        );
        let cardContainer = tree.root.findByProps({
            width: '335px'
        }).props;
        expect(cardContainer).toBeTruthy();
        await act(() => cardContainer.onClick());
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should render children', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Card>
                        <div id="child" />
                    </Card>
                </BrowserRouter>
            </Provider>
        );
        let child = tree.root.findByProps({
            id: 'child'
        }).props;
        expect(child).toBeTruthy();
    });
});
