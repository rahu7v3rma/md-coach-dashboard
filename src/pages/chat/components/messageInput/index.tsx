import { FunctionComponent } from 'react';
import { FileUploadButton, ImageDropzone } from 'react-file-utils';
import {
    ChatAutoComplete,
    UploadsPreview,
    useChannelStateContext,
    useMessageInputContext
} from 'stream-chat-react';

import AttachIcon from 'src/assets/attach-icon.svg';
import SendIcon from 'src/assets/send-icon.svg';
import CircleButton from 'src/shared/circleButton';

import { ChatTools, Icon, InputWrapper } from './styles';

type Props = {};

const MessageInput: FunctionComponent<Props> = ({}: Props) => {
    const { uploadNewFiles, maxFilesLeft, handleSubmit } =
        useMessageInputContext();

    const { acceptedFiles, multipleUploads } = useChannelStateContext();

    return (
        <ImageDropzone
            handleFiles={uploadNewFiles}
            accept={acceptedFiles}
            multiple={multipleUploads}
        >
            <ChatTools>
                <FileUploadButton
                    accepts={acceptedFiles}
                    disabled={maxFilesLeft === 0}
                    handleFiles={uploadNewFiles}
                    multiple={multipleUploads}
                >
                    <Icon src={AttachIcon} alt="Attach" />
                </FileUploadButton>
                <InputWrapper>
                    <UploadsPreview />
                    <ChatAutoComplete placeholder="Enter your message" />
                    <CircleButton image={SendIcon} onClick={handleSubmit} />
                </InputWrapper>
            </ChatTools>
        </ImageDropzone>
    );
};

export default MessageInput;
