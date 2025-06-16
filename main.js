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

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 overflow-hidden">
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
        <div className="relative w-[250px] h-[320px] flex-shrink-0">
          {images.map((img, i) => {
            const isCurrent = i === index;
            const offset = ((i - index + images.length) % images.length);
            const zIndex = images.length - offset;
            return (
              <motion.img
                key={i}
                src={img}
                className="absolute w-full h-full object-cover rounded-xl shadow-xl touch-none select-none"
                style={{
                  zIndex,
                  transform: `translateX(${offset * 15}px) rotate(${offset * 2}deg) scale(${1 - offset * 0.05})`,
                  opacity: offset > 2 ? 0 : 1,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 50) prev();
                  else if (info.offset.x < -50) next();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
