# Literally

> es templates + async data

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[Literally] lets you write sugary [Template Literals] that support asynchronous data.

```sh
npm install --save-dev eslit
```

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

[Literally] put ’em together.

```js
require('eslit').import('path/to/template', data).then(console.log);
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

Those paying attention, yes, we didn’t even `join` that array. Aww yiss.

### Usage

##### `Literally.import`

[Literally] imports a file as a [Template Literal] and returns a promise to render the template once all of its expressions are resolved.

```js
// within a module
require('eslit').import('path/to/template');
```

```jsx
<!-- within a template -->
${ this.import('path/to/template') }
```

- *Paths are relative to the current file or the current working directory.*
- *Paths without extensions automatically receive `.lit`*

##### `Literally.parse`

[Literally] parses a string as a [Template Literal] and returns a promise to render the template once all of its expressions are resolved.

```js
// within a module
require('eslit').import('path/to/template');
```


```jsx
<!-- within a template -->
${ this.parse('Hello, ${ Promise.resolve("world") }!') }
```

[Literally]: https://github.com/jonathantneal/eslit
[Template Literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[Template Literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

[npm-url]: https://www.npmjs.com/package/eslit
[npm-img]: https://img.shields.io/npm/v/eslit.svg?style=flat-square
[cli-url]: https://travis-ci.org/jonathantneal/eslit
[cli-img]: https://img.shields.io/travis/jonathantneal/eslit.svg?style=flat-square
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/eslit.svg?style=flat-square
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg?style=flat-square
[git-url]: https://gitter.im/jonathantneal/eslit
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg?style=flat-square
