import { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    background: red;
    width: 500px;
    height: 500px;
    background: #ffffff;
    border: 1px solid #eef4fa;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px 12px;
    gap: 12px;
`;

type Props = {
    children?: React.ReactNode;
};

const NotificationCard: FunctionComponent<Props> = ({ children }: Props) => {
    return <StyledCard>{children}</StyledCard>;
};

export default NotificationCard;
