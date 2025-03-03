export type logType = {
    id: number;
    type: string;
    log_time: string;
    duration_minutes: string;
    activity_type: string;
    intensity: string;
};

export type logBooks = {
    [key: string]: {
        count: number;
        has_next: boolean;
        has_previous: boolean;
        list: logType[];
        next_page_number: number | null;
    };
};

export type Log = {
    icon: string;
    title: string;
};
