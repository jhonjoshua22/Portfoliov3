// main.js or app.jsx (whichever you're using)

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

      if (Math.abs(offsetX) > 100) {
        const direction = offsetX > 0 ? 600 : -600;
        card.style.transition = "transform 0.4s ease";
        card.style.transform = `translateX(${direction}px) rotate(${offsetX / 10}deg)`;

        setTimeout(() => {
          card.style.transition = "none";
          card.style.transform = "translateX(0px) rotate(0deg)";
          setOffsetX(0);
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 400);
      } else {
        card.style.transition = "transform 0.3s ease";
        card.style.transform = "translateX(0px) rotate(0deg)";
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
    { className: "min-h-screen bg-gray-100 flex items-center justify-center px-6" },

    React.createElement(
      "div",
      { className: "flex flex-col lg:flex-row items-center lg:items-start gap-10 max-w-6xl w-full" },

      // 👤 INTRO TEXT
      React.createElement(
        "div",
        { className: "text-center lg:text-left flex-1" },
        React.createElement("h1", { className: "text-4xl font-bold text-purple-600 mb-4" }, "Hi, I'm Jhon Joshua Abutan"),
        React.createElement("p", { className: "text-gray-700 text-lg max-w-md" },
          "Frontend developer. I love designing websites and turning them into code. Slightly addicted to coffee ☕ and not a fan of CSS 😅")
      ),

      // 🖼️ IMAGE STACK
      React.createElement(
        "div",
        { className: "relative w-[300px] h-[400px] flex-1" },
        images.slice(0).reverse().map((src, index) => {
          const imgIndex = (currentIndex + index) % images.length;
          const isTop = index === images.length - 1;

          return React.createElement("img", {
            key: index,
            ref: isTop ? cardRef : null,
            src: images[imgIndex],
            className: `absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 ease-in-out ${isTop ? "cursor-grab z-30" : `z-${20 - index}`}`,
            style: {
              transform: `scale(${1 - (images.length - 1 - index) * 0.02}) translateY(${(images.length - 1 - index) * 4}px)`
            }
          });
        })
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
