import { FunctionComponent } from 'react';
import { DateSeparatorProps } from 'stream-chat-react';

import { DatePopup } from './styles';

const CustomeDateSeparator: FunctionComponent<DateSeparatorProps> = ({
    date
}) => {
    function formatDate(d: Date) {
        return d.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });
    }

    return <DatePopup> {formatDate(date)}</DatePopup>;
};

export default CustomeDateSeparator;
