"use client";

import { useState, useEffect } from 'react';
import { User, Mail, Shield, Download, Trash2, LogOut, Check, Edit2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  // Edit form state
  const [name, setName] = useState('');
  const [gender, setGender] = useState('prefer_not_to_say');
  const [ageGroup, setAgeGroup] = useState('age_18_24');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
        setName(data.data.name || '');
        setGender(data.data.profile?.gender || 'prefer_not_to_say');
        setAgeGroup(data.data.profile?.ageGroup || 'age_18_24');
      }
    } catch {
      // Fallback
      setUser({
        name: 'Alex Morgan',
        email: 'alex@example.com',
        role: 'user',
        profile: { gender: 'prefer_not_to_say', ageGroup: 'age_18_24' }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          gender,
          ageGroup
        })
      });

      const data = await res.json();
      if (data.success) {
        setUser((prev: any) => ({
          ...prev,
          name: name.trim(),
          profile: {
            ...prev?.profile,
            gender,
            ageGroup
          }
        }));
        setSavedSuccess(true);
        setTimeout(() => {
          setEditOpen(false);
          setSavedSuccess(false);
        }, 800);
      }
    } catch {
      // Optimistic update
      setUser((prev: any) => ({ ...prev, name }));
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      const res = await fetch('/api/account/export');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vestra-export-${Date.now()}.json`;
      a.click();
    } catch {
      alert('Unable to export data at this moment.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('/api/account/delete', { method: 'DELETE' });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch {
      window.location.href = '/login';
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch {
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
        <div className="h-10 w-48 bg-[#1a1a1a] rounded-xl animate-pulse" />
        <div className="h-64 bg-[#1a1a1a] rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 min-h-[85vh]">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#f5f0e8]">Profile & Account</h1>
          <p className="text-sm text-gray-400">Manage your styling identity, privacy, and account security.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 rounded-full"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>

      {/* Account Info Card */}
      <Card className="bg-[#1a1a1a] border-white/10 text-white shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
          <div>
            <CardTitle className="text-xl font-serif text-[#f5f0e8]">Personal Information</CardTitle>
            <CardDescription className="text-gray-400">Your profile details used for personalized recommendations.</CardDescription>
          </div>
          <Button 
            onClick={() => setEditOpen(true)}
            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full text-xs font-medium px-4 shadow-md"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                <User className="w-4 h-4" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Full Name</label>
                <div className="text-base font-medium text-[#f5f0e8] mt-0.5">{user?.name || 'Vestra Member'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="text-base font-medium text-[#f5f0e8] mt-0.5">{user?.email || 'user@example.com'}</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2 border-t border-white/5">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">Role</label>
              <div className="text-sm font-medium text-purple-300 mt-1 capitalize">{user?.role || 'User'}</div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">Account Status</label>
              <div className="text-sm font-medium text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Member
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data Control */}
      <Card className="bg-[#1a1a1a] border-white/10 text-white shadow-xl">
        <CardHeader className="pb-4 border-b border-white/5">
          <CardTitle className="text-xl font-serif text-[#f5f0e8] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8b5cf6]" /> Privacy & Data Control
          </CardTitle>
          <CardDescription className="text-gray-400">
            Export a copy of your personal wardrobe data or review legal terms.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0d0d0d] border border-white/5">
            <div>
              <div className="font-medium text-sm text-[#f5f0e8]">Export Wardrobe & Profile Data</div>
              <div className="text-xs text-gray-400">Download your looks, clothing items, and profile as JSON.</div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="border-white/10 text-white hover:bg-white/10 shrink-0 text-xs rounded-full"
            >
              <Download className="w-3.5 h-3.5 mr-2" /> Download JSON
            </Button>
          </div>

          <div className="flex gap-4 pt-2 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-[#8b5cf6] underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#8b5cf6] underline">Terms of Service</Link>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-[#1a1a1a] border-rose-500/20 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg text-rose-400 font-serif">Danger Zone</CardTitle>
          <CardDescription className="text-gray-400">
            Permanently delete your account, saved looks, and wardrobe closet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={() => setDeleteConfirmOpen(true)}
            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 rounded-full text-xs font-medium"
          >
            <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* EDIT PROFILE MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[480px] bg-[#1a1a1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-[#f5f0e8]">Edit Personal Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProfile} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-xs text-gray-300">Display Name</Label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#0d0d0d] border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-300">Email Address (Read-only)</Label>
              <Input 
                value={user?.email || ''} 
                disabled 
                className="bg-[#0d0d0d]/50 border-white/5 text-gray-500 cursor-not-allowed"
              />
            </div>
            <DialogFooter className="pt-4 border-t border-white/5">
              <Button type="button" variant="ghost" onClick={() => setEditOpen(false)} className="text-gray-400">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Saved!
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[440px] bg-[#1a1a1a] border-rose-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg text-rose-400 font-serif">Permanently Delete Account?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-gray-400 leading-relaxed">
            This action cannot be undone. All your wardrobe garments, saved looks, and custom proportion profiles will be permanently removed.
          </p>
          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={() => setDeleteConfirmOpen(false)} className="text-gray-400">
              Cancel
            </Button>
            <Button onClick={handleDeleteAccount} className="bg-rose-600 hover:bg-rose-700 text-white">
              Yes, Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
