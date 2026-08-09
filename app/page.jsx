"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Canvas3D from "./Canvas3D";

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
      <Canvas3D />
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
