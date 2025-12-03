export default XMLCData;
/**
 * Represents a CDATA section in an XML document.
 * @class
 */
declare class XMLCData extends XMLBase {
    /**
     * @param {string} content - The content of the CDATA section.
     */
    constructor(content: string);
    content: string;
}
import XMLBase from './XMLBase.js';
