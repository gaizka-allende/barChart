'use strict';

import {mount, shallow} from 'enzyme';
import {spy} from 'sinon';

import Bar from '../src/Bar';

let barComponent;


describe('<Bar/>', () => {

    beforeEach(() => {
        barComponent = mount(<AddFullStops {...completeProps} />);
    });

    it('should be displayed', () => {

        const title = addFullStops.find('.question__title');
        assert.equal(title.length, 1);
        assert.equal(title.text(), props.title);

        const text = addFullStops.find('.question__text');
        assert.equal(text.length, 1);
        assert.equal(props.text.split(' ').length, text.children().length);

        const actions = addFullStops.find('.question__actions');
        assert.equal(actions.length, 1);

    });
