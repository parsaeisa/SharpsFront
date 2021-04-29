import * as React from 'react';
import '@progress/kendo-theme-default/dist/all.css';

import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels
} from '@progress/kendo-react-charts';

import 'hammerjs';

const labelContent = (e) => (e.category);

class DonatChart extends React.Component {

    render(){

        const data = [ {
            "kind": "Hydroelectric", "share": 0.175
        }, {
            "kind": "Nuclear", "share": 0.238
        }, {
            "kind": "Coal", "share": 0.118
        }, {
            "kind": "Solar", "share": 0.052
        }, {
            "kind": "Wind", "share": 0.225
        }, {
            "kind": "Other", "share": 0.192
        } ]

        return (
            <div style={{width : '300px'  }} >
                <Chart style={{height : '260px'}} >
                    <ChartSeries  >
                    <ChartSeriesItem type="donut"data={data} categoryField="kind" style={{background : '#0f0'}} field="share">
                        <ChartSeriesLabels color="#fff" background="none" content={labelContent} />
                    </ChartSeriesItem>
                    </ChartSeries>
                    <ChartLegend visible={false} />
                </Chart>
            </div>
        )
    }
};

export default DonatChart ;