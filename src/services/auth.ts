const AUTH_KEY = 'md.coach.token';

export const AUTHORIZATION_HEADER_NAME = 'X-Authorization';

export const setAuthToken = (token: string) => {
    sessionStorage.setItem(AUTH_KEY, token);
};

const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_KEY);
};

export const resetAuthToken = () => {
    sessionStorage.removeItem(AUTH_KEY);
};

export const getAuthorizationHeaderValue = () => {
    const token = getAuthToken();
    return `Token ${token}`;
};

export const hasAuthToken = () => {
    return !!getAuthToken();
};
