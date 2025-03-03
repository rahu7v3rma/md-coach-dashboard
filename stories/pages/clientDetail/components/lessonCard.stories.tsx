import { Meta, Story } from '@storybook/react';
import React from 'react';

import { LessonCard } from '../../../../src/pages/clientDetail/components';
import { Props } from '../../../../src/pages/clientDetail/components/lessonCard';

export default {
    title: 'Shared/LessonCard',
    component: LessonCard,
    args: {}
} as Meta;

const Template: Story<Props> = (args) => <LessonCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    imageUrl: 'assets/avatars/Avatar0.png',
    title: 'Test Title',
    subTitle: 'Subtitle',
    time: '4 mins'
};
