import { FunctionComponent, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

const Container = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: row;
    height: 56px;
    border-radius: 20px;
    align-items: center;
    cursor: pointer;
    background-color: ${(a) => a.selected && Colors.extra.white1};
    border: 1px solid transparent;
`;

const PageIconDiv = styled.div`
    width: 24px;
    height: 24px;
    margin: 0 12px 0 12px;
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageName = styled.p<{ selected: boolean }>`
    font: 14px/20px 'Poppins', sans-serif;
    color: ${(a) => (a.selected ? Colors.theme.primary : Colors.theme.gray)};
    font-weight: ${(a) => (a.selected ? 600 : 500)};
    border: 1px solid transparent;
`;

interface Props {
    name: string;
    path: string;
    icon: string;
}

const PageItem: FunctionComponent<Props> = ({ name, path, icon }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const selected = useMemo(() => {
        return location.pathname === path;
    }, [location, path]);

    const handleClick = useCallback(() => {
        navigate(path);
    }, [navigate, path]);

    return (
        <Container selected={selected} onClick={handleClick}>
            <PageIconDiv>
                <img alt={name} src={icon} />
            </PageIconDiv>
            <PageName selected={selected}>{name}</PageName>
        </Container>
    );
};

export default PageItem;
