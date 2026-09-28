"use client"

import React from "react"
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PieChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  colors?: string[]
}

const DEFAULT_COLORS = ["#8b5cf6", "#6366f1", "#10b981", "#f59e0b", "#ec4899"]

export function PieChart({ data, height = 300, colors = DEFAULT_COLORS }: PieChartProps) {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: "#1e1e1e", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f5f0e8" }}
            itemStyle={{ color: "#f5f0e8" }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#a0a0a0' }} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
