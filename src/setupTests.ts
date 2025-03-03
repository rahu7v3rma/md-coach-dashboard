import '@testing-library/jest-dom';

global.Notification = {};
require('jest-fetch-mock').enableMocks();

Object.defineProperty(document, 'fonts', {
    value: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
    }
});

jest.mock('src/hooks', () => ({
    useAppDispatch: () => {
        return jest.fn().mockImplementation(() => {
            return {
                unwrap: jest.fn().mockImplementation(() => {
                    return Promise.resolve({});
                })
            };
        });
    },
    useNotificationsPermissions: () => {
        return jest.fn().mockImplementation(() => {
            return {
                hasPermissions: true
            };
        });
    }
}));
