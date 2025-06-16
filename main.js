const { useState, useRef } = React;

function App() {
  const images = [
    "https://source.unsplash.com/400x300/?code",
    "https://source.unsplash.com/400x300/?react",
    "https://source.unsplash.com/400x300/?coffee",
    "https://source.unsplash.com/400x300/?keyboard"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);

  const handleDrag = () => {
    const card = cardRef.current;
    if (!card) return;

    let isDragging = false;
    let startX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const moveX = e.clientX - startX;
      card.style.transform = `translateX(${moveX}px) rotate(${moveX / 20}deg)`;
    };

    const onMouseUp = (e) => {
      if (!isDragging) return;
      isDragging = false;

      const moveX = e.clientX - startX;
      if (Math.abs(moveX) > 100) {
        // Slide out
        card.style.transition = "transform 0.3s ease-out";
        card.style.transform = `translateX(${moveX > 0 ? 500 : -500}px) rotate(${moveX / 10}deg)`;

        setTimeout(() => {
          card.style.transition = "none";
          card.style.transform = "none";
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 300);
      } else {
        // Return to center
        card.style.transition = "transform 0.3s ease";
        card.style.transform = "translateX(0px) rotate(0deg)";
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
  };

  React.useEffect(handleDrag, [currentIndex]);

  return React.createElement(
    "div",
    { className: "min-h-screen flex flex-col items-center justify-center px-4" },

    // Header
    React.createElement("h1", { className: "text-3xl font-bold text-purple-600 mb-6 text-center" },
      "Hi, I'm Jhon Joshua Abutan"),

    React.createElement("p", { className: "text-gray-700 text-center max-w-md mb-10" },
      "Frontend developer. I love designing websites and turning them into code. Slightly addicted to coffee ☕ and not a fan of CSS 😅"),

    // Stack of photos
    React.createElement(
      "div",
      { className: "relative w-[400px] h-[300px]" },

      images.slice(0).reverse().map((src, index) => {
        const imgIndex = (currentIndex + index) % images.length;
        const isTop = index === images.length - 1;
        return React.createElement("img", {
          key: index,
          ref: isTop ? cardRef : null,
          src: images[imgIndex],
          className: `absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 ease-in-out ${isTop ? "cursor-grab z-30" : `z-${20 - index}`}`,
          style: { transform: `scale(${1 - (images.length - 1 - index) * 0.02}) translateY(${(images.length - 1 - index) * 4}px)` }
        });
      })
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
