import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ChatHeader } from '../../src/pages/chat/components';

interface ChatHeaderProps {
    chatTitle?: string;
    onCollapseButtonClick?: Function;
}

export default {
    title: 'Shared/ChatHeader',
    component: ChatHeader,
    argTypes: {
        onCollapseButtonClick: { action: 'onCollapseButtonClick' }
    },
    args: {}
} as Meta;

const Template: Story<ChatHeaderProps> = (args) => <ChatHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    chatTitle: 'Anna Armas'
};
