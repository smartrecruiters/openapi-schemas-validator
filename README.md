# @smartrecruiters/openapi-schemas-validator

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]

Create schema validators for api documentation in OpenAPI Specification 3.x format.

## tv4

This module uses [tv4](https://www.npmjs.com/package/tv4) validator, additionally
configured with [tv4-formats](https://www.npmjs.com/package/tv4-formats).

This module uses tv4 [`validateMultiple`](https://www.npmjs.com/package/tv4#usage-3-multiple-errors) function,
with [`checkRecursive`](https://github.com/geraintluff/tv4#cyclical-javascript-objects) param always passed as `true`.

You can configure tv4 validator with following options: 
 * customFormats - will be passed to [`tv4.addFormat`](https://www.npmjs.com/package/tv4#addformatformat-validationfunction) function 
 * banUnknownProperties - will be passed to validating function ([The banUnknownProperties flag](https://www.npmjs.com/package/tv4#the-banunknownproperties-flag))
 
## OpenAPI Specification 3.0 specific features

Currently @smartrecruiters/openapi-schemas-validator supports `nullable` field.

Please refer to https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#fixed-fields-20.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@smartrecruiters/openapi-schemas-validator.svg
[npm-url]: https://www.npmjs.com/package/@smartrecruiters/openapi-schemas-validator
[downloads-image]: https://img.shields.io/npm/dm/@smartrecruiters/openapi-schemas-validator.svg
[downloads-url]: https://www.npmjs.com/package/@smartrecruiters/openapi-schemas-validator
[node-version-image]: https://img.shields.io/node/v/openapi-schemas-validator.svg
[node-version-url]: https://nodejs.org/en/download/
## API


### Modules

<dl>
<dt><a href="#module_@smartrecruiters/openapi-schemas-validator">@smartrecruiters/openapi-schemas-validator</a></dt>
<dd></dd>
</dl>

### Classes

<dl>
<dt><a href="#SchemaValidator">SchemaValidator</a></dt>
<dd></dd>
</dl>

<a name="module_@smartrecruiters/openapi-schemas-validator"></a>

### @smartrecruiters/openapi-schemas-validator
<a name="module_@smartrecruiters/openapi-schemas-validator.SchemaValidator"></a>

#### @smartrecruiters/openapi-schemas-validator.SchemaValidator
SchemaValidator class

**Kind**: static property of [<code>@smartrecruiters/openapi-schemas-validator</code>](#module_@smartrecruiters/openapi-schemas-validator)  
<a name="SchemaValidator"></a>

### SchemaValidator
**Kind**: global class  

* [SchemaValidator](#SchemaValidator)
    * [new SchemaValidator(spec, [options])](#new_SchemaValidator_new)
    * [.validate(entity, schema)](#SchemaValidator+validate) ⇒ <code>Array.&lt;Object&gt;</code>

<a name="new_SchemaValidator_new"></a>

#### new SchemaValidator(spec, [options])
Create schema validator for schemas defined in spec at `#/components/schemas`


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| spec | <code>Object</code> |  | API specification in OpenAPI Specification 3.0 format |
| [options] | <code>Object</code> | <code>{}</code> | options |
| [options.customFormats] | <code>Object</code> |  | custom format validators |
| [options.banUnknownProperties] | <code>boolean</code> | <code>false</code> | disallow extra properties in validated objects |

<a name="SchemaValidator+validate"></a>

#### schemaValidator.validate(entity, schema) ⇒ <code>Array.&lt;Object&gt;</code>
Validate object against schema. Schema can be passed explicitly or reference a schema from spec.

**Kind**: instance method of [<code>SchemaValidator</code>](#SchemaValidator)  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array with errors when object is invalid, `undefined` otherwise  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | object to validate |
| schema | <code>Object</code> \| <code>string</code> | object schema |

