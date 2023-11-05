import { FunctionComponent } from 'react';
import styled from 'styled-components';

import BellIcon from '../../../assets/notification-icon.svg';
import { Colors } from '../../../utils/colors';

const Container = styled.div`
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: ${Colors.extra.white};
    justify-content: center;
    align-self: center;
    align-items: center;
`;

const NotificationIcon = styled.img`
    width: 50%;
    height: 50%;
`;

type Props = Record<string, never>;

const OtherNotificationImage: FunctionComponent<Props> = ({}: Props) => {
    return (
        <Container>
            <NotificationIcon src={BellIcon} />
        </Container>
    );
};

export default OtherNotificationImage;
