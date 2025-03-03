import { FunctionComponent } from 'react';

import Envelop from 'src/assets/envelop.svg';
import Phone from 'src/assets/phone.svg';
import Text, { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import { Container, Content, Icon } from './styles';

type Props = {
    phoneNumber?: string;
    email?: string;
};

const ClientContact: FunctionComponent<Props> = ({
    phoneNumber,
    email
}: Props) => {
    return (
        <Container>
            <Content>
                <Icon id="phoneIcon" src={Phone} />
                <Text
                    fontWeight="500"
                    fontSize={Size.XSmall}
                    color={Colors.extra.blackText}
                    data-testid="phone_number"
                >
                    {phoneNumber}
                </Text>
            </Content>
            <Content>
                <Icon id="emailIcon" src={Envelop} />
                <Text
                    fontWeight="500"
                    fontSize={Size.XSmall}
                    color={Colors.extra.blackText}
                    data-testid="email"
                >
                    {email}
                </Text>
            </Content>
        </Container>
    );
};

export default ClientContact;
