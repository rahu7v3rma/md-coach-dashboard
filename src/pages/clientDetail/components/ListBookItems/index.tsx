import moment from 'moment';
import { FC, useState } from 'react';

import { logType } from '../../../../types/log';
import { logTypeDetails } from '../../../../utils/constants';
import { LogBookItem } from '../../components';
import {
    CardLogTitle,
    LessionView,
    LessonImage,
    LogBookItemContainer,
    MedicationDoseText,
    SubTitle,
    SubTitleText,
    SubView,
    TitleText,
    TitleView
} from '../../styles';

type Props = {
    list: logType[];
    groupTitle: string;
};

const roundNumbers = (item: any) => {
    const itemLocal = structuredClone(item);
    for (let key in itemLocal) {
        const itemNumberValue = Number(itemLocal[key]);
        if (itemNumberValue) {
            if (!Number.isInteger(itemNumberValue)) {
                itemLocal[key] = itemNumberValue.toFixed(2);
            }
        }
    }
    return itemLocal;
};

const minutesToHoursAndMinutes = (minutes: number): string => {
    const formattedHours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const formattedMinutes = String(minutes % 60).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
};

const ListBookItems: FC<Props> = ({ list, groupTitle }: Props) => {
    const [hasError, setHasError] = useState(false);

    function handleImageError() {
        setHasError(true);
    }

    return (
        <>
            <CardLogTitle>
                {moment(groupTitle, 'DD MMM YYYY').isSame(new Date(), 'day')
                    ? 'Today'
                    : groupTitle}
            </CardLogTitle>
            {list.map((item: any) => {
                const keyTyped = item.type as keyof typeof logTypeDetails;
                const icon: string = logTypeDetails[keyTyped].icon;
                const title: string = logTypeDetails[keyTyped].title;

                item = roundNumbers(item);

                return (
                    <LogBookItemContainer key={`log-${keyTyped}-${item.id}`}>
                        <LogBookItem
                            icon={icon}
                            title={title}
                            time={moment(
                                item.log_time,
                                'YYYY-MM-DD HH:mm:s'
                            ).format('HH:mm')}
                            image={item?.image}
                        >
                            <TitleView>
                                {item.duration_minutes && (
                                    <>
                                        <TitleText>
                                            {minutesToHoursAndMinutes(
                                                item.duration_minutes
                                            )}
                                        </TitleText>
                                    </>
                                )}
                                {item.drug_name && (
                                    <TitleText>
                                        {item.drug_name}
                                        {item.dose && (
                                            <MedicationDoseText>
                                                {`${item.amount} ${item.dose}`}
                                            </MedicationDoseText>
                                        )}
                                    </TitleText>
                                )}
                                {item.units && (
                                    <TitleText>{item.units}</TitleText>
                                )}
                                {item.injection_type && (
                                    <SubTitleText>
                                        {item.injection_type}
                                    </SubTitleText>
                                )}
                                {item.type !== 'UserMedication' && (
                                    <>
                                        {item.amount && (
                                            <TitleText>{item.amount}</TitleText>
                                        )}
                                        {!!item.measurement_type ? (
                                            <SubView>
                                                {item.unit && (
                                                    <SubTitle>
                                                        {item.unit}
                                                    </SubTitle>
                                                )}
                                                {item.measurement_type && (
                                                    <SubTitle>
                                                        {item.measurement_type}
                                                    </SubTitle>
                                                )}
                                            </SubView>
                                        ) : (
                                            item.unit && (
                                                <SubTitleText>
                                                    {item.unit}
                                                </SubTitleText>
                                            )
                                        )}
                                    </>
                                )}
                                {item.intensity && item.activity_type && (
                                    <SubView>
                                        <SubTitle>{item.intensity}</SubTitle>
                                        <SubTitle>
                                            {item.activity_type}
                                        </SubTitle>
                                    </SubView>
                                )}
                                {item.type === 'UserLesson' && (
                                    <LessionView>
                                        {!hasError && (
                                            <LessonImage
                                                src={item.lesson.icon}
                                                onError={handleImageError}
                                            />
                                        )}
                                        <SubTitle>{item.lesson.title}</SubTitle>
                                    </LessionView>
                                )}
                            </TitleView>
                        </LogBookItem>
                    </LogBookItemContainer>
                );
            })}
        </>
    );
};

export default ListBookItems;
