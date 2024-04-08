import React from 'react'

export default function Summary({title,value,desc}) {
  return (
    <div className="stats shadow mx-10 hover:bg-slate-300 hover:scale-250">
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  </div>
  )
}
