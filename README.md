<!-- ![Build Status](https://img.shields.io/github/actions/workflow/status/hatimsue/xml-core/main.yml?branch=main) -->
[![npm](https://img.shields.io/npm/v/@hatimsue/xml-core)](https://www.npmjs.com/package/@hatimsue/xml-core)
[![Status](https://img.shields.io/badge/status-development-yellow)](https://github.com/hatimsue/xml-core) 


## xml-core

This is a lightweight JavaScript library designed for building XML documents. It allows you to create XML element representations as instances of classes, where each object can have attributes and child elements added dynamically. 
The resulting XML can then be output as a string, ready to be displayed on-screen or saved to a file. 

This package is intended as an intermediate step for projects that require XML generation, providing a foundation that can be further abstracted for ease of use in more specialized libraries.


### Installation

```bash
npm install @hatimsue/xml-core
```
### Example

```javascript
import { XMLCData, XMLComment, XMLElement } from '@hatimsue/xml-core'

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

```

### Reference
The classes are designed to be simple and easy to read, so it's recommended to refer to them directly in the `src/` folder or consult the auto-generated documentation in `API.md`. Additionally, you can generate the documentation by running `npm run doc`, which will create the documentation in the `docs` folder. However, the following table provides some basic usage examples, though it is not exhaustive.

| **Concept**                    | **Description**                                                                 | **Syntax / Example**                              | **Expected XML Output**                   |
|--------------------------------|---------------------------------------------------------------------------------|---------------------------------------------------|--------------------------------------------|
| **Create a tag**               | Use the `XMLElement` class constructor to create a tag.              | `new XMLElement('Book')`                          | `<Book/>`                                  |
| **Add content**                | Pass strings or nested elements to the tag using methods like `addChild`.       | `book.addChild('Title')`                          | `<Book>Title</Book>`                       |
| **Add attribute**              | Use the `setAttribute` method to add attributes to the tag.                      | `book.setAttribute('lang', 'en')`                 | `<Book lang="en"/>`                        |
| **Chain attributes**           | Chain multiple calls to `setAttribute` to add more attributes.                  | `book.setAttribute('lang', 'en').setAttribute('year', '2001')` | `<Book lang="en" year="2001"/>`           |
| **Add comment**                | Create a new `XMLComment` and add it using `addChild`.                           | `book.addChild(new XMLComment('Note here'))`       | `<!-- Note here -->`                       |
| **Add CDATA section**          | Use the `addChild` method to insert a `XMLCData` section.                        | `book.addChild(new XMLCData('<tag>'))`             | `<![CDATA[<tag>]]>`                        |
| **Single line output**         | Use the `toXML()` method to generate a compact XML string.                      | `book.toXML()`                                   | `<Book lang="en"><Author>J.K. Rowling</Author></Book>` |
| **Multiline XML output**       | Use the `toPrettyXML()` method to generate an indented XML string.             | `book.toPrettyXML()`                             | Formatted multi-line XML                   |
| **Root element**               | Start your XML tree with a root tag using the class constructor.                | `const library = new XMLElement('Library')`        | `<Library>...</Library>`                   |
