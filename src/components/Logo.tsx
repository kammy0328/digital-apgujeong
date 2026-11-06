// Geometric lowercase wordmark: d, a and p share one bowl; the i-dot is the accent.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 -20 163 80"
      fill="currentColor"
      role="img"
      aria-label="diap"
    >
      <g fill="none" stroke="currentColor" strokeWidth="7">
        <circle cx="20" cy="20" r="16.5" />
        <circle cx="91" cy="20" r="16.5" />
        <circle cx="143" cy="20" r="16.5" />
      </g>
      <rect x="33" y="-20" width="7" height="60" />
      <rect x="52" y="0" width="7" height="40" />
      <circle className="logo-dot" cx="55.5" cy="-13" r="4.5" />
      <rect x="104" y="0" width="7" height="40" />
      <rect x="123" y="0" width="7" height="60" />
    </svg>
  );
}
