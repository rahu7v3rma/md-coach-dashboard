import { Provider } from 'react-redux';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ReactTestRenderer, act, create } from 'react-test-renderer';

import ClientDetail from '../../clientDetail';
import store from 'src/store';

const mockDispatch = jest.fn().mockImplementation(() => {
    return {
        unwrap: jest.fn().mockImplementation(() => {
            return Promise.resolve({});
        })
    };
});

const getLogBookMockImplementation = jest
    .fn()
    .mockImplementation(() => Promise.resolve({}));

jest.spyOn(require('src/reducers/client'), 'getLogBook').mockImplementation(
    getLogBookMockImplementation
);

jest.spyOn(
    require('src/reducers/client'),
    'ClientSelectors'
).mockImplementation(
    jest.fn().mockImplementation(() => ({
        profiles: {
            '1': {
                id: 1,
                first_name: 'test',
                last_name: 'test',
                email: 'demo@gmail.com',
                contact_number: '1234567891',
                date_of_birth: '1990-01-01',
                diabetes_type: 'type 1',
                next_lesson: {
                    lesson: { title: 'Test Title', icon: 'TestIcon' },
                    order: 1
                }
            }
        },
        logBook: {
            '1': {
                next_page_number: 2,
                previous_page_number: 0,
                has_previous: true,
                has_next: true,
                list: []
            }
        }
    }))
);

jest.mock('../../../hooks', () => ({
    useAppDispatch: () => {
        return mockDispatch;
    },
    useNotificationsPermissions: jest
        .fn()
        .mockImplementationOnce(() => {
            return {
                hasPermissions: true
            };
        })
        .mockImplementation(() => {
            return {
                hasPermissions: false
            };
        })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('ClientDetail', () => {
    let tree: ReactTestRenderer;
    beforeAll(async () => {
        await act(async () => {
            tree = create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/client/1']}>
                        <Routes>
                            <Route
                                path="/client/:id"
                                element={<ClientDetail />}
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
        });
    });

    it('renders the client detail page properly', () => {
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('displays loader properly during the loading state', async () => {
        const scrollInfinity = tree.root.findByProps({
            'data-testid': 'infinite-scroll'
        });

        await act(async () =>
            scrollInfinity.instance.onScrollListener({
                target: {
                    scrollTop: 1000,
                    scrollHeight: 2000,
                    clientHeight: 1000
                }
            })
        );
        expect(scrollInfinity.instance.state.showLoader).toBe(true);
    });

    it('handles back button click properly', async () => {
        const backBtn = tree.root.findByProps({
            'data-testid': 'backbutton'
        });
        await act(async () => backBtn.props.onClick());
        expect(mockNavigate).toHaveBeenCalledWith('/clients', {
            replace: true
        });
    });

    it('handles infinite scroll properly', async () => {
        const scrollInfinity = tree.root.findByProps({
            'data-testid': 'infinite-scroll'
        });
        await act(async () => scrollInfinity.props.next());
        expect(getLogBookMockImplementation).toHaveBeenCalledTimes(3);
    });
});
