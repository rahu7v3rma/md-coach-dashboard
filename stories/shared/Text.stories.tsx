import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Text } from '../../src/shared';
import { FontWeight, Size } from '../../src/shared/text';

interface TextProps {
    children?: React.ReactNode;
    color?: string;
    fontSize?: Size;
    fontWeight?: FontWeight;
    textAlign?: 'center' | 'left' | 'right' | 'justify';
    textDecorationLine?:
        | 'overline'
        | 'line-through'
        | 'underline'
        | 'underline overline';
    textDecorationColor?: string;
    textDecorationStyle?: 'solid' | 'wavy' | 'double' | 'dotted' | 'dashed';
    textDecorationThickness?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    textIndent?: number;
    lineSpacing?: number;
    lineHeight?: number;
    wordSpacing?: number;
    textShadow?: string;
}

export default {
    title: 'Shared/Text',
    component: Text,
    argTypes: {},
    args: {}
} as Meta;

const Template: Story<TextProps> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
    color: '',
    fontSize: Size.Medium,
    fontWeight: '400',
    textAlign: 'left',
    textDecorationLine: 'underline',
    textDecorationColor: '',
    textDecorationStyle: 'solid',
    textDecorationThickness: '',
    textTransform: 'none',
    textIndent: 0,
    lineSpacing: 0,
    lineHeight: 0,
    wordSpacing: 0,
    textShadow: ''
};
