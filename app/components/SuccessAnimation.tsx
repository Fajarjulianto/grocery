export default function SuccessAnimation() {
  return (
    <svg
      className="w-24 h-24 text-white animate-bounce"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" />
      <path
        d="M16 24l6 6 10-12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
