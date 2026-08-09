'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// --- BACKGROUND CANVAS 3D ---
function Canvas3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numPoints = 40;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const fov = 300;
      const cx = width / 2;
      const cy = height / 2;

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > width / 1.5) p.vx *= -1;
        if (Math.abs(p.y) > height / 1.5) p.vy *= -1;
        if (Math.abs(p.z) > 300) p.vz *= -1;

        const scale = fov / (fov + p.z + 300);
        const projX = p.x * scale + cx;
        const projY = p.y * scale + cy;

        ctx.beginPath();
        ctx.arc(projX, projY, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * scale})`;
        ctx.fill();
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 160) {
            const s1 = fov / (fov + points[i].z + 300);
            const s2 = fov / (fov + points[j].z + 300);
            ctx.beginPath();
            ctx.moveTo(points[i].x * s1 + cx, points[i].y * s1 + cy);
            ctx.lineTo(points[j].x * s2 + cx, points[j].y * s2 + cy);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
}

// --- 3D TILT CARD EFFECT ---
function TiltCard3D({ children, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [8, -8]);
  const rotateY = useTransform(x, [-80, 80], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      <div style={{ transform: 'translateZ(15px)' }}>{children}</div>
    </motion.div>
  );
}

// --- MAIN PORTFOLIO PAGE ---
export default function Portfolio() {
  const [time, setTime] = useState('Loading clock...');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`▩ ${now.toDateString()} ${now.toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f4f4f5] font-sans selection:bg-white selection:text-black overflow-hidden">
      <Canvas3D />

      <div className="relative z-10 px-6 sm:px-12 md:px-24 py-8 max-w-[1600px] mx-auto">
        
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 mb-20 font-mono text-xs tracking-tight text-kexMuted"
        >
          <div className="text-white uppercase tracking-widest font-medium">
            BAYU ANDIKA <span className="text-kexDim normal-case tracking-normal">( IT & Operations )</span>
          </div>
          <nav className="flex gap-8 mt-4 md:mt-0">
            <a href="#experience" className="hover:text-white transition-colors">Experience ( 01 )</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills ( 02 )</a>
            <a href="#about" className="hover:text-white transition-colors">About ( 03 )</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact ( 04 )</a>
          </nav>
        </motion.header>

        {/* HERO SECTION */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="pb-24 border-b border-kexBorder">
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl md:text-[5rem] font-medium leading-[1.08] tracking-tight text-white mb-12">
            Managing <span className="text-kexDim italic font-light">( retail ops )</span>,{' '}
            <span className="text-kexDim italic font-light">( hardware )</span>, <br className="hidden md:block" />
            <span className="text-kexDim italic font-light">( administration )</span> &{' '}
            <span className="text-kexDim italic font-light">( production SOP )</span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 font-mono text-[11px] text-kexMuted">
            <div className="border border-kexBorder px-4 py-2 rounded-full bg-kexCard text-white">{time}</div>
            <div className="border border-kexBorder px-4 py-2 rounded-full">Magelang, Jawa Tengah</div>
            <div className="border border-kexBorder px-4 py-2 rounded-full text-white flex items-center gap-2 bg-kexCard">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Software Engineering Alumnus
            </div>
          </motion.div>
        </motion.section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="py-24 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="flex justify-between items-end mb-16">
            <h2 className="text-2xl font-medium text-white flex items-center gap-2"><span>✨</span> Pengalaman Bekerja</h2>
            <span className="font-mono text-xs text-kexDim">( 04 Roles )</span>
          </motion.div>

          <div className="space-y-20">
            {/* Indomarco */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-16">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 01 ) — Feb 2025 – Feb 2026</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">PT INDOMARCO PRISMATAMA</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Store Crew Boy — Yogyakarta</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Mengelola kerapihan display (facing, penataan kategori, dan label harga) agar area jual selalu rapi dan menarik.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan kelancaran restock dari gudang ke rak sehingga barang cepat tersedia untuk pelanggan.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Menangani penerimaan barang: bongkar muat, pengecekan jumlah & kondisi, serta penataan stok gudang agar mudah dicari.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Mengoperasikan kasir sesuai SOP (scan, pembayaran tunai/non-tunai, packing) untuk transaksi cepat dan akurat.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan manajemen kedaluwarsa (FIFO/FEFO), memisahkan barang expired/rusak, dan membantu proses retur bila diperlukan.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* BMC Motor */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-16">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 02 ) — Nov 2024 – Jan 2025</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">BMC Motor</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Admin — Yogyakarta</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan dokumen administrasi lengkap dan terorganisir.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memberikan informasi mengenai harga, durasi servis, dan ketersediaan sparepart kepada pelanggan.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Membuat dan mengarsipkan invoice faktur penjualan & servis.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Mencatat transaksi harian, mingguan, dan bulanan terkait seluruh aktivitas operasional bengkel.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Mitra Metal Perkasa */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-16">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 03 ) — Jan 2023 – Agu 2024</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">PT Mitra Metal Perkasa</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Operator Produksi — Karawang</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan proses kerja yang dilakukan sudah sesuai dengan arahan saat briefing produksi.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan seluruh proses produksi berjalan sesuai SOP ketat yang berlaku di perusahaan.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Menjaga lingkungan kerja selalu rapi, bersih, dan aman (5S/5R).</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan dan membuat laporan hasil kerja harian dengan akurat.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Restu Computer */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 04 ) — Nov 2021 – Feb 2022</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">RESTU COMPUTER</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">IT Support Internship — Magelang</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Membongkar laptop dan PC serta memasang kembali komponen secara presisi setelah perbaikan.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Melakukan upgrade hardware untuk meningkatkan kapasitas dan performa laptop maupun PC.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Melakukan instalasi ulang Sistem Operasi (OS) dan software pendukung sesuai kebutuhan pengguna.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="mb-16">
            <span className="font-mono text-xs text-kexDim uppercase block mb-2">// CAPABILITIES & COMPETENCIES</span>
            <h2 className="text-2xl font-medium text-white">Keahlian Utama</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl">
              <span className="text-kexDim block mb-2">01 / RETAIL & POS</span>
              <h4 className="text-white text-sm font-medium mb-2">Operasional Kasir & POS</h4>
              <p className="text-kexMuted leading-relaxed">Scan barcode, input item, void/retur sesuai prosedur, tutup kasir, dan setoran harian.</p>
            </TiltCard3D>
            <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl">
              <span className="text-kexDim block mb-2">02 / INVENTORY</span>
              <h4 className="text-white text-sm font-medium mb-2">Receiving & Planogram</h4>
              <p className="text-kexMuted leading-relaxed">Penerimaan delivery, cek kondisi/expired (FIFO/FEFO), facing rak, dan penataan label harga.</p>
            </TiltCard3D>
            <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl">
              <span className="text-kexDim block mb-2">03 / IT SUPPORT</span>
              <h4 className="text-white text-sm font-medium mb-2">Hardware & OS Support</h4>
              <p className="text-kexMuted leading-relaxed">Perakitan/pembongkaran PC & Laptop, upgrade RAM/Storage, dan instalasi ulang OS & software.</p>
            </TiltCard3D>
            <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl">
              <span className="text-kexDim block mb-2">04 / ADMINISTRATION</span>
              <h4 className="text-white text-sm font-medium mb-2">Data & Service Admin</h4>
              <p className="text-kexMuted leading-relaxed">Input order, pengarsipan faktur/invoice, riwayat kendaraan, dan pembuatan laporan berkala.</p>
            </TiltCard3D>
            <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl">
              <span className="text-kexDim block mb-2">05 / PRODUCTION</span>
              <h4 className="text-white text-sm font-medium mb-2">Mesin Stamping Press</h4>
              <p className="text-kexMuted leading-relaxed">Pengoperasian mesin stamping press (manual & otomatis) serta kontrol kualitas produk NG.</p>
            </TiltCard3D>
            <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl">
              <span className="text-kexDim block mb-2">06 / SOFTWARE</span>
              <h4 className="text-white text-sm font-medium mb-2">Office & Software</h4>
              <p className="text-kexMuted leading-relaxed">Microsoft Word dasar untuk pembuatan dokumen laporan & kolaborasi teknis.</p>
            </TiltCard3D>
          </motion.div>
        </section>

        {/* EDUCATION & ABOUT */}
        <section id="about" className="py-24 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-kexDim uppercase block mb-2">// EDUCATION</span>
              <h2 className="text-2xl text-white font-medium mb-4">Pendidikan Formal</h2>
              <TiltCard3D className="p-6 bg-kexCard border border-kexBorder rounded-xl font-mono text-xs">
                <span className="text-kexDim block mb-1">Jul 2019 – Jun 2022</span>
                <h3 className="text-white text-sm font-medium">SMK MUHAMMADIYAH 1 MUNTILAN</h3>
                <p className="text-kexMuted mt-2">Jurusan: Rekayasa Perangkat Lunak (RPL)</p>
                <p className="text-kexDim mt-1">Magelang, Jawa Tengah</p>
              </TiltCard3D>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-kexDim uppercase block mb-2">// SUMMARY</span>
                <h2 className="text-2xl text-white font-medium mb-4">Ringkasan Profil</h2>
                <p className="text-kexMuted font-light leading-relaxed text-base">
                  Lulusan Rekayasa Perangkat Lunak dengan pengalaman kerja yang luas di bidang operasional ritel, administrasi data, produksi industri, serta IT support teknis. Memiliki disiplin tinggi terhadap SOP perusahaan, akurasi transaksi kasir/POS, serta keterampilan hardware dan software komputer.
                </p>
              </div>
            </div>
          </motion.div>
       
