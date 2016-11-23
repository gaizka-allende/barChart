'use strict';

import {mount, shallow} from 'enzyme';
import {spy} from 'sinon';

import Bar from '../src/Bar';

let barComponent;

const yAxisSpacing = 28.571428571428573;
const unit = 25000;

const barProps = {
    css: 'chart__bar-desired',
    value:46000,
    place:0.3333333333333333,
    width:30,
    locale :"de-DE",
    currency:"EUR",
    labelHeight:13,
    labelFont:"11px Arial",
    zeroYCoordinate:171.42857142857144,
    x:100,
    calculateHeight: barValue => Math.abs(barValue) * yAxisSpacing / unit
}

describe('<Bar/>', () => {

    beforeEach(() => {
        barComponent = mount(<Bar {...barProps} />);
    });

    it('should be displayed', () => {

        // const title = addFullStops.find('.question__title');
        // assert.equal(title.length, 1);
        // assert.equal(title.text(), props.title);

    });
});
