import {
    VictoryLabelStyleObject,
    VictoryStyleInterface,
    VictoryStyleObject,
    VictoryTickStyleObject
} from 'victory';

type AxisStyle =
    | {
          parent?: VictoryStyleObject | undefined;
          axis?: VictoryStyleObject | undefined;
          axisLabel?:
              | VictoryLabelStyleObject
              | VictoryLabelStyleObject[]
              | undefined;
          grid?: VictoryStyleObject | undefined;
          ticks?: VictoryTickStyleObject | undefined;
          tickLabels?:
              | VictoryLabelStyleObject
              | VictoryLabelStyleObject[]
              | undefined;
      }
    | undefined;

export const YAxisStyle: AxisStyle = {
    axis: { stroke: 'transparent' },
    ticks: { stroke: 'transparent' }
};

export const LineStyle = (
    color?: string
): VictoryStyleInterface | undefined => ({
    data: { stroke: color }
});

export const ScatterStyle: VictoryStyleInterface = {
    data: {
        fill: 'red',
        stroke: 'red',
        strokeWidth: 5
    }
};

export const XAxisStyle: AxisStyle = {
    axis: { stroke: 'transparent' },
    ticks: { stroke: 'transparent' }
};
