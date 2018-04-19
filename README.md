# React-Picnic

A set of helpers & React components to use the excellent picnic css framework.

- repo [here](https://github.com/Xananax/react-picnic)
- demo [here](http://xananax.github.io/react-picnic/)
- documentation (in progress) [here](http://xananax.github.io/react-picnic/doc)

## Usage

```sh
npm install react-picnic
```

```js
import * as picnic from 'react-picnic';
// or
import { Nav, Button } from 'react-picnic';
```

You will also need to import the css, located in `src/index.css`, or the corresponding sass file in `src/index.scss`.

So, in a create-react-app project, in some css file, write:
```css
@import '../node_modules/react-picnic/src/index.css'
```

or, in your `App.js`:
```js
import 'react-picnic/src/index.css'
```

there's also an alternative stylesheet, which scopes all picnic styles to a `.picnic` namespace, here:
```js
import 'react-picnic/src/scoped.css'
```
(or `scoped.scss`)

Using this, picnic styles will only be applied to elements that are in a container with class `.picnic`.
However, main normalized styles still apply to everything. 

# Devving

I welcome contributions of course.
Scripts of interest:

Start a demo
```sh
npm start
```

Builds the demo in './dist' and uploads it to gh-pages
```sh
npm run deploy
```

Compiles typescript and readies the module for publishing on npm
```sh
npm run compile
```

Removes the './build' directory
```sh
npm clean:build
```

Removes the './dist' directory
```sh
npm clean:dist
```
# Log

- 0.1.0
  - module published

# License

MIT