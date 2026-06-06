import * as THREE from "three";

/**
 * A soft white radial-gradient texture, reused (tinted per-instance) for star
 * halos and the cluster nebulae. Generated once on a canvas and cached.
 */
let cached: THREE.Texture | null = null;

export function glowTexture(): THREE.Texture {
  if (cached) return cached;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.16, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.42, "rgba(255,255,255,0.28)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.06)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  cached = tex;
  return tex;
}
