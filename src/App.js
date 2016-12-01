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
                <Chart className="chart-liquidity">
                    <Bar className="chart__bar-desired" value={57000} />
                    <Bar className="chart__bar-current" value={12234.56} />
                </Chart>
            </div>
            <div className="chart-container">
                <Chart className="chart-protection">
                        <Bar className="chart__bar-desired" value={56874.25} />
                        <StackedBars >
                            <Bar className="chart__bar-stacked-1" value={38778} />
                            <Bar className="chart__bar-stacked-2" value={9503.68} />
                        </StackedBars>
                </Chart>
            </div>
            <div className="chart-container">
                <Chart className="chart-growth">
                    <Bar className="chart__bar-desired" value={-8750.23} />
                </Chart>
            </div>
        </div>
    )
}



export default App;
