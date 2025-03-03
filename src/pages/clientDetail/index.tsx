import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppChat } from 'src/contexts/appChat';
import { useAppDispatch } from 'src/hooks';
import { ClientSelectors, getUserInfo } from 'src/reducers/client';
import { getProfile } from 'src/reducers/user';
import { hasAuthToken } from 'src/services/auth';
import { DashboardLayout } from 'src/shared';

import {
    Analytics,
    ProfileCard,
    ScrollableTabs,
    TabViewSlider
} from './components';
import { Container, ContentContainer, MainContentWrapper } from './styles';

const ClientDetail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { chatClient } = useAppChat();

    const { id, group_id } = useParams();
    const { profiles } = ClientSelectors();

    useEffect(() => {
        if (!hasAuthToken()) {
            navigate('/');
        }

        dispatch(getProfile({}));
    }, [navigate, dispatch]);

    useEffect(() => {
        if (id) dispatch(getUserInfo(id));
    }, [dispatch, id]);

    let userInfo: any = {};
    if (id) userInfo = profiles[id];

    return (
        <DashboardLayout shouldScroll isBack isDisplaySearchBox={false}>
            {group_id && <ScrollableTabs />}
            <Container>
                <MainContentWrapper>
                    <ContentContainer>
                        <ProfileCard
                            navigate={navigate}
                            chatClient={chatClient}
                            userInfo={userInfo}
                        />
                        <Analytics />
                    </ContentContainer>
                    <TabViewSlider />
                </MainContentWrapper>
            </Container>
        </DashboardLayout>
    );
};

export default ClientDetail;
