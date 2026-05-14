# egvr.js

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A lightweight JavaScript library for creating 3D scenes and interactive WebXR content on top of A-Frame.

## Demos

- **[Spiral](https://taisukef.github.io/vr-spiral/)**: A simple spiral animation.
- **[Interactive](https://code4fukui.github.io/egvr/interactive.html)**: Click on objects with a mouse or VR controller to trigger actions.
- **[Game](https://code4fukui.github.io/egvr/game.html)**: A simple "click the sphere" reaction game.

## Features

- **Minimalist API**: Create entire 3D scenes with simple function calls. No HTML tags required.
- **3D Primitives**: Easily create `sphere`, `box`, `cone`, `cylinder`, `plate`, and `line` objects.
- **Asset Loading**: Display `glTF` 3D models, images, and 360° `sky` backgrounds. Includes automatic texture encoding fixes for platforms like Vision Pro.
- **Text Rendering**: High-quality text with full Unicode support via `eg.text()`, and a fast, basic `eg.textASCII()`.
- **Built-in Interaction**: Automatically handles mouse, Oculus Quest, and HTC Vive controller inputs. Add event handlers like `.onclick` to any created object.
- **Async Control Flow**: Use `await eg.waitClick()` and `await eg.sleep()` to easily script animations and game logic.
- **Scene Hierarchy**: Nest objects by passing a `parent` entity to creation functions.

## Quick Start

Create an `index.html` file and add the following. The library automatically sets up the A-Frame scene, camera, and controllers.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>egvr.js Quick Start</title>
  </head>
  <body>
    <script type="module">
      import * as eg from "https://js.sabae.cc/egvr.js";

      // Add a box that changes color on click
      const box = eg.box(0, 1.6, -3, 1, "blue");
      box.onclick = () => {
        const newColor = box.getAttribute("color") === "blue" ? "orange" : "blue";
        box.setAttribute("color", newColor);
      };

      // Add a 3D model
      eg.model("https://code4fukui.github.io/vr-kanazawa-it/kanta.glb", 1.5, 1, -3);

      // Add some text
      eg.text("Hello VR!", -1.5, 1.6, -3);
    </script>
  </body>
</html>
```

## API Reference

All object creation functions accept an optional `parent` entity as the last argument to create nested hierarchies.

### Scene Objects
- `eg.sphere(x, y, z, size, color, parent)`
- `eg.box(x, y, z, size, color, parent)`
- `eg.cone(x, y, z, size, height, color, parent)`
- `eg.cylinder(x, y, z, size, height, color, parent)`
- `eg.plate(x, y, z, width, height, color, parent)`
- `eg.line(x1, y1, z1, dx, dy, dz, color, parent)`
- `eg.model(url, x, y, z, rotationY, scale, parent)`
- `eg.image(url, x, y, z, width, height, isCircle, parent)`
- `eg.text(string, x, y, z, width, color, fontSize, parent)`
- `eg.textASCII(string, x, y, z, width, color, align, parent)`
- `eg.sky(url, radius)`

### Utilities
- `await eg.sleep(milliseconds)`: Pauses execution.
- `await eg.waitClick(object)`: Pauses execution until the specified object (or the scene background) is clicked.
- `eg.rgb(r, g, b)` / `eg.hsl(h, s, l)`: Color helper functions.

## License

MIT License - see [LICENSE](LICENSE).