/* The orbit mark, redrawn as a crisp vector: an open ring with an ember arc in its gap. */
export default function Mark({ size = 28, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <g transform="rotate(5 16 16)" fill="none" strokeWidth="4" strokeLinecap="round">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeDasharray="50 19.1" />
        <circle cx="16" cy="16" r="11" stroke="var(--accent)" strokeDasharray="7 62.1" strokeDashoffset="-56" />
      </g>
    </svg>
  );
}
