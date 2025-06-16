const App = () => {
  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-100 flex items-center justify-center px-4" },
    React.createElement(
      "div",
      { className: "bg-white shadow-2xl rounded-2xl p-10 max-w-xl text-center" },
      React.createElement("h1", { className: "text-4xl sm:text-5xl font-bold text-purple-600 mb-4" }, "Hi, I'm Jhon Joshua Abutan"),
      React.createElement("p", { className: "text-lg sm:text-xl text-gray-700 mb-6" }, "Frontend developer. I love designing websites and turning them into code."),
      React.createElement("p", { className: "italic text-gray-500" }, "Slightly addicted to coffee ☕ and not a fan of CSS 😅")
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(App());
