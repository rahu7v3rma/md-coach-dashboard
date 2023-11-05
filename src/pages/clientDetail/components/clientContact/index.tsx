import { FunctionComponent } from 'react';

import Envelop from 'src/assets/envelop.svg';
import Phone from 'src/assets/phone.svg';
import Button from 'src/shared/button';
import Text, { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import { Container, Content, Icon, Separator } from './styles';

type Props = {
    phoneNumber?: string;
    email?: string;
    age?: string;
    type?: string;
};

const ClientContact: FunctionComponent<Props> = ({
    phoneNumber,
    email,
    age,
    type
}: Props) => {
    return (
        <Container>
            <Content>
                <Icon id="phoneIcon" src={Phone} />
                <Text
                    fontWeight="500"
                    fontSize={Size.XSmall}
                    color={Colors.extra.black_text}
                >
                    {phoneNumber}
                </Text>
            </Content>
            <Content>
                <Icon id="emailIcon" src={Envelop} />
                <Text
                    fontWeight="500"
                    fontSize={Size.XSmall}
                    color={Colors.extra.black_text}
                >
                    {email}
                </Text>
            </Content>
            <Content>
                <Button
                    id="ageButton"
                    testID="ageButton"
                    padding="8px 12px"
                    color={Colors.extra.black_text}
                    borderColor={Colors.extra.white}
                    backgroundColor={Colors.extra.white}
                    borderRadius="10px"
                    fontSize={Size.XXSmall}
                >
                    {age}
                </Button>
                <Separator />
                <Button
                    id="typeButton"
                    testID="typeButton"
                    padding="8px 20px"
                    color={Colors.extra.black_text}
                    borderColor={Colors.extra.white}
                    backgroundColor={Colors.extra.white}
                    borderRadius="10px"
                    fontSize={Size.XXSmall}
                >
                    {type}
                </Button>
            </Content>
        </Container>
    );
};

export default ClientContact;
