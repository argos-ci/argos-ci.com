import clsx from "clsx";

export function CircleProgress(props: {
  size: number;
  stroke: string;
  strokeWidth: number;
  progress: number;
  label: React.ReactNode;
  className?: string;
}) {
  const { size, stroke, strokeWidth, progress, label, className } = props;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (progress / 100);
  const gap = c - dash;
  return (
    <div
      className={clsx("relative flex items-center justify-center", className)}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--neutral-6)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${gap}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-low text-xxxs">{label}</div>
        <div className="text-2xl leading-7 font-semibold">{progress}</div>
      </div>
    </div>
  );
}
