import { useCallback, useEffect, useRef, useState } from 'react';

import { hasPermissions as hasNotificationsPermissions } from '../services/notification';

const useNotificationsPermissions = () => {
    const [hasPermissions, setHasPermissions] = useState<boolean>(
        hasNotificationsPermissions()
    );
    const notificationsPermissionStatus = useRef<PermissionStatus | null>(null);

    const handlePermissionsChange = useCallback(() => {
        setHasPermissions(hasNotificationsPermissions());
    }, []);

    useEffect(() => {
        navigator.permissions.query({ name: 'notifications' }).then((perm) => {
            notificationsPermissionStatus.current = perm;
            perm.addEventListener('change', handlePermissionsChange);
        });

        return () => {
            if (notificationsPermissionStatus.current !== null) {
                notificationsPermissionStatus.current.removeEventListener(
                    'change',
                    handlePermissionsChange
                );
            }
        };
    }, [handlePermissionsChange]);

    return {
        hasPermissions
    };
};

export default useNotificationsPermissions;
