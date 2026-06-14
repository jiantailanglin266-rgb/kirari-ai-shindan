"use client";

import { motion } from "framer-motion";

type Axis = { label: string; value: number };

export function RadarChart({
  data,
  size = 280,
}: {
  data: Axis[];
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 42;
  const n = data.length;
  const levels = 4;

  const pointAt = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // グリッド多角形
  const gridPolys = Array.from({ length: levels }, (_, l) => {
    const r = (radius * (l + 1)) / levels;
    return data
      .map((_, i) => {
        const p = pointAt(i, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
  });

  // 値の多角形
  const valuePoints = data.map((d, i) =>
    pointAt(i, (radius * Math.max(0, Math.min(100, d.value))) / 100),
  );
  const valuePath = valuePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff6fb5" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* グリッド */}
      {gridPolys.map((poly, i) => (
        <polygon
          key={i}
          points={poly}
          fill="none"
          stroke="rgba(167,139,250,0.22)"
          strokeWidth={1}
        />
      ))}

      {/* 軸線 */}
      {data.map((_, i) => {
        const p = pointAt(i, radius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(167,139,250,0.2)"
            strokeWidth={1}
          />
        );
      })}

      {/* 値ポリゴン */}
      <motion.polygon
        points={valuePath}
        fill="url(#radar-fill)"
        stroke="#a78bfa"
        strokeWidth={2.5}
        strokeLinejoin="round"
        initial={{ scale: 0, opacity: 0, transformOrigin: `${cx}px ${cy}px` }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      />

      {/* 頂点ドット */}
      {valuePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#ff6fb5" />
      ))}

      {/* ラベル */}
      {data.map((d, i) => {
        const p = pointAt(i, radius + 22);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink"
            style={{ fontSize: 11, fontWeight: 700 }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
