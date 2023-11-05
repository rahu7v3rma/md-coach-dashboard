import moment from 'moment';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

import PaginationComponent from '../pagination';
import ArrowGreen from 'src/assets/arrow-green.png';
import ArrowRed from 'src/assets/arrow-red.png';
import MinusIcon from 'src/assets/minus.png';
import { UserClient } from 'src/types/user';

import { EngagementBadge, Icon, TableWrapper } from './styles';

type Props = {
    data: UserClient[];
    pagination: boolean;
    totalCount: number;
    currentPage: number;
    onChangePage: (value: number) => void;
    onChangeRowsPerPage: (value: number) => void;
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

const cellText = (newValue: number, secondLastValue: number) => {
    return (
        <>
            {newValue || 0}
            {decideArrowIcon(newValue, secondLastValue)}
        </>
    );
};

export const columns: TableColumn<UserClient>[] = [
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
        selector: (row: UserClient) => row.group,
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
        selector: (row: UserClient) => row.last_week_avg_fbg || 0,
        sortable: true,
        width: '130px'
    },
    {
        name: 'Activity Type',
        selector: (row: UserClient) => row.activity_type,
        sortable: true,
        cell: (row) => (
            <div style={{ whiteSpace: 'pre-wrap' }}>{row.activity_type}</div>
        ),
        width: '130px'
    },
    {
        name: 'Duration',
        selector: (row: UserClient) => `${row.duration || 0} min`,
        sortable: true
    },
    {
        name: 'Weekly Total',
        selector: (row: UserClient) => `${row.weekly_total || 0} min`,
        sortable: true,
        width: '130px'
    },
    {
        name: 'Hydration',
        selector: (row: UserClient) => `${row.hydration} ${row.hydration_unit}`,
        sortable: true,
        width: '130px'
    }
];

const Table = ({
    data,
    pagination,
    totalCount,
    currentPage,
    onChangePage,
    onChangeRowsPerPage
}: Props) => {
    const navigate = useNavigate();

    return (
        <TableWrapper className="table">
            <DataTable
                columns={columns}
                data={data}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                pagination={pagination}
                paginationComponent={(props) => (
                    <PaginationComponent
                        {...props}
                        rowCount={totalCount || props.rowCount}
                        onChangePage={onChangePage}
                        currentPage={currentPage || props.currentPage}
                    />
                )}
                onRowClicked={(row) => {
                    navigate(`/client/${row?.id}`);
                }}
            />
        </TableWrapper>
    );
};

export default Table;
