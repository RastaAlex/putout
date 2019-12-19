'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const stripAnsi = require('strip-ansi');

const {initReport} = require('..');

test('putout: report: no places', (t) => {
    const reporter = stub();
    const report = initReport();
    
    report(reporter, {
        name: 'hello',
        places: [],
        source: '',
    });
    
    const expected = {
        count: 1,
        errorsCount: 0,
        filesCount: 0,
        index: 0,
        name: 'hello',
        places: [],
        source: '',
    };
    
    t.ok(reporter.calledWith(expected), 'should call reporter');
    t.end();
});

test('putout: report: dump', (t) => {
    const line = 1;
    const column = 1;
    const position = {
        line,
        column,
    };
    
    const message = 'hello';
    const rule = 'remove-hello';
    
    const places = [{
        message,
        position,
        rule,
    }];
    
    const formatter = require('@putout/formatter-dump');
    
    const report = initReport();
    const formatted = report(formatter, {
        name: 'hello',
        places,
    });
    
    const result = stripAnsi(formatted);
    
    const expected = [
        'hello\n 1:1  error   hello  remove-hello \n',
        '✖ 1 errors in 1 files',
        '  fixable with the `--fix` option\n',
    ].join('\n');
    
    t.equal(result, expected, 'should equal');
    t.end();
});

