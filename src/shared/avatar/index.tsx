import {
    ChangeEvent,
    FunctionComponent,
    useCallback,
    useMemo,
    useState
} from 'react';

import DefaultAvatarIcon from '../../assets/default-avatar.svg';
import EditAvatarIcon from '../../assets/edit-avatar.svg';
import { getFileContentType, uploadImage } from '../../services/image';
import PlatformImage from '../platformImage';

import {
    DefaultAvatar,
    EditOverlay,
    FileInput,
    ImageContainer,
    Wrapper
} from './styles';

interface Props {
    path?: string;
    width?: number;
    height?: number;
    editable?: boolean;
    onNewAvatarUpload?: (newAvatarPath: string) => void;
    online?: boolean;
    className?: string;
}

const Avatar: FunctionComponent<Props> = ({
    path,
    width = 40,
    height = 40,
    editable,
    onNewAvatarUpload,
    online,
    className
}: Props) => {
    const [uploading, setUploading] = useState<boolean>(false);

    const handleSelectedFileChanged = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const selection = e.currentTarget.files;

            if (selection) {
                const selectedFile = selection[0];
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (allowedTypes.includes(selectedFile?.type)) {
                    setUploading(true);

                    uploadImage(
                        selection[0],
                        getFileContentType(selection[0]),
                        true
                    )
                        .then((uploadedPath: string) => {
                            onNewAvatarUpload &&
                                onNewAvatarUpload(uploadedPath);
                        })
                        .finally(() => setUploading(false));
                } else {
                    alert('Please select a valid image file');
                }
            }
        },
        [onNewAvatarUpload]
    );

    const imageComponent = useMemo(() => {
        if (path) {
            return (
                <PlatformImage imageId={path} width={width} height={height} />
            );
        } else {
            return (
                <DefaultAvatar
                    id="defaultAvatar"
                    className={className}
                    alt="avatar"
                    src={DefaultAvatarIcon}
                />
            );
        }
    }, [path, width, height, className]);

    if (editable && !uploading) {
        return (
            <Wrapper online={online}>
                <label>
                    <FileInput
                        id="handleSelectedFileChanged"
                        aria-label="File input"
                        type="file"
                        onChange={handleSelectedFileChanged}
                        accept="image/png,image/jpeg,image/jpg"
                    />
                    <ImageContainer
                        id="editOverlay"
                        editable={editable}
                        className={className}
                    >
                        {imageComponent}
                        <EditOverlay alt="edit" src={EditAvatarIcon} />
                    </ImageContainer>
                </label>
            </Wrapper>
        );
    } else {
        return (
            <Wrapper online={online}>
                <ImageContainer className={className}>
                    {imageComponent}
                </ImageContainer>
            </Wrapper>
        );
    }
};

export default Avatar;
