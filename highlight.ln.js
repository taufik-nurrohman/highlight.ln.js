(function(win, doc, hljs) {
    hljs.addPlugin({
        'after:highlightBlock': ({block}) => {
            let lines = doc.createElement('code'),
                blockParent = block.parentNode,
                blockHasParent = blockParent && 'pre' === blockParent.nodeName.toLowerCase();
            if (blockHasParent) {
                blockParent.style.display = 'flex';
                for (let i = 0, j = block.innerHTML.replace(/\s*<br(\s[^>]*)?>\s*/g, '\n').split(/\n/).length; i < j; ++i) {
                    lines.innerHTML += (i + 1) + '\n';
                }
                blockParent.insertBefore(lines, block);
                lines.style.borderRight = '2px solid rgba(0, 0, 0, .125)';
                block.style.flex = 1;
                lines.style.textAlign = 'right';
                lines.className = 'hljs'; // Inherit `background` and `padding` from the style sheet
            }
        }
    });
})(window, document, hljs);
