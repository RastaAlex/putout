'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/expand-try-catch-arguments': convert,
});

test('plugin-tape: expand-try-catch-arguments: report', (t) => {
    t.report('try-catch', 'try-catch arguments should be expanded');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: not call', (t) => {
    t.noTransform('not-call');
    t.end();
});

