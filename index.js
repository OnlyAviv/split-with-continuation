/**
 * Splits the provided content into lines, handling line continuations where
 * the line ends with a specified continuation character. If a line ends with
 * the continuation character, it is merged with the following line.
 *
 * @param {string} content - The input string content to be split into lines.
 * @param {string} [continuation='\\'] - The character indicating that the current line
 *     continues onto the next. Default is backslash ('\\').
 * @param {RegExp|string} [newline=/\r?\n/] - The regular expression pattern to detect newlines.
 *     Default is a pattern that matches both Unix (`\n`) and Windows (`\r\n`) newlines.
 * 
 * @returns {string[]} - An array of strings, where each string represents a line.
 *     Continuation lines are merged into a single line.
 */
module.exports = function splitLines(content, continuation = '\\', newline = /\r?\n/) {
    return String(content).split(newline).reduce(({ lines, current }, line) => {
        const trimmed = line.trim();
        return trimmed.endsWith(continuation)
            ? { lines, current: current + trimmed.slice(0, -1).trim() + ' ' }
            : { lines: [...lines, current + trimmed], current: '' };
    }, { lines: [], current: '' }).lines;
}