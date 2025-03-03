import moment from 'moment';
import { useMemo, useState } from 'react';
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

import PaginationComponent from '../pagination';
import ArrowGreen from 'src/assets/arrow-green.png';
import ArrowRed from 'src/assets/arrow-red.png';
import MinusIcon from 'src/assets/minus.png';
import { Loader } from 'src/shared';
import { UserClient } from 'src/types/user';

import { EngagementBadge, Icon, TableWrapper } from './styles';

type Props = {
    data: UserClient[];
    pagination: boolean;
    totalCount: number;
    currentPage: number;
    sortBy: number;
    order: string;
    limit?: number;
    loading?: boolean;
    onChangePage: (value: number) => void;
    onChangeRowsPerPage: (value: number) => void;
    handleSort: (
        column: TableColumn<UserClient>,
        sortDirection: SortOrder
    ) => void;
};

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

const cellText = (newValue: number, secondLastValue: number, unit: string) => {
    return (
        <>
            {roundNumber(newValue || 0)}
            &nbsp;{unit}
            {decideArrowIcon(newValue, secondLastValue)}
        </>
    );
};

const roundNumber = (value: number) => Math.round(value * 100) / 100;

const Table = ({
    data,
    pagination,
    totalCount,
    currentPage,
    sortBy,
    order,
    limit,
    loading,
    onChangePage,
    onChangeRowsPerPage,
    handleSort
}: Props) => {
    const navigate = useNavigate();
    const [nameColumnWidth, setNameColumnWidth] = useState(200);
    const [typeColumnWidth, setTypeColumnWidth] = useState(200);
    const columns: TableColumn<UserClient>[] = useMemo(
        () => [
            {
                name: 'Name',
                selector: (row: UserClient) => {
                    const calculatedWidth = row.name.length * 10;
                    if (calculatedWidth > nameColumnWidth) {
                        setNameColumnWidth(calculatedWidth);
                    }
                    return row.name;
                },
                sortable: true,
                width: `${nameColumnWidth}px`,
                center: true
            },
            {
                name: 'Type',
                selector: (row: UserClient) => {
                    const calculatedWidth = row.type.length * 10;
                    if (calculatedWidth > typeColumnWidth) {
                        setTypeColumnWidth(calculatedWidth);
                    }
                    return row.type;
                },
                sortable: true,
                width: `${typeColumnWidth}px`,
                center: true
            },
            {
                name: 'Engagement',
                selector: (row: UserClient) => row.engagement,
                sortable: true,
                width: '180px',
                cell: (row: UserClient) => EngagementBadgeColor(row.engagement),
                center: true
            },
            {
                name: 'Fasting BG',
                selector: (row: UserClient) => row.fbg || 0,
                sortable: true,
                cell: (row: UserClient) =>
                    cellText(
                        Number(row.fbg),
                        Number(row.second_last_fbg),
                        row.fbg_unit
                    ),
                width: '120px',
                center: true
            },
            {
                name: 'Weight',
                selector: (row: UserClient) => row.last_weight || 0,
                sortable: true,
                cell: (row: UserClient) =>
                    cellText(
                        Number(row.last_weight),
                        Number(row.second_last_weight),
                        row.weight_unit
                    ),
                center: true
            },
            {
                name: '7D Avg FBG',
                selector: (row: UserClient) =>
                    roundNumber(row.last_week_avg_fbg || 0),
                sortable: true,
                width: '180px',
                center: true
            },
            {
                name: 'Activity Type',
                selector: (row: UserClient) => row.activity_type,
                sortable: true,
                cell: (row) => (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {row.activity_type}
                    </div>
                ),
                width: '180px',
                center: true
            },
            {
                name: 'Duration',
                selector: (row: UserClient) =>
                    `${roundNumber(row.duration || 0)} min`,
                sortable: true,
                center: true
            },
            {
                name: 'Weekly Total',
                selector: (row: UserClient) =>
                    `${roundNumber(row.weekly_total || 0)} min`,
                sortable: true,
                width: '180px',
                center: true
            },
            {
                name: 'Hydration',
                selector: (row: UserClient) =>
                    `${roundNumber(row.hydration)} ${row.hydration_unit}`,
                sortable: true,
                width: '180px',
                center: true
            }
        ],
        [nameColumnWidth, typeColumnWidth]
    );

    return (
        <TableWrapper className="table">
            <DataTable
                columns={columns}
                data={data}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                pagination={pagination}
                paginationPerPage={limit}
                paginationComponent={(props) => (
                    <PaginationComponent
                        {...props}
                        rowsPerPage={limit || props.rowsPerPage}
                        rowCount={totalCount || props.rowCount}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                        onChangePage={onChangePage}
                        currentPage={currentPage || props.currentPage}
                    />
                )}
                onRowClicked={(row) => {
                    navigate(`/client/${row?.id}`);
                }}
                onSort={handleSort}
                sortServer
                defaultSortFieldId={sortBy}
                defaultSortAsc={order === 'asc'}
                persistTableHead={true}
                noDataComponent={
                    loading ? <Loader /> : 'There are no records to display'
                }
            />
        </TableWrapper>
    );
};

export default Table;
