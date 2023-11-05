export type NotificationListResponse = {
    list: NotificationType[];
    hasPrevious: boolean;
    hasNext: boolean;
    totalCount: number;
    nextPageNumber: number;
    previousPageNumber: number;
};

export type NotificationType = {
    id: number;
    type: string;
    title: string;
    description: string;
    date_time: string;
    read_flag: boolean;
    payload: string;
};
