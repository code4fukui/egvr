# egvr.js

A JavaScript library for creating 3D scenes and interactive content in the browser using A-Frame.

## Demo
[DEMO](https://taisukef.github.io/vr-spiral/)

[Interactive DEMO](https://code4fukui.github.io/egvr/interactive.html)

[Game DEMO](https://code4fukui.github.io/egvr/game.html)

## Features
- Provides a set of functions for creating 3D objects like spheres, boxes, and models
- Supports text rendering and image display
- Includes utilities for handling user interactions and animations

## Usage
To use the library, import the `egvr.js` file and access the exported functions:

```html
<script type="module">
import * as eg from "https://js.sabae.cc/egvr.js";

// Create 3D objects
eg.sphere(0, 1.5, -1, .5, "red");
eg.text("Hello", -.3, 2, -1.5);
</script>
```

## License
This project is licensed under the MIT License.