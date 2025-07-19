import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Optimized Background Image for Slider
const SliderImage = ({ src, isActive }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isActive) {
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.fetchPriority = "high";
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    }
  }, [src, isActive]);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          {/* Enhanced placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='40' height='40' fill='%23e5e7eb'/%3e%3c/svg%3e")`,
              filter: "blur(15px)",
            }}
          />
        </div>
      )}
      {loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s]"
          style={{
            backgroundImage: `url(${src})`,
            transform: "scale(1.1)",
            imageRendering: "auto",
            willChange: "transform",
          }}
        />
      )}
    </>
  );
};

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/QuatCl/_ENH6253.jpg",
    "/images/QuatCl/_ENH6267.jpg",
    "/images/QuatCl/_ENH6332.jpg",
    "/images/QuatCl/AGN_7305.jpg",
    "/images/QuatCl/AGN_7417.jpg",
    "/images/QuatCl/2.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0"
        >
          <SliderImage src={images[currentIndex]} isActive={true} />
          <div className="absolute inset-0 bg-white/90" />
          <div className="absolute inset-0 bg-gray-100/50" />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default BackgroundSlider;
