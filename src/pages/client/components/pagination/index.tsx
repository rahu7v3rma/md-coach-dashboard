import { PaginationComponentProps } from 'react-data-table-component';

import { ClientSelectors } from 'src/reducers/client';
import Text from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import { Container, PaginationButton, Select, Wrapper } from './styles';

const PaginationComponent = (props: PaginationComponentProps) => {
    const {
        currentPage,
        rowsPerPage,
        rowCount,
        onChangePage,
        onChangeRowsPerPage
    } = props;
    const { nextPageNumber, previousPageNumber, hasPrevious, hasNext } =
        ClientSelectors();

    const totalPages = Math.ceil(rowCount / rowsPerPage);
    const rowsOnCurrentPageFrom = currentPage * rowsPerPage - (rowsPerPage - 1);
    const rowsOnCurrentPageTo = currentPage * rowsPerPage;
    const totalRows = rowCount;
    const options = [10, 20, 50, 100];
    const onPrevious = () => {
        if (currentPage > 1) {
            onChangePage(previousPageNumber, totalRows);
        }
    };

    const onNext = () => {
        if (currentPage < totalPages) {
            onChangePage(nextPageNumber, totalRows);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Text color={Colors.theme.gray} fontWeight="500">
                    Showing {rowsOnCurrentPageFrom} to {rowsOnCurrentPageTo} of{' '}
                    {totalRows} Clients
                </Text>
                <Select
                    id="row-dropdown"
                    aria-label="rows-per-page-dropwon"
                    value={rowsPerPage}
                    onChange={(e) =>
                        onChangeRowsPerPage(Number(e.target.value), currentPage)
                    }
                >
                    {options?.map((value, key) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </Select>
            </Container>
            <Container>
                <PaginationButton
                    className={`${!hasPrevious ? 'disabled' : ''}`}
                    id="prev_btn"
                    onClick={onPrevious}
                >
                    Previous
                </PaginationButton>
                <Text color={Colors.extra.silverSand}>
                    {' '}
                    {currentPage} of {totalPages}{' '}
                </Text>
                <PaginationButton
                    className={`${!hasNext ? 'disabled' : ''}`}
                    id="next_btn"
                    onClick={onNext}
                >
                    Next
                </PaginationButton>
            </Container>
        </Wrapper>
    );
};

export default PaginationComponent;
