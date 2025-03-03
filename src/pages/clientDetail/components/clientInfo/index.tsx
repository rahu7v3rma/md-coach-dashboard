import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Avatar, Text } from 'src/shared';
import { Colors } from 'src/utils/colors';

const Container = styled.div`
    height: auto;
    display: flex;
    border-radius: 15px;
    flex-direction: row;
    align-items: center;
`;

const StatusView = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
`;

const Age = styled(Text)`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${Colors.theme.primary};
`;

const Type = styled(Text)`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${Colors.extra.orange};
`;

const ClientImage = styled(Avatar)`
    width: 60px;
    height: 57.692px;
`;

interface Props {
    profileImg: string | null;
    age?: string;
    type?: string;
}

const ClientInfo: FunctionComponent<Props> = ({
    profileImg,
    age,
    type
}: Props) => {
    return (
        <Container>
            <ClientImage
                path={profileImg || undefined}
                width={60}
                height={57.692}
            />
            <StatusView>
                <Age>{age}</Age>
                <Type>{type}</Type>
            </StatusView>
        </Container>
    );
};

export default ClientInfo;
