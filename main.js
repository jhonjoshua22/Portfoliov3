const { useRef, useEffect } = React;

function App() {
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return React.createElement(
    "div",
    { className: "min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-12" },
    // Left Text Section
    React.createElement(
      "div",
      { className: "max-w-xl text-center md:text-left mb-8 md:mb-0" },
      React.createElement("h1", { className: "text-4xl font-bold text-purple-600 mb-4" }, "Hi, I'm Jhon Joshua Abutan"),
      React.createElement("p", { className: "text-lg text-gray-700 mb-4" }, "Frontend developer. I love designing websites and turning them into code."),
      React.createElement("p", { className: "italic text-gray-500" }, "Slightly addicted to coffee ☕ and not a fan of CSS 😅")
    ),
    // Right Photo Slider
    React.createElement(
      "div",
      {
        ref: sliderRef,
        className: "flex gap-4 overflow-x-auto p-2 cursor-grab max-w-[400px]"
      },
      [
        "https://source.unsplash.com/400x300/?code",
        "https://source.unsplash.com/400x300/?react",
        "https://source.unsplash.com/400x300/?coffee",
        "https://source.unsplash.com/400x300/?keyboard"
      ].map((src, i) =>
        React.createElement("img", {
          key: i,
          src,
          className: "w-60 h-40 object-cover rounded-xl shadow-md flex-shrink-0",
          alt: `Photo ${i + 1}`
        })
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
