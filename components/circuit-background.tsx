import React from "react"

interface CircuitBackgroundProps {
  id: string;
  isDark: boolean;
}

export const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ id, isDark }) => {
  return (
    <svg width="100%" height="100%">
      <pattern
        id={id}
        x="0"
        y="0"
        width="200"
        height="200"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <path
          d="M50 10 H150 M150 10 V100 M150 100 H100 M100 100 V150 M100 150 H180 M50 10 V190 M50 190 H120"
          className="stroke-circuit-pattern"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="50" cy="10" r="5" className="fill-circuit-pattern" />
        <circle cx="150" cy="10" r="5" className="fill-circuit-pattern" />
        <circle cx="150" cy="100" r="5" className="fill-circuit-pattern" />
        <circle cx="100" cy="100" r="5" className="fill-circuit-pattern" />
        <circle cx="100" cy="150" r="5" className="fill-circuit-pattern" />
        <circle cx="180" cy="150" r="5" className="fill-circuit-pattern" />
        <circle cx="50" cy="190" r="5" className="fill-circuit-pattern" />
        <circle cx="120" cy="190" r="5" className="fill-circuit-pattern" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
} 