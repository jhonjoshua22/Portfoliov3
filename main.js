const { useState, useRef, useEffect } = React;

function App() {
  const images = [
    "/images/IMG_0676.jpeg",
    "/images/IMG_1273.jpeg",
    "/images/IMG_2953.jpeg",
    "/images/IMG_9366.jpeg",
    "/images/IMG_9615.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
  const card = cardRef.current;
  if (!card) return;

  let startX = 0;

  const onMouseDown = (e) => {
    setDragging(true);
    startX = e.clientX;
    card.style.transition = "none";
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const moveX = e.clientX - startX;
    setOffsetX(moveX);
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 20}deg)`;
  };

  const onMouseUp = () => {
    if (!dragging) return;
    setDragging(false);

    // If dragged far enough
    if (Math.abs(offsetX) > 80) {
      const direction = offsetX > 0 ? 600 : -600;
      card.style.transition = "transform 0.3s ease-out";
      card.style.transform = `translateX(${direction}px) rotate(${offsetX > 0 ? 30 : -30}deg)`;

      // Wait for animation, then reset
      setTimeout(() => {
        card.style.transition = "none";
        card.style.transform = "translateX(0) rotate(0)";
        setOffsetX(0);
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 300);
    } else {
      // Not far enough – snap back
      card.style.transition = "transform 0.2s ease";
      card.style.transform = "translateX(0) rotate(0)";
      setOffsetX(0);
    }
  };

  card.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

  return () => {
    card.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };
}, [dragging, offsetX, currentIndex]);


  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-100 flex items-center justify-center px-4" },

    React.createElement(
      "div",
      { className: "flex flex-col lg:flex-row items-center gap-8 max-w-5xl w-full" },

      // 🧍 Intro
      React.createElement(
        "div",
        { className: "text-center lg:text-left flex-1" },
        React.createElement("h1", { className: "text-3xl font-bold text-purple-600 mb-2" }, "Hi, I'm Jhon Joshua Abutan"),
        React.createElement("p", { className: "text-gray-700 max-w-sm mx-auto lg:mx-0" },
          "Frontend developer. I love designing websites and turning them into code. Slightly addicted to coffee ☕ and not a fan of CSS 😅")
      ),

      // 🖼️ Image Card Stack
      React.createElement(
        "div",
        { className: "relative w-[200px] h-[280px] flex-1 select-none" },

        images.slice(0).reverse().map((src, index) => {
          const imgIndex = (currentIndex + index) % images.length;
          const isTop = index === images.length - 1;

          // Slight offset & rotate
          const translateY = (images.length - 1 - index) * 6;
          const rotate = (images.length - 1 - index) * 1.5;

          return React.createElement("img", {
            key: index,
            ref: isTop ? cardRef : null,
            src: images[imgIndex],
            className: `absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-md transition-all duration-300 ease-in-out ${isTop ? "cursor-grab z-30" : `z-${20 - index}`}`,
            style: {
              transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${1 - (images.length - 1 - index) * 0.015})`,
              transition: 'transform 0.3s ease'
            }
          });
        })
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
