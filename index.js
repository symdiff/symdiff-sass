var gonzales = require('gonzales-pe');

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
            syntax: 'scss'
        });
    } catch(err1) {
        try {
            // try SASS second
            ast = gonzales.parse(sassString, {
                syntax: 'sass'
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