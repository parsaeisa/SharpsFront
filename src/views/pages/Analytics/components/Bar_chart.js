import * as React from 'react'

import '@progress/kendo-theme-default/dist/all.css';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisTitle,
    ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

import 'hammerjs';

const series = [
    {
        name: "google",
        data: [3.988, 3.733, 3.994]
    },
    {
        name: "facebook",
        data: [2.21, 2.375, 2.161]
    },
    {
        name: "twitter",
        data: [1.743, 1.295, 1.175 , 1]
    },
    {
        name: "apple",
        data: [0.907, 0.943, 0.848 , 1]
    }
]

const categories = ['google', 'facebook', 'twitter', 'apple'];
class BarChart extends React.Component {

    render () 
    {
        return (
            <Chart>
                <ChartTitle text="favorite Links" />
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={categories}>
                            <ChartCategoryAxisTitle />
                        </ChartCategoryAxisItem>
                    </ChartCategoryAxis>
                <ChartSeries>
                {series.map((item, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="bar"
                  tooltip={{ visible: true }}
                  data={item.data}
                  name={item.name}
                                />
                            ))}
                </ChartSeries>
            </Chart>
        );
    }
}

export default BarChart ;