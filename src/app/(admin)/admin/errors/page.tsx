"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminErrorsPage() {
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/errors').then(res => res.json()).then(data => {
      if(data.success) setErrors(data.data);
    });
  }, []);

  const markResolved = async (id: string) => {
    await fetch('/api/admin/errors', {
      method: 'PUT',
      body: JSON.stringify({ id, resolved: true })
    });
    setErrors(errors.map(e => e.id === id ? { ...e, resolved: true } : e));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-3xl font-light mb-8">Error Monitoring</h1>
      <div className="grid gap-4">
        {errors.map(err => (
          <div key={err.id} className={`p-6 border rounded-xl ${err.resolved ? 'bg-zinc-950 border-zinc-800' : 'bg-red-950/20 border-red-900/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg mb-1">{err.message}</h3>
                <p className="text-xs font-mono text-zinc-500">{err.route} • {new Date(err.createdAt).toLocaleString()}</p>
              </div>
              {!err.resolved && (
                <Button size="sm" variant="outline" onClick={() => markResolved(err.id)} className="border-zinc-700 hover:bg-zinc-800">
                  Resolve
                </Button>
              )}
            </div>
            {err.stack && (
              <pre className="text-xs bg-zinc-950 p-4 rounded text-zinc-400 overflow-x-auto border border-zinc-800">
                {err.stack}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
