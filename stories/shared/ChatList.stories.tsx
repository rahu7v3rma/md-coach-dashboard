import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ChatList } from '../../src/pages/chat/components';

interface ChatListProps {}

export default {
    title: 'Shared/ChatList',
    component: ChatList,
    argTypes: {},
    args: {}
} as Meta;

const Template: Story<ChatListProps> = (args) => <ChatList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
