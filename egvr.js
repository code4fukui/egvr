import { cr, rgb, asset } from "https://js.sabae.cc/aframe.js";
export { cr, rgb, asset };
export { waitClick } from "https://js.sabae.cc/waitClick.js";
export { sleep } from "https://js.sabae.cc/sleep.js";

// isVisionPro
const supportsWebXR = "xr" in navigator;
export const isVisionPro = () => supportsWebXR && navigator.userAgent.indexOf("Macintosh") >= 0 && navigator.userAgent.indexOf("Chrome") == -1;

// encoding
AFRAME.registerComponent('srgb-encoding', {
  init: function () {
    this.el.sceneEl.renderer.outputEncoding = THREE.sRGBEncoding;
  }
});

AFRAME.registerComponent('fix-texture-encoding', {
  init: function () {
    this.el.addEventListener('model-loaded', () => {
      this.el.object3D.traverse((child) => {
        if (child.isMesh && child.material.map) {
          child.material.map.encoding = THREE.sRGBEncoding;
        }
      });
    });
  }
});
//

export const scene = cr("a-scene");
scene.setAttribute("renderer", "colorManagement: true; sortObjects: true");
scene.setAttribute("srgb-encoding", "");  // for encoding

// camera
export const camera = cr("a-camera");
scene.appendChild(camera);

// for controller event
export const ctrl1 = cr("a-entity");
ctrl1.setAttribute("laser-controls", "hand: left");
ctrl1.setAttribute("vr-controller", "");
scene.appendChild(ctrl1);

export const ctrl2 = cr("a-entity");
ctrl2.setAttribute("laser-controls", "hand: right");
ctrl2.setAttribute("vr-controller", "");
scene.appendChild(ctrl2);

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

const parentOrScene = (p) => p === undefined ? scene : p;

const setColor = (obj, color) => {
  if (color == "occ") {
    obj.addEventListener("loaded", () => {
      const mesh = obj.getObject3D("mesh");
      console.log(mesh, mesh.renderOrder)
      mesh.material.colorWrite = false;
      mesh.renderOrder = -1;
      //obj.components.geometry.data = newGeometryData;
      //obj.components.geometry.update(obj.components.geometry.data);
    });
    return;
  }
  obj.setAttribute("color", color);
};

export const sphere = (x, y, z, size = .5, color = "red", parent) => {
  if (x === undefined) {
    alert(`eg.sphere(x, y, z, size = .5, color = "red")`);
    return;
  }
  const s = cr("a-sphere", parentOrScene(parent));
  s.setAttribute("position", { x, y, z });
  setColor(s, color);
  s.setAttribute("radius", size / 2);
  return s;
};
export const box = (x, y, z, size = .5, color = "green", parent) => {
  if (x === undefined) {
    alert(`eg.box(x, y, z, size = .5, color = "green")`);
    return;
  }
  const s = cr("a-box", parentOrScene(parent));
  s.setAttribute("position", { x, y, z });
  setColor(s, color);
  s.setAttribute("width", size);
  s.setAttribute("height", size);
  s.setAttribute("depth", size);
  return s;
};
export const line = (x, y, z, dx, dy, dz, color = "white", parent) => {
  if (x === undefined) {
    alert(`eg.line(x, y, z, dx, dy, dz, color = "white")`);
    return;
  }
  const s = cr("a-entity", parentOrScene(parent));
  s.setAttribute("line", `start: ${x} ${y} ${z}; end: ${x + dx} ${y + dy} ${z + dz}; color: ${color}`);
  return s;
};
export const model = (asset_or_url, x = 0, y = 0, z = 0, ry = 0, size = 1, parent) => {
  if (asset_or_url === undefined) {
    alert(`eg.model(url, y, z, ry, size)`);
    return;
  }
  const aid = typeof asset_or_url == "string" ? getAsset(asset_or_url) : asset_or_url;
  const obj = cr("a-entity", parentOrScene(parent));
  obj.setAttribute("gltf-model", aid);
  obj.setAttribute("fix-texture-encoding", ""); // for encoding
  obj.setAttribute("position", { x, y, z });
  obj.setAttribute("rotation", { x: 0, y: ry, z: 0 });
  obj.setAttribute("scale", { x: size, y: size, z: size });
  // set encoding
  if (isVisionPro()) {
    obj.object3D.traverse((child) => {
      if (child.isMesh) {
        child.material.map.encoding = THREE.sRGBEncoding;
      }
    });
  }
  return obj;
};
export const text = (s, x, y, z, w = 1.0, color = "white", size = 128, parent) => {
  if (s === undefined) {
    alert(`eg.text(s, x, y, z, width = 1.0, color = "white", size = 128, parent)`);
    return;
  }
  const canvas = document.createElement("canvas");
  const g = canvas.getContext("2d");
  g.font = `bold ${size}px sans-serif`;
  const m = g.measureText(s);
  const sw = m.width;
  const sh = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  canvas.width = sw;
  canvas.height = Math.floor(sh * 2);
  g.font = `bold ${size}px sans-serif`;
  g.fillStyle = color;
  g.fillText(s, 0, size - m.actualBoundingBoxDescent);
  const img = canvas.toDataURL();
  // w *= .2; // difference from old textASCII
  const h = w / canvas.width * canvas.height;
  return image(img, x, y, z, w, h, false, parent);
};
export const textASCII = (s, x = 0, y = 0, z = 0, width = 1.0, color = "white", align = "center", parent) => {
  if (s === undefined) {
    alert(`eg.textASCII(s, y, z, size = 5, color = "white", align = "center")`);
    return;
  }
  const size = width * 5; // difference from text
  const obj = cr("a-text", parentOrScene(parent));
  obj.setAttribute("value", s);
  obj.setAttribute("position", { x, y, z });
  //obj.setAttribute("rotation", { x: 0, y: ry, z: 0 });
  //obj.setAttribute("scale", { x: size, y: size, z: size });
  obj.setAttribute("width", size);
  setColor(obj, color);
  obj.setAttribute("align", align);
  return obj;
};
export const image = (img, x, y, z, w = 0.5, h = 0.5, circle = false, parent) => {
  if (img === undefined) {
    alert(`eg.image(img, x, y, z, w = 0.5, h = 0.5, circle = false)`);
    return;
  }
	if (circle) {
		const s = cr("a-cylinder", parentOrScene(parent));
		s.setAttribute("position", { x, y, z });
		s.setAttribute("radius", w);
		s.setAttribute("height", 0);
		s.setAttribute("height", 0);
		s.setAttribute("segments-radial", Math.floor(w * 64));
		s.setAttribute("rotation", { x: 90, y: 0, z: 0 });
		s.setAttribute("src", img);
    s.setAttribute("transparent", "true");
		return s;
	} else {
		const s = cr("a-plane", parentOrScene(parent));
		s.setAttribute("position", { x, y, z });
		s.setAttribute("width", w);
		s.setAttribute("height", h);
		s.setAttribute("rotation", { x: 0, y: 0, z: 0 });
		s.setAttribute("src", img);
    s.setAttribute("transparent", "true");
		return s;
	}
};
export const plate = (x, y, z, w, h, color, parent) => {
  if (x === undefined) {
    alert(`eg.plate(x, y, z, w = 0.5, h = 0.5)`);
    return;
  }
  const s = cr("a-plane", parentOrScene(parent));
  s.setAttribute("position", { x, y, z });
  s.setAttribute("width", w);
  s.setAttribute("height", h);
  s.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  setColor(s, color);
  return s;
};
export const cone = (x, y, z, size, h, color, parent) => {
  if (x === undefined) {
    alert(`eg.cone(x, y, z, size = 0.5, h = 0.5)`);
    return;
  }
  const s = cr("a-cone", parentOrScene(parent));
  s.setAttribute("position", { x, y, z });
  s.setAttribute("radius-bottom", size / 2);
  s.setAttribute("radius-top", 0);
  s.setAttribute("height", h);
  s.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  setColor(s, color);
  return s;
};
export const cylinder = (x, y, z, size, h, color, parent) => {
  if (x === undefined) {
    alert(`eg.cylinder(x, y, z, size = 0.5, h = 0.5)`);
    return;
  }
  const s = cr("a-cylinder", parentOrScene(parent));
  s.setAttribute("position", { x, y, z });
  s.setAttribute("radius", size / 2);
  s.setAttribute("height", h);
  s.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  setColor(s, color);
  return s;
};

let skyobj = null;
export const sky = (src, radius = 500, parent) => {
  if (src === undefined) {
    alert(`eg.sky(src, radius = 500)`);
    return;
  }
  if (skyobj == null) {
    const sky = cr("a-sky", parentOrScene(parent));
    sky.setAttribute("src", src);
    sky.setAttribute("radius", radius);  
    skyobj = sky;
    
    // unvisible if AR-mode
    scene.addEventListener("enter-vr", () => {
      if (scene.is("ar-mode")) {
        sky.setAttribute("visible", false);
      } else {
        sky.setAttribute("visible", true);
      }
    });
    scene.addEventListener("exit-vr", () => {
      sky.setAttribute("visible", bg);
    });
  } else {
    skyobj.setAttribute("src", src);
  }
  return skyobj;
};

export const help = () => {
  alert(`
    eg.sphere(x, y, z)
    eg.box(x, y, z)
    eg.line(x, y, z, dx, dy, dz)
    eg.plate(x, y, z, w, h)
    eg.text(s, x, y, z, w)
    eg.cone(x, y, z, size, h)
    eg.cylinder(x, y, z, size, h)
  `);
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

export const group = (x, y, z, parent) => {
  const c = cr("a-entity", parentOrScene(parent));
  if (x !== undefined) {
    c.setAttribute("position", { x, y, z });
  }
  return c;
};

export const isNear = (o2, distance = 1.0) => {
  const o1 = camera;
  const p1 = o1.getAttribute("position");
  const p2 = o2.getAttribute("position");
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  const d = dx * dx + dy * dy + dz * dz;
  return d < distance * distance;
};

export const cls = () => {
  const remlist = [];
  for (const ele of scene.children) {
    if (
      ele.getAttribute("aframe-injected") !== "" &&
      ele.tagName !== "A-CAMERA" &&
      ele.tagName !== "CANVAS" &&
      ele.tagName !== "DIV" &&
      !(ele.tagName === "A-ENTITY" && ele.getAttribute("raycaster") !== null)
    ) {
      remlist.push(ele);
    }
  }
  for (let i = 0; i < remlist.length; i++) {
    scene.removeChild(remlist[i]);
  }
};

export const rotation = (o, x = 0, y = 0, z = 0) => {
  o.setAttribute("rotation", { x, y, z });
};
