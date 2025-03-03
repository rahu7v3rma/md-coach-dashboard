import { FunctionComponent } from 'react';

import User1 from '../../../assets/users/user1.png';
import { CircleButton } from '../../../shared';
import {
    DisplayName,
    NameTitle,
    NotificationContainer,
    Subtitle,
    TimeText
} from '../styles';

const NotificationItem: FunctionComponent<{}> = ({}) => {
    return (
        <NotificationContainer>
            <CircleButton image={User1} isNotif={true} />
            <DisplayName>
                <NameTitle>Adam Storm</NameTitle>
                <Subtitle>Sent you a message</Subtitle>
            </DisplayName>
            <TimeText> 11:59AM </TimeText>
        </NotificationContainer>
    );
};

export default NotificationItem;
