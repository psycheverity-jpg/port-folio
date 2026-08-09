'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// --- KOMPONEN BACKGROUND CANVAS 3D ---
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

    // Titik geometri 3D
    const numPoints = 45;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
      });
    }

    let angleX = 0.001;
    let angleY = 0.001;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const fov = 300;
      const cx = width / 2;
      const cy = height / 2;

      // Rotasi matematika 3D
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > width / 1.5) p.vx *= -1;
        if (Math.abs(p.y) > height / 1.5) p.vy *= -1;
        if (Math.abs(p.z) > 400) p.vz *= -1;

        // Rotasi Y
        let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);

        // Rotasi X
        let y1 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);

        p.x = x1;
        p.y = y1;
        p.z = z2;

        const scale = fov / (fov + p.z + 400);
        const projX = p.x * scale + cx;
        const projY = p.y * scale + cy;

        ctx.beginPath();
        ctx.arc(projX, projY, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * scale})`;
        ctx.fill();
      });

      // Hubungkan garis antartitik jika berdekatan
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 180) {
            const scale1 = fov / (fov + p1.z + 400);
            const scale2 = fov / (fov + p2.z + 400);
            const x1 = p1.x * scale1 + cx;
            const y1 = p1.y * scale1 + cy;
            const x2 = p2.x * scale2 + cx;
            const y2 = p2.y * scale2 + cy;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 180)})`;
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}

// --- KOMPONEN KARTU DENGAN EFEK TILT PERSPEKTIF 3D ---
function TiltCard3D({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}

// --- HALAMAN UTAMA PORTOFOLIO ---
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
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f4f4f5] font-sans selection:bg-white selection:text-black overflow-hidden">
      
      {/* Background 3D Canvas */}
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
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="pb-24 border-b border-kexBorder"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl md:text-[5rem] font-medium leading-[1.08] tracking-tight text-white mb-12"
          >
            Managing <span className="text-kexDim italic font-light">( retail ops )</span>,{' '}
            <span className="text-kexDim italic font-light">( hardware )</span>, <br className="hidden md:block" />
            <span className="text-kexDim italic font-light">( administration )</span> &{' '}
            <span className="text-kexDim italic font-light">( production SOP )</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-3 font-mono text-[11px] text-kexMuted"
          >
            <div className="border border-kexBorder px-4 py-2 rounded-full bg-kexCard text-white">
              {time}
            </div>
            <div className="border border-kexBorder px-4 py-2 rounded-full">
              Magelang, Jawa Tengah
            </div>
            <div className="border border-kexBorder px-4 py-2 rounded-full text-white flex items-center gap-2 bg-kexCard">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Software Engineering Background
            </div>
          </motion.div>
        </motion.section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="py-24 border-b border-kexBorder">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="flex justify-between items-end mb-16"
          >
            <h2 className="text-2xl font-medium text-white flex items-center gap-2">
              <span>✨</span> Pengalaman Bekerja
            </h2>
            <span className="font-mono text-xs text-kexDim">( 04 Roles )</span>
          </motion.div>

          <div className="space-y-24">
            
            {/* Experience 1: Indomarco */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-16"
            >
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 01 ) — Feb 2025 – Feb 2026</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">
                  PT INDOMARCO PRISMATAMA
                </h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Store Crew Boy — Yogyakarta</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl shadow-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Mengelola kerapihan display (facing, penataan kategori, dan label harga) agar area jual selalu rapi dan menarik.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memastikan kelancaran restock dari gudang ke rak sehingga barang cepat tersedia untuk pelanggan.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Menangani penerimaan barang: bongkar muat, pengecekan jumlah & kondisi, serta penataan stok gudang agar mudah dicari.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Mengoperasikan kasir sesuai SOP (scan, pembayaran tunai/non-tunai, packing) untuk transaksi cepat dan akurat.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memastikan manajemen kedaluwarsa (FIFO/FEFO), memisahkan barang expired/rusak, dan membantu proses retur bila diperlukan.</span>
                    </li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Experience 2: BMC Motor */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-16"
            >
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 02 ) — Nov 2024 – Jan 2025</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">
                  BMC Motor
                </h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Admin — Yogyakarta</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl shadow-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memastikan dokumen administrasi lengkap dan terorganisir.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memberikan informasi mengenai harga, durasi servis, dan ketersediaan sparepart kepada pelanggan.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Membuat dan mengarsipkan invoice faktur penjualan & servis.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Mencatat transaksi harian, mingguan, dan bulanan terkait seluruh aktivitas operasional bengkel.</span>
                    </li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Experience 3: Mitra Metal Perkasa */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-16"
            >
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 03 ) — Jan 2023 – Agu 2024</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">
                  PT Mitra Metal Perkasa
                </h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Operator Produksi — Karawang</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl shadow-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memastikan proses kerja yang dilakukan sudah sesuai dengan arahan saat briefing produksi.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memastikan seluruh proses produksi berjalan sesuai SOP ketat yang berlaku di perusahaan.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Menjaga lingkungan kerja selalu rapi, bersih, dan aman (5S/5R).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Memastikan dan membuat laporan hasil kerja harian dengan akurat.</span>
                    </li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Experience 4: Restu Computer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 04 ) — Nov 2021 – Feb 2022</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">
                  RESTU COMPUTER
                </h3>
                <p className="font-mono text-sm text-kexMuted mt-1">IT Support Internship — Magelang</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl shadow-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Membongkar laptop dan PC serta memasang kembali komponen secara presisi setelah perbaikan.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Melakukan upgrade hardware untuk meningkatkan kapasitas dan performa laptop maupun PC.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-white font-mono">•</span>
                      <span>Melakukan instalasi ulang Sistem Operasi (OS) dan software pendukung sesuai kebutuhan pengguna.</span>
                    </li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 border-b border-kexBorder">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="mb-16"
          >
            <span className="font-mono text-xs text-kexDim uppercase block mb-2">// CAPABILITIES & COMPETENCIES</span>
            <h2 className="text-2xl font-medium text-white">Keahlian Utama</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs"
          >
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
          
