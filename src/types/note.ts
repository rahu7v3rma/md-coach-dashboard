export type Note = {
    id: number;
    coach_id?: string;
    client_id?: string;
    content: string;
    created_at: Date;
};

export type Notes = {
    [key: string]: {
        list: Array<Note>;
        count: number;
        has_next: boolean;
        has_previous: boolean;
        next_page_number: number | null;
    };
};
