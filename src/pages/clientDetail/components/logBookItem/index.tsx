import React, { FC, useState } from 'react';

import { FoodBigImg, FoodImg } from '../../styles';
import { Card, Modal, Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

import {
    Body,
    Header,
    TimeContainer,
    TitleContainer,
    TitleIcon
} from './styles';

type Props = {
    children?: React.ReactNode;
    icon: string;
    title: string;
    time: string;
    width?: string;
    height?: string;
    image?: string;
    onClick?: () => void;
};

const LogBookItem: FC<Props> = (props: Props) => {
    const { children, icon, title, time, width, height, image, onClick } =
        props;
    const [modalImage, setModalImage] = useState<string | null>(null);

    return (
        <>
            <Card
                flexDirection="column"
                padding="16px 20px"
                width={width}
                height={height}
                justifyContent="space-between"
                onClick={onClick}
            >
                <Header>
                    <TitleContainer>
                        <TitleIcon src={icon} />
                        <Text
                            color={Colors.theme.primary}
                            marginLeft={15}
                            fontWeight="600"
                            lineHeight="20px"
                            fontSize={Size.XXSmall}
                            fontFamily='"Poppins", sans-serif'
                        >
                            {title}
                        </Text>
                    </TitleContainer>
                    {image && (
                        <div onClick={() => setModalImage(image)}>
                            <FoodImg imageId={image} />
                        </div>
                    )}
                    <TimeContainer>
                        <Text
                            color={Colors.extra.black_text}
                            marginRight={12}
                            lineHeight="20px"
                            fontWeight="500"
                            fontSize={Size.XXSmall}
                            fontFamily='"Poppins", sans-serif'
                        >
                            {time}
                        </Text>
                    </TimeContainer>
                </Header>
                <Body>{children}</Body>
            </Card>

            {/* modal window for showing large food images when clicked */}
            <Modal
                open={!!modalImage}
                onClose={() => {
                    setModalImage(null);
                }}
            >
                <FoodBigImg imageId={modalImage || ''} width={1024} />
            </Modal>
        </>
    );
};

export default LogBookItem;
