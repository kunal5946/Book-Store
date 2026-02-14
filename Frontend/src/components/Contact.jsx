import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LaserFlow from "./LaserFlow";

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hands Animation
  const leftHandX = useTransform(scrollYProgress, [0, 0.4], ["-100%", "-5%"]);
  const rightHandX = useTransform(scrollYProgress, [0, 0.4], ["100%", "5%"]);
  const initialOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Flash/Spark Effect at touch point
  const sparkOpacity = useTransform(scrollYProgress, [0.38, 0.4, 0.45], [0, 1, 0]);
  const sparkScale = useTransform(scrollYProgress, [0.38, 0.45], [0.1, 2]);

  // Form Reveal
  const formOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);

  // Hand Fade out after form appears? Or stay? Let's make them fade slightly or move apart
  const handOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0.2]);

  return (
    <div className="bg-black text-white relative">
      <Navbar />

      {/* Scroll Container - height determines scroll length */}
      <div ref={containerRef} className="h-[250vh] relative">

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">

          {/* Background */}
          <div className="absolute inset-0 z-0">
            <LaserFlow
              flowSpeed={0.2}
              wispDensity={0.8}
              color="#3b82f6" // Blue-ish for robot theme
            />
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          </div>

          {/* Hands Layer */}
          <motion.div style={{ opacity: handOpacity }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {/* Robot Hand (Left) */}
            <motion.div
              style={{ x: leftHandX, opacity: initialOpacity }}
              className="absolute left-0 w-1/2 h-64 flex items-center justify-end pr-4"
            >
              {/* Placeholder for Robot Hand Image */}
              <div className="w-full h-32 bg-gradient-to-r from-gray-900 to-blue-900 rounded-r-full shadow-[0_0_30px_rgb(59,130,246,0.5)] flex items-center justify-center border-r-4 border-blue-500">
                <span className="text-blue-300 font-mono text-xl tracking-widest">ROBOT HAND</span>
              </div>
            </motion.div>

            {/* Human Hand (Right) */}
            <motion.div
              style={{ x: rightHandX, opacity: initialOpacity }}
              className="absolute right-0 w-1/2 h-64 flex items-center justify-start pl-4"
            >
              {/* Placeholder for Human Hand Image */}
              <div className="w-full h-32 bg-gradient-to-l from-orange-900 to-yellow-900 rounded-l-full shadow-[0_0_30px_rgb(249,115,22,0.5)] flex items-center justify-center border-l-4 border-orange-500">
                <span className="text-orange-300 font-serif text-xl tracking-widest">HUMAN HAND</span>
              </div>
            </motion.div>

            {/* Spark/Contact Point */}
            <motion.div
              style={{ opacity: sparkOpacity, scale: sparkScale }}
              className="absolute w-20 h-20 bg-white rounded-full blur-xl z-20"
            />
          </motion.div>

          {/* Content / Form Layer */}
          <motion.div
            style={{ opacity: formOpacity, y: formY }}
            className="relative z-30 w-full max-w-2xl px-6"
          >
            <div
              className="p-8 md:p-12 shadow-2xl backdrop-blur-2xl bg-black/50 border border-white/20 rounded-3xl"
            >
              <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                Make the Connection
              </h2>
              <p className="text-center text-gray-300 mb-8 text-lg">Reach out and let's build something together.</p>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <div>
                  <input type="text" placeholder="Name" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <textarea rows="4" placeholder="Message" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgb(59,130,246,0.4)] hover:scale-[1.02] transition-all relative overflow-hidden group">
                  <span className="relative z-10">Send Transmission</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
