import { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components';

import { Colors } from 'src/utils/colors';

const CheckIcon = './assets/icons/check.png';

const Button = styled.button`
    width: 18px;
    height: 18px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${Colors.extra.silver};
    background: transparent;
    padding: 0;
    overflow: hidden;
    &.checked {
        background: ${Colors.extra.slateBlue};
        border: none;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`;

type Props = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
};

const CheckBox: FunctionComponent<Props> = ({
    checked = false,
    onChange
}: Props) => {
    const [check, setCheck] = useState<boolean>(checked);

    const onChangeCallBack = useCallback(() => {
        onChange && onChange(!check);
        setCheck(!check);
    }, [check, setCheck, onChange]);

    return (
        <Button onClick={onChangeCallBack} className={check ? 'checked' : ''}>
            {check && <img alt="check" src={CheckIcon} />}
        </Button>
    );
};

export default CheckBox;
