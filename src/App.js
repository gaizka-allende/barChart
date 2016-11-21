import React, { Component } from 'react';

//import graph-background-image from './graph-background-image.svg'

import styles from './App.css';

const Bar = ({css, value, x, zeroYCoordinate, width, locale, currency, labelPosition}) => {
    const height = Math.abs(value) / 1000;
    const barYCoordinate = value > 0 ? zeroYCoordinate - height : zeroYCoordinate;
    const localeValue = value.toLocaleString(locale, { style: 'currency', currency: currency });
    const barHtml = `
        <rect
            class="${css} ${ value < 0 ? ' chart__bar-negative' : '' }"
            x="${x}"
            y="${barYCoordinate}"
            width="${width}"
            height="${height}"
        />
        <text
            x="${x - 10}"
            y="${labelPosition === 'bottom' ? zeroYCoordinate + 15 : barYCoordinate - 5}">
            <tspan>${localeValue}</tspan>
        </text>`;
    return (
        <g dangerouslySetInnerHTML={{ __html: barHtml }}></g>
    )
}

Bar.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number,
  x: React.PropTypes.number,
  zeroYCoordinate: React.PropTypes.number,
  width: React.PropTypes.number,
  locale: React.PropTypes.string,
  currency: React.PropTypes.string,
  labelPosition: React.PropTypes.string
};

Bar.defaultProps = {
    width: 30,
    axisSpacing: 25,
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    locale: 'de-DE',
    currency: 'EUR'
}

const StackedBars = ({x, zeroYCoordinate, children}) => {
    const bars = children.map( (barComponent,i) => {
        const props = { ...barComponent.props, x, zeroYCoordinate };
        return <Bar key={`stacked-bar-${i}`} {...props} />
    } )
    return (
        <g>{bars}</g>
    )
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
                let lineCSS;
                lineCSS = i === 0 || i === lines.length-1 || axisLine.value === '0'
                    ? 'char__line-dark' : 'char__line-light';
                if (axisLine.value === '0') lineCSS = lineCSS + ' char__line-dotted';

                const lineLabelStyle = `text-anchor: end`
                const gridLineInnerHtml = `<line
                        x1="${axisLine.start.x}"
                        y1="${axisLine.start.y}"
                        x2="${axisLine.end.x}"
                        y2="${axisLine.end.y}"
                        class="${lineCSS}"
                    />
                    <text
                        x="${axisLine.end.x}"
                        y="${axisLine.start.y - 5}"
                        width="40">
                        <tspan style="${lineLabelStyle}">${axisLine.label}</tspan>
                    </text>`;
                return (
                    <g className="liquidity-chart__grid-line"
                        key={`liquidity-chart__grid-line-${i}`}
                        dangerouslySetInnerHTML={ { __html: gridLineInnerHtml }}>
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

const App = ({width, height, axisValues, axisSpacing, barWidth}) => {

    const zeroYCoordinate = axisValues
        .map((y, i) => ({
            y: (i+1)*axisSpacing,
            value: y
        }))
        .filter(axisLine => axisLine.value === '0')[0].y;
    const viewBox = `0 0 ${width} ${height}`;

    return (
        <div className="charts">
            <svg className="chart liquidity-chart" viewBox={viewBox}>
                <Grid axisValues={axisValues} axisSpacing={axisSpacing}/>
                <g>
                    <Bar
                        css={'chart__bar-desired'}
                        value={46000}
                        x={width / 3 - barWidth / 2}
                        zeroYCoordinate={zeroYCoordinate} />
                    <Bar
                        css={'chart__bar-current'}
                        value={12234.56}
                        x={(width / 3)*2 - barWidth / 2}
                        zeroYCoordinate={zeroYCoordinate} />
                </g>
            </svg>
            <svg className="chart liquidity-chart" viewBox={viewBox}>
                <Grid axisValues={axisValues} axisSpacing={axisSpacing}/>
                <g>
                    <Bar
                        css={'chart__bar-desired'}
                        value={56874.25}
                        x={width / 3 - barWidth / 2}
                        zeroYCoordinate={zeroYCoordinate} />
                    <StackedBars
                            x={(width / 3)*2 - barWidth / 2}
                            zeroYCoordinate={zeroYCoordinate}>
                        <Bar css={'chart__bar-stacked-1'} value={38778} />
                        <Bar css={'chart__bar-stacked-2'} value={9503.68} labelPosition="bottom"/>
                    </StackedBars>
                </g>
            </svg>
            <svg className="chart liquidity-chart" viewBox={viewBox}>
                <Grid axisValues={axisValues} axisSpacing={axisSpacing}/>
                <g>
                    <Bar
                        css={'chart__bar-desired'}
                        value={-8750.23}
                        x={width / 2 - barWidth / 2}
                        zeroYCoordinate={zeroYCoordinate} />
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
    barWidth: React.PropTypes.number,
}


App.defaultProps = {
    width: 300,
    height: 200,
    axisSpacing: 25,
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    barWidth: 30,
}


export default App;
