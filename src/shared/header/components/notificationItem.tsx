import moment from 'moment';
import { FunctionComponent, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../../hooks';
import { readNotification } from '../../../reducers/notification';
import { notificationAction } from '../../../services/notification';
import Text, { Size } from '../../../shared/text';
import { Colors } from '../../../utils/colors';
import { NOTIFICATION_TYPE } from '../../../utils/constants';

import ChatNotificationImage from './chatNotificationImage';
import OtherNotificationImage from './otherNotificationImage';

const Container = styled.div`
    width: 100%;
    display: flex;
    cursor: pointer;
    padding-bottom: 9px;
    padding-top: 12px;
    margin-bottom: 1px;
`;

const ImageContainer = styled.div`
    width: 56px;
    display: flex;
    margin-left: 10px;
`;

const DetailView = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const NameView = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Time = styled(Text)`
    padding-right: 12px;
    margin-left: 10px;
`;

interface Props {
    id: number;
    title: string;
    description: string;
    dateTime: string;
    type: string;
    payload: string | null;
    read: boolean;
}

const ListItem: FunctionComponent<Props> = ({
    id,
    title,
    description,
    dateTime,
    type,
    payload,
    read
}: Props) => {
    const dispatch = useAppDispatch();

    const handleNotificationClick = useCallback(() => {
        notificationAction(type, payload);

        if (read === false) {
            dispatch(readNotification({ id }));
        }
    }, [type, payload, read, dispatch, id]);

    const formattedTime = useMemo(() => {
        const parsedDateTime = moment(dateTime);
        const now = moment();
        if (parsedDateTime.isSame(now, 'day')) {
            return parsedDateTime.format('HH:mmA');
        } else if (parsedDateTime.isSame(now.subtract(1, 'days'), 'day')) {
            return 'Yesterday';
        } else {
            return parsedDateTime.format('MM/DD/YYYY');
        }
    }, [dateTime]);

    return (
        <Container
            style={{
                background: read
                    ? Colors.extra.white
                    : Colors.theme.primaryLighter
            }}
            id="notificationContainer"
            onClick={handleNotificationClick}
        >
            <ImageContainer>
                {type === NOTIFICATION_TYPE.STREAM_CHAT_MESSAGE && payload ? (
                    <ChatNotificationImage channelId={payload} />
                ) : (
                    <OtherNotificationImage />
                )}
            </ImageContainer>
            <DetailView>
                <NameView>
                    <Text fontSize={Size.XSmall} fontWeight="600">
                        {title}
                    </Text>
                    <Time
                        textAlign="right"
                        fontSize={11}
                        fontWeight="400"
                        color={
                            read
                                ? Colors.extra.sub_title_text
                                : Colors.theme.gray
                        }
                    >
                        {formattedTime}
                    </Time>
                </NameView>
                <Text
                    fontSize={11}
                    color={
                        read ? Colors.extra.sub_title_text : Colors.theme.gray
                    }
                >
                    {description}
                </Text>
            </DetailView>
        </Container>
    );
};

export default ListItem;
