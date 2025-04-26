import { XMLCData, XMLComment, XMLElement } from '../src/index.js'

const authors = ['J.K. Rowling', 'J.R.R. Tolkien', 'George R.R. Martin']

// Create the root element <Library> with a namespace
const library = new XMLElement( {
    name: 'Library',
    attributes: { location: 'UK' }
} )

// Add a comment
const comment = new XMLComment( 'This is a library XML document' )
library.addChild( comment )

// Create <bk:Books> with the "bk" namespace and the "genre" attribute
const books = new XMLElement( {
    name: 'Books',
    attributes: { genre: 'fantasy' }
} )

// Add <bk:Book> elements for each author
authors.forEach( author => {
    const book = new XMLElement( {
        name: 'Book',
        attributes: { lang: 'en' }
    } )

    // Add Author and Name as child elements
    book.addChild( new XMLElement( { name: 'Author', children: [author] } ) )
    book.addChild( new XMLElement( { name: 'Name', children: [`A book by ${author}`] } ) )

    books.addChild( book )
} )

// Create an ExtraInfo element with CDATA using the XMLCData class
const extraInfo = new XMLElement( { name: 'ExtraInfo' } )
const cdata = new XMLCData( 'Some unparsed <CDATA> content goes here & should not be escaped.' )
extraInfo.addChild( cdata )

// Add the ExtraInfo element to the XML
library.addChild( books )
library.addChild( extraInfo )

// Convert the XML to a pretty-printed format
console.log( library.toPrettyXML() )


