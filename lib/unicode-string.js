const XRegExp = require('xregexp')
XRegExp.install('astral')
const unicodeTextRegex = XRegExp('^(\\s)*(\\pL|\\pM|\\pC|\\pN|\\p{P}|\\s)*$')
const unicodeTextExcludeRegex = XRegExp('^[&!@\\[\\]]+$')

module.exports.unicodeString = function (value) {
    return typeof value === 'string' && unicodeTextRegex.test(value) && !unicodeTextExcludeRegex.test(value)
        ? null : 'value contains forbidden characters'
}
