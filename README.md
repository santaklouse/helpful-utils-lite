# helpful-utils-lite

🚀 Lightweight utility library with **debounce**, **throttle**, and **memoize** — a minimal alternative to lodash.

---

## Installation

```bash
npm install helpful-utils-lite
```

## API

`debounce(func, wait, options)`
 - `func`: Function to debounce
 - `wait`: Delay in ms
 - `options: { leading: false, trailing: true }`

`throttle(func, wait, options)`
 - `func`: Function to throttle
 - `wait`: Interval in ms
 - `options: { leading: true, trailing: true }`

`memoize(func, resolver)`
 - `func`: Function to memoize
 - `resolver`: Function to generate cache key (default = first argument)

## Usage

### In Browser ES-module

```html
<script type="module">
    import { debounce, throttle, memoize } from "./lodash-lite.js";

    const log = debounce(() => console.log("Debounced!"), 300);
    window.addEventListener("resize", log);

    const scroll = throttle(() => console.log("Throttled!"), 1000);
    window.addEventListener("scroll", scroll);

    const square = memoize((n) => n * n);
    console.log(square(5)); // вычислит
    console.log(square(5)); // возьмет из кэша
</script>
```

### In NodeJs (CommonJS)

```js
const { debounce, throttle, memoize } = require("./lodash-lite.js");

const test = memoize((n) => n * 2);
console.log(test(10)); // 20
console.log(test(10)); // кэш

```


```js
import { debounce, throttle, memoize } from "helpful-utils-lite";

// --- Debounce ---
const search = debounce((q) => {
  console.log("Searching:", q);
}, 300);

window.addEventListener("input", (e) => search(e.target.value));

// --- Throttle ---
const logScroll = throttle(() => {
  console.log("Scroll event:", Date.now());
}, 1000);

window.addEventListener("scroll", logScroll);

// --- Memoize ---
const square = memoize((n) => n * n);

console.log(square(5)); // calculates
console.log(square(5)); // from cache

```
