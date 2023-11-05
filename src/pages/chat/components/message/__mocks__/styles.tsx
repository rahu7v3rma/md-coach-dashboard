import { ReactNode } from 'react';

const MockComponent = ({ children }: { children: ReactNode }) => (
    <>{children}</>
);

export const BubbleContainer = MockComponent.bind({});
export const ChatMessageWrapper = MockComponent.bind({});
export const ListItems = MockComponent.bind({});
export const MainContent = MockComponent.bind({});
export const MessageAvatar = MockComponent.bind({});
export const MessageContent = MockComponent.bind({});
export const MessageHeader = MockComponent.bind({});
export const MessageReaction = MockComponent.bind({});
export const MessageSender = MockComponent.bind({});
export const MessageStatus = MockComponent.bind({});
export const Row = MockComponent.bind({});
export const Timestamp = MockComponent.bind({});
export const TotalMessageReaction = MockComponent.bind({});
export const UserName = MockComponent.bind({});
