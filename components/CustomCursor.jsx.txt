'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const springX = useSpring(cx, { damping: 25, stiffness: 300 });
  const springY = useSpring(cy, { damping: 25, stiffness: 300 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      cx.set(e.clientX - 8);
      cy.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', move);

    // Re-scan interactive elements whenever the DOM settles (simple + reliable for this page size)
    const attach = () => {
      const interactive = document.querySelectorAll('a, button');
      interactive.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, [cx, cy]);

  return (
    <motion.div
      style={{ translateX: springX, translateY: springY }}
      animate={{ scale: hovering ? 2.5 : 1 }}
      transition={{ scale: { duration: 0.2 } }}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[200] hidden md:block"
    />
  );
}
