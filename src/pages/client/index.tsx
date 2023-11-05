import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

import ClientIcon from 'src/assets/client-icon.svg';
import { useAppDispatch } from 'src/hooks';
import { ClientSelectors, getClients } from 'src/reducers/client';
import { getProfile } from 'src/reducers/user';
import { hasAuthToken } from 'src/services/auth';
import { DashboardLayout, Loader, Text } from 'src/shared';
import { Colors } from 'src/utils/colors';

import DataTable from './components/datatable';

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
    const { clients, searchInput, totalCount, loading } = ClientSelectors();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [value] = useDebounce(searchInput, 1500);

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
                search: value
            })
        );
    }, [dispatch, limit, page, value]);

    return (
        <DashboardLayout>
            <TableHeader>
                <Text
                    color={Colors.extra.black}
                    fontSize={32}
                    fontWeight="700"
                    lineHeight="36px"
                >
                    My Clients
                </Text>
                <TotalCount>
                    <ClientImg
                        alt="clients"
                        src={ClientIcon}
                        height={16}
                        width={16}
                    />
                    <Text
                        color="#271A51"
                        fontSize={14}
                        fontWeight="500"
                        lineHeight="20px"
                    >
                        {totalCount} Clients
                    </Text>
                </TotalCount>
            </TableHeader>
            {loading ? (
                <Loader />
            ) : (
                <DataTable
                    totalCount={totalCount}
                    data={clients}
                    currentPage={page}
                    pagination={true}
                    onChangePage={(val) => {
                        if (!val) {
                            setPage(page - 1);
                        } else {
                            setPage(val);
                        }
                    }}
                    onChangeRowsPerPage={(val) => {
                        setLimit(val);
                    }}
                />
            )}
        </DashboardLayout>
    );
};

export default Client;
