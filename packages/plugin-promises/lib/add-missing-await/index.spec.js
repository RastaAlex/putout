'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'promises/add-missing-await': convert,
});

test('plugin-add-missing-await: exports: transform: report', (t) => {
    t.report('async', 'Async functions should be called using await');
    t.end();
});

test('plugin-add-missing-await: transform', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-add-missing-await: transform: switch', (t) => {
    t.transform('switch');
    t.end();
});

test('plugin-add-missing-await: no transform: not call', (t) => {
    t.noTransform('not-call');
    t.end();
});

test('plugin-add-missing-await: no transform: not async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-add-missing-await: no transform: not async', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-add-missing-await: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('plugin-add-missing-await: no transform: top-level', (t) => {
    t.noTransform('top-level');
    t.end();
});

test('plugin-add-missing-await: no transform: catch', (t) => {
    t.noTransform('catch');
    t.end();
});
