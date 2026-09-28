"use client"

import React from "react"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface LineChartProps {
  data: any[]
  xAxisKey: string
  lineKeys: { key: string; color: string }[]
  height?: number
}

export function LineChart({ data, xAxisKey, lineKeys, height = 300 }: LineChartProps) {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            tickFormatter={(val) => `${val}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1e1e1e", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f5f0e8" }}
            itemStyle={{ color: "#f5f0e8" }}
          />
          {lineKeys.map((item, idx) => (
            <Line 
              key={idx}
              type="monotone" 
              dataKey={item.key} 
              stroke={item.color} 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "#1e1e1e" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: item.color }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
