const {SchemaValidator} = require('..')

describe('Schemas validator', () => {

    it('should pass valid object', () => {
        expect(new SchemaValidator(spec)
            .validate({a: 'a'}, '#/components/schemas/A'))
            .to.be.undefined
    })

    it('should validate object against referenced schema', () => {
        expect(new SchemaValidator(spec)
            .validate({a: 1}, '#/components/schemas/A'))
            .to.have.length(1)
            .to.have.nested.property('[0].code', 0)
    })

    it('should validate object against explicit schema', () => {
        expect(new SchemaValidator(spec)
            .validate({a: 'a'}, {type: 'object', properties: {a: {type: 'number'}}}))
            .to.have.length(1)
            .to.have.nested.property('[0].code', 0)
    })

    it('should pass valid object with custom format', () => {
        expect(new SchemaValidator(spec, {customFormats})
            .validate({b: 'Abc'}, '#/components/schemas/A'))
            .to.be.undefined
    })

    it('should pass valid object with unicode format', () => {
        expect(new SchemaValidator(spec, {})
            .validate({c: 'ひらがな'}, '#/components/schemas/A'))
            .to.be.undefined
    })

    it('should validate object with unicode format', () => {
        expect(new SchemaValidator(spec, {})
            .validate({c: ' ひらがな$^'}, '#/components/schemas/A'))
            .to.have.length(1)
            .to.have.nested.property('[0].code', 500)
    })

    it('should validate object with custom format', () => {
        expect(new SchemaValidator(spec, {customFormats})
            .validate({b: 'BBC'}, '#/components/schemas/A'))
            .to.have.length(1)
            .to.have.nested.property('[0].code', 500)
    })

    it('should validate object with custom format', () => {
        expect(new SchemaValidator(spec, {customFormats})
            .validate({b: 'BBC'}, '#/components/schemas/A'))
            .to.have.length(1)
            .to.have.nested.property('[0].code', 500)
    })

    it('should accept nullable in ref', () => {
        expect(new SchemaValidator(spec, {customFormats})
            .validate({a: null}, '#/components/schemas/A'))
            .to.be.undefined
    })

    it('should accept nullable explicitly', () => {
        expect(new SchemaValidator(spec, {customFormats})
            .validate(null, {type: 'string', nullable: true}))
            .to.be.undefined
    })

    it('should accept nullable explicitly', () => {
        expect(new SchemaValidator(spec, {customFormats})
            .validate(null, {nullable: true}))
            .to.be.undefined
    })
})

const spec = {
    components: {
        schemas: {
            A: {
                type: 'object',
                properties: {
                    a: {
                        type: 'string',
                        nullable: 'true'
                    },
                    b: {
                        type: 'string',
                        format: 'containsA'
                    },
                    c: {
                        type: 'string',
                        format: 'unicodeString'
                    }
                }
            },
            B: {
                type: 'object',
                properties: {
                    a: {
                        type: 'string',
                        format: 'binary'
                    }
                },
                required: ['a']
            }
        }
    }
}
const customFormats = {
    containsA: value => value.includes('A') ? null : 'string should contain A'
}
