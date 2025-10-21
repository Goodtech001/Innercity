import React from 'react'

function ProgressCircle() {
  return (
    <div>
      
  <svg width="120" height="120" viewBox="-15 -15 150 150" version="1.1" xmlns="http://www.w3.org/2000/svg" className="transform:rotate(-90deg)">
    <circle r="50" cx="60" cy="60" fill="transparent" stroke="transparent" strokeWidth="24"></circle>
    <circle r="50" cx="60" cy="60" stroke="#ffffff" strokeWidth="13" strokeLinecap="round" strokeDashoffset="82px" fill="transparent" strokeDasharray="314px"></circle>
    <text x="37px" y="68px" fill="#dddfde" fontSize="25px" fontWeight="bold" className="transform:rotate(90deg) translate(0px, -151px)" >74%</text>
  </svg>
    
    </div>
  )
}

export default ProgressCircle
