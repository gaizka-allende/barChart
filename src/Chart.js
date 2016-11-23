import React, { Component } from 'react';
import Grid from './Grid';

const Chart = ({css, width, height, unit, yAxisValues, locale, currency, currencySign, barLabelFont, children}) => {
    const calculateBarHeight = (barValue) => Math.abs(barValue) * yAxisSpacing/unit;
    const getTextWidth =  (str, font) => {
        const canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.font = font;
        return ctx.measureText(str).width;
    }
    const viewBox = `0 0 ${width} ${height}`;
    const yAxisSpacing = height / yAxisValues.length;
    const grid = <Grid width={width} yAxisValues={yAxisValues} yAxisSpacing={yAxisSpacing} currencySign={currencySign}/>;
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
                        let props = { ...childComponent.props, zeroYCoordinate, x, key: `chart-bar-${i}`}
                        switch (childComponent.type.name) {
                            case 'Bar':
                                const height = calculateBarHeight(childComponent.props.value);
                                const labelText = childComponent.props.value.toLocaleString(locale, { style: 'currency', currency: currency });
                                const labelWidth = getTextWidth(labelText, barLabelFont) + 5; // +5 hack for the currency sign
                                props = { ...props, height, labelText, labelWidth };
                                break;
                            case 'StackedBars':
                                const nestedBars = childComponent.props.children.map(nestedBar => {
                                    const height = calculateBarHeight(nestedBar.props.value);
                                    const labelText = nestedBar.props.value.toLocaleString(locale, { style: 'currency', currency: currency });
                                    const labelWidth = getTextWidth(labelText, barLabelFont) + 5; // +5 hack for the currency sign
                                    const nestedBarProps = {...nestedBar.props, height, labelText, labelWidth}
                                    return <nestedBar.type {...nestedBarProps} />
                                })
                                props = { ...props, nestedBars }
                                break;
                            default:
                                return null;
                        }
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
    locale: 'de-DE',
    currency: 'EUR',
    currencySign: '€',
    width: 300,
    height: 200,
    yAxisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    unit: 25000,
    barLabelFont: '11px Arial'
}

export default Chart;
