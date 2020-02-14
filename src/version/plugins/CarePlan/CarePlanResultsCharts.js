import React from 'react';
import { VictoryCandlestick, VictoryAxis, VictoryChart, VictoryScatter, VictoryLine } from 'victory';
import moment from 'moment';

export const CarePlanCandlestickChart = ({ carePlanChartData }) => {

    const { dataPoints } = carePlanChartData;

    const chartPoints = [];

    const scatter1Points = [];
    const scatter2Points = [];

    dataPoints.forEach((dp) => {
        chartPoints.push({
            x: dp.x,
            close: dp.y,
            low: dp.y,
            open: dp.y0,
            high: dp.y0
        })

        scatter1Points.push({ x: dp.x, y: dp.y0 })
        scatter2Points.push({ x: dp.x, y: dp.y })
    });

    return (
        <VictoryChart
            domainPadding={{ x: [20, 20], y: [5, 5]}}
        >
            {/* <VictoryCandlestick 
                scale={{ x: "time" }}
                data={chartPoints}
                candleWidth={10}
                style={{ data: { stroke: "#3596f4" } }}
                candleColors={{ positive: "#3596f4", negative: "#3596f4" }}
            /> */}
            <VictoryScatter
                scale={{ x: "time" }}
                data={scatter1Points}
                style={{ data: { fill: "#3596f4" } }}
            />
            <VictoryScatter 
                scale={{ x: "time" }}
                data={scatter2Points}
                style={{ data: { fill: "#3596f4" } }}
            />

            <VictoryLine
                scale={{ x: "time" }}
                data={scatter1Points}
                style={{ data: { stroke: "#3596f4" } }}
            />
            <VictoryLine 
                scale={{ x: "time" }}
                data={scatter2Points}
                style={{ data: { stroke: "#3596f4" } }}
            />
            <VictoryAxis
                fixLabelOverlap={true} 
                tickFormat={(tick) => moment(tick).format('MMM YYYY')}
            />
            <VictoryAxis dependentAxis />
        </VictoryChart>
    )
}
