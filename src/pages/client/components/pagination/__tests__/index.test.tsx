import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';

import PaginationComponent from 'src/pages/client/components/pagination';
import store from 'src/store';

const nextPageNumber = 3;
const previousPageNumber = 1;
jest.mock('src/reducers/client', () => ({
    ClientSelectors: jest.fn().mockImplementation(() => ({
        loading: true,
        nextPageNumber: nextPageNumber,
        previousPageNumber: previousPageNumber,
        hasPrevious: true,
        hasNext: true
    }))
}));

describe('PaginationComponent', () => {
    it('PaginationComponent snapshot', () => {
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={() => {}}
                    onChangeRowsPerPage={() => {}}
                    currentPage={1}
                />
            </Provider>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('PaginationComponent should renders without errors', () => {
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={() => {}}
                    onChangeRowsPerPage={() => {}}
                    currentPage={1}
                />
            </Provider>
        );
        expect(tree).toBeTruthy();
    });

    it('renders current page and total pages correctly', () => {
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={() => {}}
                    onChangeRowsPerPage={() => {}}
                    currentPage={1}
                />
            </Provider>
        );

        const pageText = tree.root.findByProps({
            color: '#babfc3'
        }).props;
        expect(pageText.children).toStrictEqual([' ', 1, ' of ', 10, ' ']);
    });

    it('handles "Next" button click', async () => {
        const onChangePage = jest.fn();
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={() => {}}
                    currentPage={1}
                />
            </Provider>
        );

        const nextBtn = tree.root.findByProps({
            id: 'next_btn'
        }).props;
        await act(() => nextBtn.onClick());
        expect(onChangePage).toHaveBeenCalledWith(nextPageNumber, 100);
    });

    it('handles "Previous" button click', async () => {
        const onChangePage = jest.fn();
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={() => {}}
                    currentPage={2}
                />
            </Provider>
        );

        const prevBtn = tree.root.findByProps({
            id: 'prev_btn'
        }).props;
        await act(() => prevBtn.onClick());
        expect(onChangePage).toHaveBeenCalledWith(previousPageNumber, 100);
    });

    it('disables "Previous" button on the first page', async () => {
        const onChangePage = jest.fn();
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={() => {}}
                    currentPage={1}
                />
            </Provider>
        );

        const prevBtn = tree.root.findByProps({
            id: 'prev_btn'
        }).props;
        await act(() => prevBtn.onClick());
        expect(onChangePage).not.toHaveBeenCalled();
    });

    it('disables "Next" button on the last page', async () => {
        const onChangePage = jest.fn();
        const tree = create(
            <Provider store={store}>
                <PaginationComponent
                    rowCount={100}
                    rowsPerPage={10}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={() => {}}
                    currentPage={10}
                />
            </Provider>
        );

        const nextBtn = tree.root.findByProps({
            id: 'next_btn'
        }).props;
        await act(() => nextBtn.onClick());
        expect(onChangePage).not.toHaveBeenCalled();
    });
});
