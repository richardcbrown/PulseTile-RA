import React from 'react';
import { VictoryCandlestick, VictoryAxis, VictoryChart } from 'victory';
import moment from 'moment';

export const CarePlanCandlestickChart = ({ carePlanChartData }) => {

    const { dataPoints } = carePlanChartData;

    const chartPoints = [];

    dataPoints.forEach((dp) => {
        chartPoints.push({
            x: dp.x,
            close: dp.y,
            low: dp.y,
            open: dp.y0,
            high: dp.y0
        })
    });

    return (
        <VictoryChart
            domainPadding={{ x: [20, 20], y: [5, 5]}}
        >
            <VictoryCandlestick 
                scale={{ x: "time" }}
                data={chartPoints}
                candleWidth={10}
                style={{ data: { stroke: "#3596f4" } }}
                candleColors={{ positive: "#3596f4", negative: "#3596f4" }}
            />
            <VictoryAxis
                fixLabelOverlap={true} 
                tickFormat={(tick) => moment(tick).format('MMM YYYY')}
            />
            <VictoryAxis dependentAxis />
        </VictoryChart>
    )
}
