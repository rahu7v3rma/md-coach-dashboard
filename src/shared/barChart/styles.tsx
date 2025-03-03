import styled from 'styled-components';
import {
    VictoryLabelStyleObject,
    VictoryStyleInterface,
    VictoryStyleObject,
    VictoryTickStyleObject
} from 'victory';

import { Colors } from 'src/utils/colors';

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
    grid: {
        stroke: Colors.extra.border_bottom_color,
        strokeWidth: 1
    },
    axis: {
        stroke: 'transparent'
    }
};

export const BarStyle = (
    color?: string
): VictoryStyleInterface | undefined => ({
    data: { fill: color }
});

export const XAxisStyle: AxisStyle = {
    axis: { stroke: 'transparent' }
};

export const Gap = styled.div<{ height: number }>`
    height: ${(p) => p.height}px;
`;
