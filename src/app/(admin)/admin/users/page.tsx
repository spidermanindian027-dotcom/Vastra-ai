"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(data => {
      if(data.success) setUsers(data.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-3xl font-light mb-8">User Management</h1>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium">Wardrobe Size</th>
              <th className="p-4 font-medium">Outfits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-zinc-800/50">
                <td className="p-4">{u.email}</td>
                <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{u._count?.wardrobeItems || 0}</td>
                <td className="p-4">{u._count?.outfits || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
