import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, TabList, TabPanel } from 'react-tabs';

import { AssessmentContainer, AssessmentView, CardHeading } from '../../styles';
import LogBookSection from '../LogBookSection';
import Assessment from '../assessment';
import { Assessment as AssessmentIcon, LogBook, Notes } from 'src/assets/svgs';
import { NoteSection } from 'src/pages/clientDetail/components';
import { ClientSelectors } from 'src/reducers/client';

import {
    StyledButton as Button,
    TabContainer,
    TabText,
    TabsStyled,
    middleTabStyle
} from './styles';

interface Props {
    currentTab?: number;
    onSelectTab?: (index: number) => void;
}

const TabViewSlider: FunctionComponent<Props> = ({
    currentTab = 0,
    onSelectTab
}: Props) => {
    const { id, group_id } = useParams();
    const { profiles } = ClientSelectors();

    const [tabIndex, setTabIndex] = useState<number>(currentTab);
    const [edit, setEdit] = useState(false);

    const onSelect = useCallback(
        (index: number) => {
            setTabIndex(index);
            onSelectTab && onSelectTab(index);
        },
        [onSelectTab]
    );

    useEffect(() => {
        setTabIndex(currentTab);
    }, [currentTab]);

    let userInfo: any = {};
    if (id) userInfo = profiles[id];
    return (
        <TabsStyled selectedIndex={tabIndex} onSelect={onSelect}>
            <TabList>
                <Tab>
                    <Notes />
                    <TabText>{!group_id ? 'Comments' : 'Notes'}</TabText>
                </Tab>
                <Tab style={middleTabStyle}>
                    <AssessmentIcon />
                    <TabText>Assessment</TabText>
                </Tab>
                <Tab>
                    <LogBook />
                    <TabText>Logbook</TabText>
                </Tab>
            </TabList>

            <TabPanel>
                <TabContainer id="notesDiv">
                    <Button fontSize={14} onClick={() => setEdit(true)}>
                        + Add {!group_id ? 'Comment' : 'Note'}
                    </Button>
                    <NoteSection setEdit={setEdit} edit={edit} />
                </TabContainer>
            </TabPanel>
            <TabPanel>
                <TabContainer>
                    <AssessmentView>
                        <CardHeading>Baseline Health Evaluation:</CardHeading>
                        <AssessmentContainer>
                            <Assessment
                                width={100}
                                list={userInfo?.onboarding_answers ?? []}
                            />
                        </AssessmentContainer>
                    </AssessmentView>
                </TabContainer>
            </TabPanel>
            <TabPanel>
                <TabContainer id="logBookDiv" padding="0px 16px 16px 16px">
                    <LogBookSection />
                </TabContainer>
            </TabPanel>
        </TabsStyled>
    );
};

export default TabViewSlider;
