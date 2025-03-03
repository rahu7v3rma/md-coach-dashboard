import { FunctionComponent } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

const Container = styled.div`
    z-index: 6;
    background: ${Colors.extra.white};
    border-radius: 10px;
    position: sticky;
    top: 0px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    .is-open .Dropdown-arrow::after {
        transform: rotate(225deg);
        top: 6px;
    }
`;

const StyledDropDown = styled(Dropdown)<Props>`
    position: relative;
    width: 165px;
    height: 44px;
    .Dropdown-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 2px 17px 0px ${Colors.extra.black1};
        position: relative;
        overflow: hidden;
        background-color: white;
        border-radius: 10px;
        height: 100%;
        box-sizing: border-box;
        color: #333;
        cursor: default;
        outline: none;
        padding: 8px 16px 8px 10px;
        transition: all 200ms ease;
    }

    .Dropdown-control:hover {
        box-shadow: 0 1px 0 ${Colors.extra.black2};
    }

    .Dropdown-arrow {
        position: relative;
    }
    .Dropdown-arrow::after {
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-right-style: solid;
        border-right-width: 2px;
        content: '';
        display: inline-block;
        height: 6px;
        width: 6px;
        transform: rotate(45deg);
    }

    .Dropdown-menu {
        background-color: white;
        border: 1px solid white;
        box-shadow: 0 1px 0 ${Colors.extra.black2};
        box-sizing: border-box;
        margin-top: -1px;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 1000;
        -webkit-overflow-scrolling: touch;
        border-radius: 10px;
    }

    .Dropdown-menu .Dropdown-group > .Dropdown-title {
        padding: 8px 10px;
        font-weight: bold;
        text-transform: capitalize;
    }

    .Dropdown-option {
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        padding: 8px 10px;
    }

    .Dropdown-option:last-child {
        border-bottom-right-radius: 2px;
        border-bottom-left-radius: 2px;
    }

    .Dropdown-option:hover {
        background-color: ${Colors.theme.primaryLight};
    }

    .Dropdown-option.is-selected {
        background-color: ${Colors.theme.primaryLight};
    }

    .Dropdown-noresults {
        box-sizing: border-box;
        cursor: default;
        display: block;
        padding: 8px 10px;
    }
`;

type Props = {
    options: Option[];
    onChange: (value: Option) => void;
    value: Option;
    placeholder: string;
};

const CustomDropdown: FunctionComponent<Props> = (props: Props) => {
    return (
        <Container>
            <StyledDropDown
                options={props.options}
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
            />
        </Container>
    );
};

export default CustomDropdown;
