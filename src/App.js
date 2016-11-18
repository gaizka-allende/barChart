import React, { Component } from 'react';

//import graph-background-image from './graph-background-image.svg'

import styles from './App.css';


const Bar = ({className, label, x, y, width, height}) => {

    return (
        <g>
            <rect
                className={className}
                x={x}
                y={y}
                width={width}
                height={height}
            />
            <text
                x={x - 10}
                y={y - height - 3}>
                <tspan>{label}</tspan>
            </text>
        </g>
    )
}

Bar.propTypes = {
  className: React.PropTypes.string,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

Bar.defaultProps = {
    width: 30
}


const Bars = ({desiredAmount, currentAmount, y}) => {

    const desiredBarHeight = desiredAmount / 1000 ;
    const currentBarHeight = currentAmount / 1000 ;

    return (
        <g className="liquidity-chart__bars">
            <Bar
                className={'desired'}
                label={desiredAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                x={75}
                y={y - desiredBarHeight}
                height={desiredBarHeight} />
            <Bar
                className={'current'}
                label={currentAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                x={175}
                y={y - currentBarHeight}
                height={currentBarHeight} />

        </g>
    );
}

const Grid = ({lines, axisSpacing}) => (
    <g className="liquidity-chart__grid">
      {
        lines.map((axisLine, i) => {
            const lineStyle = {
                stroke: i === 0 || i === lines.length-1  ? '#000000' : '#efefef',
                'stroke-dasharray': axisLine.value === '0' ? 1 : null
            };
            const lineLabelStyle = {
                'text-anchor': 'end'
            }
            return (
                <g className="liquidity-chart__grid-line" key={`liquidity-chart__grid-line-${i}`}>
                    <line
                        x1={axisLine.start.x}
                        y1={axisLine.start.y}
                        x2={axisLine.end.x}
                        y2={axisLine.end.y}
                        style={lineStyle}
                    />
                    <text
                        x={axisLine.end.x}
                        y={i*axisSpacing - 5}
                        width="40">
                        <tspan style={lineLabelStyle}>{axisLine.label}</tspan>
                    </text>
                </g>
            )
        })
      }
    </g>
)

const Chart = ({id, desiredAmount, currentAmount, width, height, currencySign, axisValues, axisSpacing}) => {

    const axisLength = width;
    const lines =  axisValues.map((y, i) => (
            {
                start: { x: 0, y: i*axisSpacing},
                end: { x: axisLength, y: i*axisSpacing},
                value: y,
                label: `${y} ${currencySign}`
            }
        )
    )
    return (
        <svg className={id} height={height} width={width}>
            <Grid lines={lines} axisSpacing={axisSpacing} />
            <Bars desiredAmount={desiredAmount}
                currentAmount={currentAmount}
                y={lines.filter(axisLine => axisLine.value === '0')[0].start.y}/>
        </svg>
    )
  }

Chart.propTypes = {
    id: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    desiredAmount: React.PropTypes.number,
    currentAmount: React.PropTypes.number,
    currencySign: React.PropTypes.string,
    axisValues: React.PropTypes.array,
    axisSpacing: React.PropTypes.number
}


Chart.defaultProps = {
    width: 300,
    height: 150,
    currencySign: '€',
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    axisSpacing: 25
}


const App = () => (
    <div className="placeholder">
        <Chart id="liquidity-chart" desiredAmount={6000} currentAmount={1234.56} />
    </div>
)

export default App;
