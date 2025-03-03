import { FC } from 'react';

import { Card, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { OnboardingAnswer } from 'src/types/user';
import { Colors } from 'src/utils/colors';

export type AssessmentProps = {
    list: OnboardingAnswer[];
    width?: number;
    height?: number;
};

const Assessment: FC<AssessmentProps> = (props: AssessmentProps) => {
    const { list, width, height } = props;
    return (
        <>
            {list.map((l, i) => {
                return (
                    <Card
                        key={`assessment-${i}`}
                        borderBottomColor={Colors.extra.border_bottom_color}
                        borderBottomWidth="1px"
                        borderRadius="0px"
                        borderBottom="solid"
                        width={width ? `${width}%` : 'auto'}
                        height={height ? `${height}%` : 'auto'}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={Colors.extra.white}
                    >
                        <Text
                            width="50%"
                            textAlign="left"
                            fontSize={Size.X3Small}
                            color={Colors.extra.black_light_text}
                            fontWeight="500"
                            wordWrap="break-word"
                        >
                            {l.question}:
                        </Text>
                        <Text
                            width="50%"
                            textAlign="right"
                            fontSize={Size.X2Small}
                            color={Colors.extra.green_text}
                            fontWeight="800"
                            wordWrap="break-word"
                        >
                            {l.answer}
                        </Text>
                    </Card>
                );
            })}
        </>
    );
};

export default Assessment;
