import { cr, rgb, asset } from "https://js.sabae.cc/aframe.js";
export { cr, rgb, asset };

export const scene = cr("a-scene", document.body);
document.body.style.backgroundColor = "black";

export const sphere = (x, y, z, size = .5, color = "red") => {
  if (x == undefined) {
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
  if (x == undefined) {
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
  if (x == undefined) {
    alert(`eg.line(x, y, z, dx, dy, dz, color = "white")`);
    return;
  }
  const s = cr("a-entity", scene);
  s.setAttribute("line", `start: ${x} ${y} ${z}; end: ${x + dx} ${y + dy} ${z + dz}; color: ${color}`);
  return s;
};
export const help = () => {
  alert("eg.sphere(x, y, z) / eg.box(x, y, z) / eg.line(x, y, z, dx, dy, dz)");
};
