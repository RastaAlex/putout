'use strict';

const test = require('@putout/test')(__dirname, {
    cloudcmd: require('..'),
});

test('cloudcmd: IO.mv: report', (t) => {
    t.report('mv', 'IO.move should be used instead of IO.mv');
    t.end();
});

test('cloudcmd: IO.cp: report', (t) => {
    t.report('cp', 'IO.copy should be used instead of IO.cp');
    t.end();
});

test('cloudcmd: IO.mv: transform: string', (t) => {
    t.transform('mv');
    t.end();
});

test('cloudcmd: IO.cp: transform: string', (t) => {
    t.transform('cp');
    t.end();
});

test('cloudcmd: IO.write: transform: write', (t) => {
    t.transform('write');
    t.end();
});

