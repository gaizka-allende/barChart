import React, { Component } from 'react';

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

export default Grid;
