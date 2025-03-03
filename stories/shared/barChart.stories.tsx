import { Meta, Story } from '@storybook/react';
import React from 'react';

import { BarChart } from '../../src/shared';
import { BarChartData } from '../../src/types/chart';

interface BarChartProps {
    title: string;
    color?: string;
    data: Array<BarChartData>;
}

export default {
    title: 'Shared/BarChart',
    component: BarChart,
    args: {}
} as Meta;

const Template: Story<BarChartProps> = (args) => <BarChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Fasting',
    color: '#E19EDF',
    data: [
        {
            x: 'M',
            y: 130
        },
        {
            x: 'T',
            y: 150
        },
        {
            x: 'W',
            y: 450
        },
        {
            x: 'T',
            y: 525
        },
        {
            x: 'F',
            y: 375
        },
        {
            x: 'S',
            y: 225
        },
        {
            x: 'S',
            y: 300
        }
    ]
};
