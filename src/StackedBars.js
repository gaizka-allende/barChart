import React, { Component } from 'react';

import Bar from './Bar';

const StackedBars = ({x, zeroYCoordinate, nestedBars}) => {
    const barChildren = Array.isArray(nestedBars) ? nestedBars : [nestedBars];
    const bars = barChildren.map( (barComponent,i) => {
        let props = { ...barComponent.props, x, zeroYCoordinate };
        if (i === barChildren.length-1 ) props.labelPosition = "bottom";
        return <barComponent.type key={`stacked-bar-${i}`} {...props} />
    } )
    return (
        <g>{bars}</g>
    )
}

export default StackedBars;
