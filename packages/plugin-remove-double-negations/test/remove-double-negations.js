'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-double-negations': require('..'),
});

test('plugin-remove-double-negations: transform: report', (t) => {
    t.report('if', 'Double negation should not be used in conditions');
    t.end();
});

test('plugin-remove-double-negations: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-remove-double-negations: transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

test('plugin-remove-double-negations: transform: bitwise', (t) => {
    t.noTransform('bitwise');
    t.end();
});

test('plugin-remove-double-negations: transform: not bitwise', (t) => {
    t.noTransform('not-bitwise');
    t.end();
});

test('plugin-remove-double-negations: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

test('plugin-remove-double-negations: transform: conditional', (t) => {
    t.transform('conditional');
    t.end();
});

test('plugin-remove-double-negations: transform: conditional', (t) => {
    t.transform('includes');
    t.end();
});

test('plugin-remove-double-negations: transform: while', (t) => {
    t.transform('while');
    t.end();
});

test('plugin-remove-double-negations: transform: do', (t) => {
    t.transform('do');
    t.end();
});

test('plugin-remove-double-negations: transform: for', (t) => {
    t.transform('for');
    t.end();
});

test('plugin-remove-double-negations: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

