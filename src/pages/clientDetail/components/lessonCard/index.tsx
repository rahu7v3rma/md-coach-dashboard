import { FC } from 'react';

import { Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import { LessonDetails, Title } from './styles';

export type Props = {
    lesson?: string;
    title?: string;
};

const LessonCard: FC<Props> = ({ lesson, title }: Props) => {
    return (
        <LessonDetails>
            <Text
                color={Colors.theme.gray}
                fontWeight="600"
                fontSize={Size.X3Small}
                data-testid="lesson_subtitle"
            >
                {lesson}
                <Title>{title || 'No Lesson Found'}</Title>
            </Text>
        </LessonDetails>
    );
};

export default LessonCard;
