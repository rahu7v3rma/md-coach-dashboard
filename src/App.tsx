import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { appRouter } from './navigation';
import store from './store';

const App: FunctionComponent = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    );
};

export default App;
