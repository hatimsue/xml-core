/**
 * Escapes special characters in XML text content.
 * @param {string} text - The text content to escape.
 * @returns {string} The escaped text.
 */
export function escapeText(text: string): string;
/**
 * Escapes special characters in XML attribute values.
 * @param {string} value - The attribute value to escape.
 * @returns {string} The escaped attribute value.
 */
export function escapeAttribute(value: string): string;
/**
 * Validates a tag or attribute name for XML.
 * @param {string} name - The name to validate.
 * @param {string} [context] - The context of the name, used in the error message.
 * @throws {Error} If the name is not a non-empty string or contains invalid characters.
 */
export function validateName(name: string, context?: string): void;
