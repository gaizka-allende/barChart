import 'babel-register';
import 'ignore-styles';


global.assert = require('assert');
global.sinon = require('sinon');
global.React = require('react');
global.TestUtils = require('react-addons-test-utils');

const jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><head><title></title></head><body></body></html>');

global.window = Object.create(document.defaultView);

global.navigator = {
    userAgent: 'node.js'
};
