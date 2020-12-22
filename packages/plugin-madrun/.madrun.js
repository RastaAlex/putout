'use strict';

const {run} = require('madrun');

module.exports = {
    'prepublishOnly': () => run(['lint', 'test']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w lib -x ${await run('test')}`,
    'lint': () => 'putout .',
    'fix:lint': async () => await run('lint', '--fix'),
    'coverage': async () => `nyc ${await run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

