import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import Table, { columns } from 'src/pages/client/components/datatable';
import store from 'src/store';
import { userClient } from 'src/utils/mockData';

const navigate = jest.fn();

describe('Table', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('Table renders without errors', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangePage={() => {}}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(tree.root).toBeTruthy();
    });

    it('renders with data and pagination', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangePage={() => {}}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        expect(tableComponent.pagination).toBe(true);
        expect(tableComponent.data).toStrictEqual([]);
    });

    it('handles row click', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangePage={() => {}}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        await act(() =>
            tableComponent.onRowClicked({
                id: 'id'
            })
        );
        expect(navigate).toHaveBeenCalledWith('/client/id');
    });

    it('renders column headers', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangePage={() => {}}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        expect(tableComponent.columns).toStrictEqual(columns);
        expect(tableComponent).toBeTruthy();
    });

    it('renders data in rows', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={userClient}
                        currentPage={1}
                        pagination={true}
                        onChangePage={() => {}}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        expect(tableComponent.data).toStrictEqual(userClient);
        expect(tableComponent).toBeTruthy();
    });

    it('handles pagination change', async () => {
        const onChangePage = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        await act(() => tableComponent.onChangePage(3));
        expect(onChangePage).toHaveBeenCalledWith(3);
    });

    it('handles changing rows per page', async () => {
        const onChangeRowsPerPage = jest.fn();
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                        onChangePage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        await act(() => tableComponent.onChangeRowsPerPage(10));
        expect(onChangeRowsPerPage).toHaveBeenCalledWith(10);
    });

    it('renders with empty data', async () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <Table
                        totalCount={70}
                        data={[]}
                        currentPage={1}
                        pagination={true}
                        onChangePage={() => {}}
                        onChangeRowsPerPage={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );
        let tableComponent = tree.root.findByProps({
            columns: columns
        }).props;
        expect(tableComponent.data).toStrictEqual([]);
        expect(tableComponent).toBeTruthy();
    });
});
