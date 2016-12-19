# ESLit <a href="https://github.com/postcss/postcss"><img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

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
const data = {
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

Let their powers combine.

```js
require('eslit').import('path/to/template', data).then(
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

### `ESLit`

Returns a promise to render the template once all of its expressions are resolved.

```js
new ESLit( { ext, cwd }, data );
```

##### `ext`

Type: `String`  
Default: `".lit"`

The file extension sometimes used by imports.

##### `cwd`

Type: `Path`  
Default: `process.cwd()`

The current working directory used by imports.

##### data

The data used by the template.

### `ESLit.import`

Imports a file as a [Template Literal] and returns a promise to render the template once all of its expressions are resolved.

```js
ESlit.import( template, data, { cwd, ext } );
```

##### template

Type: `Path`  
Default: `"."`

The path or package id to import.

- *Paths are relative to the current file or the current working directory.*
- *Paths without extensions automatically receive `.lit`*
- *Node modules are supported, using `package.template` or `package.main`*

##### Example

```js
// within a module
ESLit.import('path/to/template');
```

```jsx
<!-- within a template -->
${ this.import('path/to/template') }
```

### `ESLit.parse`

Parses a string as a [Template Literal] and returns a promise to render the template once all of its expressions are resolved.

```js
ESlit.parse( template, data, { cwd, ext } );
```

##### Example

```js
// within a module
ESLit.import('path/to/template');
```

```jsx
<!-- within a template -->
${ this.parse('Hello, ${ Promise.resolve("world") }!') }
```

### `ESLit.ext`

Type: `String`  
Default: `".lit"`

The file extension sometimes used by imports.

##### Example

```js
ESlit.ext = '.jsx';

// resolve in order as "example", "example.jsx", or the "example" package
ESLit.import('example')
```

#### `ESLit.cwd`

Type: `Path`  
Default: `process.cwd()`

The current working directory used by imports.

##### Example

```js
// resolves files and packages from the current parent directory
ESlit.cwd = path.dirname(process.cwd());
```

## Syntax Helpers

##### Sublime Text

1. Install the **[Babel](https://packagecontrol.io/packages/Babel)** Package.
-  Select **Tools** > **Developer** > **New Syntax**.
-  Paste [this syntax](Lit Template (Babel).sublime-syntax).
-  Save the file as `Lit Template (Babel).sublime-syntax`.

[ESLit]: https://github.com/jonathantneal/eslit
[Template Literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[Template Literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

[npm-url]: https://www.npmjs.com/package/eslit
[npm-img]: https://img.shields.io/npm/v/eslit.svg
[cli-url]: https://travis-ci.org/jonathantneal/eslit
[cli-img]: https://img.shields.io/travis/jonathantneal/eslit.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/eslit.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/jonathantneal/eslit
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg
