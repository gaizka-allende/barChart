import React, { Component } from 'react';

import Bar from './Bar';
import StackedBars from './StackedBars';
import Chart from './Chart';

//import graph-background-image from './graph-background-image.svg'

import styles from './App.css';


const App = () => {
    return (
        <div className="charts">
            <div className="chart-container">
                <Chart css="chart-liquidity">
                    <Bar css={'chart__bar-desired'} value={57000} place={1/3} />
                    <Bar css={'chart__bar-current'} value={12234.56} place={2/3} />
                </Chart>
            </div>
            <div className="chart-container">
                <Chart css="chart-protection">
                        <Bar css={'chart__bar-desired'} value={56874.25} place={1/3} />
                        <StackedBars place={2/3} >
                            <Bar css={'chart__bar-stacked-1'} value={38778} />
                            <Bar css={'chart__bar-stacked-2'} value={9503.68} />
                        </StackedBars>
                </Chart>
            </div>
            <div className="chart-container">
                <Chart css="chart-growth">
                    <Bar css={'chart__bar-desired'} value={-8750.23} place={1/2} />
                </Chart>
            </div>
        </div>
    )
}



export default App;
