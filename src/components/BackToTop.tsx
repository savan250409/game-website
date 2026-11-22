"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Floating button that appears once you scroll down, and jumps back to the top. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed right-4 bottom-4 z-[60] grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lift sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-coral/40 to-transparent" />
          <ArrowUp className="relative" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
