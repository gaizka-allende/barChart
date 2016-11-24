import React, { Component } from 'react';

const Grid = ({width, yAxisValues, yAxisSpacing, currencySign}) => (
    <g className="chart__grid">
      {
        yAxisValues.map((value, i) => {
            const start = { x: 0, y: (i+1)*yAxisSpacing};
            const end = { x: width, y: (i+1)*yAxisSpacing};
            let css = i === 0 || i === yAxisValues.length-1 || value === '0'
                ? 'chart__line-dark' : 'chart__line-light';
            if (value === '0') css = css + ' chart__line-dotted';
            const gridLineInnerHtml = `<line
                    x1="${start.x}"
                    y1="${start.y}"
                    x2="${end.x}"
                    y2="${end.y}"
                    class="${css}"
                />
                <text
                    x="${end.x}"
                    y="${start.y - 5}"
                    width="40">
                    <tspan class="chart__line__label">${`${value} ${currencySign}`}</tspan>
                </text>`;
            return (
                <g className="chart__line"
                    key={`chart__line-${i}`}
                    dangerouslySetInnerHTML={ { __html: gridLineInnerHtml }}>
                </g>
            )
        })
      }
    </g>
)

Grid.propTypes = {
    width: React.PropTypes.number,
    yAxisValues: React.PropTypes.array,
    yAxisSpacing: React.PropTypes.number,
    currencySign: React.PropTypes.string
}


export default Grid;
