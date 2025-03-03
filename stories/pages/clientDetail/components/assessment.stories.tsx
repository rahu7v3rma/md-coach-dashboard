import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Assessment } from '../../../../src/pages/clientDetail/components';
import { AssessmentProps } from '../../../../src/pages/clientDetail/components/assessment';

export default {
    title: 'Shared/Assessment',
    component: Assessment,
    args: {}
} as Meta;

const Template: Story<AssessmentProps> = (args) => <Assessment {...args} />;

export const Primary = Template.bind({});
const AssessmentData = [
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
    list: AssessmentData,
    width: 1200,
    height: 50
};
