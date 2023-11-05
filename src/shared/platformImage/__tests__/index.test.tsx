import {
    RenderResult,
    act,
    cleanup,
    fireEvent,
    render,
    waitFor
} from '@testing-library/react';
// import userEvt from '@testing-library/user-event';

import PlatformImage from '..';

jest.mock('src/services/auth', () => ({
    getAuthorizationHeaderValue: jest.fn().mockReturnValue('123456azerty'),
    AUTHORIZATION_HEADER_NAME: 'Token'
}));

jest.mock('src/utils/common', () => ({
    BASE_API_URL: 'http://base_api_url/'
}));

global.URL.createObjectURL = jest
    .fn()
    .mockReturnValue('blob:d3958f5c-0777-0845-9dcf-2cb28783acaf');

let tree: RenderResult;

beforeEach(async () => {
    tree = await act(() => render(<PlatformImage imageId="123456" />));
});

afterEach(cleanup);

test('matches the snapshot', async () => {
    expect(tree).toMatchSnapshot();
});

test('renders without crashing', async () => {
    expect(tree).toBeTruthy();
});

test('requests the image from the correct URL with authorization', async () => {
    await waitFor(() => {
        expect(fetch).toBeCalledWith('http://base_api_url/image/123456', {
            headers: { Token: '123456azerty' }
        });
    });
});

test('displays a loader while the image is loading', async () => {
    expect(tree.container.querySelector('circle')).toBeTruthy();
});

test('displays the image once it is loaded', async () => {
    await act(() =>
        fireEvent.load(
            tree.container.querySelector('img') || document.createElement('img')
        )
    );
    expect(tree.container.querySelector('circle')).not.toBeTruthy();
});

test('handles height and width', async () => {
    tree = await act(() =>
        render(<PlatformImage imageId="123456" height={16} width={16} />)
    );
    await waitFor(() => {
        expect(fetch).toBeCalledWith(
            'http://base_api_url/image/123456/r/16/16/scale',
            { headers: { Token: '123456azerty' } }
        );
    });
});
