"use client"

import React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface BarChartProps {
  data: any[]
  xAxisKey: string
  barKey: string
  color?: string
  height?: number
}

export function BarChart({ data, xAxisKey, barKey, color = "#8b5cf6", height = 300 }: BarChartProps) {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#252525" vertical={false} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#a0a0a0" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#a0a0a0" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1e1e1e", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f5f0e8" }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar dataKey={barKey} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
