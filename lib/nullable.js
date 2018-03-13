const forOwn = require('lodash.forown')

module.exports.support = supportNullable

function supportNullable(schema) {
    if (schema.nullable) {
        if (!schema.type) {
            schema.type = []
        }
        if (!Array.isArray(schema.type)) {
            schema.type = [schema.type]
        }
        schema.type.push('null')
    }
    forOwn(schema.properties, supportNullable)
}
