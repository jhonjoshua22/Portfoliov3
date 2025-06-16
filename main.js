import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const images = [
    "/images/IMG_0676.jpeg",
    "/images/IMG_1273.jpeg",
    "/images/IMG_2953.jpeg",
    "/images/IMG_9366.jpeg",
    "/images/IMG_9615.jpeg",
  ];

  const [index, setIndex] = useState(0);

  const next = (direction) => {
    setIndex((prev) => (prev + direction + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
        {/* Intro Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Hi, I'm Jhon Joshua Abutan
          </h1>
          <p className="text-gray-700 max-w-md">
            Frontend developer. I love designing websites and turning them into code. Slightly addicted to coffee ☕ and not a fan of CSS 😅
          </p>
        </div>

        {/* Photo Stack Carousel */}
        <div className="relative w-[220px] h-[300px] flex-shrink-0">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              className="absolute w-full h-full object-cover rounded-xl shadow-xl cursor-grab"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                const offset = info.offset.x;
                if (offset > 80) next(1);
                else if (offset < -80) next(-1);
              }}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: index > 0 ? -300 : 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
