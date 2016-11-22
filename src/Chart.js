import React, { Component } from 'react';
import Grid from './Grid';

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

export default Chart;
