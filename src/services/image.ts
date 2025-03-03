import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromWebToken } from '@aws-sdk/credential-providers';

import { getImageUploadCredentials } from './api';

const getFileContentType = (file: File): string => {
    const fileExtension = file.name.split('.').pop();

    switch (fileExtension) {
        case 'png':
            return 'image/png';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        default:
            return '';
    }
};

const uploadImage = (
    imageContent: File,
    contentType: string,
    publicImage: boolean
): Promise<string> => {
    return getImageUploadCredentials(publicImage).then(
        (uploadCredentialsResponse) => {
            const client = new S3Client({
                region: uploadCredentialsResponse.regionName,
                credentials: fromWebToken({
                    webIdentityToken: uploadCredentialsResponse.token,
                    roleArn: uploadCredentialsResponse.roleArn,
                    clientConfig: {
                        region: uploadCredentialsResponse.regionName
                    }
                })
            });

            const imagePath =
                uploadCredentialsResponse.keyPrefix +
                uploadCredentialsResponse.fileName;

            return client
                .send(
                    new PutObjectCommand({
                        Bucket: uploadCredentialsResponse.bucketName,
                        Key: imagePath,
                        Body: imageContent,
                        ContentType: contentType
                    })
                )
                .then((_putOutput: any) => imagePath);
        }
    );
};

export { getFileContentType, uploadImage };
