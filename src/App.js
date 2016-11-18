import React, { Component } from 'react';

//import graph-background-image from './graph-background-image.svg'

import styles from './App.css';

const Bar = ({cssRule, label, x, y, width, height}) => {
    const barHtml = `
        <rect
            class=${cssRule}
            x=${x}
            y=${y}
            width=${width}
            height=${height}
        />
        <text
            x=${x - 10}
            y=${y - 5}>
            <tspan>${label}</tspan>
        </text>`;
    return (
        <g dangerouslySetInnerHTML={{ __html: barHtml }}></g>
    )
}

Bar.propTypes = {
  className: React.PropTypes.string,
  x: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  axisValues: React.PropTypes.array,
  axisSpacing: React.PropTypes.number

};

Bar.defaultProps = {
    width: 30,
    axisSpacing: 25,
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T']
}


const Grid = ({width, axisValues, axisSpacing, currencySign}) => {
    const lines =  axisValues.map((y, i) => (
            {
                start: { x: 0, y: (i+1)*axisSpacing},
                end: { x: width, y: (i+1)*axisSpacing},
                value: y,
                label: `${y} ${currencySign}`
            }
        )
    )
    return (
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
                            y={axisLine.start.y - 5}
                            width="40">
                            <tspan style={lineLabelStyle}>{axisLine.label}</tspan>
                        </text>
                    </g>
                )
            })
          }
        </g>
    )
}

Grid.propTypes = {
    width: React.PropTypes.number,
    axisValues: React.PropTypes.array,
    axisSpacing: React.PropTypes.number,
    currencySign: React.PropTypes.string
}

Grid.defaultProps = {
    width: 300,
    currencySign: '€'
}

const App = ({width, height, axisValues, axisSpacing}) => {
    const desiredAmount = 40000;
    const currentAmount = 1234.56;
    const desiredBarHeight = desiredAmount / 1000 ;
    const currentBarHeight = currentAmount / 1000 ;

    const barYCoordinate = axisValues
        .map((y, i) => ({
            y: (i+1)*axisSpacing,
            value: y
        }))
        .filter(axisLine => axisLine.value === '0')[0].y;


    return (
        <div>
            <svg className="liquidity-chart" height={height} width={width}>
                <Grid axisValues={axisValues} axisSpacing={axisSpacing}/>
                <g className="liquidity-chart__bars">
                    <Bar
                        cssRule={'desired'}
                        label={desiredAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        x={75}
                        y={barYCoordinate - desiredBarHeight}
                        height={desiredBarHeight} />
                    <Bar
                        cssRule={'current'}
                        label={currentAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        x={175}
                        y={barYCoordinate - currentBarHeight}
                        height={currentBarHeight} />
                </g>
            </svg>
            <svg className="liquidity-chart" height={height} width={width}>
                <Grid axisValues={axisValues} axisSpacing={axisSpacing}/>
                <g className="liquidity-chart__bars">
                    <Bar
                        cssRule={'desired'}
                        label={desiredAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        x={100}
                        y={barYCoordinate - desiredBarHeight}
                        height={desiredBarHeight} />
                </g>
            </svg>
        </div>
    )
}

App.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    axisValues: React.PropTypes.array,
    axisSpacing: React.PropTypes.number,
}


App.defaultProps = {
    width: 300,
    height: 200,
    axisSpacing: 25,
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T']
}


export default App;
