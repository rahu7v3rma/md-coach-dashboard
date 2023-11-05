import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';

import ProfileImage from '..';
import * as userReducer from 'src/reducers/user';
import Avatar from 'src/shared/avatar';

const store = configureStore({
    reducer: {
        user: userReducer.default
    }
});

const Component = () => (
    <Provider store={store}>
        <ProfileImage />
    </Provider>
);

test('matches the snapshot', () => {
    expect(create(<Component />).toJSON()).toMatchSnapshot();
});

test('renders without crashing', () => {
    expect(create(<Component />)).toBeTruthy();
});

test('renders the Avatar component with the correct props', () => {
    const width = 100;
    const height = 100;
    const className = 'className';
    const tree = create(
        <Provider store={store}>
            <ProfileImage width={width} height={height} className={className} />
        </Provider>
    );
    const avatar = tree.root.findByType(Avatar);
    expect(avatar.props.width).toBe(width);
    expect(avatar.props.height).toBe(height);
    expect(avatar.props.className).toBe(className);
});

test('dispatches an action when a new avatar is uploaded', () => {
    jest.spyOn(userReducer, 'updateProfile');
    const tree = create(<Component />);
    act(() => tree.root.findByType(Avatar).props.onNewAvatarUpload());
    expect(userReducer.updateProfile).toBeCalled();
});

test('handles an empty user profile image path gracefully.', () => {
    jest.spyOn(userReducer, 'UserSelectors').mockImplementation(() => ({
        loading: false,
        userProfile: {
            image: ''
        },
        chatProfile: {
            apiKey: 'apiKey',
            token: 'token',
            userId: 'userId'
        }
    }));
    const tree = create(<Component />);
    expect(tree).toBeTruthy();
    const avatar = tree.root.findByType(Avatar);
    expect(avatar.props.path).toBe(undefined);
});
