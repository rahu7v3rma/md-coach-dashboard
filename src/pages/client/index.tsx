import { useEffect, useState } from 'react';
import { SortOrder, TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

import ClientIcon from 'src/assets/client-icon.svg';
import { useAppDispatch } from 'src/hooks';
import {
    ClientSelectors,
    getClients,
    sortGroupOrder,
    sortOrder
} from 'src/reducers/client';
import { GroupSelectors, fetchGroupsList } from 'src/reducers/group';
import { getProfile } from 'src/reducers/user';
import { hasAuthToken } from 'src/services/auth';
import { DashboardLayout, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { UserClient, UserGroup } from 'src/types/user';
import { Colors } from 'src/utils/colors';

import DataTable from './components/datatable';
import GroupDataTable from './components/groupTable';

const TableHeader = styled.div`
    margin-top: 12px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const TotalCount = styled.div`
    margin-right: 12px;
    display: flex;
    flex-direction: row;
    gap: 2px;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 8px 14px;
    box-shadow: 0 2px 17px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
`;

const ClientImg = styled.img`
    margin-right: 8px;
`;

const Client = () => {
    const dispatch = useAppDispatch();
    const {
        clients,
        searchInput,
        totalCount,
        loading,
        sortBy,
        order,
        groupSortBy,
        groupOrder
    } = ClientSelectors();
    const { groups } = GroupSelectors();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [value] = useDebounce(searchInput, 1500);
    useEffect(() => {
        dispatch(fetchGroupsList({}));
    }, [dispatch]);

    const handleSort = async (
        column: TableColumn<UserClient>,
        sortDirection: SortOrder
    ) => {
        dispatch(
            sortOrder({
                sortBy: column.id as number,
                order: sortDirection
            })
        );
    };

    const handleGroupSort = async (
        column: TableColumn<UserGroup>,
        sortDirection: SortOrder
    ) => {
        dispatch(
            sortGroupOrder({
                sortBy: column.id as number,
                order: sortDirection
            })
        );
    };

    useEffect(() => {
        if (!hasAuthToken()) {
            navigate('/');
        }

        dispatch(getProfile({}));
    }, [navigate, dispatch]);

    useEffect(() => {
        dispatch(
            getClients({
                page: page,
                limit: limit,
                search: value,
                sortBy: sortBy,
                order: order
            })
        );
    }, [dispatch, limit, page, value, sortBy, order]);

    return (
        <DashboardLayout>
            <GroupDataTable
                data={
                    groups?.filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                    ) ?? []
                }
                sortBy={groupSortBy}
                order={groupOrder}
                handleSort={handleGroupSort}
                loading={loading}
            />
            <TableHeader>
                <Text
                    color={Colors.extra.darkLiver}
                    fontSize={Size.Medium}
                    fontWeight="700"
                    lineHeight="36px"
                >
                    My Private Clients
                </Text>
                <TotalCount>
                    <ClientImg
                        alt="clients"
                        src={ClientIcon}
                        height={16}
                        width={16}
                    />
                    <Text
                        color={Colors.extra.blackText}
                        fontSize={Size.X2Small}
                        fontWeight="500"
                        lineHeight="20px"
                    >
                        {totalCount} Clients
                    </Text>
                </TotalCount>
            </TableHeader>
            <DataTable
                totalCount={totalCount}
                data={loading ? [] : clients}
                limit={limit}
                currentPage={page}
                sortBy={sortBy}
                order={order}
                pagination={true}
                onChangePage={(val) => {
                    if (!val) {
                        setPage(page - 1);
                    } else {
                        setPage(val);
                    }
                }}
                onChangeRowsPerPage={(val) => {
                    setPage(1);
                    setLimit(val);
                }}
                handleSort={handleSort}
                loading={loading}
            />
        </DashboardLayout>
    );
};

export default Client;
