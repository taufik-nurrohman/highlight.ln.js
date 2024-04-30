Line Number Plugin for [Highlight.js](https://github.com/highlightjs/highlight.js)
==================================================================================

![highlight.ln.js](https://user-images.githubusercontent.com/1669261/83881420-d0d1be00-a76a-11ea-935f-754a67b3cd5a.png)

[Demo](https://taufik-nurrohman.github.io/highlight.ln.js/index.html)

Usage
-----

### Browser

~~~ html
<script src="highlight.min.js"></script>
<script src="highlight.ln.js/index.min.js"></script>
<script>
  hljs.highlightAll();
</script>
~~~

### Node.js

~~~ js
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';

import LineNumberPlugin from '@taufik-nurrohman/highlight.ln.js';

hljs.addPlugin(LineNumberPlugin);

hljs.registerLanguage('css', css);

hljs.highlightAll();
~~~

### CommonJS

~~~ js
const hljs = require('highlight.js/lib/core');
const css = require('highlight.js/lib/languages/css');

const LineNumberPlugin = require('@taufik-nurrohman/highlight.ln.js').default;

hljs.addPlugin(LineNumberPlugin);

hljs.registerLanguage('css', css);

hljs.highlightAll();
~~~

License
-------

BSD