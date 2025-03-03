import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MessageInput } from '../../src/pages/chat/components';

interface MessageInputProps {
    handleAttachmentClick?: () => void;
    handleEmojjiClick?: () => void;
    handleSendClick?: () => void;
}

export default {
    title: 'Shared/MessageInput',
    component: MessageInput,
    argTypes: {
        handleAttachmentClick: { action: 'handleAttachmentClick' },
        handleEmojjiClick: { action: 'handleEmojjiClick' },
        handleSendClick: { action: 'handleSendClick' }
    },
    args: {}
} as Meta;

const Template: Story<MessageInputProps> = (args) => <MessageInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
