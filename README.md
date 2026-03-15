# paroller.js

[![npm](https://img.shields.io/npm/v/paroller.js.svg)](https://www.npmjs.com/package/paroller.js)

A lightweight jQuery plugin that enables parallax scrolling effect.

- You can use it on elements with background property or on any other element
- Elements can move vertically or horizontally while scrolling
- Controlled via `data-*` attributes or jQuery options
- Breakpoint-aware with per-screen-size factors
- Mobile ready
- Easy to use

**Demo:** [Preview](https://tgomilar.github.io/paroller.js/)

---

## Install

Before closing `</body>` include [jQuery](http://jquery.com/download/) and [paroller.js](https://github.com/tgomilar/paroller.js/tree/master/dist).

#### npm

```sh
npm install paroller.js
```

#### Yarn

```sh
yarn add paroller.js
```

#### CDN

[jsDelivr](https://www.jsdelivr.com/package/npm/paroller.js) · [unpkg](https://unpkg.com/paroller.js/)

---

## Usage

```html
<!-- Set attributes on element -->
<div
  class="my-paroller"
  data-paroller-factor="0.4"
  data-paroller-factor-xs="0.2"
  data-paroller-factor-sm="0.3"
  data-paroller-type="foreground"
  data-paroller-direction="horizontal"></div>

<div class="my-element"></div>
```

```javascript
// a) initialize using data attributes
$(".my-paroller").paroller();

// b) initialize with options
$(".my-element").paroller({
  factor: 0.5,
  factorXs: 0.2,
  factorSm: 0.3,
  type: "foreground",
  direction: "horizontal",
});
```

**npm / browserify**

```js
require("paroller.js");
```

---

## Options

### data attributes

| data-paroller-\*         | jQuery option | Value                      | Default               |
| ------------------------ | ------------- | -------------------------- | --------------------- |
| data-paroller-factor     | factor        | number (+/-)               | `0`                   |
| data-paroller-factor-xs  | factorXs      | number (+/-)               | inherits `factor`     |
| data-paroller-factor-sm  | factorSm      | number (+/-)               | inherits `factor`     |
| data-paroller-factor-md  | factorMd      | number (+/-)               | inherits `factor`     |
| data-paroller-factor-lg  | factorLg      | number (+/-)               | inherits `factor`     |
| data-paroller-factor-xl  | factorXl      | number (+/-)               | inherits `factor`     |
| data-paroller-type       | type          | `background`, `foreground` | `background`          |
| data-paroller-direction  | direction     | `vertical`, `horizontal`   | `vertical`            |
| data-paroller-transition | transition    | CSS transition             | `transform 0.1s ease` |

### factor

Sets speed and distance of the parallax effect. Positive and negative values control direction (up/down, left/right). A larger absolute value means faster/further movement.

> **Note:** `factor` must be set for paroller.js to have any effect.

### Breakpoint factors

If a breakpoint factor is not set, it inherits the main `factor` value. Set a breakpoint factor to `0` to disable parallax at that screen size.

|             | data attribute          | jQuery option | Window width |
| ----------- | ----------------------- | ------------- | ------------ |
| Extra small | data-paroller-factor-xs | factorXs      | < 576px      |
| Small       | data-paroller-factor-sm | factorSm      | ≤ 768px      |
| Medium      | data-paroller-factor-md | factorMd      | ≤ 1024px     |
| Large       | data-paroller-factor-lg | factorLg      | ≤ 1200px     |
| Extra large | data-paroller-factor-xl | factorXl      | ≤ 1920px     |

### transition

CSS transition applied only to `foreground` elements.

### Full example

```javascript
$("[data-paroller-factor]").paroller({
  factor: 0.3, // main factor, used when no breakpoint factor matches
  factorXs: 0.1, // < 576px
  factorSm: 0.2, // <= 768px
  factorMd: 0.3, // <= 1024px
  factorLg: 0.4, // <= 1200px
  factorXl: 0.5, // <= 1920px
  type: "foreground", // background | foreground
  direction: "horizontal", // vertical | horizontal
  transition: "transform 0.2s ease-in",
});
```

---

## Development

```sh
npm install
npm run build   # generates dist/jquery.paroller.min.js from source
```

---

## License

[MIT](LICENCE.md)
