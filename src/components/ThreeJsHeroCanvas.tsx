import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeJsHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // Detect software rendering
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFAFAFC, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Main 3D Lumora Scene Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. 3D Orange & White Booking Calendar Plate
    const calGroup = new THREE.Group();
    mainGroup.add(calGroup);

    // Calendar Base Box (Crisp White Poly Haven Studio Finish)
    const calBaseGeo = new THREE.BoxGeometry(2.2, 1.6, 0.15);
    const calBaseMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.15,
      metalness: 0.1,
    });
    const calBase = new THREE.Mesh(calBaseGeo, calBaseMat);
    calGroup.add(calBase);

    // Calendar Header Strip (Brand Orange)
    const calHeaderGeo = new THREE.BoxGeometry(2.2, 0.35, 0.17);
    const calHeaderMat = new THREE.MeshStandardMaterial({
      color: 0xFF6A00,
      roughness: 0.2,
      metalness: 0.3,
    });
    const calHeader = new THREE.Mesh(calHeaderGeo, calHeaderMat);
    calHeader.position.set(0, 0.625, 0.01);
    calGroup.add(calHeader);

    // Calendar Grid Nodes
    const nodeCountX = 5;
    const nodeCountY = 3;
    const nodeGeo = new THREE.BoxGeometry(0.3, 0.22, 0.05);
    const nodeGrayMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.3 });
    const nodeOrangeMat = new THREE.MeshStandardMaterial({ color: 0xFF6A00, roughness: 0.1 });
    
    for (let x = 0; x < nodeCountX; x++) {
      for (let y = 0; y < nodeCountY; y++) {
        const isHighlight = (x === 2 && y === 1) || (x === 4 && y === 2);
        const node = new THREE.Mesh(nodeGeo, isHighlight ? nodeOrangeMat : nodeGrayMat);
        node.position.set(
          -0.8 + x * 0.4,
          0.25 - y * 0.38,
          0.09
        );
        calGroup.add(node);
      }
    }

    calGroup.position.set(-0.6, 0.2, 0);
    calGroup.rotation.set(0.15, -0.3, 0.05);

    // 2. Floating 3D Clock with Moving Hands
    const clockGroup = new THREE.Group();
    mainGroup.add(clockGroup);

    const clockRingGeo = new THREE.TorusGeometry(0.7, 0.06, 16, 64);
    const clockRingMat = new THREE.MeshStandardMaterial({
      color: 0xFF6A00,
      metalness: 0.8,
      roughness: 0.1,
    });
    const clockRing = new THREE.Mesh(clockRingGeo, clockRingMat);
    clockGroup.add(clockRing);

    const clockFaceGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.04, 32);
    const clockFaceMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const clockFace = new THREE.Mesh(clockFaceGeo, clockFaceMat);
    clockFace.rotation.x = Math.PI / 2;
    clockGroup.add(clockFace);

    // Clock Hands
    const hourHandGeo = new THREE.BoxGeometry(0.04, 0.35, 0.03);
    const hourHandMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1 });
    const hourHand = new THREE.Mesh(hourHandGeo, hourHandMat);
    hourHand.position.set(0, 0.12, 0.04);
    clockGroup.add(hourHand);

    const minuteHandGeo = new THREE.BoxGeometry(0.03, 0.48, 0.03);
    const minuteHandMat = new THREE.MeshStandardMaterial({ color: 0xFF6A00, roughness: 0.1 });
    const minuteHand = new THREE.Mesh(minuteHandGeo, minuteHandMat);
    minuteHand.position.set(0, 0.18, 0.05);
    clockGroup.add(minuteHand);

    clockGroup.position.set(1.5, 0.8, 0.4);
    clockGroup.rotation.set(0.1, -0.2, -0.1);

    // 3. Floating Light Glassmorphic Appointment Cards
    const cardGroup1 = new THREE.Group();
    mainGroup.add(cardGroup1);

    const cardGeo1 = new THREE.BoxGeometry(1.4, 0.7, 0.05);
    const cardMat1 = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.7,
      opacity: 0.95,
      transparent: true,
      roughness: 0.1,
      metalness: 0.05,
      ior: 1.4,
      thickness: 0.15,
    });
    const cardMesh1 = new THREE.Mesh(cardGeo1, cardMat1);
    cardGroup1.add(cardMesh1);

    const badgeGeo = new THREE.BoxGeometry(0.4, 0.15, 0.06);
    const badgeMat = new THREE.MeshStandardMaterial({ color: 0xFF6A00, roughness: 0.2 });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-0.35, 0.18, 0.02);
    cardGroup1.add(badgeMesh);

    cardGroup1.position.set(1.2, -0.7, 0.6);
    cardGroup1.rotation.set(-0.2, -0.4, 0.15);

    // 4. Floating Spheres
    const sphereCount = 5;
    const sphereGroup = new THREE.Group();
    mainGroup.add(sphereGroup);

    const sphereGeo = new THREE.IcosahedronGeometry(0.25, 2);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xFF6A00,
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85,
    });

    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < sphereCount; i++) {
      const sp = new THREE.Mesh(sphereGeo, sphereMat);
      const angle = (i / sphereCount) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.4;
      sp.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 3) * 0.5),
        Math.sin(angle) * radius * 0.8
      );
      sp.scale.setScalar(0.6 + Math.random() * 0.7);
      sphereGroup.add(sp);
      spheres.push(sp);
    }

    // Poly Haven Studio Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const orangeRimLight = new THREE.PointLight(0xFF6A00, 3, 10);
    orangeRimLight.position.set(-3, -2, 2);
    scene.add(orangeRimLight);

    // Controls
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      mainGroup.rotation.y = elapsed * 0.15 + currentX;
      mainGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + currentY;

      mainGroup.position.y = -Math.min(scrollY * 0.0008, 0.5);

      minuteHand.rotation.z = -elapsed * 1.5;
      hourHand.rotation.z = -elapsed * 0.2;

      cardGroup1.position.y = -0.7 + Math.sin(elapsed * 1.2) * 0.08;
      clockGroup.position.y = 0.8 + Math.cos(elapsed * 1.5) * 0.06;
      calGroup.position.y = 0.2 + Math.sin(elapsed * 0.9) * 0.05;

      spheres.forEach((sp, idx) => {
        sp.rotation.x += 0.01;
        sp.rotation.y += 0.015;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      calBaseGeo.dispose();
      calBaseMat.dispose();
      calHeaderGeo.dispose();
      calHeaderMat.dispose();
      nodeGeo.dispose();
      nodeGrayMat.dispose();
      nodeOrangeMat.dispose();
      clockRingGeo.dispose();
      clockRingMat.dispose();
      clockFaceGeo.dispose();
      clockFaceMat.dispose();
      hourHandGeo.dispose();
      hourHandMat.dispose();
      minuteHandGeo.dispose();
      minuteHandMat.dispose();
      cardGeo1.dispose();
      cardMat1.dispose();
      badgeGeo.dispose();
      badgeMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[560px] flex items-center justify-center overflow-hidden rounded-3xl glass-panel-light glow-orange-light border border-slate-200/80"
    >
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
