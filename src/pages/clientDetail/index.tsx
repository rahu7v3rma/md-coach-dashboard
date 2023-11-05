import moment from 'moment';
import { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';

import BackCircleImg from 'src/assets/images/back.png';
import { useAppDispatch } from 'src/hooks';
import { ClientSelectors, getLogBook, getUserInfo } from 'src/reducers/client';
import { getProfile } from 'src/reducers/user';
import { hasAuthToken } from 'src/services/auth';
import { DashboardLayout } from 'src/shared';
import { logType } from 'src/types/log';

import {
    ClientContact,
    ClientInfo,
    IntakeList,
    LessonCard
} from './components';
import ListBookItems from './components/ListBookItems';
import {
    BackImg,
    CardHeading,
    ClientContactContainer,
    ClientInfoWrapper,
    ClientView,
    Container,
    HorizontalDividerLine,
    IntakeListContainer,
    IntakeListView,
    LessonView,
    LogBookContainer,
    LogBookView
} from './styles';

const ClientDetail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { profiles, logBook } = ClientSelectors();

    useEffect(() => {
        if (!hasAuthToken()) {
            navigate('/');
        }

        dispatch(getProfile({}));
    }, [navigate, dispatch]);

    const { list, next_page_number, has_next } = !logBook[id as string]
        ? ({} as any)
        : logBook[id as string];

    const list_grouped =
        list &&
        Object.entries(
            list.reduce((group: { [key: string]: logType[] }, log: logType) => {
                const { log_time } = log;
                const logtimeDate = moment(log_time)
                    .utc()
                    .format('DD MMM YYYY');
                group[logtimeDate] = group[logtimeDate] ?? [];
                group[logtimeDate].push(log);
                return group;
            }, {})
        );

    useEffect(() => {
        if (id) dispatch(getUserInfo(id));
        dispatch(getLogBook({ page: 1, limit: 10, user_id: !id ? '' : id }))
            .unwrap()
            .catch((err) => {
                alert(err.message);
            });
    }, [dispatch, id]);

    const loadMoreData = useCallback(() => {
        dispatch(
            getLogBook({
                page: next_page_number,
                limit: 10,
                user_id: !id ? '' : id
            })
        )
            .unwrap()
            .catch((err) => {
                alert(err.message);
            });
    }, [dispatch, id, next_page_number]);

    const onBackHandler = () => {
        navigate('/clients', { replace: true });
    };

    let userInfo: any = {};
    if (id) userInfo = profiles[id];
    const { next_lesson: nextLesson = {} } = userInfo || {};

    return (
        <DashboardLayout shouldScroll>
            <Container>
                <ClientView>
                    <ClientInfoWrapper>
                        <BackImg src={BackCircleImg} onClick={onBackHandler} />
                        <ClientInfo
                            profileImg={userInfo?.image}
                            name={
                                userInfo?.first_name + ' ' + userInfo?.last_name
                            }
                            chatId={userInfo?.chat_id}
                        />
                    </ClientInfoWrapper>
                    <LessonView>
                        <CardHeading>Next Lesson</CardHeading>
                        <LessonCard
                            title={nextLesson?.lesson?.title}
                            subTitle={`Part ${nextLesson?.order || 0}`}
                            imageUrl={nextLesson?.lesson?.icon}
                        />
                    </LessonView>
                    <ClientContactContainer>
                        <ClientContact
                            phoneNumber={userInfo?.contact_number || 'NA'}
                            email={userInfo?.email || 'NA'}
                            age={`
                                    Age: 
                                    ${
                                        userInfo?.date_of_birth
                                            ? moment()
                                                  .diff(
                                                      moment(
                                                          userInfo.date_of_birth
                                                      ),
                                                      'years'
                                                  )
                                                  .toString()
                                            : 'NA'
                                    }
                                `}
                            type={userInfo?.diabetes_type || 'NA'}
                        />
                    </ClientContactContainer>
                </ClientView>

                <HorizontalDividerLine />

                <LogBookView>
                    <IntakeListView>
                        <CardHeading>Intake Form Answers</CardHeading>
                        <IntakeListContainer>
                            <IntakeList
                                width={100}
                                list={userInfo?.onboarding_answers ?? []}
                            />
                        </IntakeListContainer>
                    </IntakeListView>
                    <LogBookContainer>
                        <CardHeading>Logbook</CardHeading>
                        <InfiniteScroll
                            dataLength={list?.length || 10}
                            next={loadMoreData}
                            height={550}
                            hasMore={has_next}
                            loader={<h4>Loading...</h4>}
                        >
                            {list_grouped &&
                                list_grouped.map(
                                    (log: [string, logType[]], idx: number) => {
                                        return (
                                            <ListBookItems
                                                list={log[1]}
                                                groupTitle={log[0]}
                                                key={`logbook-${idx}`}
                                            />
                                        );
                                    }
                                )}
                        </InfiniteScroll>
                    </LogBookContainer>
                </LogBookView>
            </Container>
        </DashboardLayout>
    );
};

export default ClientDetail;
