import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
export const nodes = [
  {
    id: "identity",
    label: "Identity",
    role: "Synthetic authentication service",
    position: [-1.25, 0.8, 1.05],
  },
  {
    id: "application",
    label: "Application",
    role: "Synthetic application workload",
    position: [1.1, 0.55, 1.2],
  },
  {
    id: "endpoint",
    label: "Endpoint",
    role: "Synthetic workstation",
    position: [0.1, 1.5, -0.55],
  },
  {
    id: "storage",
    label: "Evidence store",
    role: "Synthetic storage node",
    position: [-1, -0.95, 0.95],
  },
  {
    id: "gateway",
    label: "Gateway",
    role: "Synthetic edge node",
    position: [1, -0.9, 0.9],
  },
  {
    id: "analyst",
    label: "Analyst",
    role: "Synthetic analyst workstation",
    position: [0.2, -0.7, -1.45],
  },
];
type Props = {
  selected?: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
};
export default function Topology({
  selected = "application",
  onSelect,
  compact = false,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const [fallback, setFallback] = useState(false);
  const [rotating, setRotating] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const rotation = useRef(rotating);
  rotation.current = rotating;
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) setRotating(false);
    };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFallback(true);
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    el.prepend(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.2, 6.7);
    const group = new THREE.Group();
    scene.add(group);
    const points: number[] = [];
    const count = 420;
    for (let i = 0; i < count; i++) {
      const y = 1 - (2 * i) / (count - 1);
      const r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      points.push(Math.cos(a) * r * 1.65, y * 1.65, Math.sin(a) * r * 1.65);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    group.add(
      new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          color: 0x459dc4,
          size: 0.018,
          transparent: true,
          opacity: 0.55,
        }),
      ),
    );
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 28, 16),
      new THREE.MeshBasicMaterial({
        color: 0x1b7fa4,
        wireframe: true,
        transparent: true,
        opacity: 0.09,
      }),
    );
    group.add(globe);
    const links: number[] = [];
    nodes.forEach((n, i) => {
      const p = new THREE.Vector3(...(n.position as [number, number, number]));
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshBasicMaterial({
          color: n.id === selected ? 0xafffc7 : 0x65d3f0,
        }),
      );
      mesh.position.copy(p);
      mesh.userData.id = n.id;
      group.add(mesh);
      meshes.current.push(mesh);
      const end = nodes[(i + 1) % nodes.length].position;
      links.push(...n.position, ...end);
      if (i < 3) links.push(...n.position, ...nodes[i + 3].position);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(links, 3),
    );
    group.add(
      new THREE.LineSegments(
        lineGeo,
        new THREE.LineBasicMaterial({
          color: 0x54c6e4,
          transparent: true,
          opacity: 0.3,
        }),
      ),
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.98, 0.004, 6, 150),
      new THREE.MeshBasicMaterial({
        color: 0x64f4ce,
        transparent: true,
        opacity: 0.55,
      }),
    );
    ring.rotation.x = 1.15;
    ring.rotation.z = 0.5;
    group.add(ring);
    group.rotation.x = 0.12;
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    let visible = true;
    const io = new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
    });
    io.observe(el);
    let dragging = false,
      lastX = 0,
      lastY = 0,
      moved = 0;
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX,
        dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      group.rotation.y += dx * 0.007;
      group.rotation.x = Math.max(
        -0.8,
        Math.min(0.8, group.rotation.x + dy * 0.004),
      );
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (moved > 7) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        (-(e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(meshes.current)[0];
      if (hit) selectRef.current?.(hit.object.userData.id);
    };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    let frame = 0,
      last = 0;
    const animate = (t: number) => {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden || t - last < 32) return;
      last = t;
      if (rotation.current && !dragging) group.rotation.y += 0.0018;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      scene.traverse((o) => {
        const item = o as THREE.Mesh;
        if (item.geometry) item.geometry.dispose();
        if (item.material) {
          for (const m of Array.isArray(item.material)
            ? item.material
            : [item.material])
            m.dispose();
        }
      });
      meshes.current = [];
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  useEffect(() => {
    meshes.current.forEach((mesh) =>
      (mesh.material as THREE.MeshBasicMaterial).color.set(
        mesh.userData.id === selected ? 0xafffc7 : 0x65d3f0,
      ),
    );
  }, [selected]);
  return (
    <div className={"topology " + (compact ? "compact" : "")}>
      <div className="topology-stage" ref={host}>
        {fallback && (
          <svg viewBox="0 0 400 300" aria-hidden="true">
            <circle cx="200" cy="150" r="115" fill="none" stroke="#27516a" />
            {nodes.map((n, i) => {
              const a = (i * Math.PI) / 3;
              return (
                <g key={n.id}>
                  <path
                    d={`M200 150L${200 + 100 * Math.cos(a)} ${150 + 100 * Math.sin(a)}`}
                    stroke="#3c8bab"
                  />
                  <circle
                    cx={200 + 100 * Math.cos(a)}
                    cy={150 + 100 * Math.sin(a)}
                    r="7"
                    fill={n.id === selected ? "#b7ffd1" : "#61cee9"}
                  />
                </g>
              );
            })}
          </svg>
        )}
      </div>
      <div className="topology-note">
        {fallback
          ? "Interactive topology · accessible fallback"
          : "3D topology · drag to rotate · select a node"}
      </div>
      {!fallback && (
        <div className="rotation-control">
          <button
            type="button"
            aria-pressed={rotating}
            onClick={() => setRotating((value) => !value)}
          >
            {rotating ? "Pause globe rotation" : "Enable globe rotation"}
          </button>
        </div>
      )}
      {onSelect && (
        <div
          className="node-controls"
          aria-label="Select a simulated network node"
        >
          {nodes.map((n) => (
            <button
              type="button"
              key={n.id}
              className={selected === n.id ? "active" : ""}
              aria-pressed={selected === n.id}
              onClick={() => onSelect(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
