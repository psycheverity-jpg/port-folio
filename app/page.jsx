"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---------- data ---------- */
const experience = [
  {
    role: "Store Crew Boy",
    company: "Indomaret",
    desc: "Operasional kasir, display & planogram, penerimaan barang, FIFO/FEFO di Yogyakarta.",
    date: "Feb 2025 – Feb 2026",
    color: "#7C5CFF",
  },
  {
    role: "Admin",
    company: "BMC Motor",
    desc: "Administrasi bengkel, invoice, pencatatan transaksi & data servis kendaraan.",
    date: "Nov 2024 – Jan 2025",
    color: "#FFB13D",
  },
  {
    role: "Operator Produksi",
    company: "Mitra Metal Perkasa",
    desc: "Mesin stamping press, kontrol kualitas sesuai toleransi, kepatuhan SOP produksi.",
    date: "Jan 2023 – Agu 2024",
    color: "#FF3D7F",
  },
  {
    role: "IT Support Internship",
    company: "Restu Computer",
    desc: "Bongkar-pasang hardware, upgrade komponen, instalasi ulang OS & software.",
    date: "Nov 2021 – Feb 2022",
    color: "#3DFFB5",
  },
];

const stats = [
  { n: 4, label: "Industri berbeda dijalani" },
  { n: 3, label: "Tahun pengalaman lapangan" },
  { n: 1, label: "Proyek pribadi dibangun sendiri" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ---------- count-up hook ---------- */
function useCountUp(target, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      setVal(cur);
    }, 35);
    return () => clearInterval(t);
  }, [start, target]);
  return val;
}

function StatCard({ n, label }) {
  const [inView, setInView] = useState(false);
  const val = useCountUp(n, inView);
  return (
    <motion.div
      className="stat-card"
      variants={fadeUp}
      onViewportEnter={() => setInView(true)}
      whileHover={{ y: -3, borderColor: "#3DFFB5" }}
    >
      <div className="stat-num">{val}</div>
      <div className="stat-lbl">{label}</div>
    </motion.div>
  );
}

/* ---------- 3D background (vanilla three.js, client-only) ---------- */
function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, ico, torus, particles, frameId;
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    async function init() {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 9;

      const colors = [0xff3d7f, 0x7c5cff, 0x3dd6ff, 0x3dffb5, 0xffb13d];

      const icoGeo = new THREE.IcosahedronGeometry(2.6, 1);
      const icoMat = new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.45 });
      ico = new THREE.Mesh(icoGeo, icoMat);
      ico.position.set(2.4, 0.6, -2);
      scene.add(ico);

      const torusGeo = new THREE.TorusGeometry(1.6, 0.05, 16, 100);
      const torusMat = new THREE.MeshBasicMaterial({ color: 0x3dd6ff, wireframe: true, transparent: true, opacity: 0.35 });
      torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.set(-3, -1, -3);
      scene.add(torus);

      const particleCount = 340;
      const positions = new Float32Array(particleCount * 3);
      const pColors = new Float32Array(particleCount * 3);
      const c = new THREE.Color();
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
        c.set(colors[Math.floor(Math.random() * colors.length)]);
        pColors[i * 3] = c.r; pColors[i * 3 + 1] = c.g; pColors[i * 3 + 2] = c.b;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.8 });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      const onMouseMove = (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
      };
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);

      function animate() {
        frameId = requestAnimationFrame(animate);
        ico.rotation.x += 0.0018; ico.rotation.y += 0.0026;
        torus.rotation.x -= 0.0012; torus.rotation.y += 0.0016;
        particles.rotation.y += 0.0004;
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;
        camera.position.x = targetX * 1.6;
        camera.position.y = -targetY * 1.2;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frameId);
        renderer.dispose();
      };
    }

    let cleanup;
    init().then((fn) => (cleanup = fn));
    return () => cleanup && cleanup();
  }, []);

  return <canvas ref={canvasRef} id="bgcanvas" />;
}

/* ---------- custom cursor ---------- */
function CustomCursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(min-width:821px)").matches) return;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove);
    function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    }
    loop();
    const onEnter = () => ref.current && ref.current.classList.add("big");
    const onLeave = () => ref.current && ref.current.classList.remove("big");
    const targets = document.querySelectorAll("a,button");
    targets.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);
  return <div className="cursor" ref={ref} id="cursor" />;
}

/* ---------- tilt wrapper ---------- */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <motion.div ref={ref} className={className} variants={fadeUp} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

export default function Page() {
  return (
    <>
      <BackgroundCanvas />
      <div className="vignette" />
      <CustomCursor />

      <header>
        <div className="wrap navrow">
          <div className="counter">( <span className="dot" /> Terbuka Untuk Kerja ) – 2026</div>
          <div className="brand">BAYU ANDIKA</div>
          <nav>
            <ul>
              <li><a href="#work">Pengalaman</a></li>
              <li><a href="#about">Tentang</a></li>
              <li><a href="#project">Proyek</a></li>
            </ul>
          </nav>
          <a className="cta-nav" href="mailto:bayuandk4@gmail.com">Hubungi</a>
        </div>
      </header>

      <div className="wrap">
        <section className="hero" style={{ borderTop: "none" }}>
          <motion.div className="hero-eyebrow" initial="hidden" animate="show" variants={fadeUp}>
            Profil Kerja · Magelang, Indonesia
          </motion.div>
          <motion.h1 className="megatitle" initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}>
            Siap Kerja<br /><span className="grad">Di Mana Saja.</span>
          </motion.h1>
          <motion.p className="hero-sub" initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}>
            Tenaga kerja serbaguna dengan rekam jejak nyata di operasional toko, administrasi,
            produksi manufaktur, dan dukungan teknis IT — disiplin SOP, cepat beradaptasi.
          </motion.p>
          <motion.div className="hero-ctas" initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.3 }}>
            <a className="btn-glow" href="#work">Lihat Pengalaman</a>
            <a className="btn-ghost" href="mailto:bayuandk4@gmail.com">Hubungi Saya</a>
          </motion.div>

          <motion.div
            className="stat-strip"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {stats.map((s) => <StatCard key={s.label} n={s.n} label={s.label} />)}
          </motion.div>
        </section>

        <section id="work">
          <div className="sec-head">
            <h2>Riwayat Kerja</h2>
            <a href="mailto:bayuandk4@gmail.com">Hubungi Saya →</a>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} transition={{ staggerChildren: 0.08 }}>
            {experience.map((job) => (
              <TiltCard className="work-item" key={job.role}>
                <div className="work-thumb" style={{ background: `linear-gradient(150deg, ${job.color}, #07070C)` }} />
                <div>
                  <div className="work-title">{job.role} — {job.company}</div>
                  <div className="work-desc">{job.desc}</div>
                </div>
                <div className="work-tag">{job.date}</div>
              </TiltCard>
            ))}
          </motion.div>
        </section>

        <section id="about">
          <div className="sec-head"><h2>Tentang Saya</h2></div>
          <motion.div className="about-panel" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <p className="about-text">
              <b>Bayu</b> adalah lulusan Rekayasa Perangkat Lunak dari Magelang yang sudah terjun langsung
              ke berbagai bidang kerja — dari lini produksi manufaktur, meja admin bengkel, garda depan
              toko ritel, hingga proyek pribadi di bidang web. Terbiasa bekerja sesuai standar dan
              prosedur yang ketat, disiplin menjaga kerapian kerja, dan cepat beradaptasi di lingkungan
              kerja baru. Terbuka untuk peran operasional, administratif, produksi, maupun teknis.
            </p>
            <a className="about-link" href="mailto:bayuandk4@gmail.com">Hubungi via email →</a>
          </motion.div>
        </section>

        <section id="project">
          <div className="sec-head"><h2>Proyek Pribadi</h2></div>
          <motion.div className="proj-panel" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <div className="proj-grid">
              <a className="proj-mock" href="https://bayz44.github.io/V-Forge/" target="_blank" rel="noopener" aria-label="Coba demo V-Forge">
                <span>▶</span>
              </a>
              <div>
                <div className="proj-kicker">Personal Project · PWA · v8.2.1</div>
                <div className="proj-title">V-Forge</div>
                <div className="proj-sub">Web-Based Video Editor</div>
                <p className="proj-desc">
                  Dibangun dari nol memakai HTML5, CSS3, dan JavaScript murni tanpa framework, dengan
                  Firebase untuk autentikasi &amp; penyimpanan data proyek.
                </p>
                <p className="proj-desc">
                  Import &amp; edit video, ekspor lewat Canvas/Web Audio/MediaRecorder — lengkap fitur
                  premium 4K, 120 FPS, dan Hi-Res Audio.
                </p>
                <div className="proj-tags">
                  {["HTML5", "CSS3", "JavaScript", "Firebase", "PWA", "Service Worker"].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="proj-ctas">
                  <a className="btn-glow" href="https://bayz44.github.io/V-Forge/" target="_blank" rel="noopener">▶ Coba Demo</a>
                  <a className="btn-ghost" href="https://github.com/bayz-dik/V-Forge" target="_blank" rel="noopener">↗ Repository</a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            className="info-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {[
              { ic: "🧰", h: "Pengalaman", p: "Operasional Ritel, Administrasi Bengkel, Produksi Manufaktur, Dukungan IT" },
              { ic: "🏭", h: "Industri", p: "Ritel & Retail, Otomotif, Manufaktur, Teknologi" },
              { ic: "🎓", h: "Pendidikan", p: "SMK, Rekayasa Perangkat Lunak, 2019 – 2022" },
              { ic: "⚡", h: "Kemampuan", p: "Operasional & SOP, Administrasi, Kontrol Kualitas, HTML/CSS/JS + Firebase" },
            ].map((col) => (
              <motion.div className="info-col" key={col.h} variants={fadeUp} whileHover={{ y: -4 }}>
                <div className="ic">{col.ic}</div>
                <h4>{col.h}</h4>
                <p>{col.p.split(", ").join(",\n")}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="cta-row"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p>Terbuka untuk peluang kerja baru — Mari terhubung dan berkolaborasi.</p>
            <a className="cta-arrow" href="mailto:bayuandk4@gmail.com">↗</a>
          </motion.div>
        </section>
      </div>

      <footer>
        <div className="wrap">
          <div className="foot-nav">
            <a href="#work">Pengalaman</a>
            <a href="#about">Tentang</a>
            <a href="#project">Proyek</a>
          </div>
          <div className="foot-row">
            <div className="foot-social">
              <a href="https://linkedin.com/in/bayu-andika2003/" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://github.com/bayz-dik" target="_blank" rel="noopener">GitHub</a>
              <a href="tel:+6287881820662">Telepon</a>
            </div>
            <div className="foot-copy">© 2026 Bayu Andika</div>
          </div>
        </div>
      </footer>
    </>
  );
}
