import React from 'react';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

import ChatHeader from '../../chatHeader';
import store from 'src/store';

const mockOnCollapseButtonClick = jest.fn();
const navigate = jest.fn();

jest.mock('stream-chat-react', () => ({
    ...jest.requireActual('stream-chat-react'),
    useChannelStateContext: jest.fn(() => ({
        channel: {
            data: { name: 'Test' },
            state: {
                members: {}
            }
        }
    }))
}));

jest.mock('src/pages/chat/hooks', () => ({
    useChannelPreviewInfo: jest.fn(() => ({
        displayTitle: 'Test Channel'
    }))
}));

describe('ChatHeader', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    it('renders ChatHeader component with the correct title', () => {
        const tree = create(
            <Provider store={store}>
                <BrowserRouter>
                    <ChatHeader />
                </BrowserRouter>
            </Provider>
        );

        expect(tree.root).toBeTruthy();

        const chatTitle = tree.root.findByProps({
            'data-testid': 'chat-title'
        });
        expect(chatTitle.props.children).toBe('Test Channel');
    });

    it('calls onCollapseButtonClick function on collapse button click', () => {
        const component = create(
            <ChatHeader onCollapseButtonClick={mockOnCollapseButtonClick} />
        );

        component.root
            .findByProps({ 'data-testid': 'collapse-button' })
            .props.onClick();

        expect(mockOnCollapseButtonClick).toHaveBeenCalled();
    });

    it('renders collapse icon in the ChatHeader component', () => {
        const component = create(<ChatHeader />);
        const collapseButton = component.root.findByProps({
            'data-testid': 'collapse-button'
        });
        const collapseIcon = collapseButton.findByProps({
            'data-testid': 'collapse-icon'
        });

        expect(collapseIcon).toBeTruthy();
        expect(collapseIcon.props.alt).toBe('collapse');
    });

    it('does not throw an error when onCollapseButtonClick is not provided', () => {
        const errorSpy = jest.spyOn(console, 'error');
        errorSpy.mockImplementation(() => {});

        expect(errorSpy).not.toHaveBeenCalled();

        errorSpy.mockRestore();
    });
});
