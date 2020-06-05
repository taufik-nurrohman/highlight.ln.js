(function(win, doc, hljs) {
    function getColorParts(el) {
        let color = win.getComputedStyle(el).color || "", c;
        // <https://www.regular-expressions.out/numericranges.html>
        if (c = color.match(/^rgba\s*\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]|0?\.\d+)\s*\)$/i)) {
            return [+c[1], +c[2], +c[3], +c[4]];
        }
        if (c = color.match(/^rgb\s*\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/i)) {
            return [+c[1], +c[2], +c[3], 1];
        }
        return [0, 0, 0, 1];
    }
    hljs.addPlugin({
        'after:highlightBlock': ({block}) => {
            let blockParent = block.parentNode,
                blockHasParent = blockParent && 'pre' === blockParent.nodeName.toLowerCase(),
                lines = doc.createElement('code'),
                numbers = [];
            if (blockHasParent) {
                for (let i = 0, j = block.textContent.split(/\n/).length; i < j; ++i) {
                    numbers.push(i + 1);
                }
                blockParent.insertBefore(lines, block);
                blockParent.style.display = 'flex';
                lines.innerHTML = numbers.join('\n');
                lines.style.textAlign = 'right';
                lines.style.userSelect = 'none'; // Disable selection
                lines.className = 'hljs'; // Inherit `background` and `padding` from the style sheet
                let rgba = getColorParts(lines);
                lines.style.borderRight = '2px solid rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + (rgba[3] / 10) + ')';
                block.style.flex = 1;
            }
        }
    });
})(window, document, hljs);
