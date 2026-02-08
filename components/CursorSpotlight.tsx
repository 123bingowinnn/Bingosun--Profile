"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CursorSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Only show on desktop
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full bg-gradient-radial from-foreground/[0.03] to-transparent blur-xl"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </motion.div>
  );
}
