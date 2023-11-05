export const BASE_API_URL = process.env.REACT_APP_BACKEND_URL || '/';

export const COMMON = {
    stringFormat(s: string, ...args: any[]) {
        return s.replace(/{([0-9]+)}/g, (match, index) =>
            typeof args[index] === 'undefined' ? match : args[index]
        );
    }
};
