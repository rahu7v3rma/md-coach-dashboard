import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Option } from 'react-dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import ListBookItems from '../ListBookItems';
import { useAppDispatch } from 'src/hooks';
import { ClientSelectors, getLogBook } from 'src/reducers/client';
import Dropdown from 'src/shared/dropdown';
import Text, { Size } from 'src/shared/text';
import { logType } from 'src/types/log';
import { Colors } from 'src/utils/colors';
import { logTypeDetails } from 'src/utils/constants';

import { OptionImage, OptionLabelContainer } from './styles';

function LogBookSection() {
    const dispatch = useAppDispatch();
    const { logBook } = ClientSelectors();

    const { id } = useParams();

    const { list, next_page_number, has_next } = !logBook[id as string]
        ? ({} as any)
        : logBook[id as string];

    const list_grouped =
        list &&
        Object.entries(
            list.reduce((group: { [key: string]: logType[] }, log: logType) => {
                const { log_time } = log;
                const logtimeDate = moment(log_time)
                    .utc()
                    .format('DD MMM YYYY');
                group[logtimeDate] = group[logtimeDate] ?? [];
                group[logtimeDate].push(log);
                return group;
            }, {})
        );

    const options: Option[] = Object.keys(logTypeDetails).map((log) => ({
        value: log,
        label: (
            <OptionLabelContainer>
                <OptionImage src={logTypeDetails[log]['icon']} alt="" />
                <Text
                    fontFamily="Poppins"
                    fontWeight="500"
                    fontSize={Size.X2Small}
                    lineHeight="20px"
                    color={Colors.extra.black}
                >
                    {logTypeDetails[log]['title']}
                </Text>
            </OptionLabelContainer>
        )
    }));

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const loadMoreData = useCallback(() => {
        dispatch(
            getLogBook({
                page: next_page_number,
                limit: 10,
                user_id: id ?? '',
                category: selectedOption.value
            })
        )
            .unwrap()
            .catch(() => {
                alert('An unknown error has occurred');
            });
    }, [dispatch, id, next_page_number, selectedOption]);

    const getData = useCallback(() => {
        dispatch(
            getLogBook({
                page: 1,
                limit: 10,
                user_id: id ?? '',
                category: selectedOption.value
            })
        )
            .unwrap()
            .catch(() => {
                alert('An unknown error has occurred');
            });
    }, [dispatch, id, selectedOption]);

    useEffect(() => {
        getData();
    }, [selectedOption, getData]);

    return (
        <>
            <Dropdown
                options={options}
                onChange={setSelectedOption}
                value={selectedOption}
                placeholder="Select an option"
            />
            <InfiniteScroll
                dataLength={list?.length || 10}
                next={loadMoreData}
                hasMore={has_next}
                scrollableTarget="logBookDiv"
                loader={<h4>Loading...</h4>}
                data-testid="infinite-scroll"
            >
                {list_grouped &&
                    list_grouped.map(
                        (log: [string, logType[]], idx: number) => {
                            return (
                                <ListBookItems
                                    list={log[1]}
                                    groupTitle={log[0]}
                                    key={`logbook-${idx}`}
                                />
                            );
                        }
                    )}
            </InfiniteScroll>
        </>
    );
}

export default LogBookSection;
