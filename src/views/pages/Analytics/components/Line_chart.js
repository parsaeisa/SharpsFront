import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartLegend,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

import 'hammerjs';
import '@progress/kendo-theme-default/dist/all.css';
import React from 'react';
  
const categories = [
'0','1','2','3','4','5','6'
// ,'7','8'
// ,'9','10','11','12','13','14','15','16'
// ,'17','18','19','20','21','22','23','24'
];

const data = [
    {
        name : "yesterday" ,
        data : [
            // 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 
            21, 4 , 6, 6, 9, 12, 11,
            // 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
        ]
    },
    // {
    //     name : "2 days ago " ,
    //     data : [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    //         10, 4 , 3, 1, 2, 2, 1,
    //         0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 
    //         ]
    // },
    // {
    //     name : "3 days ago" ,
    //     data : [10, 4 , 3, 1, 2, 2, 1,
    //         0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    //         0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
    // },
]

class LineChart extends React.Component {

    render(){

        return (
            <Chart style={{height : "300px" }}>
                <ChartTitle role="lineChartTitle" text="Acitivty" />
                <ChartLegend position="top" orientation="horizontal" />
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem title={{ text: 'Hours' }} categories={categories} />
                </ChartCategoryAxis>
                <ChartSeries>
                    {data.map((item, idx) => (
                    <ChartSeriesItem
                    key={idx}
                    type="line"
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

export default LineChart ;
