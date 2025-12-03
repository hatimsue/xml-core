export default XMLElement;
/**
 * - A child node of an XML element: text or any XML node.
 */
export type XMLChild = (string | XMLBase);
export type XMLElementOptions = {
    /**
     * - Tag name for the element
     */
    name: string;
    /**
     * - Children of the element
     */
    children?: XMLChild[];
    /**
     * - Optional attributes for the element
     */
    attributes?: {
        [x: string]: string;
    };
};
/**
 * @typedef {(string | XMLBase)} XMLChild - A child node of an XML element: text or any XML node.
 */
/**
 * @typedef {object} XMLElementOptions
 * @property {string} name - Tag name for the element
 * @property {XMLChild[]} [children] - Children of the element
 * @property {Object.<string, string>} [attributes] - Optional attributes for the element
 */
/**
 * Represents an XML element node.
 * @class
 * @augments XMLBase
 */
declare class XMLElement extends XMLBase {
    /**
     * @param {XMLElementOptions} options - XML element options
     */
    constructor({ name, children, attributes }: XMLElementOptions);
    name: string;
    children: any[];
    attributes: {};
    /**
     * Adds an attribute to the element.
     * @param {string} key - Attribute name
     * @param {string} value - Attribute value
     * @returns {this}
     */
    setAttr(key: string, value: string): this;
    /**
     * Adds a child node or text content.
     * @param {XMLChild} child
     * @returns {this}
     */
    addChild(child: XMLChild): this;
    /**
     * Adds one or more child nodes.
     * @param {XMLChild[]} children
     * @returns {this}
     */
    addChildren(...children: XMLChild[]): this;
    /**
     * Serializes this XML element and its children into a pretty-printed XML string.
     * @param {number} indent - Indentation level.
     * @returns {string}
     */
    toPrettyXML(indent?: number): string;
    /**
     * Returns the first child element (recursively) with the given tag name.
     * @param {string} tagName - The name of the tag to search for.
     * @returns {XMLElement|null} The first matching element, or null if not found.
     */
    getElementByTagName(tagName: string): XMLElement | null;
    /**
     * Returns all text content of this element and its children recursively.
     * This is similar to the `innerText` property in the DOM.
     * @type {string}
     */
    get innerText(): string;
}
import XMLBase from './XMLBase.js';
