import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Card } from '../../src/shared';
import { Colors } from '../../src/utils/colors';

interface CardProps {
    children?: React.ReactNode;
    backgroundColor?: string;
    borderWidth?: string;
    borderColor?: string;
    borderStyle?: string;
    borderRadius?: string;
    padding?: string;
    width?: string;
    height?: string;
};

export default {
    title: 'Shared/Card',
    component: Card,
    args: {}
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'card',
    backgroundColor: Colors.extra.white,
    borderWidth: '1px',
    borderColor: Colors.extra.white,
    borderStyle: 'solid',
    borderRadius: '16px',
    padding: '16px 12px',
    width: '100%',
    height: '70vh'
};
