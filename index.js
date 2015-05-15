var sass = require('node-sass'),
    gonzales = require('gonzales-pe'),
    symdiffCSS = require('symdiff-css');

function walk(node, fn) {
    fn(node);
    if (node.content && node.content.forEach) {
        node.content.forEach(function(child) {
            walk(child, fn);
        });
    }
}

function symdiffSASS(sassString) {
    var ast;
    try {
        // try SCSS first
        ast = gonzales.parse(sassString, {
            syntax: 'SCSS'
        });
    } catch(err1) {
        try {
            // try SASS second
            ast = gonzales.parse(sassString, {
                syntax: 'SASS'
            });
        } catch(err2) {
            // ok whatever
            return [];
        }
    }
    if (!ast) {
        return [];
    }
    var classes = [];
    walk(ast, function(node) {
        if (node.type === 'class') {
            node.content.forEach(function(clazzContent) {
                if (clazzContent.type === 'ident') {
                    classes.push(clazzContent.content);
                }
            });
        }
    });
    return classes;
}

module.exports = symdiffSASS;