import { Meta, Story } from '@storybook/react';
import React from 'react';

import { IntakeList } from '../../../../src/pages/clientDetail/components';
import { IntakeListProps } from '../../../../src/pages/clientDetail/components/intakeList';

export default {
    title: 'Shared/IntakeList',
    component: IntakeList,
    args: {}
} as Meta;

const Template: Story<IntakeListProps> = (args) => <IntakeList {...args} />;

export const Primary = Template.bind({});
const intakeListData = [
    {
        key: 'Starting Weight',
        value: 217
    },
    {
        key: 'Ideal Weight',
        value: 168
    },
    {
        key: 'Year Diagnosed',
        value: 2011
    }
];
Primary.args = {
    list: intakeListData,
    width: 1200,
    height: 50
};
