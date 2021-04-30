import * as React from 'react';
// import '@progress/kendo-theme-default/dist/all.css';
import "../../../styles/analytics.css";

import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels
} from '@progress/kendo-react-charts';

import 'hammerjs';

const labelContent = (e) => (e.category);

class DonatChart extends React.Component {

    render(){
        
        const labelContent = (e) => (`${ e.category }`);

        const internetGrowthData = [{
            "name": "2011",
            "data": [{
              "category": "Asia",
              "value": 20.8,
              "color": "#9de219"
            }, {
              "category": "Europe",
              "value": 11.1,
              "color": "#90cc38"
            }, {
              "category": "Latin America",
              "value": 16.3,
              "color": "#068c35"
            }, {
              "category": "Africa",
              "value": 17.6,
              "color": "#006634"
            }, {
              "category": "Middle East",
              "value": 19.2,
              "color": "#004d38"
            }, {
              "category": "North America",
              "value": 14.6,
              "color": "#033939"
            }]
        }]

        const mapSeries = (series, index, array) => (
            <ChartSeriesItem
              type="donut"
              startAngle={150}
              name={series.name}
              data={series.data}
              tooltip={{ visible: true }}
              field="value"
              categoryField="category"
              colorField="color"
            >
              {
                index === array.length - 1
                && <ChartSeriesLabels
                  position="outsideEnd"
                  background="none"
                  content={labelContent} />
              }
            </ChartSeriesItem>
        );

        return (
            <div >
                <Chart style={{height : '260px'}} >
                    <ChartTitle text="favorite topics" className = "Donat_chart_title"  />
                    <ChartSeries  >                        
                        {internetGrowthData.map(mapSeries)}
                    </ChartSeries>
                    <ChartLegend visible={false} />
                </Chart>
            </div>
        )
    }
};

export default DonatChart ;