import React from 'react'

type PercentageBarProps = {
  value: number // 0 to 100
  filledColor?: string // e.g. "#0074E6"
  backgroundColor?: string // e.g. "#D9D9D9"
}

const PercentageBar: React.FC<PercentageBarProps> = ({
  value,
  filledColor = '#0074E6',
  backgroundColor = '#D9D9D9',
}) => {
  const clamped = Math.min(Math.max(value, 0), 100)

  return (
    <div className="h-2 w-full overflow-hidden rounded-lg" style={{ backgroundColor }}>
      <div
        className="h-full rounded-lg transition-all duration-300"
        style={{ width: `${clamped}%`, backgroundColor: filledColor }}
      />
    </div>
  )
}

export default PercentageBar
