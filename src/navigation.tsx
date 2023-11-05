import { FunctionComponent } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import {
    Chat,
    Client,
    ClientDetail,
    Login,
    ResetPassword,
    ResetPasswordChange
} from './pages';
import { ChatManager } from './shared';

const ChatManagerRouterParent: FunctionComponent = () => (
    <ChatManager>
        <Outlet />
    </ChatManager>
);

export const appRouter = createBrowserRouter([
    {
        element: <ChatManagerRouterParent />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            },
            {
                path: '/reset-password/change',
                element: <ResetPasswordChange />
            },
            {
                path: '/chat',
                element: <Chat />
            },
            {
                path: '/clients',
                element: <Client />
            },
            {
                path: '/client/:id',
                element: <ClientDetail />
            }
        ]
    }
]);
