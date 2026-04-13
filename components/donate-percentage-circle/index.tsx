export default function DonatePercentageCircle({ size = 80, stroke = 15, progress = 40 }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size}>
      <circle
        stroke="transparent"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#ffffff"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="butt"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="15" className="font-bold">
        {progress}%
      </text>
    </svg>
  )
}
