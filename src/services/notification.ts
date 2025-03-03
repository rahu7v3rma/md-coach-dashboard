import { appRouter } from '../navigation';
import { NOTIFICATION_TYPE } from '../utils/constants';

export const requestPermissions = () => {
    return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            return true;
        } else {
            return false;
        }
    });
};

export const hasPermissions = () => {
    return Notification.permission === 'granted';
};

export const notificationAction = (
    notificationType: string,
    notificationPayload: string | null
) => {
    if (notificationType === NOTIFICATION_TYPE.STREAM_CHAT_MESSAGE) {
        if (notificationPayload) {
            // for chat notifications the payload is a channel id
            appRouter.navigate('/chat', {
                state: { channelId: notificationPayload }
            });
        }
    } else if (
        notificationType === NOTIFICATION_TYPE.LESSON_COMPLETED &&
        notificationPayload
    ) {
        appRouter.navigate(`/client/${notificationPayload}`, {});
    }
};
