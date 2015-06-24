'use strict';

// Load modules

var NoShadow = require('eslint/lib/rules/no-shadow');


module.exports = function (context) {

    var wrappedContext = {
        options: context.options,
        getScope: function () {

            return context.getScope();
        },
        report: function (node, message, objLiteral) {

            if (!context.options ||
                !context.options.ignore ||
                (context.options.ignore.indexOf(objLiteral.name) === -1)) {

                return context.report(node, message, objLiteral);
            }
        }
    };

    var result = NoShadow(wrappedContext);

    return {
        'Program:exit': function () {

            result['Program:exit']();
        }
    };
};


module.exports.schema = [{
    type: 'object',
    properties: {
        ignore: {
            type: 'string'
        },
        hoist: {
            enum: [ 'all', 'functions', 'never']
        }
    }
}];


module.exports.ruleName = 'no-shadow-relaxed';
