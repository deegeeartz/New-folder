import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  href,
  target,
  rel,
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "btn-micro px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-md";
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/40 hover:shadow-lg text-black dark:text-white",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10",
    white: "bg-white text-blue-900 hover:bg-gray-100",
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
