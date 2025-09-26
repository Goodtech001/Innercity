export default function PercentageCircle({ size = 90, stroke = 15, progress = 40 }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#d9d9d9"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#0074E6"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="butt"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="15">
        {progress}%
      </text>
    </svg>
  )
}
