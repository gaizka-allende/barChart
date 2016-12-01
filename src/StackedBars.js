import React, { Component } from 'react';

const StackedBars = ({x, zeroYCoordinate, nestedBars}) => {
    let barChildren = Array.isArray(nestedBars) ? nestedBars : [nestedBars];
    if (barChildren.length > 1) {
        if (barChildren[0].props.value < barChildren[1].props.value) {
            barChildren.reverse();
        }
    }
    const bars = barChildren
        .slice(0, 2)
        .map( (barComponent,i) => {
            let props = { ...barComponent.props, x, zeroYCoordinate };
            if (i === barChildren.length - 1 ) props.labelPosition = "bottom";
            return <barComponent.type key={`stacked-bar-${i}`} {...props} />
        } )
    return (
        <g>{bars}</g>
    )
}

export default StackedBars;
