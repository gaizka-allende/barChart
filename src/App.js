import React, { Component } from 'react';

//import graph-background-image from './graph-background-image.svg'

import styles from './App.css';

const Bar = ({css, value, x, zeroYCoordinate, width, calculateHeight, locale, currency, labelPosition, labelHeight, labelFont}) => {
    const height = calculateHeight(value);
    const barXCoordinate =  x - width/2;
    const barYCoordinate = value > 0 ? zeroYCoordinate - height : zeroYCoordinate;
    const localeValue = value.toLocaleString(locale, { style: 'currency', currency: currency });
    const textMetrics = ((str) => {
        const canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.font = labelFont;
        return ctx.measureText(str);
    })(localeValue);
    const labelWidth = textMetrics.width + 5; //+5 for the currency sign
    const labelXCoordinate = (x + width/2) - labelWidth/2;
    const barHtml = `
        <rect
            class="${css} ${ value < 0 ? ' chart__bar-negative' : '' }"
            x="${x}"
            y="${barYCoordinate}"
            width="${width}"
            height="${height}"
        />
        <g>
            <rect
                x="${labelXCoordinate}"
                y="${labelPosition === 'bottom' ? zeroYCoordinate + 5 : barYCoordinate - 15}"
                width="${labelWidth}"
                height="${labelHeight}"
                fill="white"
            />
            <text
                x="${labelXCoordinate}"
                y="${labelPosition === 'bottom' ? zeroYCoordinate + 15 : barYCoordinate - 5}">
                <tspan>${localeValue}</tspan>
            </text>
        </g>`;
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
  height: React.PropTypes.number,
  locale: React.PropTypes.string,
  currency: React.PropTypes.string,
  labelPosition: React.PropTypes.string,
  labelHeight: React.PropTypes.number,
  labelFont: React.PropTypes.string
};

Bar.defaultProps = {
    width: 30,
    axisSpacing: 25,
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    locale: 'de-DE',
    currency: 'EUR',
    labelHeight: 13,
    labelFont: '11px Arial'
}

const StackedBars = ({x, zeroYCoordinate, calculateHeight, children}) => {
    const barChildren = Array.isArray(children) ? children : [children];
    const bars = barChildren.map( (barComponent,i) => {
        let props = { ...barComponent.props, x, zeroYCoordinate, calculateHeight };
        if (i === barChildren.length-1 ) props.labelPosition = "bottom";
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
        <g className="chart__grid">
          {
            lines.map((axisLine, i) => {
                let lineCSS;
                lineCSS = i === 0 || i === lines.length-1 || axisLine.value === '0'
                    ? 'chart__line-dark' : 'chart__line-light';
                if (axisLine.value === '0') lineCSS = lineCSS + ' chart__line-dotted';

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
                    <g className="chart_line"
                        key={`chart_line-${i}`}
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
    currencySign: '€',
}


const Chart = ({css, width, height, unit, yAxisValues, children}) => {
    const calculateBarHeight = (barValue) => Math.abs(barValue) * yAxisSpacing/unit;
    const viewBox = `0 0 ${width} ${height}`;
    const yAxisSpacing = height / yAxisValues.length;
    const grid = <Grid width={width} axisValues={yAxisValues} axisSpacing={yAxisSpacing}/>;
    const zeroYCoordinate = yAxisValues
        .map((y, i) => ({
            y: (i+1)*yAxisSpacing,
            value: y
        }))
        .filter(axisLine => axisLine.value === '0')[0].y;
    const nestedBars = Array.isArray(children) ? children : [children];
    const bars = <g>{
                    nestedBars.map( (childComponent,i) => {
                        const x = width * childComponent.props.place;
                        let props = { ...childComponent.props, zeroYCoordinate, x, calculateHeight: calculateBarHeight, key: `chart-bar-${i}` };
                        return <childComponent.type {...props} />
                    } )
                }</g>;
    return (
        <svg className={`chart ${css}`} viewBox={viewBox}>
            {grid}
            {bars}
        </svg>
    )
}

Chart.propTypes = {
    css: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
}


Chart.defaultProps = {
    width: 300,
    height: 200,
    yAxisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    unit: 25000
}

const App = () => {

    return (
        <div className="charts">
            <Chart css="liquidity">
                <Bar css={'chart__bar-desired'} value={46000} place={1/3} />
                <Bar css={'chart__bar-current'} value={12234.56} place={2/3} />
            </Chart>
            <Chart css="protection">
                    <Bar css={'chart__bar-desired'} value={56874.25} place={1/3} />
                    <StackedBars place={2/3} >
                        <Bar css={'chart__bar-stacked-1'} value={38778} />
                        <Bar css={'chart__bar-stacked-2'} value={9503.68} />
                    </StackedBars>
            </Chart>
            <Chart css="growth">
                <Bar css={'chart__bar-desired'} value={-8750.23} place={1/2} />
            </Chart>
        </div>
    )
}



export default App;
