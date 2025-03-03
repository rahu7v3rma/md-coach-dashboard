import type { Channel, ChannelMemberResponse, UserResponse } from 'stream-chat';

const getChannelDisplayTitle = (
    channel: Channel,
    currentUser?: UserResponse
): string | undefined => {
    let title = channel.data?.name;
    const members: ChannelMemberResponse[] = Object.values(
        channel.state.members
    );

    if (!title && members.length === 2) {
        const otherMember = members.find(
            (member) => member.user?.id !== currentUser?.id
        );

        if (otherMember?.user?.name) {
            title = otherMember.user.name;
        }
    }

    return title;
};

const getChannelDisplayImage = (
    channel: Channel,
    currentUser?: UserResponse
): string | undefined => {
    let image = channel.data?.image as string;
    const members: ChannelMemberResponse[] = Object.values(
        channel.state.members
    );

    if (!image && members.length === 2) {
        const otherMember = members.find(
            (member) => member.user?.id !== currentUser?.id
        );

        if (otherMember?.user?.image) {
            image = otherMember.user.image as string;
        }
    }

    return image;
};

const getChannelIsOnline = (
    channel: Channel,
    currentUser?: UserResponse
): boolean => {
    const members: ChannelMemberResponse[] = Object.values(
        channel.state.members
    );

    if (members.length === 2) {
        const otherMember = members.find(
            (member) => member.user?.id !== currentUser?.id
        );

        if (otherMember?.user?.online) {
            return true;
        }
    }

    return false;
};

export { getChannelDisplayImage, getChannelDisplayTitle, getChannelIsOnline };
