import { FunctionComponent } from 'react';
import styled from 'styled-components';

import Icon from '../../assets/search-icon-green.svg';
import { Colors } from 'src/utils/colors';

export const SearchBoxContainer = styled.div`
    display: flex;
    align-items: center;
    background: ${Colors.extra.white};
    width: 350px;
    padding: 19px 23px;
    border-radius: 16px;
    box-shadow: 0px 2px 17px ${Colors.extra.black1};
`;

export const SearchIcon = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 11px;
`;

const Input = styled.input`
    font: 500 16px/22px 'Poppins', sans-serif;
    border: 0;
    width: 100%;
    &::placeholder {
        font: 500 16px/22px 'Poppins', sans-serif;
    }
    &:focus {
        outline: none;
    }
`;

type Props = {
    children?: React.ReactNode;
    onChange?: (value: string) => void;
};

const SearchBox: FunctionComponent<Props> = ({ onChange }: Props) => {
    return (
        <SearchBoxContainer>
            <SearchIcon src={Icon} />
            <Input
                placeholder="Search"
                onChange={(event) => onChange && onChange(event.target.value)}
            />
        </SearchBoxContainer>
    );
};

export default SearchBox;
