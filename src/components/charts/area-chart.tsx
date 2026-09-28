"use client"

import React from "react"
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AreaChartProps {
  data: any[]
  xAxisKey: string
  areaKeys: { key: string; color: string }[]
  height?: number
}

export function AreaChart({ data, xAxisKey, areaKeys, height = 300 }: AreaChartProps) {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {areaKeys.map((item, idx) => (
              <linearGradient key={idx} id={`color${item.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={item.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={item.color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
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
          />
          {areaKeys.map((item, idx) => (
            <Area 
              key={idx}
              type="monotone" 
              dataKey={item.key} 
              stroke={item.color} 
              fillOpacity={1} 
              fill={`url(#color${item.key})`} 
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
