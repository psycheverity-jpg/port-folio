'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Canvas3D from '../components/Canvas3D';
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

  const skills = [
    { tag: '01 / RETAIL & POS', title: 'Operasional Kasir & POS', desc: 'Scan barcode, input item, void/retur sesuai prosedur, tutup kasir, dan setoran harian.' },
    { tag: '02 / INVENTORY', title: 'Receiving & Planogram', desc: 'Penerimaan delivery, cek kondisi/expired (FIFO/FEFO), facing rak, dan penataan label harga.' },
    { tag: '03 / IT SUPPORT', title: 'Hardware & OS Support', desc: 'Perakitan/pembongkaran PC & Laptop, upgrade RAM/Storage, dan instalasi ulang OS & software.' },
    { tag: '04 / ADMINISTRATION', title: 'Data & Service Admin', desc: 'Input order, pengarsipan faktur/invoice, riwayat kendaraan, dan pembuatan laporan berkala.' },
    { tag: '05 / PRODUCTION', title: 'Mesin Stamping Press', desc: 'Pengoperasian mesin stamping press (manual & otomatis) serta kontrol kualitas produk NG.' },
    { tag: '06 / SOFTWARE', title: 'Office & Software', desc: 'Microsoft Word dasar untuk pembuatan dokumen laporan & kolaborasi teknis.' },
  ];

  const jobs = [
    {
      idx: '( 01 ) — Feb 2025 – Feb 2026',
      company: 'PT INDOMARCO PRISMATAMA',
      role: 'Store Crew Boy — Yogyakarta',
      items: [
        'Mengelola kerapihan display (facing, penataan kategori, label harga) agar area jual selalu rapi dan menarik.',
        'Memastikan kelancaran restock dari gudang ke rak sehingga barang cepat tersedia untuk pelanggan.',
        'Penerimaan barang: bongkar muat, pengecekan jumlah & kondisi, serta penataan stok gudang.',
        'Mengoperasikan kasir sesuai SOP (scan, pembayaran tunai/non-tunai, packing) untuk transaksi cepat dan akurat.',
        'Manajemen kedaluwarsa (FIFO/FEFO), pemisahan barang expired/rusak, dan proses retur.',
      ],
    },
    {
      idx: '( 02 ) — Nov 2024 – Jan 2025',
      company: 'BMC Motor',
      role: 'Admin — Yogyakarta',
      items: [
        'Memastikan dokumen administrasi lengkap dan terorganisir.',
        'Memberikan informasi mengenai harga, durasi servis, dan ketersediaan sparepart kepada pelanggan.',
        'Membuat dan mengarsipkan invoice faktur penjualan & servis.',
        'Mencatat transaksi harian, mingguan, dan bulanan terkait aktivitas bengkel.',
      ],
    },
    {
      idx: '( 03 ) — Jan 2023 – Agu 2024',
      company: 'PT Mitra Metal Perkasa',
      role: 'Operator Produksi — Karawang',
      items: [
        'Memastikan proses kerja sesuai arahan briefing produksi.',
        'Memastikan proses produksi berjalan sesuai SOP perusahaan.',
        'Menjaga lingkungan kerja selalu rapi, bersih, dan aman (5S/5R).',
        'Membuat laporan hasil kerja harian dengan akurat.',
      ],
    },
    {
      idx: '( 04 ) — Nov 2021 – Feb 2022',
      company: 'RESTU COMPUTER',
      role: 'IT Support Internship — Magelang',
      items: [
        'Bongkar pasang laptop dan PC untuk perbaikan komponen.',
        'Upgrade hardware (RAM/Storage) untuk meningkatkan kapasitas & performa.',
        'Instalasi ulang Sistem Operasi (OS) dan software pendukung.',
      ],
    },
  ];

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
          className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 mb-24 font-mono text-xs tracking-tight text-kexMuted"
        >
          <div className="text-white uppercase tracking-widest font-medium">
            BAYU ANDIKA <span className="text-kexDim normal-case tracking-normal">( IT & Operations )</span>
          </div>
          <nav className="flex gap-8 mt-4 md:mt-0">
            {[
              ['#experience', 'Experience ( 01 )'],
              ['#skills', 'Skills ( 02 )'],
              ['#about', 'About ( 03 )'],
              ['#contact', 'Contact ( 04 )'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="relative group">
                <span className="group-hover:text-white transition-colors">{label}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </motion.header>

        {/* HERO SECTION */}
        <motion.section variants={stagger} initial="hidden" animate="visible" transition={{ delayChildren: 1.4 }} className="pb-32 border-b border-kexBorder">
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl md:text-[6.5rem] font-medium leading-[1.02] tracking-tighter text-white mb-14">
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

        {/* WORK EXPERIENCE — flat, no cards */}
        <section id="experience" className="py-32 sm:py-40 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-between items-end mb-24">
            <h2 className="text-3xl font-medium text-white flex items-center gap-2"><span>✨</span> Pengalaman Bekerja</h2>
            <span className="font-mono text-xs text-kexDim">( 04 Roles )</span>
          </motion.div>

          <div>
            {jobs.map((job, i) => (
              <motion.div
                key={job.company}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-14 ${i !== 0 ? 'border-t border-kexBorder' : ''}`}
              >
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-kexDim block mb-2">{job.idx}</span>
                  <h3 className="text-2xl text-white font-medium group-hover:text-kexMuted transition-colors">{job.company}</h3>
                  <p className="font-mono text-sm text-kexMuted mt-1">{job.role}</p>
                </div>
                <div className="lg:col-span-8">
                  <ul className="space-y-3 text-sm text-kexMuted font-light leading-relaxed">
                    {job.items.map((it) => (
                      <li key={it} className="flex gap-3"><span className="text-white font-mono">•</span><span>{it}</span></li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS — flat list, single column, no cards */}
        <section id="skills" className="py-32 sm:py-40 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24">
            <span className="font-mono text-xs text-kexDim uppercase block mb-2">// CAPABILITIES & COMPETENCIES</span>
            <h2 className="text-3xl font-medium text-white">Keahlian Utama</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl">
            {skills.map((s, i) => (
              <motion.div
                key={s.tag}
                variants={fadeInUp}
                className={`py-8 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-8 font-mono text-xs ${i !== 0 ? 'border-t border-kexBorder' : ''}`}
              >
                <span className="text-kexDim">{s.tag}</span>
                <div>
                  <h4 className="text-white text-base font-medium mb-2 font-sans">{s.title}</h4>
                  <p className="text-kexMuted leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* EDUCATION & ABOUT — flat */}
        <section id="about" className="py-32 sm:py-40 border-b border-kexBorder">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-kexDim uppercase block mb-2">// EDUCATION</span>
              <h2 className="text-3xl text-white font-medium mb-8">Pendidikan Formal</h2>
              <div className="border-t border-kexBorder pt-6 font-mono text-xs">
                <span className="text-kexDim block mb-1">Jul 2019 – Jun 2022</span>
                <h3 className="text-white text-sm font-medium">SMK MUHAMMADIYAH 1 MUNTILAN</h3>
                <p className="text-kexMuted mt-2">Jurusan: Rekayasa Perangkat Lunak (RPL)</p>
                <p className="text-kexDim mt-1">Magelang, Jawa Tengah</p>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-kexDim uppercase block mb-2">// SUMMARY</span>
                <h2 className="text-3xl text-white font-medium mb-8">Ringkasan Profil</h2>
                <p className="text-kexMuted font-light leading-relaxed text-lg">
                  Lulusan Rekayasa Perangkat Lunak dengan pengalaman kerja yang luas di bidang operasional ritel, administrasi data, produksi industri, serta IT support teknis. Memiliki disiplin tinggi terhadap SOP perusahaan, akurasi transaksi kasir/POS, serta keterampilan hardware dan software komputer.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="pt-32 sm:pt-40 pb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="font-mono text-xs text-kexDim uppercase block mb-2">// CONTACT DETAILS</span>
            <h2 className="text-4xl sm:text-6xl text-white font-medium mb-14 tracking-tight max-w-2xl">
              Tertarik untuk berdiskusi atau bekerja sama?
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 font-mono text-sm mb-28">
              <a href="mailto:bayuandk4@gmail.com" className="px-6 py-4 border border-kexBorder rounded-full text-white hover:border-white transition-colors flex items-center gap-3 w-fit">
                <span>✉</span> bayuandk4@gmail.com
              </a>
              <a href="https://wa.me/6287881820662" target="_blank" rel="noreferrer" className="px-6 py-4 border border-kexBorder rounded-full text-white hover:border-white transition-colors flex items-center gap-3 w-fit">
                <span>💬</span> +62 878 8182 0662
              </a>
              <a href="https://linkedin.com/in/bayu-andika2003/" target="_blank" rel="noreferrer" className="px-6 py-4 border border-kexBorder rounded-full text-white hover:border-white transition-colors flex items-center gap-3 w-fit">
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
