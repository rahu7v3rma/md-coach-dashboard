import { Meta, Story } from '@storybook/react';
import React from 'react';

import EditGroupMembers from '../../src/pages/chat/components/editGroupMembers';

interface EditGroupMembersProps {
    defaultSelectedMembers?: Array<string>;
    onClose?: () => void;
    onNext?: (selectedMembers: Array<string>) => void;
}

export default {
    title: 'Shared/EditGroupMembers',
    component: EditGroupMembers,
    argTypes: {
        onClose: { action: 'onClose' },
        onNext: { action: 'onNext' }
    },
    args: {}
} as Meta;

const Template: Story<EditGroupMembersProps> = (args) => (
    <EditGroupMembers {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    defaultSelectedMembers: [2]
};
