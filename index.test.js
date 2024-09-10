const assert = require('node:assert');
const test = require('node:test');
const splitLines = require('./index.js');

test('should split lines without continuation characters', () => {
    const content = 'line 1\nline 2\nline 3';
    const result = splitLines(content);
    assert.deepStrictEqual(result, ['line 1', 'line 2', 'line 3']);
});

test('should handle lines with continuation characters', () => {
    const content = 'line 1 \\\ncontinued line 2 \\\nfinal part';
    const result = splitLines(content);
    assert.deepStrictEqual(result, ['line 1 continued line 2 final part']);
});

test('should handle mixed lines with and without continuation', () => {
    const content = 'line 1 \\\ncontinued line 2\nline 3 \\\nfinal line 4';
    const result = splitLines(content);
    assert.deepStrictEqual(result, ['line 1 continued line 2', 'line 3 final line 4']);
});

test('should handle empty lines correctly', () => {
    const content = 'line 1\n\nline 2';
    const result = splitLines(content);
    assert.deepStrictEqual(result, ['line 1', '', 'line 2']);
});

test('should handle multiple continuations in a single chain', () => {
    const content = 'part 1 \\\npart 2 \\\npart 3';
    const result = splitLines(content);
    assert.deepStrictEqual(result, ['part 1 part 2 part 3']);
});

test('should trim extra spaces at the end of continuation', () => {
    const content = 'line 1    \\\n   continued line 2   \\\n  final part';
    const result = splitLines(content);
    assert.deepStrictEqual(result, ['line 1 continued line 2 final part']);
});

test('should use custom continuation character', () => {
    const content = 'line 1 ~\nline 2 ~\nline 3';
    const result = splitLines(content, '~');
    assert.deepStrictEqual(result, ['line 1 line 2 line 3']);
});

test('should use custom newline regex', () => {
    const content = 'line 1\rline 2\rline 3';
    const result = splitLines(content, '\\', /\r/);
    assert.deepStrictEqual(result, ['line 1', 'line 2', 'line 3']);
});
