import { FC, useState } from 'react';

import { Card, Text } from 'src/shared';
import { Colors } from 'src/utils/colors';

import { ActionDetails, Image, LessonDetails } from './styles';

export type Props = {
    imageUrl: string;
    title: string;
    subTitle: string;
    time?: string;
    onClick?: () => void;
};

const LessonCard: FC<Props> = (props: Props) => {
    const [hasError, setHasError] = useState(false);
    function handleImageError() {
        setHasError(true);
    }
    return (
        <Card width="335px" height="100px">
            {!hasError && (
                <Image
                    src={props.imageUrl}
                    alt="icon"
                    onError={handleImageError}
                />
            )}
            <LessonDetails>
                <Text color={Colors.extra.black_text} fontWeight="700">
                    {props.title || 'No Lesson Found'}
                </Text>
                <Text
                    color={Colors.extra.sub_title_text}
                    fontWeight="300"
                    fontSize={12}
                >
                    {props.subTitle}
                </Text>
            </LessonDetails>
            <ActionDetails>
                <Text color={Colors.theme.primary} fontSize={12}>
                    {props.time}
                </Text>
            </ActionDetails>
        </Card>
    );
};

export default LessonCard;
