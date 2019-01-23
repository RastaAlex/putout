'use strict';

const recast = require('recast');
const alignSpaces = require('align-spaces');
const espree = require('espree');
const toBabel = require('estree-to-babel');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

const cutShebang = require('./cut-shebang');
const getPlugins = require('./get-plugins');
const fix = require('./fix');

const isUndefined = (a) => typeof a === 'undefined';

const printOptions = {
    quote: 'single',
};

const parser = {
    parse(source) {
        const preventUsingEsprima = true;
        return toBabel(espree.parse(source, {
            loc: true,
            tokens: preventUsingEsprima,
            comment: true,
            ecmaVersion: 2019,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            }
        }));
    },
};

const defaultOpts = (opts = {}) => {
    if (isUndefined(opts.fix))
        return {
            ...opts,
            fix: true
        };
    
    return opts;
};

module.exports = (source, opts) => {
    opts = defaultOpts(opts);
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource);
    const plugins = getPlugins(opts);
    const places = [];
    
    for (const [rule, plugin] of plugins) {
        const {
            report,
            find,
        } = plugin;
        
        const items = find(ast, {
            traverse,
            types,
        });
        
        if (!items.length)
            continue;
        
        for (const item of items) {
            const path = getPath(item);
            const message = report(item);
            const position = getPosition(path, shebang);
            
            places.push({
                rule,
                message,
                position,
            });
            
            fix(opts.fix, plugin.fix, {
                path,
                position,
            });
        }
    }
    
    const {
        code: printed,
    } = recast.print(ast, printOptions);
    
    const aligned = alignSpaces(printed);
    const code = fixStrictMode(`${shebang}${aligned}`);
    
    return {
        code,
        places,
    };
};

const fixStrictMode = (a) => {
    return a
        .replace(`\n\n\n'use strict'`, `\n\n'use strict'`);
};

module.exports.parse = parse;
function parse(source) {
    const ast = recast.parse(source, {
        parser,
    });
    
    return ast;
}

module.exports.traverse = traverse;
module.exports.types = types;

function getPath(item) {
    return item.path || item;
}

function getPosition(path, shebang) {
    const {node} = path;
    
    const {
        line,
        column,
    } = node.loc.start;
    
    return {
        line: shebang ? line + 1 : line,
        column,
    };
}

