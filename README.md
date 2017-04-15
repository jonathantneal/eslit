# ESLit [<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" width="90" height="90" align="right">][ESLit]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]

[ESLit] is a tool that lets you create templates with embedded JavaScript
expressions.

```jsx
<!-- some/template.html -->
<h1>${ heading }</h1>
<table>
  ${ people.map((person) => `<tr>
    <td>${ person.given }</td>
    <td>${ person.family }</td>
  </tr>`) }
</table>
```

ESLit templates are easy to use because they’re nothing more than web
standardized [ES6 Template Strings] with [Promise] support.

```js
require('eslit')('some/template', {
  heading: Promise.resolve('Guest List'),
  people: [{
    given: 'Martin',
    family: 'Brody'
  }, {
    given: 'Bruce',
    family: 'Shark'
  }]
}).then(console.log)
```

Keeps things simple.

```html
<h1>Guest List</h1>
<table>
  <tr>
    <td>Martin</td>
    <td>Brody</td>
  </tr><tr>
    <td>Bruce</td>
    <td>Shark</td>
  </tr>
</table>
```

## Usage

Add [ESLit] to your build tool.

```sh
npm install eslit --save-dev
```

### Node

ESLit returns a Promise to render a template once its embedded Promises are resolved.

```js
require('eslit')(src, data, options);
require('eslit').include(src, data, options);
```

Use the `include` function to bring in other templates.

```jsx
<h1>${ heading }</h1>

<table>
  ${ include('some/table') /* includes some/table.html */ }
</table>
```

- **src**: the path or package id being imported.
- **data**: the data used by the template.
- **cwd**: the path used by imports (default: `process.cwd()`).
- Options
  - **prefixes**: the file prefixes sometimes used by imports (default: `[ "_" ]`).
  - **extensions**: the file extensions sometimes used by imports (default: `[ ".html", ".jsx" ]`).
  - **separator**: the separator used to split paths (default: `/`).
  - **globopts**: the options passed into [node-glob].

*Notes*:

- *Paths are relative to the current file or the current working directory.*
- *Paths may use glob patterns or omit prefixes and extensions*
- *Node modules are supported, using the package `template` or `main` keys, or by using `index.html`*

#### parse

Parse returns a promise to render the template string once its embedded promises are resolved.

```js
eslit.parse( string, data, { cwd, prefixes, extensions, separator, globopts } );
```

**string**: The string parsed as a template.

#### resolve

Resolve returns a Promise that is resolved once its embedded promises have resolved.

```js
eslit.resolve`Template literal to be ${ Promise.resolve('resolved') }`;
```

---

## Syntax Helpers

##### Sublime Text

1. Install the **[Babel](https://packagecontrol.io/packages/Babel)** Package.
- Select **Tools** > **Developer** > **New Syntax**.
-  Paste [this syntax](Lit Template (Babel).sublime-syntax).
-  Save the file as `Lit Template (Babel).sublime-syntax`.

[ESLit]: https://github.com/jonathantneal/eslit
[ES6 Template Strings]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[Promise]: https://www.promisejs.org/
[node-glob]: https://github.com/isaacs/node-glob

[npm-url]: https://www.npmjs.com/package/eslit
[npm-img]: https://img.shields.io/npm/v/eslit.svg
[cli-url]: https://travis-ci.org/jonathantneal/eslit
[cli-img]: https://img.shields.io/travis/jonathantneal/eslit.svg
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/npm/l/eslit.svg
