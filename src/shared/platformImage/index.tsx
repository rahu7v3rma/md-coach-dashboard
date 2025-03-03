import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
    AUTHORIZATION_HEADER_NAME,
    getAuthorizationHeaderValue
} from '../../services/auth';
import { BASE_API_URL } from '../../utils/common';
import Loader from '../loader';

// only scale is supported for now
type SupportedResizeMethod = 'scale';
const LoaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

type Props = {
    imageId: string;
    width?: number;
    height?: number;
    method?: SupportedResizeMethod;
    className?: string;
};

const PlatformImage: FunctionComponent<Props> = ({
    imageId,
    width,
    height,
    method = 'scale',
    className
}: Props) => {
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    useEffect(() => {
        let imagePath;

        if (width || height) {
            imagePath = `${imageId}/r/${width || 0}/${height || 0}/${method}`;
        } else {
            imagePath = imageId;
        }

        const src = `${BASE_API_URL}image/${imagePath}`;
        const options = {
            headers: {
                [AUTHORIZATION_HEADER_NAME]: getAuthorizationHeaderValue()
            }
        };

        fetch(src, options)
            .then((res) => res.blob())
            .then((blob) => {
                setImageSrc(URL.createObjectURL(blob));
            });
    }, [imageId, width, height, method]);

    return (
        <>
            {imageLoading && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}
            <img
                src={imageSrc}
                alt=""
                className={className}
                onError={() => setImageLoading(false)}
                onLoad={() => setImageLoading(false)}
            />
        </>
    );
};

export default PlatformImage;
