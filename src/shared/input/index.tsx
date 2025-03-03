import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import EyeIcon from 'src/assets/eye-icon.svg';
import UnMaskIcon from 'src/assets/unmask-icon.svg';
import CircleButton from 'src/shared/circleButton';
import { Colors } from 'src/utils/colors';

const SearchBox = styled('div')<{ isError: boolean; size: string }>`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: ${Colors.extra.white};
    width: 100%;
    padding: ${(props) => (props.size === 'lg' ? '0.85em' : '0.35em')} 1em;
    border-style: solid;
    border-color: ${Colors.theme.primaryLight};
    border-radius: 14px;
    overflow: hidden;
    box-sizing: content-box;
    cursor: pointer;

    ${(props) =>
        props.isError
            ? `background: ${Colors.extra.linen}; border: 1px solid ${Colors.extra.cyanLight}; box-shadow: 0px 4px 0px ${Colors.extra.cyanLight};`
            : ''};
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 0 0 10%;
`;
const SearchIcon = styled.img`
    width: 20px;
    height: 20px;
    filter: invert(53%) sepia(32%) saturate(389%) hue-rotate(64deg)
        brightness(99%) contrast(85%);
`;

const Input = styled('input')<{ isTypePassword: any; isError: boolean }>`
    border: 0;
    font-family: 'Poppins';
    font-weight: 500;
    width: 100%;
    color: ${Colors.extra.blackText};

    ${(props) =>
        props.isTypePassword
            ? 'letter-spacing: 2px; font-size: 16px;'
            : '   font-size: 14px;'};

    ${(props) =>
        props.isError
            ? `background: ${Colors.extra.linen}; color: ${Colors.extra.darkTerraCotta};`
            : ''};

    &::placeholder {
        color: ${Colors.theme.gray};
        letter-spacing: 0;
        font-size: 14px;
    }

    &:focus {
        background: transparent !important;
        outline-color: ${Colors.theme.primary};
        margin: 0;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    flex: 0 0 90%;
`;
const ErrorText = styled.span`
    color: ${Colors.extra.darkTerraCotta};
    font-weight: 400;
    font-size: 11px;
    position: absolute;
    left: 0;
    bottom: -1.25em;
    margin-left: 5px;
`;

type Props = {
    children?: React.ReactNode;
    isPassword?: boolean;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: any;
    errorMessage?: string;
    isError?: boolean;
    icon?: any;
    size?: string;
};

const SearchInput: FunctionComponent<Props> = ({
    isPassword,
    placeholder = '',
    type,
    value = '',
    onChange,
    errorMessage = '',
    isError = false,
    icon,
    size = 'lg'
}: Props) => {
    const getType = isPassword ? 'password' : type;
    const [inputType, setInputType] = useState(getType);

    const togglePasswordVisibility = () => {
        inputType === 'password'
            ? setInputType('text')
            : setInputType('password');
    };

    const handleInputChange = (event: any) => {
        onChange(event.target.value);
    };

    return (
        <SearchBox isError={isError} size={size}>
            <InputWrapper>
                <Input
                    placeholder={placeholder}
                    type={inputType}
                    value={value}
                    onChange={handleInputChange}
                    isTypePassword={isPassword}
                    isError={isError}
                />
                {isError && <ErrorText> {errorMessage}</ErrorText>}
            </InputWrapper>

            <IconContainer>
                {isPassword && (
                    <SearchIcon
                        src={inputType === 'password' ? EyeIcon : UnMaskIcon}
                        onClick={togglePasswordVisibility}
                    />
                )}

                {icon && (
                    <CircleButton>
                        <img src={icon} alt="Send Icon" />
                    </CircleButton>
                )}
            </IconContainer>
        </SearchBox>
    );
};

export default SearchInput;
