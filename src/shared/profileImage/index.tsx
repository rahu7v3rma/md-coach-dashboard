import { FunctionComponent, useCallback } from 'react';

import { useAppDispatch } from '../../hooks';
import { UserSelectors, updateProfile } from '../../reducers/user';
import Avatar from '../avatar';

type Props = {
    width?: number;
    height?: number;
    className?: string;
};

const ProfileImage: FunctionComponent<Props> = ({
    width,
    height,
    className
}: Props) => {
    const dispatch = useAppDispatch();

    const { userProfile } = UserSelectors();

    const handleNewAvatar = useCallback(
        (newAvatarPath: string) => {
            dispatch(updateProfile({ image: newAvatarPath }));
        },
        [dispatch]
    );

    return (
        <Avatar
            path={userProfile?.image || undefined}
            width={width}
            height={height}
            editable
            onNewAvatarUpload={handleNewAvatar}
            className={className}
        />
    );
};

export default ProfileImage;
