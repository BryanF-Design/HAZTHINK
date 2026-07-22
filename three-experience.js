import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js";

const canvas = document.getElementById("brandBloom");
const shell = document.getElementById("bloomShell");
const holdButton = document.getElementById("bloomHold");
const status = shell?.querySelector(".bloom-status");
const heroSection = document.getElementById("heroDarkSection");

if (canvas && shell && heroSection) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
  const lerp = (current, target, speed) => current + (target - current) * speed;

  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    shell.classList.add("is-webgl");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0.05, 9.2);

    const bloom = new THREE.Group();
    bloom.rotation.x = -0.08;
    scene.add(bloom);

    const halo = new THREE.Group();
    scene.add(halo);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.25);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xffffff, 52, 30, 1.6);
    keyLight.position.set(3.5, 4.5, 6);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(0x2689ca, 34, 25, 1.8);
    blueLight.position.set(-4, -2, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x9b2bb3, 24, 22, 1.7);
    violetLight.position.set(4, -3, 3);
    scene.add(violetLight);

    const makePetalGeometry = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, -1.12);
      shape.bezierCurveTo(-0.95, -0.55, -0.9, 0.64, 0, 1.46);
      shape.bezierCurveTo(0.9, 0.64, 0.95, -0.55, 0, -1.12);

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.055,
        bevelThickness: 0.055,
        curveSegments: 28,
      });
      geometry.center();
      return geometry;
    };

    const basePetalGeometry = makePetalGeometry();
    const petals = [];

    const petalDefinitions = [
      { color: 0xe7df26, position: [0, 0.72, -0.34], rotation: 0, scale: [0.9, 1.25, 1], direction: [0, 1, -0.1] },
      { color: 0x49b957, position: [-0.82, 0.2, -0.08], rotation: 0.66, scale: [0.92, 1.22, 1], direction: [-0.72, 0.62, 0] },
      { color: 0xff922e, position: [0.82, 0.2, -0.08], rotation: -0.66, scale: [0.92, 1.22, 1], direction: [0.72, 0.62, 0] },
      { color: 0x2689ca, position: [-1.22, -0.7, 0.12], rotation: 1.02, scale: [1.04, 1.42, 1], direction: [-0.92, -0.34, 0.08] },
      { color: 0x9b2bb3, position: [1.22, -0.7, 0.12], rotation: -1.02, scale: [1.04, 1.42, 1], direction: [0.92, -0.34, 0.08] },
      { color: 0x074a9f, position: [-0.45, -0.92, 0.28], rotation: 0.48, scale: [0.76, 1.04, 1], direction: [-0.42, -0.72, 0.16] },
      { color: 0x7e176f, position: [0.45, -0.92, 0.28], rotation: -0.48, scale: [0.76, 1.04, 1], direction: [0.42, -0.72, 0.16] },
    ];

    petalDefinitions.forEach((definition, index) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: definition.color,
        transparent: true,
        opacity: 0.9,
        roughness: 0.22,
        metalness: 0.03,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(basePetalGeometry, material);
      mesh.position.fromArray(definition.position);
      mesh.rotation.z = definition.rotation;
      mesh.scale.set(...definition.scale);
      mesh.renderOrder = index;

      const outlineGeometry = new THREE.EdgesGeometry(basePetalGeometry, 22);
      const outline = new THREE.LineSegments(outlineGeometry, new THREE.LineBasicMaterial({
        color: 0x02070b,
        transparent: true,
        opacity: 0.92,
      }));
      outline.scale.setScalar(1.006);
      mesh.add(outline);

      mesh.userData.basePosition = new THREE.Vector3(...definition.position);
      mesh.userData.baseRotation = definition.rotation;
      mesh.userData.direction = new THREE.Vector3(...definition.direction).normalize();
      mesh.userData.phase = index * 0.73;
      bloom.add(mesh);
      petals.push(mesh);
    });

    const centerShape = new THREE.Shape();
    centerShape.moveTo(0, -1.12);
    centerShape.bezierCurveTo(-0.62, -0.5, -0.58, 0.47, 0, 1.22);
    centerShape.bezierCurveTo(0.58, 0.47, 0.62, -0.5, 0, -1.12);
    const centerGeometry = new THREE.ShapeGeometry(centerShape, 32);
    centerGeometry.center();
    const centerOutline = new THREE.LineSegments(
      new THREE.EdgesGeometry(centerGeometry, 1),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.72 }),
    );
    centerOutline.position.set(0, -0.05, 0.55);
    centerOutline.scale.set(1.12, 1.24, 1);
    bloom.add(centerOutline);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.09,
    });

    [2.55, 3.05].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.008, 6, 160), ringMaterial.clone());
      ring.rotation.x = Math.PI / 2.25;
      ring.rotation.z = index ? -0.24 : 0.18;
      halo.add(ring);
    });

    const particleCount = coarsePointer ? 46 : 82;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const palette = [0x2689ca, 0x49b957, 0xe7df26, 0xff922e, 0x9b2bb3].map((color) => new THREE.Color(color));

    for (let index = 0; index < particleCount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 1.65;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = Math.sin(angle) * radius;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 1.8;

      const color = palette[index % palette.length];
      particleColors[index * 3] = color.r;
      particleColors[index * 3 + 1] = color.g;
      particleColors[index * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
      size: coarsePointer ? 0.045 : 0.035,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    }));
    halo.add(particles);

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let dragRotation = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastDragX = 0;
    let pointerDown = false;
    let dragging = false;
    let holdTimer = 0;
    let holding = false;
    let expansion = 0;
    let burst = 0;
    let scrollProgress = 0;
    let visible = true;
    let animationFrame = 0;

    const setStatus = (message) => {
      if (status) status.textContent = message;
    };

    const setHolding = (active) => {
      holding = active;
      shell.classList.toggle("is-holding", active);
      holdButton?.classList.toggle("is-holding", active);
      holdButton?.setAttribute("aria-pressed", String(active));
      setStatus(active ? "Color abierto" : "Color en movimiento");
      if (active && navigator.vibrate) navigator.vibrate(18);
    };

    const triggerBurst = () => {
      burst = 1;
      setStatus("Impulso de color");
      window.setTimeout(() => {
        if (!holding) setStatus("Color en movimiento");
      }, 650);
    };

    const clearHoldTimer = () => {
      window.clearTimeout(holdTimer);
      holdTimer = 0;
    };

    const normalizedPointer = (event) => {
      const rect = shell.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    shell.addEventListener("pointermove", (event) => {
      const normalized = normalizedPointer(event);
      pointerTarget.set(normalized.x, normalized.y);

      if (!pointerDown) return;
      const distance = Math.hypot(event.clientX - dragStartX, event.clientY - dragStartY);
      if (distance > 8) {
        dragging = true;
        clearHoldTimer();
        if (holding) setHolding(false);
      }
      if (dragging) {
        dragRotation += (event.clientX - lastDragX) * 0.008;
        lastDragX = event.clientX;
      }
    }, { passive: true });

    shell.addEventListener("pointerleave", () => {
      if (!pointerDown) pointerTarget.set(0, 0);
    });

    canvas.addEventListener("pointerdown", (event) => {
      pointerDown = true;
      dragging = false;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      lastDragX = event.clientX;
      canvas.setPointerCapture?.(event.pointerId);
      holdTimer = window.setTimeout(() => setHolding(true), 320);
    });

    const finishCanvasPointer = () => {
      const wasHolding = holding;
      clearHoldTimer();
      pointerDown = false;
      if (holding) setHolding(false);
      if (!dragging && !wasHolding) triggerBurst();
      dragging = false;
    };

    canvas.addEventListener("pointerup", finishCanvasPointer);
    canvas.addEventListener("pointercancel", () => {
      clearHoldTimer();
      pointerDown = false;
      dragging = false;
      setHolding(false);
    });

    if (holdButton) {
      const beginButtonHold = (event) => {
        event.preventDefault();
        holdButton.setPointerCapture?.(event.pointerId);
        setHolding(true);
      };
      const endButtonHold = (event) => {
        event.preventDefault();
        setHolding(false);
      };

      holdButton.addEventListener("pointerdown", beginButtonHold);
      holdButton.addEventListener("pointerup", endButtonHold);
      holdButton.addEventListener("pointercancel", () => setHolding(false));
      holdButton.addEventListener("keydown", (event) => {
        if (event.key !== " " && event.key !== "Enter") return;
        event.preventDefault();
        setHolding(true);
      });
      holdButton.addEventListener("keyup", (event) => {
        if (event.key !== " " && event.key !== "Enter") return;
        event.preventDefault();
        setHolding(false);
        triggerBurst();
      });
    }

    const updateHeroProgress = () => {
      const rect = heroSection.getBoundingClientRect();
      const range = Math.max(heroSection.offsetHeight - window.innerHeight, 1);
      scrollProgress = clamp(-rect.top / range);
    };

    window.addEventListener("scroll", updateHeroProgress, { passive: true });
    updateHeroProgress();

    const resize = () => {
      const width = Math.max(shell.clientWidth, 1);
      const height = Math.max(shell.clientHeight, 1);
      const pixelRatioCap = coarsePointer ? 1.35 : 1.8;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioCap));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const mobileScale = width < 460 ? 0.83 : width < 620 ? 0.92 : 1;
      bloom.scale.setScalar(mobileScale);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(shell);
    resize();

    const startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      pointer.x = lerp(pointer.x, pointerTarget.x, 0.06);
      pointer.y = lerp(pointer.y, pointerTarget.y, 0.06);

      burst = Math.max(0, burst - 0.024);
      const burstCurve = Math.sin(burst * Math.PI);
      const expansionTarget = (holding ? 1 : 0) + burstCurve * 0.65 + scrollProgress * 0.2;
      expansion = lerp(expansion, expansionTarget, holding ? 0.1 : 0.075);

      bloom.rotation.y = lerp(bloom.rotation.y, dragRotation + pointer.x * 0.26 + scrollProgress * 0.85, 0.055);
      bloom.rotation.x = lerp(bloom.rotation.x, -0.08 - pointer.y * 0.16 + Math.sin(elapsed * 0.55) * 0.025, 0.055);
      bloom.rotation.z = lerp(bloom.rotation.z, pointer.x * -0.035 + scrollProgress * -0.08, 0.04);

      petals.forEach((petal, index) => {
        const base = petal.userData.basePosition;
        const direction = petal.userData.direction;
        const float = Math.sin(elapsed * 0.82 + petal.userData.phase) * 0.035;
        const spread = expansion * (0.54 + index * 0.018);
        petal.position.x = base.x + direction.x * spread;
        petal.position.y = base.y + direction.y * spread + float;
        petal.position.z = base.z + direction.z * spread + Math.cos(elapsed * 0.7 + index) * 0.018;
        petal.rotation.z = petal.userData.baseRotation + direction.x * expansion * 0.12;
        petal.rotation.y = Math.sin(elapsed * 0.45 + index) * 0.035 + expansion * direction.x * 0.12;
      });

      centerOutline.rotation.z = Math.sin(elapsed * 0.55) * 0.025;
      centerOutline.scale.x = 1.12 + expansion * 0.1;
      centerOutline.scale.y = 1.24 + expansion * 0.15;
      halo.rotation.z = elapsed * 0.035 + scrollProgress * 0.4;
      halo.rotation.x = Math.sin(elapsed * 0.2) * 0.05;
      particles.material.opacity = 0.58 + expansion * 0.24;
      particles.scale.setScalar(1 + expansion * 0.085);

      renderer.render(scene, camera);
      if (!reducedMotion && visible) animationFrame = requestAnimationFrame(render);
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
      const isVisible = entries[0]?.isIntersecting ?? false;
      if (isVisible === visible) return;
      visible = isVisible;
      if (visible && !reducedMotion) {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    }, { rootMargin: "20% 0px" });
    visibilityObserver.observe(shell);

    render();
  } catch (error) {
    shell.classList.remove("is-webgl");
    setTimeout(() => {
      if (status) status.textContent = "Identidad HAZTHINK";
    }, 0);
    console.warn("La experiencia 3D no pudo iniciar; se muestra el logotipo estático.", error);
  }
}
