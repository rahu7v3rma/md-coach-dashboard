import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import FormFailure from '../../../assets/form-failure.svg';
import Button from '../../../shared/button';
import { DetailsText, TitleText } from '../styles';

type Props = Record<string, never>;

const InvalidToken: FunctionComponent<Props> = ({}: Props) => {
    const navigate = useNavigate();

    const goToResetPassword = () => {
        navigate('/reset-password');
    };

    return (
        <>
            <img src={FormFailure} alt="Success Logo" />
            <TitleText>The reset link is no longer valid</TitleText>
            <DetailsText>
                Please try to reset your password again <br />
                to receive a new link
            </DetailsText>

            <Button onClick={goToResetPassword}>Reset Password</Button>
        </>
    );
};

export default InvalidToken;
