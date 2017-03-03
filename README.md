# ESLit [<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" width="90" height="90" align="right">][ESLit]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]
[![Gitter Chat][git-img]][git-url]

[ESLit] lets you write sugary [Template Literals] supporting asynchronous data.

```jsx
<!-- path/to/template -->
<h1>${ heading }</h1>

<table>
  ${ people.map((person) => `<tr>
    <td>${ person.given }</td>
    <td>${ person.family }</td>
  </tr>`) }
</table>
```

```js
const some_data = {
  heading: Promise.resolve('Guest List'),
  people: [{
    given: 'Martin',
    family: 'Brody'
  }, {
    given: 'Bruce',
    family: 'Shark'
  }]
}
```

Now, let their powers combine!

```js
require('eslit')('path/to/template', some_data).then(
  (content) => console.log(content)
);
```

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

```sh
npm install --save-dev eslit
```

### `eslit`

Returns a promise to render the template once all of its inner promises are resolved.

```js
eslit(src, data, { cwd, prefixes, extensions, separator, globopts })
```

eslit is exposed to templates as `include`, optionally defining additional data and options.

```html
<h1>${ heading }</h1>

<table>
  ${ include('path/to/table') }
</table>
```

##### src

Type: `Path`

The path or package id being imported by eslit.

- *Paths are relative to the current file or the current working directory.*
- *Paths may use glob patterns or omit prefixes and extensions*
- *Node modules are supported, looking up `package.template` or `package.main`, or using `index.html`*

##### data

The data used by the template.

##### `cwd`

Type: `Path`  
Default: `process.cwd()`

The current working directory used by eslit.

##### `prefixes`

Type: `Array`  
Default: `[ "_" ]`

The file prefixes sometimes used by eslit.

##### `extensions`

Type: `Array`  
Default: `[ ".html", ".jsx" ]`

The file extensions sometimes used by eslit.

##### `separator`

Type: `String`  
Default: `"/"`

The separator used by eslit to split paths.

##### `globopts`

Type: `Object`

Advanced options used by [node-glob].

---

### `eslit.parse`

Parses a string as a [Template Literal] and returns a promise to render the template once all of its expressions are resolved.

```js
eslit.parse( string, data, { cwd, prefixes, extensions, separator, globopts } );
```

##### `string`

Type: `String`

The string to be parsed.

---

### `eslit.resolve`

Resolves promises used within a [Template Literal].

```js
eslit.resolve`Template literal to be ${ Promise.resolve('resolved') }`;
```

---

## Syntax Helpers

##### Sublime Text

1. Install the **[Babel](https://packagecontrol.io/packages/Babel)** Package.
-  Select **Tools** > **Developer** > **New Syntax**.
-  Paste [this syntax](Lit Template (Babel).sublime-syntax).
-  Save the file as `Lit Template (Babel).sublime-syntax`.

[ESLit]: https://github.com/jonathantneal/eslit
[Template Literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[Template Literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[node-glob]: https://github.com/isaacs/node-glob

[npm-url]: https://www.npmjs.com/package/eslit
[npm-img]: https://img.shields.io/npm/v/eslit.svg
[cli-url]: https://travis-ci.org/jonathantneal/eslit
[cli-img]: https://img.shields.io/travis/jonathantneal/eslit.svg
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/npm/l/eslit.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/jonathantneal/eslit
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg
