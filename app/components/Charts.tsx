export function LineChart({
  values,
  label,
  color = "#58dce7",
  height = 130,
}: {
  values: number[];
  label: string;
  color?: string;
  height?: number;
}) {
  const max = Math.max(...values, 1);
  const path = values
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"}${(i / (values.length - 1)) * 500},${height - 10 - (v / max) * (height - 25)}`,
    )
    .join(" ");
  return (
    <svg
      className="line-chart"
      viewBox={`0 0 500 ${height}`}
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {[0.25, 0.5, 0.75].map((p) => (
        <path
          key={p}
          d={`M0 ${height * p}H500`}
          stroke="#28384c"
          strokeDasharray="3 6"
        />
      ))}
      <path d={path + `L500 ${height}H0Z`} fill={color} fillOpacity=".055" />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <circle
        cx="500"
        cy={height - 10 - (values[values.length - 1] / max) * (height - 25)}
        r="3"
        fill={color}
      />
    </svg>
  );
}
export function SeverityChart({ counts }: { counts: number[] }) {
  const labels = ["Critical", "High", "Medium", "Low"];
  const colors = ["#f07e94", "#efb478", "#75c8ee", "#79dec2"];
  return (
    <div className="severity-bars" aria-label="Simulated severity distribution">
      {labels.map((label, i) => (
        <div key={label}>
          <span>
            <i style={{ background: colors[i] }} />
            {label}
          </span>
          <div className="severity-track">
            <b
              style={{
                width: (counts[i] / Math.max(...counts, 1)) * 100 + "%",
                background: colors[i],
              }}
            />
          </div>
          <strong>{counts[i]}</strong>
        </div>
      ))}
    </div>
  );
}
