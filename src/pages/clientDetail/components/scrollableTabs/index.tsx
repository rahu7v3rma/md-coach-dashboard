import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    ArrowRightView,
    BackIconImg,
    IconView,
    ScrollTabView
} from '../../styles';
import ArrowLeft from 'src/assets/arrow-left.svg';
import ArrowRight from 'src/assets/arrow-right.svg';
import { useAppDispatch } from 'src/hooks';
import { GroupSelectors, fetchGroupsList } from 'src/reducers/group';
import { Card, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { member } from 'src/types/user';
import { Colors } from 'src/utils/colors';

import { TitleContainer } from './styles';

type Props = {};

const ScrollableTabs: FC<Props> = ({}: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedTab, setSelectedTab] = useState(0);
    const [arrowDisable, setArrowDisable] = useState(true);
    const [forwordButton, setForwordButton] = useState(true);

    const elementRef = useRef(null);

    const { group_id, id } = useParams();
    const { groups } = GroupSelectors();

    const members: member[] = useMemo(
        () =>
            groups?.find((group) => group.id.toString() === group_id)
                ?.members ?? [],
        [group_id, groups]
    );

    useEffect(() => {
        dispatch(fetchGroupsList({}));
    }, [dispatch]);

    useEffect(() => {
        setSelectedTab(
            members?.findIndex(
                (member_element) => member_element.id.toString() === id
            ) || 0
        );
    }, [members, id]);

    useEffect(() => {
        const element: any = elementRef?.current;

        const checkScrollButtons = () => {
            if (!element) return;

            const maxScrollLeft = element?.scrollWidth - element?.clientWidth;
            setArrowDisable(element?.scrollLeft <= 0);
            setForwordButton(element?.scrollLeft < maxScrollLeft);
        };

        // Run initially and on resize
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);

        // Attach scroll event listener to the scrollable element
        element?.addEventListener('scroll', checkScrollButtons);

        // Cleanup event listeners
        return () => {
            window.removeEventListener('resize', checkScrollButtons);
            element?.removeEventListener('scroll', checkScrollButtons);
        };
    }, [elementRef, members]);

    const handleHorizontalScroll = (
        element: any,
        speed: any,
        distance: any,
        step: any
    ) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }

            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else if (
                element.scrollLeft + element.offsetWidth + 141 >=
                element.scrollWidth
            ) {
                setForwordButton(false);
            } else {
                setArrowDisable(false);
                setForwordButton(true);
            }
        }, speed);
    };

    const nameFormat = (
        firstName: string | null | undefined,
        lastName: string | null | undefined
    ) => {
        const formattedFirstName = firstName
            ? `${firstName[0]?.toUpperCase() ?? ''}${firstName
                  .slice(1)
                  .toLowerCase()}`
            : '';
        const formattedLastName = lastName
            ? `${(lastName[0] ?? '').toUpperCase()}.`
            : '';
        return `${formattedFirstName} ${formattedLastName}`.trim();
    };

    return (
        <>
            <ScrollTabView ref={elementRef} display={!!members}>
                {!arrowDisable && (
                    <IconView>
                        <BackIconImg
                            style={{
                                transform: arrowDisable
                                    ? 'rotate(0deg)'
                                    : 'rotate(180deg)'
                            }}
                            src={arrowDisable ? ArrowLeft : ArrowRight}
                            onClick={() => {
                                handleHorizontalScroll(
                                    elementRef.current,
                                    25,
                                    130,
                                    -30
                                );
                            }}
                        />
                    </IconView>
                )}
                {members &&
                    members.map((item: member, key: any) => {
                        return (
                            <Card
                                key={key}
                                flexDirection="row"
                                padding="16px 0px"
                                justifyContent="center"
                                height="48px"
                                onClick={() => {
                                    setSelectedTab(key);
                                    navigate(
                                        `/group/${group_id}/member/${item.id}`
                                    );
                                }}
                                borderColor="none"
                                borderRadius="0px"
                                borderStyle="none"
                                borderBottomColor={
                                    key === selectedTab
                                        ? Colors.theme.primary
                                        : 'none'
                                }
                                borderBottom={
                                    key === selectedTab ? 'solid' : 'none'
                                }
                                marginleft={48}
                            >
                                <TitleContainer>
                                    <Text
                                        color={
                                            key === selectedTab
                                                ? Colors.theme.primary
                                                : Colors.theme.gray
                                        }
                                        fontWeight="600"
                                        lineHeight="20px"
                                        fontSize={Size.X2Small}
                                        fontFamily='"Poppins", sans-serif'
                                    >
                                        {nameFormat(
                                            item.first_name,
                                            item.last_name
                                        )}
                                    </Text>
                                </TitleContainer>
                            </Card>
                        );
                    })}
                {forwordButton && (
                    <ArrowRightView>
                        <BackIconImg
                            style={{
                                transform: forwordButton
                                    ? 'rotate(0deg)'
                                    : 'rotate(180deg)'
                            }}
                            src={forwordButton ? ArrowRight : ArrowLeft}
                            onClick={() => {
                                handleHorizontalScroll(
                                    elementRef.current,
                                    25,
                                    130,
                                    30
                                );
                            }}
                        />
                    </ArrowRightView>
                )}
            </ScrollTabView>
        </>
    );
};

export default ScrollableTabs;
