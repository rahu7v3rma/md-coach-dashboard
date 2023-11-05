import { FunctionComponent } from 'react';
import styled from 'styled-components';

import FoxInvite from '../../../assets/fox-invite.png';
import { Button } from '../../../shared';
import { Colors } from 'src/utils/colors';

const InviteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${Colors.theme.primaryLighter};
    background-color: ${Colors.theme.primaryLightest};
    height: 146px;
    border-radius: 30px;
    padding: 16px;
    position: relative;
    z-index: 2;
`;

const FoxContainer = styled.img`
    transform: scale(0.8), translate(-50%, 0);
    position: absolute;
    bottom: 67px;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
`;

const Subtitle = styled.span`
    font: 500 11px/16px 'Poppins', sans-serif;
    text-align: center;
    color: ${Colors.extra.grayLight};
    margin: 8px 0 16px 0;
`;

const Title = styled.span`
    color: ${Colors.extra.black};
    font: 600 14px/20px 'Poppins', sans-serif;
`;

type Props = Record<string, never>;

const InviteClient: FunctionComponent<Props> = ({}: Props) => {
    return (
        <>
            <FoxContainer src={FoxInvite} alt="MD Icon" />
            <InviteContainer>
                <Title> Invite a client</Title>
                <Subtitle>
                    Click below to invite <br /> a new client
                </Subtitle>
                <Button
                    disabled
                    backgroundColor={Colors.theme.primary}
                    color={Colors.extra.white}
                    borderRadius="12px"
                    fontSize={12}
                >
                    Invite
                </Button>
            </InviteContainer>
        </>
    );
};

export default InviteClient;
