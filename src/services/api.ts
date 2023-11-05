import { BASE_API_URL, COMMON } from '../utils/common';

import {
    AUTHORIZATION_HEADER_NAME,
    getAuthorizationHeaderValue,
    setAuthToken
} from './auth';

let controller: AbortController;
let signal: AbortSignal;

const API_END_POINT = {
    LOGIN: 'user/login',
    RESET_PASSWORD: 'user/reset/request',
    RESET_PASSWORD_VERIFY: 'user/reset/verify',
    RESET_PASSWORD_CONFIRM: 'user/reset/confirm',
    REFRESH_PROFILE_SESSION: 'profile/session',
    IMAGE_UPLOAD: 'image/upload',
    GET_LOGBOOK: 'log/recent?page={0}&limit={1}&user_id={2}',
    USER_INFO: 'user/{id}',
    GET_CLIENTS: 'user/customers',
    GET_PROFILE: 'profile/',
    UPDATE_PROFILE: 'profile/',
    NOTIFICATION_LIST: 'user/notification?page={0}&limit={1}',
    READ_NOTIFICATION: 'user/notification/{0}',
    LOGOUT_USER: 'user/logout'
};

function _resetAbortController() {
    controller = new AbortController();
    signal = controller.signal;
}

// init controller and signal
_resetAbortController();

export function abortPreviousRequests(): void {
    controller.abort();

    // replace controller and signal so we have a new unaborted one (otherwise the
    // controller remains aborted and will abort any fetch using its signal immediately)
    _resetAbortController();
}

export const getLogBook = async (
    page: number,
    limit: number,
    user_id: string
) => {
    return await _callAuthenticatedAPI(
        COMMON.stringFormat(API_END_POINT.GET_LOGBOOK, page, limit, user_id)
    );
};

export function login(email: string, password: string): Promise<any> {
    return _callAPI(API_END_POINT.LOGIN, 'POST', {
        email,
        password,
        coach: true
    }).then((response: any) => {
        setAuthToken(response?.auth_token);
        return response;
    });
}

export function resetPassword(email: string, client: string): Promise<any> {
    return _callAPI(API_END_POINT.RESET_PASSWORD, 'POST', { email, client });
}

export function resetPasswordVerify(code: string): Promise<any> {
    return _callAPI(API_END_POINT.RESET_PASSWORD_VERIFY, 'POST', {
        token: code
    });
}

export function resetPasswordChange(
    code: string,
    password: string
): Promise<any> {
    return _callAPI(API_END_POINT.RESET_PASSWORD_CONFIRM, 'POST', {
        token: code,
        password
    });
}

export function refreshProfileSession(): Promise<any> {
    return _callAuthenticatedAPI(
        API_END_POINT.REFRESH_PROFILE_SESSION,
        'POST',
        {}
    );
}

export function getClients(
    page: number,
    limit: number,
    search: string
): Promise<any> {
    const apiPath = API_END_POINT.GET_CLIENTS.concat(
        `?page=${page}&limit=${limit}&search=${search}`
    );
    return _callAuthenticatedAPI(apiPath);
}

export function getImageUploadCredentials(publicImage: boolean): Promise<any> {
    let apiPath = API_END_POINT.IMAGE_UPLOAD;
    if (publicImage) {
        apiPath = apiPath.concat('?public=1');
    }

    return _callAuthenticatedAPI(apiPath);
}

export function getUserInfo(id: string): Promise<any> {
    const endpoint = API_END_POINT.USER_INFO.replace('{id}', id);
    return _callAuthenticatedAPI(endpoint);
}

export const getProfile = async () => {
    return await _callAuthenticatedAPI(API_END_POINT.GET_PROFILE);
};

export function updateProfile(image: string): Promise<any> {
    return _callAuthenticatedAPI(API_END_POINT.UPDATE_PROFILE, 'PUT', {
        image
    });
}

export function logoutUser(): Promise<any> {
    return _callAuthenticatedAPI(API_END_POINT.LOGOUT_USER, 'POST', {});
}

export const getNotifction = async (page: number, limit: number) => {
    return await _callAuthenticatedAPI(
        COMMON.stringFormat(API_END_POINT.NOTIFICATION_LIST, page, limit)
    );
};

export const readNotification = async (id: number) => {
    return await _callAuthenticatedAPI(
        COMMON.stringFormat(API_END_POINT.READ_NOTIFICATION, id),
        'PATCH'
    );
};

type MethodType =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'PATCH';

function _callAuthenticatedAPI(
    endpoint: string,
    method: MethodType = 'GET',
    body?: { [key: string]: any },
    abortable: boolean = false
): Promise<any> {
    const headers = {
        [AUTHORIZATION_HEADER_NAME]: getAuthorizationHeaderValue()
    };

    return _callAPI(endpoint, method, body, headers, abortable);
}

function _callAPI(
    endpoint: string,
    method: MethodType = 'GET',
    body?: { [key: string]: any },
    headers?: { [key: string]: string },
    abortable: boolean = false
): Promise<any> {
    const config: {
        method: string;
        headers: { [key: string]: string };
        body?: string;
        signal?: AbortSignal;
    } = {
        method,
        headers: headers || {}
    };

    if (body) {
        config['headers']['Content-Type'] = 'application/json';
        config['body'] = JSON.stringify(body);
    }

    if (abortable) {
        config['signal'] = signal;
    }

    return fetch(BASE_API_URL + endpoint, config)
        .catch((err) => {
            // reject with unknown error, but aborting an abortable request should be
            // distinguishable as it's not necessarily an erroneous path
            return Promise.reject({
                status: -1,
                aborted: abortable && err.name === 'AbortError'
            });
        })
        .then((response) =>
            response
                .json()
                .catch((_err) => {
                    return Promise.reject({ status: response.status });
                })
                .then((responseBody) => {
                    if (response.ok) {
                        return Promise.resolve(responseBody.data);
                    } else {
                        // error and description may not be available
                        return Promise.reject({
                            status: response.status,
                            data: responseBody
                        });
                    }
                })
        );
}
