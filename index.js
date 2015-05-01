var sass = require('node-sass'),
    symdiffCSS = require('symdiff-css');

function symdiffSASS(sassString) {
    var compiled;
    try {
        compiled =  sass.renderSync({
                        data: sassString
                    });
    } catch(e) {
        return [];
    }
    return symdiffCSS(compiled.css);
}

module.exports = symdiffSASS;