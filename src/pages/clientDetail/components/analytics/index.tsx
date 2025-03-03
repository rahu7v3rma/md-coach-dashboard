import moment from 'moment';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'src/hooks';
import { ClientSelectors, getUserAnalytics } from 'src/reducers/client';
import { BarChart, Dropdown as CustomDropdown, LineChart } from 'src/shared';
import { LineChartData } from 'src/shared/lineChart';
import { timeFrames } from 'src/utils/constants';

import {
    BarChart as BarChartStyle,
    Card,
    Cards,
    Container,
    HeaderContainer,
    LineChart as LineChartStyle,
    Title
} from './styled';

export type Props = {};

const fillMissingData = (data: LineChartData[]) => {
    const filledData: LineChartData[] = [];
    const missingData: LineChartData[] = [];
    structuredClone(data).forEach((entry, index) => {
        if (!entry.y) {
            let ls = 0;
            let rs = 0;
            let it = index;
            while (it > 0) {
                if (data[it - 1]?.y) {
                    ls = Number(data[it - 1].y);
                    break;
                }
                it--;
            }
            it = index;
            while (it < data.length - 1) {
                if (data[it + 1]?.y) {
                    rs = Number(data[it + 1].y);
                    break;
                }
                it++;
            }
            entry.y = (ls + rs) / 2;
            missingData.push(entry);
        }
        filledData.push(entry);
    });
    return [filledData, missingData];
};

const calculateYAxisTickValues = (data: LineChartData[]) => {
    let maxY = Math.max(...data.map((each) => Number(each.y)));
    while (maxY % 100 !== 0) maxY += 1;
    const tickValues = Array.from(
        { length: maxY / 100 + 1 },
        (_, i) => i * 100
    );
    return tickValues;
};

const Analytics: FC<Props> = () => {
    const { analytics } = ClientSelectors();
    const cardRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState(
        moment().subtract(6, 'days').format('YYYY-MM-DD')
    );
    const [endDate] = useState(moment().format('YYYY-MM-DD'));
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [dimensionsSet, setDimensionsSet] = useState(false);

    const [cardWidth, setCardWidth] = useState(500);
    const [cardHeight, setCardHeight] = useState(320);

    const dropdownValue = useRef<number>(7);
    const [animate, setAnimate] = useState(true);

    const setCardDimension = useCallback(() => {
        if (cardRef.current) {
            setCardWidth(cardRef.current.offsetWidth - 50);
            setCardHeight(cardRef.current.offsetHeight - 90);
            setDimensionsSet(true); // Indicate that dimensions have been set
        }
    }, [cardRef]);

    // Adjust useEffect for setting dimensions
    useEffect(() => {
        setCardDimension();
        window.addEventListener('resize', setCardDimension);
        return () => window.removeEventListener('resize', setCardDimension);
    }, [setCardDimension]);

    useEffect(() => {
        if (!dimensionsSet) {
            setCardDimension();
        }
    }, [dimensionsSet, setCardDimension]);

    useEffect(() => {
        setCardDimension();
        window.addEventListener('resize', setCardDimension);
        return () => window.removeEventListener('resize', setCardDimension);
    }, [setCardDimension]);

    useEffect(() => {
        if (id) {
            dispatch(
                getUserAnalytics({
                    id,
                    startDate,
                    endDate
                })
            );
        }
    }, [dispatch, endDate, id, startDate]);

    const cardsCalculated = useMemo(
        () =>
            structuredClone(analytics).map((card: any) => {
                if (card.chart.type === 'line') {
                    [card.chart.data, card.chart.scatters] = fillMissingData(
                        card.chart.data
                    );
                    card.chart.yAxisTickValues = calculateYAxisTickValues(
                        card.chart.data
                    );
                }
                return card;
            }),
        [analytics]
    );

    const onChangeHandler = useCallback((selOption: any) => {
        if (Number(selOption.value) < dropdownValue.current) {
            setAnimate(false);
        } else {
            setAnimate(true);
        }
        dropdownValue.current = Number(selOption.value);
        if (selOption.value === '7') {
            setStartDate(moment().subtract(6, 'days').format('YYYY-MM-DD'));
        } else if (selOption.value === '14') {
            setStartDate(moment().subtract(13, 'days').format('YYYY-MM-DD'));
        } else if (selOption.value === '30') {
            setStartDate(moment().subtract(29, 'days').format('YYYY-MM-DD'));
        } else if (selOption.value === '90') {
            setStartDate(moment().subtract(89, 'days').format('YYYY-MM-DD'));
        }
    }, []);

    return (
        <Container>
            <HeaderContainer>
                <Title />
                <CustomDropdown
                    options={timeFrames}
                    onChange={onChangeHandler}
                    value={timeFrames[0]}
                    placeholder="Select time frame"
                />
            </HeaderContainer>
            <Cards>
                {cardsCalculated.map((card: any, cardIndex: number) => {
                    let modifiedData = card.chart.data.map((item: any) => ({
                        ...item,
                        l: true
                    }));
                    return card.chart.type === 'line' ? (
                        <Card ref={cardRef} key={cardIndex}>
                            <LineChart
                                title={card.title}
                                color={card.color}
                                data={modifiedData}
                                chartPadding={LineChartStyle.chartPadding}
                                chartWidth={cardWidth}
                                chartHeight={cardHeight + 10}
                                labels={({ datum }) =>
                                    datum.l
                                        ? `${datum.x}\n${datum.y} ${datum.unit}`
                                        : ''
                                }
                                xAxisTickFormat={(tick) =>
                                    moment(tick, 'DD/MM/YYYY').format('dddd')[0]
                                }
                                containerStyle={{
                                    height: cardHeight + 10
                                }}
                                tooltipCornerRadius={20}
                                tooltipStyle={LineChartStyle.tooltipStyle}
                                tooltipFlyoutStyle={
                                    LineChartStyle.tooltipFlyoutStyle
                                }
                                chartDomainPadding={25}
                                scatters={card.chart?.scatters}
                                yAxisTickValues={card.chart?.yAxisTickValues}
                                animate={animate}
                            />
                        </Card>
                    ) : card.chart.type === 'bar' ? (
                        <Card key={cardIndex}>
                            <BarChart
                                title={card.title}
                                color={card.color}
                                data={card.chart.data}
                                chartWidth={cardWidth}
                                chartHeight={cardHeight}
                                chartPadding={BarChartStyle.chartPadding}
                                xAxisTickFormat={(tick) =>
                                    moment(tick, 'DD/MM/YYYY').format('dddd')[0]
                                }
                                containerStyle={{
                                    height: cardHeight
                                }}
                                labels={({ datum }) =>
                                    `${datum.x}\n${datum.y} ${datum.unit}`
                                }
                                tooltipFlyoutStyle={
                                    BarChartStyle.tooltipFlyoutStyle
                                }
                                tooltipStyle={BarChartStyle.tooltipStyle}
                                tooltipCornerRadius={10}
                                chartDomainPadding={{ x: 50, y: 50 }}
                            />
                        </Card>
                    ) : (
                        <></>
                    );
                })}
            </Cards>
        </Container>
    );
};

export default Analytics;
