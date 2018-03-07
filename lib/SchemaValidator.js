const forOwn = require('lodash.forown')
const tv4 = require('tv4')
const formats = require('tv4-formats')

/**
 */
class SchemaValidator {

    /**
     * Create schema validator for schemas defined in spec at `#/components/schemas`
     *
     * @param {Object} spec API specification in OpenAPI Specification 3.0 format
     * @param {Object} [options={}] options
     * @param {Object} [options.customFormats] custom format validators
     * @param {boolean} [options.banUnknownProperties=false] disallow extra properties in validated objects
     */
    constructor(spec, {customFormats, banUnknownProperties} = {}) {
        this.validator = tv4.freshApi()
        this.banUnknownPropertes = banUnknownProperties

        this.validator.addFormat(formats)
        if (customFormats) {
            this.validator.addFormat(customFormats)
        }

        forOwn(spec.components.schemas, (schema, name) =>
            this.validator.addSchema(`#/components/schemas/${name}`, schema)
        )
    }

    /**
     * Validate object against schema. Schema can be passed explicitly or reference a schema from spec.
     *
     * @param {Object} entity - object to validate
     * @param {Object|string} schema - object schema
     * @return {Array<Object>} An array with errors when object is invalid, `undefined` otherwise
     */
    validate(entity, schema) {
        const {valid, errors} = this.validator.validateMultiple(entity, schema, true, this.banUnknownProperties)
        if (!valid) {
            return errors
        }
    }
}

module.exports = SchemaValidator
