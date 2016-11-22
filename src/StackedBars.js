import React, { Component } from 'react';

import Bar from './Bar';

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

export default StackedBars;
