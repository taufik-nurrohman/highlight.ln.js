(function (g, f) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = f() : typeof define === 'function' && define.amd ? define(f) : (g = typeof globalThis !== 'undefined' ? globalThis : g || self, (g.hljs = g.hljs || {}, g.hljs.LineNumberPlugin = f()));
})(this, (function () {
    'use strict';
    var isArray = function isArray(x) {
        return Array.isArray(x);
    };
    var isDefined = function isDefined(x) {
        return 'undefined' !== typeof x;
    };
    var isInstance = function isInstance(x, of) {
        return x && isSet(of) && x instanceof of ;
    };
    var isNull = function isNull(x) {
        return null === x;
    };
    var isNumber = function isNumber(x) {
        return 'number' === typeof x;
    };
    var isNumeric = function isNumeric(x) {
        return /^-?(?:\d*.)?\d+$/.test(x + "");
    };
    var isObject = function isObject(x, isPlain) {
        if (isPlain === void 0) {
            isPlain = true;
        }
        if ('object' !== typeof x) {
            return false;
        }
        return isPlain ? isInstance(x, Object) : true;
    };
    var isSet = function isSet(x) {
        return isDefined(x) && !isNull(x);
    };
    var isString = function isString(x) {
        return 'string' === typeof x;
    };
    var toCaseCamel = function toCaseCamel(x) {
        return x.replace(/[-_.](\w)/g, function (m0, m1) {
            return toCaseUpper(m1);
        });
    };
    var toCaseLower = function toCaseLower(x) {
        return x.toLowerCase();
    };
    var toCaseUpper = function toCaseUpper(x) {
        return x.toUpperCase();
    };
    var toNumber = function toNumber(x, base) {
        if (base === void 0) {
            base = 10;
        }
        return base ? parseInt(x, base) : parseFloat(x);
    };
    var toValue = function toValue(x) {
        if (isArray(x)) {
            return x.map(function (v) {
                return toValue(v);
            });
        }
        if (isNumeric(x)) {
            return toNumber(x);
        }
        if (isObject(x)) {
            for (var k in x) {
                x[k] = toValue(x[k]);
            }
            return x;
        }
        if ('false' === x) {
            return false;
        }
        if ('null' === x) {
            return null;
        }
        if ('true' === x) {
            return true;
        }
        return x;
    };
    var fromValue = function fromValue(x) {
        if (isArray(x)) {
            return x.map(function (v) {
                return fromValue(x);
            });
        }
        if (isObject(x)) {
            for (var k in x) {
                x[k] = fromValue(x[k]);
            }
            return x;
        }
        if (false === x) {
            return 'false';
        }
        if (null === x) {
            return 'null';
        }
        if (true === x) {
            return 'true';
        }
        return "" + x;
    };
    var D = document;
    var W = window;
    var getName = function getName(node) {
        return toCaseLower(node && node.nodeName || "") || null;
    };
    var getParent = function getParent(node, query) {
        return node.parentNode || null;
    };
    var getStyle = function getStyle(node, style, parseValue) {
        if (parseValue === void 0) {
            parseValue = true;
        }
        var value = W.getComputedStyle(node).getPropertyValue(style);
        if (parseValue) {
            value = toValue(value);
        }
        return value || "" === value || 0 === value ? value : null;
    };
    var hasState = function hasState(node, state) {
        return state in node;
    };
    var letAttribute = function letAttribute(node, attribute) {
        return node.removeAttribute(attribute), node;
    };
    var letStyle = function letStyle(node, style) {
        return node.style[toCaseCamel(style)] = null, node;
    };
    var setAttribute = function setAttribute(node, attribute, value) {
        if (true === value) {
            value = attribute;
        }
        return node.setAttribute(attribute, fromValue(value)), node;
    };
    var setAttributes = function setAttributes(node, attributes) {
        var value;
        for (var attribute in attributes) {
            value = attributes[attribute];
            if (value || "" === value || 0 === value) {
                setAttribute(node, attribute, value);
            } else {
                letAttribute(node, attribute);
            }
        }
        return node;
    };
    var setClass = function setClass(node, value) {
        return node.classList.add(value), node;
    };
    var setElement = function setElement(node, content, attributes) {
        node = isString(node) ? D.createElement(node) : node;
        if (isObject(content)) {
            attributes = content;
            content = false;
        }
        if (isString(content)) {
            setHTML(node, content);
        }
        if (isObject(attributes)) {
            setAttributes(node, attributes);
        }
        return node;
    };
    var setHTML = function setHTML(node, content, trim) {
        if (trim === void 0) {
            trim = true;
        }
        if (null === content) {
            return node;
        }
        var state = 'innerHTML';
        return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
    };
    var setStyle = function setStyle(node, style, value) {
        if (isNumber(value)) {
            value += 'px';
        }
        return node.style[toCaseCamel(style)] = fromValue(value), node;
    };
    var setStyles = function setStyles(node, styles) {
        var value;
        for (var style in styles) {
            value = styles[style];
            if (value || "" === value || 0 === value) {
                setStyle(node, style, value);
            } else {
                letStyle(node, style);
            }
        }
        return node;
    };

    function getColorFrom(node) {
        var color = getStyle(node, 'color') || "",
            c;
        // <https://www.regular-expressions.info/numericranges.html>
        if (c = color.match(/^rgba\s*\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]|0?\.\d+)\s*\)$/i)) {
            return [+c[1], +c[2], +c[3], +c[4]];
        }
        if (c = color.match(/^rgb\s*\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[, ]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/i)) {
            return [+c[1], +c[2], +c[3], 1];
        }
        return [0, 0, 0, 1];
    }
    var LineNumberPlugin = {
        'after:highlightElement': function afterHighlightElement(_ref) {
            var el = _ref.el,
                result = _ref.result,
                text = _ref.text;
            var theCode = el,
                theCodeLines = setElement(getName(el)),
                theCodeNumbers = [],
                theCodeParent = getParent(el),
                theCodeParentIsValid = theCodeParent && 'pre' === getName(theCodeParent);
            if (theCodeParentIsValid) {
                for (var i = 0, j = text.split(/\n/).length; i < j; ++i) {
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
                var _getColorFrom = getColorFrom(theCodeLines),
                    r = _getColorFrom[0],
                    g = _getColorFrom[1],
                    b = _getColorFrom[2],
                    a = _getColorFrom[3];
                setStyles(theCodeLines, {
                    'border-right': '2px solid rgba(' + r + ',' + g + ',' + b + ',' + a / 10 + ')',
                    'text-align': 'right',
                    'user-select': 'none' // Disable selection on number(s)
                });
            }
            return {
                el: el,
                result: result,
                text: text
            };
        }
    };
    // Is a web browser
    if (isDefined(W) && isDefined(W.hljs)) {
        W.hljs.addPlugin(LineNumberPlugin);
    }
    return LineNumberPlugin;
}));