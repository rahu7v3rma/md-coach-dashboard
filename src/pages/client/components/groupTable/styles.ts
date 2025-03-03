import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

export const TableHeader = styled.div`
    margin-top: 12px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TableWrapper = styled.div`
    border-radius: 20px;
    margin-bottom: 40px;
    border: 1px solid ${Colors.theme.primaryLight};
    overflow: hidden;
    .rdt_Table {
        .rdt_TableHead {
            .rdt_TableHeadRow {
                background-color: ${Colors.theme.primary};
                min-height: 0;
                padding: 23px 0;
                .rdt_TableCol {
                    color: ${Colors.extra.white};
                    font-weight: 400;
                }
            }
        }
        .rdt_TableBody {
            .rdt_TableRow {
                border-bottom-color: ${Colors.theme.primaryLight};
                cursor: pointer;
                .rdt_TableCell {
                    :nth-child(3) div {
                        white-space: wrap;
                    }
                    color: ${Colors.extra.black_text};
                    font-weight: 500;
                    font-size: 14px;
                }
            }
        }
    }
    .rdt_Pagination {
        background: ${Colors.extra.white};
    }
`;

export const LinkText = styled.a`
    color: ${Colors.theme.primary};
`;
