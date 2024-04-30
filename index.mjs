import {getName, getParent, getStyle, setClass, setElement, setHTML, setStyles, W} from '@taufik-nurrohman/document';
import {isDefined} from '@taufik-nurrohman/is';

function getColorFrom(node) {
    let color = getStyle(node, 'color') || "", c;
    // <https://www.regular-expressions.info/numericranges.html>
    if (c = color.match(/^rgba\s*\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]|0?\.\d+)\s*\)$/i)) {
        return [+c[1], +c[2], +c[3], +c[4]];
    }
    if (c = color.match(/^rgb\s*\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/i)) {
        return [+c[1], +c[2], +c[3], 1];
    }
    return [0, 0, 0, 1];
}

const LineNumberPlugin = {
    'after:highlightElement': function ({el, result, text}) {
        let theCode = el,
            theCodeLines = setElement(getName(el)),
            theCodeNumbers = [],
            theCodeParent = getParent(el),
            theCodeParentIsValid = theCodeParent && 'pre' === getName(theCodeParent);
        if (theCodeParentIsValid) {
            for (let i = 0, j = text.split(/\n/).length; i < j; ++i) {
                theCodeNumbers.push('<span>' + (i + 1) + '</span>');
            }
            theCodeParent.insertBefore(theCodeLines, theCode);
            setStyles(theCode, {
                'flex': '1'
            });
            setStyles(theCodeParent, {
                'direction': 'ltr',
                'display': 'flex'
            });
            setHTML(theCodeLines, theCodeNumbers.join('\n'));
            setClass(theCodeLines, 'hljs'); // Inherit `background` and `padding` value(s) from the style sheet
            let [r, g, b, a] = getColorFrom(theCodeLines);
            setStyles(theCodeLines, {
                'border-right': '2px solid rgba(' + r + ',' + g + ',' + b + ',' + (a / 10) + ')',
                'text-align': 'right',
                'user-select': 'none' // Disable selection on number(s)
            });
        }
        return {el, result, text};
    }
}

// Is a web browser
if (isDefined(W) && isDefined(W.hljs)) {
    W.hljs.addPlugin(LineNumberPlugin);
}

export default LineNumberPlugin;