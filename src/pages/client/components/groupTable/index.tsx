import { useCallback } from 'react';
import DataTable, {
    Selector,
    SortOrder,
    TableColumn
} from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

import { Loader, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { UserGroup } from 'src/types/user';
import { Colors } from 'src/utils/colors';

import { LinkText, TableHeader, TableWrapper } from './styles';

type Props = {
    data: UserGroup[];
    sortBy: number;
    order: string;
    loading?: boolean;
    handleSort: (
        column: TableColumn<UserGroup>,
        sortDirection: SortOrder
    ) => void;
};

export const groupColumn: TableColumn<UserGroup>[] = [
    {
        name: 'Group Name',
        selector: (row: UserGroup) => row.name,
        sortable: true,
        width: '240px'
    },
    {
        name: 'Group Type',
        selector: (row: UserGroup) => row.group_type,
        sortable: true,
        width: '240px'
    },
    {
        name: 'Program',
        selector: (row: UserGroup) => row.program || 'Program',
        sortable: true,
        width: '240px'
    },
    {
        name: 'Attendance',
        selector: (row: UserGroup) => row.attendance_sheet_url || 'attendance',
        sortable: true,
        cell: (row: UserGroup) => (
            <LinkText href={row.attendance_sheet_url} target="_new">
                {row.attendance_sheet_url}
            </LinkText>
        )
    }
];

const customSort = (
    rows: UserGroup[],
    selector: Selector<UserGroup>,
    direction: 'asc' | 'desc'
) => {
    return rows.sort((rowA, rowB) => {
        let rowAField = selector(rowA);
        let rowBField = selector(rowB);

        if (!rowAField) {
            return 1;
        } else if (!rowBField) {
            return -1;
        } else {
            if (rowAField === rowBField) return 0;

            const comparison = rowAField > rowBField ? 1 : -1;

            return direction === 'desc' ? comparison * -1 : comparison;
        }
    });
};

const Table = ({ data, sortBy, order, loading, handleSort }: Props) => {
    const navigate = useNavigate();

    const goGroupPage = useCallback(
        (row: UserGroup) => {
            if (row.members.length === 0) {
                alert('no member found!');
                return;
            }
            navigate(`/group/${row.id}/member/${row.members[0].id}`);
        },
        [navigate]
    );

    return (
        <>
            <TableHeader>
                <Text
                    color={Colors.extra.black}
                    fontSize={Size.Medium}
                    fontWeight="700"
                    lineHeight="36px"
                >
                    My Small Groups
                </Text>
            </TableHeader>
            <TableWrapper className="table">
                <DataTable
                    columns={groupColumn}
                    data={data}
                    onRowClicked={goGroupPage}
                    onSort={handleSort}
                    defaultSortFieldId={sortBy}
                    defaultSortAsc={order === 'asc'}
                    persistTableHead={true}
                    noDataComponent={
                        loading ? <Loader /> : 'There are no records to display'
                    }
                    sortFunction={customSort}
                />
            </TableWrapper>
        </>
    );
};

export default Table;
