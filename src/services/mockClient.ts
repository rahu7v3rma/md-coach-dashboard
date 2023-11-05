import User1 from '../assets/users/user1.png';
import User2 from '../assets/users/user3.png';

const queryUsers = (query: any = {}) => {
    const users = [
        {
            name: 'Dan Forest',
            status: 'Online',
            avatar: 'Avatar0',
            id: 1
        },
        {
            name: 'Tamara Blade',
            status: '54 min ago',
            avatar: 'Avatar1',
            id: 2
        },
        {
            name: 'Emma Stone',
            status: 'Online',
            avatar: 'Avatar2',
            id: 3
        },
        {
            name: 'Samantha White',
            status: '9 min ago',
            avatar: 'Avatar3',
            id: 4
        },
        {
            name: 'Sam Pickford',
            status: '12 min ago',
            avatar: 'Avatar4',
            id: 5
        }
    ];

    return query && query.name
        ? users.filter(
              (user) => user.name.toLowerCase().indexOf(query.name) !== -1
          )
        : users;
};

const queryChatGroups = (query: any = {}) => {
    const users = [
        {
            name: 'Adam Storm',
            online: true,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile1',
            time: '11:59AM',
            unreadCount: 0,
            id: 1
        },
        {
            name: 'Whole Food Crew',
            online: true,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile2',
            time: '11:59AM',
            unreadCount: 0,
            id: 2
        },
        {
            name: 'Anna Armas',
            online: true,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile3',
            time: '11:59AM',
            unreadCount: 0,
            id: 3
        },
        {
            name: 'Tamara Blade',
            online: false,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile4',
            time: '11:59AM',
            unreadCount: 0,
            id: 4
        },
        {
            name: 'Jack Green',
            online: true,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile5',
            time: '11:59AM',
            unreadCount: 3,
            id: 5
        },
        {
            name: 'Emma Stone',
            online: false,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile6',
            unreadCount: 3,
            time: '11:59AM',
            id: 6
        },
        {
            name: 'Samantha White',
            online: false,
            lastmessage: 'When do you release the coded...',
            avatar: 'Profile7',
            time: '11:59AM',
            unreadCount: 3,
            id: 7
        }
    ];

    return query && query.name
        ? users.filter(
              (user) => user.name.toLowerCase().indexOf(query.name) !== -1
          )
        : users;
};

export const queryConversationData = (_query: any = {}) => {
    return {
        date: '10 July',
        messageList: [
            {
                type: 'sender',
                time: '10:56',
                name: 'Jack Grillish',
                message: `Hi Adam, thanks for contacting.Yes, I’m working on it. It would be released next 2 weeks. You could check the progress here: https://ui8.net/progress Thanks for your patience and understanding. 🙌Regards,Br`,
                image: User1
            },
            {
                type: 'receiver',
                time: '10:56',
                name: 'Billy Rogers',
                message: `Hi Adam, thanks for contacting.Yes, I’m working on it. It would be released next 2 weeks. You could check the progress here: https://ui8.net/progress Thanks for your patience and understanding. 🙌Regards,Br`,
                image: User2
            },
            {
                type: 'receiver',
                time: '10:56',
                name: 'Billy Rogers',
                message: `Hi Adam, thanks for contacting.Yes, I’m working on it. It would be released next 2 weeks. You could check the progress here: https://ui8.net/progress Thanks for your patience and understanding. 🙌Regards,Br`,
                image: User2
            },
            {
                type: 'receiver',
                time: '10:56',
                name: 'Billy Rogers',
                message: `Hi Adam, thanks for contacting.Yes, I’m working on it. It would be released next 2 weeks. You could check the progress here: https://ui8.net/progress Thanks for your patience and understanding. 🙌Regards,Br`,
                image: User2
            },
            {
                type: 'sender',
                time: '10:56',
                name: 'Jack Grillish',
                message: `Hi Adam, thanks for contacting.Yes, I’m working on it. It would be released next 2 weeks. You could check the progress here: https://ui8.net/progress Thanks for your patience and understanding. 🙌Regards,Br`,
                image: User1
            },
            {
                type: 'sender',
                time: '10:56',
                name: 'Jack Grillish',
                message: `Hi Adam, thanks for contacting.Yes, I’m working on it. It would be released next 2 weeks. You could check the progress here: https://ui8.net/progress Thanks for your patience and understanding. 🙌Regards,Br`,
                image: User1
            }
        ]
    };
};

export const MockClient = {
    queryChatGroups,
    queryConversationData,
    queryUsers
};
