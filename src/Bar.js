import React, { Component } from 'react';

const Bar = ({css, value, x, zeroYCoordinate, width, height, labelText, labelPosition, labelWidth, labelHeight}) => {
    const barXCoordinate =  x - width/2;
    const barYCoordinate = value > 0 ? zeroYCoordinate - height : zeroYCoordinate;
    const labelXCoordinate = (x + width/2) - labelWidth/2;
    const barHtml = `
        <rect
            class="chart__bar__rect ${ value < 0 ? ' chart__bar-negative' : '' }"
            x="${x}"
            y="${barYCoordinate}"
            width="${width}"
            height="${height}"
        />
        <g class="chart__bar__label">
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
                <tspan>${labelText}</tspan>
            </text>
        </g>`;
    return (
        <g className={`chart__bar ${css}`} dangerouslySetInnerHTML={{ __html: barHtml }}></g>
    )
}

Bar.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number,
  x: React.PropTypes.number,
  zeroYCoordinate: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  labelPosition: React.PropTypes.string,
  labelHeight: React.PropTypes.number,
};

Bar.defaultProps = {
    width: 30,
    axisSpacing: 25,
    axisValues: ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    labelHeight: 13,
}

export default Bar;
