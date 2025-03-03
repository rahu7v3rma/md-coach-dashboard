import Activity from 'src/assets/activity.svg';
import Drop from 'src/assets/drop.svg';
import Food from 'src/assets/food.svg';
import Hydration from 'src/assets/hydrationDrop.svg';
import Insulin from 'src/assets/insulin.svg';
import Medication from 'src/assets/medication.svg';
import Timer from 'src/assets/timer.svg';
import Weight from 'src/assets/weight.svg';
import { Log } from 'src/types/log';

export const logTypeDetails: Record<string, Log> = {
    UserExercise: {
        icon: Activity,
        title: 'Activity'
    },
    UserWeight: {
        icon: Weight,
        title: 'Weight'
    },
    UserFast: {
        icon: Timer,
        title: 'Begin fast'
    },
    UserInsulin: {
        icon: Insulin,
        title: 'Insulin'
    },
    UserGlucose: {
        icon: Drop,
        title: 'Glucose'
    },
    UserDrink: {
        icon: Hydration,
        title: 'Hydration'
    },
    UserMedication: {
        icon: Medication,
        title: 'Medication'
    },
    UserFood: {
        icon: Food,
        title: 'Food'
    },
    UserLesson: {
        icon: Activity,
        title: 'Lesson Completed'
    }
};

export const NOTIFICATION_TYPE = {
    STREAM_CHAT_MESSAGE: 'message.new',
    LESSON_COMPLETED: 'lesson.completed'
};

export const CLIENTS_TABLE_COLUMNS = [
    'name',
    'type',
    'engagement',
    'fbg',
    'last_weight',
    'last_week_avg_fbg',
    'activity_type',
    'duration',
    'weekly_total',
    'hydration'
];

export const timeFrames = [
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 14 days', value: '14' },
    { label: 'Last 30 days', value: '30' }
];
