import React, { Component } from 'react';

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
  labelFont: React.PropTypes.string,
  calculateHeight: React.PropTypes.func
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

export default Bar;
