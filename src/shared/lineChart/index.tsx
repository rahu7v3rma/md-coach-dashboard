import { CSSProperties } from 'react';
import {
    DomainTuple,
    ForAxes,
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryScatter,
    VictoryTheme,
    VictoryTooltip,
    VictoryVoronoiContainer
} from 'victory';

import Text, { Size } from '../text';
import { Colors } from 'src/utils/colors';

import { LineStyle, XAxisStyle, YAxisStyle } from './styles';

export type LineChartData = {
    x: string;
    y: number | null;
};

type Props = {
    title: string;
    color: string;
    data: LineChartData[];
    chartWidth?: number;
    chartHeight?: number;
    containerStyle?: CSSProperties;
    chartPadding?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    labels?: ((point: any, index: number, points: any[]) => string) | undefined;
    xAxisTickFormat?:
        | any[]
        | ((tick: any, index: number, ticks: any[]) => string | number)
        | undefined;
    yAxisTickFormat?:
        | any[]
        | ((tick: any, index: number, ticks: any[]) => string | number)
        | undefined;
    yAxisTickValues?: any[] | undefined;
    tooltipCornerRadius?: number;
    tooltipStyle?: CSSProperties;
    chartDomainPadding?: number;
    tooltipFlyoutStyle?: CSSProperties;
    chartDomain?: ForAxes<DomainTuple> | undefined;
    scatters?: LineChartData[];
    animate?: boolean;
};

const LineChart = ({
    title,
    color,
    data,
    chartWidth,
    chartHeight,
    containerStyle,
    chartPadding,
    labels,
    xAxisTickFormat,
    yAxisTickFormat,
    yAxisTickValues,
    tooltipCornerRadius,
    tooltipStyle,
    chartDomainPadding,
    tooltipFlyoutStyle,
    chartDomain,
    scatters,
    animate = true
}: Props) => {
    return (
        <>
            <Text
                color={Colors.theme.primary}
                fontSize={Size.XSmall}
                fontWeight="600"
            >
                {title}
            </Text>
            <VictoryChart
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
                domainPadding={chartDomainPadding}
                theme={VictoryTheme.material}
                padding={chartPadding}
                width={chartWidth}
                height={chartHeight}
                domain={chartDomain}
            >
                <VictoryAxis
                    dependentAxis
                    style={YAxisStyle}
                    tickFormat={yAxisTickFormat}
                    tickValues={yAxisTickValues}
                />
                <VictoryAxis
                    style={XAxisStyle}
                    offsetX={20}
                    tickFormat={xAxisTickFormat}
                />
                <VictoryLine
                    style={LineStyle(color)}
                    data={data}
                    animate={
                        animate
                            ? {
                                  duration: 2000,
                                  onLoad: { duration: 1000 }
                              }
                            : undefined
                    }
                    interpolation="natural"
                />
                {scatters?.length && (
                    <VictoryScatter
                        style={{
                            data: {
                                fill: color,
                                stroke: color,
                                strokeWidth: 5
                            }
                        }}
                        data={scatters}
                        animate={
                            animate
                                ? {
                                      duration: 2000,
                                      onLoad: { duration: 1000 }
                                  }
                                : undefined
                        }
                    />
                )}
            </VictoryChart>
        </>
    );
};

export default LineChart;
