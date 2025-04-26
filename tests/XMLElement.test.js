import XMLComment from '../src/XMLComment.js'
import XMLElement from '../src/XMLElement.js'

describe( 'XMLElement', () => {
    test( 'creates an empty element with no attributes or children', () => {
        const el = new XMLElement( { name: 'foo' } )
        expect( el.toXML() ).toBe( '<foo></foo>' )
        expect( el.toPrettyXML() ).toBe( '<foo />\n' )
    } )

    test( 'creates element with children', () => {
        const foo = new XMLElement( {name: 'foo'} )
        const bar = new XMLElement( {name: 'bar'} )
        const el = new XMLElement( {name: 'el', children: [foo,bar]} )
        expect( el.toXML() ).toBe( '<el><foo></foo><bar></bar></el>' )
    } )

    test( 'adds attributes using setAttr', () => {
        const el = new XMLElement( { name: 'bar' } ).setAttr( 'id', '123' ).setAttr( 'class', 'main' )
        expect( el.toXML() ).toBe( '<bar id="123" class="main"></bar>' )
    } )

    test( 'throw error if attribute value is not string', () => {
        expect( () => new XMLElement( { name: 'bar' } ).setAttr( 'id', true ) )
            .toThrow( /Attribute value must be a string/ )
    } )

    test( 'adds single string child using addChild', () => {
        const el = new XMLElement( { name: 'text' } )
        el.addChild( 'Hello' )
        expect( el.toXML() ).toBe( '<text>Hello</text>' )
    } )

    test( 'adds multiple children using addChildren', () => {
        const el = new XMLElement( { name: 'items' } )
        el.addChildren( 'one', 'two' )
        expect( el.toXML() ).toBe( '<items>onetwo</items>' )
    } )
    test( 'throw error addin children with none supported types', () => {
        const el = new XMLElement( {name: 'el'} )
        expect( () => {el.addChild( true )} )
            .toThrow( /Invalid child node/ )
    } )
    test( 'adds nested elements as children', () => {
        const child = new XMLElement( { name: 'child' } ).addChild( 'content' )
        const parent = new XMLElement( { name: 'parent' } ).addChild( child )
        expect( parent.toXML() ).toBe( '<parent><child>content</child></parent>' )
    } )

    test( 'includes XMLComment in children', () => {
        const comment = new XMLComment( 'A comment' )
        const el = new XMLElement( { name: 'section' } ).addChild( comment )
        expect( el.toXML() ).toBe( '<section><!-- A comment --></section>' )
    } )

    test( 'pretty prints with nesting', () => {
        const child = new XMLElement( { name: 'child', attributes: {color: 'red'} } ).addChild( 'data' )
        const parent = new XMLElement( { name: 'parent' } ).addChild( child )
        const expected =
`<parent>
  <child color="red">data</child>
</parent>
`
        expect( parent.toPrettyXML() ).toBe( expected )
    } )

    test( 'pretty print with mixed content', () => {
        const comment = new XMLComment( 'comment' )
        const child = new XMLElement( { name: 'child' } ).addChild( 'hello' )
        const root = new XMLElement( { name: 'root' } ).addChildren( 'text', comment, child )

        const expected =
`<root>
  text
  <!-- comment -->
  <child>hello</child>
</root>
`
        expect( root.toPrettyXML() ).toBe( expected )
    } )

    test( 'self-closing tag when no children (pretty only)', () => {
        const el = new XMLElement( { name: 'empty' } )
        expect( el.toPrettyXML() ).toBe( '<empty />\n' )
    } )

    // escape test cases
    test( 'should escape text correctly', () => {
        const element = new XMLElement( { name: 'Book', children: ['<title>Book Title</title>'] } )
        expect( element.toXML() ).toBe( '<Book>&lt;title&gt;Book Title&lt;/title&gt;</Book>' )
    } )

    test( 'should escape attribute values correctly', () => {
        const element = new XMLElement( {
            name: 'Book',
            attributes: { 'author': 'J.K. Rowling & "Harry Potter"' }
        } )
        expect( element.toXML() ).toBe( '<Book author="J.K. Rowling &amp; &quot;Harry Potter&quot;"></Book>' )
    } )
} )
