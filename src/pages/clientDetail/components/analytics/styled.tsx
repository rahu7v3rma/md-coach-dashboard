import styled from 'styled-components';

import { Text } from 'src/shared';
import { Size } from 'src/shared/text';
import { Colors } from 'src/utils/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    padding-right: 10px;
`;
export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
`;

export const Title = styled(Text).attrs({
    fontSize: Size.Medium,
    fontWeight: '600',
    lineHeight: '32px',
    color: Colors.extra.darkLiver,
    children: 'Analytics'
})`
    margin-bottom: 10px;
`;

export const Cards = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const Card = styled.div`
    background-color: ${Colors.extra.white};
    border-radius: 24px;
    padding: 25px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 49%;
    height: 400px;
    padding-bottom: 0px;
    margin-bottom: 20px;
`;

export const BarChart = {
    chartPadding: {
        top: 10,
        right: 0,
        bottom: 23,
        left: 35
    },
    tooltipFlyoutStyle: {
        stroke: 'none',
        fill: Colors.extra.earlyDawn
    },
    tooltipStyle: {
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Poppins'
    }
};

export const LineChart = {
    chartPadding: {
        top: 10,
        right: 5,
        bottom: 23,
        left: 35
    },
    tooltipStyle: {
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Poppins',
        fill: 'black'
    },
    tooltipFlyoutStyle: BarChart.tooltipFlyoutStyle
};
