"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { lotusState } from "@/lib/lotus-state";

/*
 * The HAZTHINK lotus rebuilt in 3D from the logo's construction:
 * five translucent colour petals, three seed drops, a white heart
 * and the black hand-drawn outline petals floating in front.
 * Units: 1 = 100px of the 724×570 logo artwork, origin at the bottom tip.
 */

const BLACK = "#120a0f";

type LeafOpts = { length: number; width: number; base?: number; tip?: number };

/** A leaf with a pointed tip at +Y and a softer base at -Y, centred on origin. */
function leafCurve({ length, width, base = 0.35, tip = 0.9 }: LeafOpts) {
  const h = length / 2;
  const w = width / 2;
  const shape = new THREE.Shape();
  shape.moveTo(0, -h);
  shape.bezierCurveTo(-w * (1 + base), -h * 0.55, -w * tip * 1.15, h * 0.45, 0, h);
  shape.bezierCurveTo(w * tip * 1.15, h * 0.45, w * (1 + base), -h * 0.55, 0, -h);
  return shape;
}

function useLeafGeometry(opts: LeafOpts, depth = 0.08) {
  return useMemo(() => {
    const g = new THREE.ExtrudeGeometry(leafCurve(opts), {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.035,
      bevelSegments: 4,
      curveSegments: 40,
    });
    g.translate(0, 0, -depth / 2);
    return g;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.length, opts.width, opts.base, opts.tip, depth]);
}

/** Stroke tube following a leaf outline, to echo the logo's ink line. */
function useOutlineGeometry(opts: LeafOpts, radius = 0.028) {
  return useMemo(() => {
    const pts = leafCurve(opts).getSpacedPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0));
    const curve = new THREE.CatmullRomCurve3(pts, true);
    return new THREE.TubeGeometry(curve, 320, radius, 8, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.length, opts.width, opts.base, opts.tip, radius]);
}

type PetalDef = {
  color: string;
  pos: [number, number, number];
  rot: number;
  leaf: LeafOpts;
  dir: [number, number];
};

// Mirrors the composition of the 2D logo.
const PETALS: PetalDef[] = [
  { color: "#dfe04a", pos: [0, 2.55, -0.45], rot: 0, leaf: { length: 3.2, width: 1.95 }, dir: [0, 1] },
  { color: "#4cb85a", pos: [-1.55, 2.0, -0.3], rot: 0.62, leaf: { length: 3.0, width: 2.05 }, dir: [-0.8, 0.6] },
  { color: "#f39230", pos: [1.55, 2.0, -0.3], rot: -0.62, leaf: { length: 3.0, width: 2.05 }, dir: [0.8, 0.6] },
  { color: "#1f8ae2", pos: [-1.95, 0.75, -0.12], rot: 1.28, leaf: { length: 3.55, width: 2.0 }, dir: [-1, 0.1] },
  { color: "#9b2ab3", pos: [1.95, 0.75, -0.12], rot: -1.28, leaf: { length: 3.55, width: 2.0 }, dir: [1, 0.1] },
];

const DROPS: { color: string; pos: [number, number, number]; rot: number }[] = [
  { color: "#dfe04a", pos: [0, 4.85, -0.35], rot: 0 },
  { color: "#4cb85a", pos: [-2.85, 3.62, -0.3], rot: 0.85 },
  { color: "#f39230", pos: [2.85, 3.62, -0.3], rot: -0.85 },
];

// Ink outlines: [position, rotation, leaf]
const OUTLINES: { pos: [number, number, number]; rot: number; leaf: LeafOpts }[] = [
  { pos: [0, 1.8, 0.28], rot: 0, leaf: { length: 3.65, width: 1.85, base: 0.1, tip: 0.85 } },
  { pos: [-1.28, 2.25, 0.12], rot: 0.5, leaf: { length: 2.6, width: 1.5, base: 0.15 } },
  { pos: [1.28, 2.25, 0.12], rot: -0.5, leaf: { length: 2.6, width: 1.5, base: 0.15 } },
  { pos: [-1.75, 0.95, 0.36], rot: 1.08, leaf: { length: 3.75, width: 1.55, base: 0.05 } },
  { pos: [1.75, 0.95, 0.36], rot: -1.08, leaf: { length: 3.75, width: 1.55, base: 0.05 } },
  { pos: [-1.85, 0.42, 0.44], rot: 1.38, leaf: { length: 3.85, width: 1.0, base: 0.05 } },
  { pos: [1.85, 0.42, 0.44], rot: -1.38, leaf: { length: 3.85, width: 1.0, base: 0.05 } },
];

// Bounding box of the full composition (incl. open state), used to frame the camera.
const BOUNDS = { width: 8.6, height: 6.4, centerY: 2.45 };

function Petal({ def, index }: { def: PetalDef; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useLeafGeometry(def.leaf);
  const base = useMemo(() => new THREE.Vector3(...def.pos), [def.pos]);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const open = lotusState.progress * 0.75 + lotusState.burst * 0.35;
    const breathe = Math.sin(t * 1.1 + index) * 0.04;
    m.position.set(
      base.x + def.dir[0] * (open + breathe) * 0.9,
      base.y + def.dir[1] * (open + breathe) * 0.9,
      base.z + Math.sin(t * 0.8 + index * 1.3) * 0.06,
    );
    m.rotation.z = def.rot - def.dir[0] * open * 0.35;
    m.rotation.y = Math.sin(t * 0.6 + index) * 0.12 + def.dir[0] * open * 0.6;
    m.rotation.x = -open * 0.25 * def.dir[1];
  });

  return (
    <mesh ref={ref} geometry={geometry} renderOrder={index}>
      <meshPhysicalMaterial
        color={def.color}
        roughness={0.25}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.15}
        sheen={0.6}
        sheenColor="#ffffff"
        transparent
        opacity={0.88}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Drop({ color, pos, rot, index }: { color: string; pos: [number, number, number]; rot: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useLeafGeometry({ length: 0.95, width: 0.62, base: 0.4, tip: 0.85 }, 0.1);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const open = lotusState.progress + lotusState.burst * 0.6;
    m.position.set(pos[0] * (1 + open * 0.25), pos[1] + open * 0.7 + Math.sin(t * 1.6 + index * 2) * 0.1, pos[2]);
    m.rotation.y = t * 0.9 + index;
    m.rotation.z = rot;
  });
  return (
    <mesh ref={ref} geometry={geometry} position={pos}>
      <meshPhysicalMaterial color={color} roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  );
}

function Outline({ pos, rot, leaf, index }: { pos: [number, number, number]; rot: number; leaf: LeafOpts; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useOutlineGeometry(leaf);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const open = lotusState.progress * 0.5 + lotusState.burst * 0.2;
    const side = Math.sign(pos[0]);
    m.position.set(pos[0] + side * open * 0.7, pos[1] + (side === 0 ? open * 0.3 : open * 0.15), pos[2] + Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.04);
    m.rotation.z = rot - side * open * 0.2;
  });
  return (
    <mesh ref={ref} geometry={geometry} position={pos} rotation={[0, 0, rot]}>
      <meshStandardMaterial color={BLACK} roughness={0.35} metalness={0.2} />
    </mesh>
  );
}

function Heart() {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useLeafGeometry({ length: 3.5, width: 1.72, base: 0.1, tip: 0.85 }, 0.05);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const open = lotusState.progress * 0.5;
    m.position.y = 1.8 + open * 0.3;
    m.scale.setScalar(1 - lotusState.progress * 0.15);
  });
  return (
    <mesh ref={ref} geometry={geometry} position={[0, 1.8, 0.2]}>
      <meshPhysicalMaterial color="#fffaf5" emissive="#ffffff" emissiveIntensity={0.45} roughness={0.18} clearcoat={1} clearcoatRoughness={0.05} />
    </mesh>
  );
}

function Flower() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, lastX: 0, velocity: 0, spin: 0 });
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      if (drag.current.active) {
        const dx = e.clientX - drag.current.lastX;
        drag.current.lastX = e.clientX;
        drag.current.velocity = dx * 0.006;
        drag.current.spin += dx * 0.006;
      }
    };
    const onDown = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      lotusState.burst = 1;
    };
    const onUp = () => {
      drag.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const d = drag.current;
    if (!d.active) {
      d.velocity *= 0.95;
      d.spin += d.velocity;
      d.spin *= 0.985; // ease back to facing forward
    }
    lotusState.burst = Math.max(0, lotusState.burst - delta * 1.4);

    const intro = lotusState.intro;
    const p = lotusState.progress;
    const targetY = pointer.current.x * 0.35 + d.spin + Math.sin(p * Math.PI) * 0.45;
    const targetX = -pointer.current.y * 0.18 + 0.08 - p * 0.55;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 5, delta);
    g.rotation.z = Math.sin(t * 0.5) * 0.03 + p * 0.12;
    const s = THREE.MathUtils.lerp(0.4, 1, intro);
    g.scale.setScalar(s);
    g.position.y = -BOUNDS.centerY + Math.sin(t * 0.9) * 0.08 + (1 - intro) * -1.2;
  });

  return (
    <group ref={group}>
      {PETALS.map((p, i) => (
        <Petal key={i} def={p} index={i} />
      ))}
      <Heart />
      {OUTLINES.map((o, i) => (
        <Outline key={i} {...o} index={i} />
      ))}
      {DROPS.map((d, i) => (
        <Drop key={i} {...d} index={i} />
      ))}
    </group>
  );
}

/** Keeps the whole flower inside the frustum at any aspect ratio — no cropping. */
function FitCamera({ margin = 1.18 }: { margin?: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const fov = THREE.MathUtils.degToRad(cam.fov);
    const tan = Math.tan(fov / 2);
    const distH = (BOUNDS.height * margin) / 2 / tan;
    const distW = (BOUNDS.width * margin) / 2 / (tan * aspect);
    cam.position.set(0, 0, Math.max(distH, distW) + 1);
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  }, [camera, size, margin]);
  return null;
}

export default function LotusScene({ className, label }: { className?: string; label?: string }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, near: 0.1, far: 100, position: [0, 0, 16] }}
      aria-label={label}
      role="img"
    >
      <FitCamera />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} />
      <pointLight position={[-6, -2, 4]} intensity={30} color="#1f8ae2" />
      <pointLight position={[6, -2, 4]} intensity={30} color="#f22670" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-6, 0, 3]} scale={[3, 8, 1]} color="#ffd6e6" />
        <Lightformer form="rect" intensity={1.5} position={[6, 0, 3]} scale={[3, 8, 1]} color="#d8ecff" />
        <Lightformer form="ring" intensity={2} position={[0, -4, 4]} scale={4} />
      </Environment>
      <Flower />
      <ContactShadows position={[0, -BOUNDS.centerY - 0.45, 0]} opacity={0.28} scale={11} blur={2.8} far={4} color="#3a0a22" />
    </Canvas>
  );
}
