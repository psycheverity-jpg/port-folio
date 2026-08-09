'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="px-6 sm:px-12 md:px-24 py-8 max-w-[1600px] mx-auto font-sans">
      
      {/* HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 mb-20 font-mono text-xs tracking-tight text-kexMuted"
      >
        <div className="text-white uppercase tracking-widest">
          Bayu Andika <span className="text-kexDim normal-case tracking-normal">( IT / OPR )</span>
        </div>
        <nav className="flex gap-8 mt-4 md:mt-0">
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
      </motion.header>

      {/* HERO SECTION */}
      <motion.section variants={stagger} initial="hidden" animate="visible" className="pb-32 border-b border-kexBorder">
        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl md:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-white mb-12">
          Maintaining <span className="text-kexDim italic font-light">( hardware )</span>, 
          <span className="text-kexDim italic font-light">( systems )</span>, <br className="hidden md:block" />
          <span className="text-kexDim italic font-light">( structure )</span> and 
          <span className="text-kexDim italic font-light">( operations )</span>
        </motion.h1>

        <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 font-mono text-[11px] text-kexMuted">
          <div className="border border-kexBorder px-4 py-2 rounded-full bg-kexCard">
            {time}
          </div>
          <div className="border border-kexBorder px-4 py-2 rounded-full">
            7.4797° S, 110.2177° E (Magelang)
          </div>
          <div className="border border-kexBorder px-4 py-2 rounded-full text-white flex items-center gap-2 bg-kexCard">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Software Engineering Alumnus
          </div>
        </motion.div>
      </motion.section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-32 border-b border-kexBorder">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="text-2xl font-medium text-white mb-20"
        >
          ✨ Featured Experience
        </motion.h2>

        {/* Item 1 */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="group mb-32"
        >
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-3xl text-white font-medium mb-2 group-hover:text-kexMuted transition-colors duration-500">Retail Operations & POS System</h3>
              <p className="font-mono text-xs text-kexMuted">PT INDOMARCO PRISMATAMA</p>
            </div>
            <span className="font-mono text-sm text-kexDim">( 01 )</span>
          </div>
          
          <div className="overflow-hidden w-full aspect-[4/3] md:aspect-[21/9] bg-kexCard border border-kexBorder rounded-2xl relative">
            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 1.2 }} className="w-full h-full flex items-center justify-center font-mono text-xs text-kexDim">
               {/* Ganti div ini dengan <img> nanti */}
              [ IMAGE PREVIEW ]
            </motion.div>
          </div>
        </motion.div>

        {/* Item 2 */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="group mb-10"
        >
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-3xl text-white font-medium mb-2 group-hover:text-kexMuted transition-colors duration-500">IT Support & Hardware</h3>
              <p className="font-mono text-xs text-kexMuted">RESTU COMPUTER</p>
            </div>
            <span className="font-mono text-sm text-kexDim">( 02 )</span>
          </div>
          
          <div className="overflow-hidden w-full aspect-[4/3] md:aspect-[21/9] bg-kexCard border border-kexBorder rounded-2xl relative">
            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 1.2 }} className="w-full h-full flex items-center justify-center font-mono text-xs text-kexDim">
              [ IMAGE PREVIEW ]
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

