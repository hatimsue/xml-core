import { XMLCData, XMLComment, XMLElement } from '../src/index.js'

const authors = ['J.K. Rowling', 'J.R.R. Tolkien', 'George R.R. Martin']

// Create the root element <Library>
const library = new XMLElement( {
    name: 'Library',
    attributes: { location: 'UK' }
} )

// Add a comment
const comment = new XMLComment( 'This is a library XML document' )
library.addChild( comment )

// Create <Books> with the "genre" attribute
const books = new XMLElement( {
    name: 'Books',
    attributes: { genre: 'fantasy' }
} )

// Add <Book> elements for each author
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

// Find an element by tag name and print its text content
console.log( '--- Example: innerText of first <Book> element ---' )
const firstBook = books.getElementByTagName( 'Book' )
console.log( firstBook.innerText )
console.log( '-----------------------------------------------\n' )

// Create an ExtraInfo element with CDATA using the XMLCData class
const extraInfo = new XMLElement( { name: 'ExtraInfo' } )
const cdata = new XMLCData( 'Some unparsed <CDATA> content goes here & should not be escaped.' )
extraInfo.addChild( cdata )

// Add the ExtraInfo element to the XML
library.addChild( books )
library.addChild( extraInfo )

// Convert the XML to a pretty-printed format
console.log( '--- Example: Pretty-printed XML ---' )
console.log( library.toPrettyXML() )
console.log( '-----------------------------------' )


