export default XMLBase;
/**
 * Abstract base class for XML nodes that defines the common interface.
 * @class
 */
declare class XMLBase {
    /**
     * Returns the XML string representation of the node.
     * Must be implemented by subclasses.
     * @returns {string} XML representation of the node.
     * @throws {Error} If not implemented in the subclass.
     */
    toXML(): string;
    /**
     * Returns the formatted (pretty-printed) XML representation of the node.
     * @returns {string} Formatted XML representation.
     */
    toPrettyXML(): string;
}
