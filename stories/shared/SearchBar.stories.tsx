import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SearchBar } from '../../src/pages/chat/components';

interface SearchBarProps {
    onSearch?: Function;
}

export default {
    title: 'Shared/SearchBar',
    component: SearchBar,
    argTypes: {
        onSearch: { action: 'onSearch' }
    },
    args: {}
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
