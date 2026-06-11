"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, UserRole } from '@/types/auth';
import { formatRole } from '@/utils/role';
import { Shield, Users, Activity, ArrowRightLeft, Trash2, Cpu, Database } from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = () => {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem('mentorconnect_mock_users');
      if (stored) {
        setUsers(JSON.parse(stored));
      }
    };
    loadUsers();
  }, []);

  const handleToggleRole = (userId: string) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        const nextRole: UserRole = u.role === 'mentor' ? 'mentee' : u.role === 'mentee' ? 'admin' : 'mentor';
        return { ...u, role: nextRole };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('mentorconnect_mock_users', JSON.stringify(updated));
  };

  const handleDeleteUser = (userId: string) => {
    const updated = users.filter((u) => u.id !== userId);
    setUsers(updated);
    localStorage.setItem('mentorconnect_mock_users', JSON.stringify(updated));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col gap-8">
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span>Administration Access</span>
            </span>
            <h1 className="text-3xl font-black text-primary tracking-tight mt-1">
              System Control Console
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">
              Securely monitor network performance, user directories, and manage access parameters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-2xl font-black text-primary">0.05%</p>
                <p className="text-xs font-black text-slate-400 uppercase mt-0.5">Edge Function CPU</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-primary">Online</p>
                <p className="text-xs font-black text-slate-400 uppercase mt-0.5">Mock Cache Database</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-primary">99.99%</p>
                <p className="text-xs font-black text-slate-400 uppercase mt-0.5">API Server Uptime</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Users className="w-5 h-5 text-primary" />
              <span>User Directory</span>
            </CardTitle>
            <CardDescription className="text-xs">Manage all registered accounts and role parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-450 uppercase">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Role Privileges</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-bold text-slate-700">
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-extrabold text-slate-800">{u.name}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 font-normal">{u.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.role === 'admin' 
                            ? 'bg-red-50 border border-red-100 text-red-600'
                            : u.role === 'mentor'
                            ? 'bg-primary/5 border border-primary/10 text-primary'
                            : 'bg-secondary/20 border border-secondary text-primary'
                        }`}>
                          {formatRole(u.role)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleRole(u.id)}
                            className="h-8 py-1 px-2.5 flex items-center gap-1 text-[11px] shadow-sm"
                            title="Cycle Role"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                            <span>Cycle Role</span>
                          </Button>
                          {u.role !== 'admin' && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteUser(u.id)}
                              className="h-8 w-8 p-0 flex items-center justify-center"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
