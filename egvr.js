import { cr, rgb, asset } from "https://js.sabae.cc/aframe.js";
export { cr, rgb, asset };

export const scene = cr("a-scene");
scene.setAttribute("renderer", "colorManagement: true");
document.body.appendChild(scene);
document.body.style.backgroundColor = "#181818";

// for mouse event
const mouseCursor = cr("a-entity");
mouseCursor.setAttribute("cursor", "rayOrigin: mouse");
scene.appendChild(mouseCursor);

const assets = {};
const getAsset = (url) => {
  const a = assets[url];
  if (a) return a;
  const a2 = asset(url);
  assets[url] = a2;
  return a2;
};

export const sphere = (x, y, z, size = .5, color = "red") => {
  if (x === undefined) {
    alert(`eg.sphere(x, y, z, size = .5, color = "red")`);
    return;
  }
  const s = cr("a-sphere", scene);
  s.setAttribute("position", { x, y, z });
  s.setAttribute("color", color);
  s.setAttribute("radius", size / 2);
  return s;
};
export const box = (x, y, z, size = .5, color = "green") => {
  if (x === undefined) {
    alert(`eg.box(x, y, z, size = .5, color = "green")`);
    return;
  }
  const s = cr("a-box", scene);
  s.setAttribute("position", { x, y, z });
  s.setAttribute("color", color);
  s.setAttribute("width", size);
  s.setAttribute("height", size);
  s.setAttribute("depth", size);
  return s;
};
export const line = (x, y, z, dx, dy, dz, color = "white") => {
  if (x === undefined) {
    alert(`eg.line(x, y, z, dx, dy, dz, color = "white")`);
    return;
  }
  const s = cr("a-entity", scene);
  s.setAttribute("line", `start: ${x} ${y} ${z}; end: ${x + dx} ${y + dy} ${z + dz}; color: ${color}`);
  return s;
};
export const model = (asset_or_url, x = 0, y = 0, z = 0, ry = 0, size = 1) => {
  if (asset_or_url === undefined) {
    alert(`eg.model(url, y, z, ry, size)`);
    return;
  }
  const aid = typeof asset_or_url == "string" ? getAsset(asset_or_url) : asset_or_url;
  const obj = cr("a-entity", scene);
  obj.setAttribute("gltf-model", aid);
  obj.setAttribute("position", { x, y, z });
  obj.setAttribute("rotation", { x: 0, y: ry, z: 0 });
  obj.setAttribute("scale", { x: size, y: size, z: size });
  return obj;
};
export const text = (s, x = 0, y = 0, z = 0, size = 5, color = "white") => {
  if (s === undefined) {
    alert(`eg.text(s, y, z, size = 5, color = "white")`);
    return;
  }
  const obj = cr("a-text", scene);
  obj.setAttribute("value", s);
  obj.setAttribute("position", { x, y, z });
  //obj.setAttribute("rotation", { x: 0, y: ry, z: 0 });
  //obj.setAttribute("scale", { x: size, y: size, z: size });
  obj.setAttribute("width", size);
  obj.setAttribute("color", color);
  return obj;
};

export const help = () => {
  alert("eg.sphere(x, y, z) / eg.box(x, y, z) / eg.line(x, y, z, dx, dy, dz)");
};

export const hsl = (h, s, l) => {
  if (h === undefined) {
    alert(`eg.hsl(hue, sat, light)\nhue: 0-360, sat: 0-1, light: 0-1`);
    return;
  }
  const c = hsl2rgb(h / 360, s, l);
  return rgb(c.r, c.g, c.b);
};
const hue2rgb = (p, q, t) => {
  if (t < 0) t++;
  if (t > 1) t--;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};
const hsl2rgb = (h, s, l) => {
  let r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255 >> 0, g: g * 255 >> 0, b: b * 255 >> 0 };
};
