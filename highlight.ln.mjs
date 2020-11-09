function generateLineNumbers(textContent, toArray) {
    let numbers = [];
    for (let i = 0, j = textContent.split(/\n/).length; i < j; ++i) {
        numbers.push(i + 1);
    }
    return toArray ? numbers : numbers.join('\n');
}

function highlightWithLineNumbers({language, value}) {
    return '<pre><code class="hljs">' + generateLineNumbers(value) + '</code><code class="hljs language-' + language + '">' + value + '</code></pre>';
}

export function generateLineNumbers;
export function highlightWithLineNumbers;
