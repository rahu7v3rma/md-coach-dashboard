import { CSSProperties, FunctionComponent } from 'react';
import {
    DomainTuple,
    ForAxes,
    PaddingType,
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryTooltip,
    VictoryVoronoiContainer
} from 'victory';

import Text, { Size } from 'src/shared/text';
import { BarChartData } from 'src/types/chart';
import { Colors } from 'src/utils/colors';

import { BarStyle, Gap, XAxisStyle, YAxisStyle } from './styles';

type Props = {
    title: string;
    color?: string;
    data: Array<BarChartData>;
    chartHeight?: number;
    chartWidth?: number;
    chartPadding?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    xAxisTickFormat?: ((...args: any[]) => any) | unknown[];
    containerStyle?: CSSProperties;
    labels?: ((point: any, index: number, points: any[]) => string) | undefined;
    tooltipFlyoutStyle?: CSSProperties;
    tooltipStyle?: CSSProperties;
    tooltipCornerRadius?: number;
    chartDomain?: ForAxes<DomainTuple> | undefined;
    chartDomainPadding?: ForAxes<PaddingType> | undefined;
};

const BarChart: FunctionComponent<Props> = ({
    title,
    color,
    data,
    chartHeight,
    chartWidth,
    chartPadding,
    xAxisTickFormat,
    containerStyle,
    labels,
    tooltipFlyoutStyle,
    tooltipStyle,
    tooltipCornerRadius,
    chartDomain,
    chartDomainPadding
}: Props) => {
    const noData = data.every((entry) => entry.y === 0);
    const yAxisTickFormat = noData ? [0, 10, 20, 30, 40, 50, 60] : undefined;
    return (
        <>
            <Text
                color={Colors.theme.primary}
                fontSize={Size.XSmall}
                fontWeight="600"
            >
                {title}
            </Text>
            <Gap height={20} />
            <VictoryChart
                domain={chartDomain}
                domainPadding={chartDomainPadding}
                width={chartWidth}
                height={chartHeight}
                padding={chartPadding}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={labels}
                        labelComponent={
                            <VictoryTooltip
                                pointerLength={5}
                                flyoutStyle={tooltipFlyoutStyle}
                                style={tooltipStyle}
                                cornerRadius={tooltipCornerRadius}
                                constrainToVisibleArea={true}
                            />
                        }
                        style={containerStyle}
                    />
                }
            >
                <VictoryAxis
                    crossAxis={false}
                    dependentAxis
                    style={YAxisStyle}
                    tickFormat={yAxisTickFormat}
                />
                <VictoryBar barWidth={15} style={BarStyle(color)} data={data} />
                <VictoryAxis style={XAxisStyle} tickFormat={xAxisTickFormat} />
            </VictoryChart>
        </>
    );
};

export default BarChart;
