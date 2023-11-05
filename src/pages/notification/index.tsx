import { FunctionComponent } from 'react';

import FoxImage from '../../assets/md-mascot.svg';
import { Card, Header, Sidebar } from '../../shared';

import { NotificationItem } from './components';
import {
    Container,
    MainContent,
    NotificationContent,
    NotificationList,
    NotificationWrapper,
    PlaceholderContainer,
    PlaceholderFox,
    PlaceholderText,
    Title,
    Wrapper
} from './styles';

type Props = Record<string, never>;

const Notification: FunctionComponent<Props> = ({}: Props) => {
    return (
        <Wrapper>
            <Sidebar />

            <MainContent>
                <Header />
                <NotificationWrapper>
                    <Title>Notifications</Title>
                    <Card>
                        <Container>
                            <NotificationList>
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                            </NotificationList>
                            <NotificationContent>
                                <PlaceholderContainer>
                                    <PlaceholderFox
                                        src={FoxImage}
                                        alt="Fox Mascot"
                                    />
                                    <PlaceholderText>
                                        Press to anybody to start chat with them
                                    </PlaceholderText>
                                </PlaceholderContainer>
                            </NotificationContent>
                        </Container>
                    </Card>
                </NotificationWrapper>
            </MainContent>
        </Wrapper>
    );
};

export default Notification;
