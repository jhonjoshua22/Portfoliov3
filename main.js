const { useState } = React;
const { motion, AnimatePresence } = window['framer-motion'];

function App() {
  const images = [
    "/images/IMG_0676.jpeg",
    "/images/IMG_1273.jpeg",
    "/images/IMG_2953.jpeg",
    "/images/IMG_9366.jpeg",
    "/images/IMG_9615.jpeg"
  ];
  const [index, setIndex] = useState(0);

  const next = (direction) => {
    setIndex((idx) => (idx + (direction > 0 ? 1 : -1) + images.length) % images.length);
  };

  return (
    React.createElement("div", { className: "min-h-screen flex items-center justify-center px-4" },
      React.createElement("div", { className: "flex items-center gap-8 max-w-4xl w-full" },
        // Text
        React.createElement("div", { className: "flex-1 text-center lg:text-left" },
          React.createElement("h1", { className: "text-3xl font-bold text-purple-600 mb-4" }, "Hi, I'm Jhon Joshua Abutan"),
          React.createElement("p", { className: "text-gray-700 max-w-sm" }, "Frontend developer. I love designing websites and turning them into code. Slightly addicted to coffee ☕ and not a fan of CSS 😅")
        ),
        // Image carousel
        React.createElement("div", { className: "relative w-[220px] h-[300px] flex-shrink-0" },
          React.createElement(AnimatePresence, { initial: false, mode: "popLayout" },
            React.createElement(motion.img, {
              key: index,
              src: images[index],
              className: "absolute w-full h-full object-cover rounded-xl shadow-lg cursor-grab",
              drag: "x",
              dragConstraints: { left: 0, right: 0 },
              onDragEnd: (e, info) => {
                const offset = info.offset.x;
                if (offset > 80) next(1);
                else if (offset < -80) next(-1);
              },
              initial: { x: 300, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: offset => offset > 0 ? -300 : 300, opacity: 0 },
              transition: { type: "spring", stiffness: 300, damping: 30 }
            })
          )
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
