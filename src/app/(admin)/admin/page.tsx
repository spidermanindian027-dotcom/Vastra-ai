"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '1,234' },
          { label: 'Active Today', value: '156' },
          { label: 'Total Scans', value: '5,280' },
          { label: 'Avg Score', value: '82.4' },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#1a1a1a] border-white/10 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
