import styled from 'styled-components';

import { Text } from 'src/shared';
import { Colors } from 'src/utils/colors';

export const LessonDetails = styled.div`
    margin-top: 14px;
    width: 147px;
`;

export const Title = styled(Text)`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${Colors.extra.black};
    padding-left: 4px;
`;
