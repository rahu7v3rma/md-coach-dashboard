import moment from 'moment';
import { useEffect, useState } from 'react';

const formatCurrentTime = (format: string, appendTimeZone: boolean) => {
    const formattedCurrentTime = moment().format(format);

    if (appendTimeZone) {
        const now = new Date();
        const localeSplit = now
            .toLocaleDateString(undefined, { timeZoneName: 'short' })
            .split(' ');
        return `${formattedCurrentTime} ${localeSplit[localeSplit.length - 1]}`;
    } else {
        return formattedCurrentTime;
    }
};

const useFormattedCurrentTime = (format: string, appendTimeZone: boolean) => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        setCurrentTime(formatCurrentTime(format, appendTimeZone));

        // update the formatted time every 10 seconds
        const updateInterval = setInterval(() => {
            setCurrentTime(formatCurrentTime(format, appendTimeZone));
        }, 10000);

        return () => {
            clearInterval(updateInterval);
        };
    }, [format, appendTimeZone]);

    return {
        currentTime
    };
};

export default useFormattedCurrentTime;
