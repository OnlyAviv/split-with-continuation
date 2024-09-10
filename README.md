# `split-with-continuation`

A utility function to split a string into lines, supporting continuation of lines with a custom character (by default, a backslash `\`). Useful for processing configuration files, scripts, or other text-based formats that allow multiline expressions.

## Features

- Splits a string into individual lines.
- Merges lines that end with a continuation character.
- Supports custom newline and continuation characters.

## Installation

You can include the `split-with-continuation` function in your Node.js project by installing the library from npm:

```bash
npm install split-with-continuation
```

## Usage

### Basic Example

```js
const splitLines = require('split-with-continuation');

const content = `This is a line \\
that continues onto the next line.`;

const lines = splitLines(content);
console.log(lines); // [ 'This is a line that continues onto the next line.' ]
```

### Custom Continuation Character

You can also specify a custom continuation character:

```js
const splitLines = require('./splitLines');

const content = `This is a line_
that continues onto the next line.`;

const lines = splitLines(content, '_');
console.log(lines); // [ 'This is a line that continues onto the next line.' ]
```

### Custom Newline Character

By default, the function handles both Unix (`\n`) and Windows (`\r\n`) newline formats, but you can specify a custom newline regular expression if needed:

```js
const splitLines = require('./splitLines');

const content = `Line 1|Line 2|Line 3`;

const lines = splitLines(content, '\\', '|');
console.log(lines); // [ 'Line 1', 'Line 2', 'Line 3' ]
```

## Parameters

- **content** (`string`): The input string content to split.
- **continuation** (`string`, optional, default: `'\\'`): The character that indicates the current line continues onto the next.
- **newline** (`RegExp | string`, optional, default: `/\r?\n/`): The pattern used to identify newlines. By default, supports both Unix and Windows line endings.

## Return Value

The function returns an array of strings, where each string represents a line from the input. Lines that end with the continuation character are merged into a single line.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file.