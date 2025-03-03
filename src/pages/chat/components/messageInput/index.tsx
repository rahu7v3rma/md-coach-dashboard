import { FunctionComponent } from 'react';
import { FileUploadButton, ImageDropzone } from 'react-file-utils';
import {
    ChatAutoComplete,
    QuotedMessagePreview,
    UploadsPreview,
    useChannelStateContext,
    useMessageInputContext
} from 'stream-chat-react';

import AttachIcon from 'src/assets/attach-icon.svg';
import SendIcon from 'src/assets/send-icon.svg';
import CircleButton from 'src/shared/circleButton';

import {
    ChatTools,
    ChatToolsWrapper,
    Icon,
    InputWrapper,
    InputWrapperContainer,
    QuotedContainer
} from './styles';

type Props = {};

const MessageInput: FunctionComponent<Props> = ({}: Props) => {
    const { uploadNewFiles, maxFilesLeft, handleSubmit } =
        useMessageInputContext();

    const { acceptedFiles, multipleUploads, quotedMessage } =
        useChannelStateContext();

    return (
        <ImageDropzone
            handleFiles={uploadNewFiles}
            accept={acceptedFiles}
            multiple={multipleUploads}
        >
            <ChatToolsWrapper>
                {quotedMessage && (
                    <QuotedContainer>
                        <QuotedMessagePreview quotedMessage={quotedMessage} />
                    </QuotedContainer>
                )}
                <ChatTools>
                    <FileUploadButton
                        accepts={acceptedFiles}
                        disabled={maxFilesLeft === 0}
                        handleFiles={uploadNewFiles}
                        multiple={multipleUploads}
                    >
                        <Icon src={AttachIcon} alt="Attach" />
                    </FileUploadButton>
                    <InputWrapperContainer>
                        <InputWrapper>
                            <UploadsPreview />
                            <ChatAutoComplete placeholder="Enter your message" />
                            <CircleButton
                                image={SendIcon}
                                onClick={handleSubmit}
                            />
                        </InputWrapper>
                    </InputWrapperContainer>
                </ChatTools>
            </ChatToolsWrapper>
        </ImageDropzone>
    );
};

export default MessageInput;
