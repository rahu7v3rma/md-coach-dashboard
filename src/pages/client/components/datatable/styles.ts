import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

interface BadgeProps {
    differenceInDays: number;
}

export const TableWrapper = styled.div`
    border-radius: 20px;
    border: 1px solid ${Colors.theme.primaryLight};
    overflow: hidden;
    .rdt_Table {
        .rdt_TableHead {
            .rdt_TableHeadRow {
                background-color: ${Colors.theme.primary};
                min-height: 0;
                padding: 23px 0;
                .rdt_TableCol {
                    color: #fff;
                    font-weight: 400;
                }
            }
        }
        .rdt_TableBody {
            .rdt_TableRow {
                border-bottom-color: ${Colors.theme.primaryLight};
                cursor: pointer;
                .rdt_TableCell {
                    color: #271a51;
                    font-weight: 500;
                    font-size: 14px;
                }
            }
        }
    }
    .rdt_Pagination {
        background: #fff;
    }
`;

export const EngagementContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const EngagementBadge = styled.div<BadgeProps>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin: auto;
    background-color: ${(props) => {
        if (props.differenceInDays <= 1) {
            return '#4DBA0B';
        } else if (props.differenceInDays <= 7) {
            return '#DCD40F';
        } else {
            return '#D05151';
        }
    }};
`;

export const CellText = styled.div`
    display: flex;
    align-items: center;
    &.green {
        color: #4dba0b;
    }
`;

export const Icon = styled.img`
    margin-left: 5px;
`;
