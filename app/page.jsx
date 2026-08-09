'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Canvas3D from '../components/Canvas3D';
import TiltCard3D from '../components/TiltCard3D';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';

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

  // Parallax: background canvas drifts slower than the page as you scroll
  const { scrollYProgress } = useScroll();
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

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
      <Preloader />
      <CustomCursor />

      <motion.div style={{ y: canvasY }} className="fixed inset-0 z-0">
        <Canvas3D />
      </motion.div>

      <div className="relative z-10 px-6 sm:px-12 md:px-24 py-8 max-w-[1600px] mx-auto">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
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
        <motion.section variants={stagger} initial="hidden" animate="visible" transition={{ delayChildren: 1.4 }} className="pb-24 border-b border-kexBorder">
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-between items-end mb-16">
            <h2 className="text-2xl font-medium text-white flex items-center gap-2"><span>✨</span> Pengalaman Bekerja</h2>
            <span className="font-mono text-xs text-kexDim">( 04 Roles )</span>
          </motion.div>

          <div className="space-y-16">
            {/* Indomarco */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 01 ) — Feb 2025 – Feb 2026</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">PT INDOMARCO PRISMATAMA</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Store Crew Boy — Yogyakarta</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Mengelola kerapihan display (facing, penataan kategori, label harga) agar area jual selalu rapi dan menarik.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan kelancaran restock dari gudang ke rak sehingga barang cepat tersedia untuk pelanggan.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Penerimaan barang: bongkar muat, pengecekan jumlah & kondisi, serta penataan stok gudang.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Mengoperasikan kasir sesuai SOP (scan, pembayaran tunai/non-tunai, packing) untuk transaksi cepat dan akurat.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Manajemen kedaluwarsa (FIFO/FEFO), pemisahan barang expired/rusak, dan proses retur.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* BMC Motor */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-12">
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
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Mencatat transaksi harian, mingguan, dan bulanan terkait aktivitas bengkel.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Mitra Metal Perkasa */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-kexBorder/50 pb-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 03 ) — Jan 2023 – Agu 2024</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">PT Mitra Metal Perkasa</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">Operator Produksi — Karawang</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan proses kerja sesuai arahan briefing produksi.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Memastikan proses produksi berjalan sesuai SOP perusahaan.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Menjaga lingkungan kerja selalu rapi, bersih, dan aman (5S/5R).</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Membuat laporan hasil kerja harian dengan akurat.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>

            {/* Restu Computer */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-kexDim block mb-2">( 04 ) — Nov 2021 – Feb 2022</span>
                <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">RESTU COMPUTER</h3>
                <p className="font-mono text-sm text-kexMuted mt-1">IT Support Internship — Magelang</p>
              </div>
              <div className="lg:col-span-8">
                <TiltCard3D className="bg-kexCard border border-kexBorder p-6 sm:p-8 rounded-2xl">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Bongkar pasang laptop dan PC untuk perbaikan komponen.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Upgrade hardware (RAM/Storage) untuk meningkatkan kapasitas & performa.</span></li>
                    <li className="flex gap-3"><span className="text-white font-mono">•</span><span>Instalasi ulang Sistem Operasi (OS) dan software pendukung.</span></li>
                  </ul>
                </TiltCard3D>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
            <span className="font-mono text-xs text-kexDim uppercase block mb-2">// CAPABILITIES & COMPETENCIES</span>
            <h2 className="text-2xl font-medium text-white">Keahlian Utama</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
        </section>

        {/* FOOTER */}
        <footer id="contact" className="pt-24 pb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="font-mono text-xs text-kexDim uppercase block mb-2">// CONTACT DETAILS</span>
            <h2 className="text-3xl sm:text-5xl text-white font-medium mb-12 tracking-tight max-w-2xl">
              Tertarik untuk berdiskusi atau bekerja sama?
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 font-mono text-sm mb-24">
              <a href="mailto:bayuandk4@gmail.com" className="px-6 py-4 bg-kexCard border border-kexBorder rounded-xl text-white hover:border-zinc-500 transition-colors flex items-center gap-3">
                <span>✉</span> bayuandk4@gmail.com
              </a>
              <a href="https://wa.me/6287881820662" target="_blank" rel="noreferrer" className="px-6 py-4 bg-kexCard border border-kexBorder rounded-xl text-white hover:border-zinc-500 transition-colors flex items-center gap-3">
                <span>💬</span> +62 878 8182 0662
              </a>
              <a href="https://linkedin.com/in/bayu-andika2003/" target="_blank" rel="noreferrer" className="px-6 py-4 bg-kexCard border border-kexBorder rounded-xl text-white hover:border-zinc-500 transition-colors flex items-center gap-3">
                <span>🔗</span> LinkedIn Profile
              </a>
            </div>

            <div className="pt-8 border-t border-kexBorder flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-kexDim">
              <div>© 2026 BAYU ANDIKA. Magelang, Indonesia.</div>
              <div className="flex gap-6">
                <a href="#experience" className="hover:text-white transition-colors">Experience</a>
                <a href="#skills" className="hover:text-white transition-colors">Skills</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </div>
            </div>
          </motion.div>
        </footer>

      </div>
    </div>
  );
}
