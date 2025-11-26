import "./Button.css";

export default function Button({ onClick, children, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
}