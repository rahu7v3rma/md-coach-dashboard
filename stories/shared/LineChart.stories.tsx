import { Meta, Story } from '@storybook/react';
import React from 'react';

import LineChart from '../../src/shared/lineChart';

export default {
    title: 'Shared/LineChart',
    component: LineChart,
    args: {}
} as Meta;

const Template: Story<any> = (args) => <LineChart {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title: 'Title',
    color: '#c43a31',
    data: [
        { x: 'Mon', y: 2 },
        { x: 'Tue', y: 3 },
        { x: 'Wed', y: 5 },
        { x: 'Thu', y: 4 },
        { x: 'Fri', y: 7 },
        { x: 'Sat', y: 4 },
        { x: 'Sun', y: 3 }
    ]
};
