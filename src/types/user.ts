export type UserProfile = {
    image: string | null;
};

export type UserChatProfile = {
    apiKey: string;
    token: string;
    userId: string;
};

export type UserInfo = {
    email: string;
    first_name: string;
    last_name: string;
    image: string | null;
    diabetes_type: string;
    date_of_birth: string;
    contact_number: string;
    chat_id: string;
    onboarding_answers?: OnboardingAnswer[];
};

export type Last7Days = {
    fast: { duration_minutes_average?: number };
    exercise: { duration_minutes_sum?: number };
    glucose: { amount_avg?: number };
};

export type LastLog = {
    fast: Fast;
    weight: weight;
    exercise: Exercise;
    drink: Drink;
    glucose: Glucose;
};

export type Fast = {
    duration_minutes: number;
};

export type weight = {
    amount: number;
    unit: string;
    previous_amount?: number;
};

export type Exercise = {
    type: string;
    duration_minutes: number;
};

export type Drink = {
    amount: number;
};

export type Glucose = {
    amount: number;
    unit: string;
    previous_amount?: number;
};

export type Profile = {
    diabetes_type: string;
};

export type UserClient = {
    activity_type: string;
    duration: number;
    engagement: string;
    last_fasting: number;
    second_last_fasting: number;
    hydration: number;
    hydration_unit: string;
    id: number;
    last_week_avg_fbg: number;
    name: string;
    type: string;
    group: string;
    weekly_total: number;
    last_weight: number;
    second_last_weight: number;
    weight_units: string;
    fbg: number | string;
    second_last_fbg: number | string;
    fbg_unit: string;
    weight_unit: string;
};

export type member = {
    id: number;
    first_name: string;
    last_name: string;
};

export type UserGroup = {
    id: number;
    members: member[];
    name: string;
    group_type: string;
    program: string;
    attendance_sheet_url: string;
};

export type OnboardingAnswer = {
    question: string;
    answer: string;
};
