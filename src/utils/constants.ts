import Activity from 'src/assets/activity.svg';
import Drop from 'src/assets/drop.svg';
import Food from 'src/assets/food.svg';
import Hydration from 'src/assets/hydrationDrop.svg';
import Insulin from 'src/assets/insulin.svg';
import Medication from 'src/assets/medication.svg';
import Timer from 'src/assets/timer.svg';
import Weight from 'src/assets/weight.svg';

export const logTypeDetails = {
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
