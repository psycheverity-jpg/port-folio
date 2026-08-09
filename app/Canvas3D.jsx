'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Requires: npm install three
export default function Canvas3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- FLOATING WIREFRAME SHAPES ---
    const shapes = [];
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(3.2, 0),
      new THREE.OctahedronGeometry(2.6, 0),
      new THREE.TorusGeometry(2.2, 0.5, 8, 24),
      new THREE.TetrahedronGeometry(2.8, 0),
    ];

    shapeGeometries.forEach((geo, i) => {
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xffffff : 0x6dffb0,
        transparent: true,
        opacity: 0.22,
      });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 14 - 6
      );
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.15,
        rotSpeedY: (Math.random() - 0.5) * 0.15,
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      };
      scene.add(mesh);
      shapes.push(mesh);
    });

    // --- AMBIENT PARTICLE FIELD ---
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- CONNECTING LINES BETWEEN NEARBY SHAPES (network feel) ---
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(shapes.length * shapes.length * 6);
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // --- MOUSE PARALLAX ---
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- RESIZE ---
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATE ---
    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      shapes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeedX * 0.01;
        mesh.rotation.y += mesh.userData.rotSpeedY * 0.01;
        mesh.position.y = mesh.userData.baseY + Math.sin(t * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.8;
      });

      // rebuild connecting lines between shapes within range
      let idx = 0;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const a = shapes[i].position, b = shapes[j].position;
          const dist = a.distanceTo(b);
          if (dist < 20) {
            linePositions[idx++] = a.x; linePositions[idx++] = a.y; linePositions[idx++] = a.z;
            linePositions[idx++] = b.x; linePositions[idx++] = b.y; linePositions[idx++] = b.z;
          }
        }
      }
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, idx), 3));
      lineGeo.attributes.position.needsUpdate = true;

      particles.rotation.y = t * 0.01;

      // smooth mouse parallax
      targetRotX += (mouseY * 0.15 - targetRotX) * 0.03;
      targetRotY += (mouseX * 0.2 - targetRotY) * 0.03;
      scene.rotation.x = targetRotX;
      scene.rotation.y = targetRotY;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      shapeGeometries.forEach((g) => g.dispose());
      particleGeo.dispose();
      lineGeo.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />;
}
