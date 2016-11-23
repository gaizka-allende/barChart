'use strict';

import {mount, shallow} from 'enzyme';
import {spy} from 'sinon';

import Bar from '../src/Bar';

let barComponent;

const yAxisSpacing = 28.571428571428573;
const unit = 25000;

const barProps = {
    css: 'chart__bar-desired',
    value: 46000,
    place: 0.3333333333333333,
    width: 30,
    labelHeight: 13,
    zeroYCoordinate:171.42857142857144,
    x: 100,
    height: 52.57142857142857,
    labelText: '46.000,00 €',
    labelWidth: 63.10986328125
};

describe('<Bar/>', () => {

    beforeEach(() => {
        barComponent = shallow(<Bar {...barProps} />);
    });

    it('should be displayed', () => {

        const barRect = barComponent.find('.chart__bar__rect');
        assert.equal(barRect.length, 1);

    });
});
