export default XMLComment;
/**
 * Represents an xml comment
 * @class
 */
declare class XMLComment extends XMLBase {
    /**
     * constructor.
     * @param {string} content
     */
    constructor(content: string);
    content: string;
    /**
     * Returns a formatted (indented and multiline) XML comment string.
     * @param {number} indent - The indentation level (number of tab levels).
     * @returns {string} A pretty-printed XML comment string.
     */
    toPrettyXML(indent?: number): string;
}
import XMLBase from './XMLBase.js';
