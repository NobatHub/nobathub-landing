import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Calendar, Clock, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const ThreeJsHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId = 0;

    try {
      // Test WebGL support
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl2') || canvasTest.getContext('webgl');
      if (!gl) {
        setHasWebGlError(true);
        return;
      }

      // Detect software rendering
      const isSoftwareGl = (() => {
        try {
          const ext = gl.getExtension('WEBGL_debug_renderer_info');
          const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as any).RENDERER;
          const gpu = String((gl as any).getParameter(param));
          (gl as any).getExtension('WEBGL_lose_context')?.loseContext();
          return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
        } catch {
          return false;
        }
      })();

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xFAFAFC, 0.03);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 5.8);

      renderer = new THREE.WebGLRenderer({
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

      // Calendar Base Box
      const calBaseGeo = new THREE.BoxGeometry(2.2, 1.6, 0.15);
      const calBaseMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.15,
        metalness: 0.1,
      });
      const calBase = new THREE.Mesh(calBaseGeo, calBaseMat);
      calGroup.add(calBase);

      // Calendar Header Strip
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

      // 2. Floating 3D Clock
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

      // Poly Haven Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(5, 6, 5);
      scene.add(keyLight);

      const orangeRimLight = new THREE.PointLight(0xFF6A00, 3, 10);
      orangeRimLight.position.set(-3, -2, 2);
      scene.add(orangeRimLight);

      // Interaction
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

      const handleResize = () => {
        if (!container || !renderer) return;
        width = container.clientWidth;
        height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);

      // Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        mainGroup.rotation.y = elapsed * 0.15 + currentX;
        mainGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + currentY;

        minuteHand.rotation.z = -elapsed * 1.5;
        hourHand.rotation.z = -elapsed * 0.2;

        clockGroup.position.y = 0.8 + Math.cos(elapsed * 1.5) * 0.06;
        calGroup.position.y = 0.2 + Math.sin(elapsed * 0.9) * 0.05;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        if (container && renderer && renderer.domElement) {
          try {
            container.removeChild(renderer.domElement);
          } catch {}
        }
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('ThreeJsHeroCanvas initialization error, falling back:', err);
      setHasWebGlError(true);
    }
  }, []);

  if (hasWebGlError) {
    return (
      <div className="relative w-full h-[360px] sm:h-[440px] flex flex-col items-center justify-center p-6 text-center overflow-hidden rounded-3xl bg-gradient-to-br from-white via-orange-50/40 to-slate-50 border border-slate-200/80 shadow-lg">
        <div className="w-20 h-20 rounded-3xl bg-gradient-orange text-white flex items-center justify-center mb-4 shadow-xl shadow-[#FF6A00]/25">
          <Calendar className="w-10 h-10" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-2">
          پلتفرم هوشمند نوبت‌دهی آنلاین نوبتهاب
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed mb-6">
          لینک اختصاصی رزرو، ارسال پیامک خودکار تایید OTP، تقویم کاری هوشمند و اپلیکیشن PWA
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700">
          <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
            <span>nobathub.ir/book/نام_کسب_و_کار</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>پیامک خدماتی عبور از بلک‌لیست</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[560px] flex items-center justify-center overflow-hidden rounded-3xl glass-panel-light glow-orange-light border border-slate-200/80">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
