import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { act, create } from 'react-test-renderer';

import { EngagementBadge, Icon } from '../styles';
import ArrowGreen from 'src/assets/arrow-green.png';
import ArrowRed from 'src/assets/arrow-red.png';
import MinusIcon from 'src/assets/minus.png';
import Table from 'src/pages/client/components/datatable';
import store from 'src/store';
import { UserClient } from 'src/types/user';
import { userClient } from 'src/utils/mockData';

const navigate = jest.fn();
const mockHandleSort = jest.fn();

const EngagementBadgeColor = (newValue: string) => {
    const lastLogDate = moment(newValue, 'YYYY-MM-DD');
    const today = moment(new Date(), 'YYYY-MM-DD');
    const differenceInDays = today.diff(lastLogDate, 'days');
    return <EngagementBadge differenceInDays={differenceInDays} />;
};

const decideArrowIcon = (newValue: number, secondLastValue: number) => {
    if (newValue === secondLastValue) {
        return <Icon src={MinusIcon} alt="arrow" />;
    } else if (newValue > secondLastValue) {
        return <Icon src={ArrowGreen} alt="arrow" />;
    }
    return <Icon src={ArrowRed} alt="arrow" />;
};

const cellText = (newValue: number, secondLastValue: number) => {
    return (
        <>
            {roundNumber(newValue || 0)}
            {decideArrowIcon(newValue, secondLastValue)}
        </>
    );
};

const roundNumber = (value: number) => Math.round(value * 100) / 100;

const columns = [
    {
        name: 'Name',
        selector: (row: UserClient) => row.name,
        sortable: true,
        width: '150px'
    },
    {
        name: 'Type',
        selector: (row: UserClient) => row.type,
        sortable: true
    },
    {
        name: 'Group',
        selector: (row: UserClient) => row.group || 'Private client',
        sortable: true
    },
    {
        name: 'Engagement',
        selector: (row: UserClient) => row.engagement,
        sortable: true,
        cell: (row: UserClient) => EngagementBadgeColor(row.engagement),
        width: '130px'
    },
    {
        name: 'Fasting BG',
        selector: (row: UserClient) => row.fbg || 0,
        sortable: true,
        cell: (row: UserClient) =>
            cellText(Number(row.fbg), Number(row.second_last_fbg)),
        width: '130px'
    },
    {
        name: 'Weight',
        selector: (row: UserClient) => row.last_weight || 0,
        sortable: true,
        cell: (row: UserClient) =>
            cellText(Number(row.last_weight), Number(row.second_last_weight))
    },
    {
        name: '7D Avg FBG',
        selector: (row: UserClient) => roundNumber(row.last_week_avg_fbg || 0),
        sortable: true,
        width: '130px'
    },
    {
        name: 'Activity Type',
        selector: (row: UserClient) => row.activity_type,
        sortable: true,
        cell: (row: UserClient) => (
            <div style={{ whiteSpace: 'pre-wrap' }}>{row.activity_type}</div>
        ),
        width: '130px'
    },
    {
        name: 'Duration',
        selector: (row: UserClient) => `${roundNumber(row.duration || 0)} min`,
        sortable: true
    },
    {
        name: 'Weekly Total',
        selector: (row: UserClient) =>
            `${roundNumber(row.weekly_total || 0)} min`,
        sortable: true,
        width: '130px'
    },
    {
        name: 'Hydration',
        selector: (row: UserClient) =>
            `${roundNumber(row.hydration)} ${row.hydration_unit}`,
        sortable: true,
        width: '130px'
    }
];

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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        limit={50}
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
                        sortBy={0}
                        order="asc"
                        handleSort={mockHandleSort}
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
