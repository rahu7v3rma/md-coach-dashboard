import { FC } from 'react';

import { Card, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { OnboardingAnswer } from 'src/types/user';
import { Colors } from 'src/utils/colors';

export type IntakeListProps = {
    list: OnboardingAnswer[];
    width?: number;
    height?: number;
};

const IntakeList: FC<IntakeListProps> = (props: IntakeListProps) => {
    const { list, width, height } = props;
    return (
        <>
            {list.map((l, i) => {
                return (
                    <Card
                        key={`intake-${i}`}
                        borderColor={Colors.extra.border_color}
                        borderRadius="16px"
                        borderStyle="solid"
                        width={width ? `${width}%` : 'auto'}
                        height={height ? `${height}%` : 'auto'}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={
                            i % 2 ? Colors.extra.off_white : Colors.extra.white
                        }
                        marginTop={i === 0 ? 0 : -2}
                    >
                        <Text
                            width="50%"
                            textAlign="center"
                            fontSize={Size.XXSmall}
                            color={Colors.extra.black_text}
                            fontWeight="600"
                        >
                            {l.question}:
                        </Text>
                        <Text
                            width="50%"
                            textAlign="left"
                            fontSize={Size.XXSmall}
                            color={Colors.extra.black_text}
                            fontWeight="600"
                        >
                            {l.answer}
                        </Text>
                    </Card>
                );
            })}
        </>
    );
};

export default IntakeList;
