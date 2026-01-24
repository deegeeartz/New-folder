import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-md";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 hover:shadow-blue-500/40 hover:shadow-lg text-white",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10",
    white: "bg-white text-blue-900 hover:bg-gray-100",
  };

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
