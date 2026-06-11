"use client";

import React from 'react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatRole } from '@/utils/role';
import { Calendar, CheckCircle2, MessageSquare, Award, Clock, ArrowUpRight, Plus, UserPlus, BookOpen, Star, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const isMentorRole = user?.role === 'mentor';

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col gap-8">
        {/* Top Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-widest">
              Account Overview
            </span>
            <h1 className="text-3xl font-black text-primary tracking-tight mt-1">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">
              You are signed in as a <span className="text-primary font-bold">{formatRole(user?.role || 'mentee')}</span>.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 shadow-sm">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>Schedule Session</span>
            </Button>
            <Button variant="primary" size="sm" className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>{isMentorRole ? 'Create Milestone' : 'Ask Question'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-effect-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-primary">12.5 hrs</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Session Hours</p>
            </div>
          </div>

          <div className="glass-effect-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-primary">8 / 10</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Milestones Done</p>
            </div>
          </div>

          <div className="glass-effect-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-primary">4</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Unread Messages</p>
            </div>
          </div>

          <div className="glass-effect-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-primary">4.9</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Rating Score</p>
            </div>
          </div>
        </div>

        {/* Dynamic Panels */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {isMentorRole ? (
              <>
                <Card className="border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>Active Mentees</span>
                    </CardTitle>
                    <CardDescription className="text-xs">Your assigned learners and their current metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-neutral-bg/30 border border-slate-200 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-primary/15 flex items-center justify-center font-bold text-primary">
                          LM
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Lucas Miller</p>
                          <p className="text-xs text-slate-500">Junior React Developer</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs font-semibold text-slate-400">Milestones</p>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">4 / 5 completed</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 shadow-sm">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-neutral-bg/30 border border-slate-200 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-secondary/35 flex items-center justify-center font-bold text-primary">
                          SW
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Sarah Watson</p>
                          <p className="text-xs text-slate-500">CS Undergrad Student</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs font-semibold text-slate-400">Milestones</p>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">2 / 5 completed</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 shadow-sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Pending Booking Requests</span>
                    </CardTitle>
                    <CardDescription className="text-xs">Incoming 1:1 call requests from mentees</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <div className="p-4 rounded-xl border border-slate-205 bg-neutral-bg/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800">System Architecture Sync</p>
                        <p className="text-xs text-slate-500 mt-1">Requested by Lucas Miller • Duration: 45m</p>
                        <p className="text-xs text-slate-400 mt-0.5">Tomorrow, 3:00 PM (Europe/London)</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-800">Decline</Button>
                        <Button variant="secondary" size="sm">Accept Request</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>Assigned Milestones</span>
                    </CardTitle>
                    <CardDescription className="text-xs">Learning targets set by your mentor</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3.5 text-xs">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-bg/25 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked disabled className="rounded text-primary bg-white border-slate-300 w-4.5 h-4.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-bold line-through">Implement authentication layouts & tokens helper</p>
                          <p className="text-xs text-slate-400 mt-0.5">Deadline: June 15, 2026</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-100 text-emerald-600 uppercase tracking-wide">
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-bg/25 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked disabled className="rounded text-primary bg-white border-slate-300 w-4.5 h-4.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-bold line-through">Configure Axios routing instance with JWT refresh interceptors</p>
                          <p className="text-xs text-slate-400 mt-0.5">Deadline: June 20, 2026</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-100 text-amber-600 uppercase tracking-wide">
                        Reviewing
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-bg/25 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked={false} readOnly className="rounded text-primary bg-white border-slate-300 w-4.5 h-4.5 cursor-pointer" />
                        <div>
                          <p className="text-sm text-slate-800 font-bold">Verify role guards middleware & run local build tests</p>
                          <p className="text-xs text-slate-500 mt-0.5">Deadline: June 25, 2026</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-500 uppercase tracking-wide">
                        Pending
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <UserPlus className="w-5 h-5 text-secondary" />
                      <span>Recommended Mentors</span>
                    </CardTitle>
                    <CardDescription className="text-xs">Browse matches based on your interest profile</CardDescription>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-200 bg-neutral-bg/15 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-white border border-primary/10 flex items-center justify-center font-bold text-primary">
                            JD
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">Jane Doe</p>
                            <p className="text-[10px] text-slate-400 font-bold">Staff Architect at Vercel</p>
                          </div>
                        </div>
                        <div className="flex items-center text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-100">
                          <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                          <span>5.0</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                        Specialize in Next.js caching models, Edge Middleware route protection, and server components architectures.
                      </p>
                      <Button variant="outline" size="sm" className="h-8 text-xs py-1 mt-1 flex items-center gap-1 shadow-sm">
                        <span>Book Session</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-neutral-bg/15 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-white border border-primary/10 flex items-center justify-center font-bold text-primary">
                            AM
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">Alex Martinez</p>
                            <p className="text-[10px] text-slate-400 font-bold">Principal SecOps at Okta</p>
                          </div>
                        </div>
                        <div className="flex items-center text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-100">
                          <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                          <span>4.9</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                        Expertise in secure JWT structures, CORS configurations, header validations, and OAuth delegation workflows.
                      </p>
                      <Button variant="outline" size="sm" className="h-8 text-xs py-1 mt-1 flex items-center gap-1 shadow-sm">
                        <span>Book Session</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <Calendar className="w-4.5 h-4.5 text-primary" />
                  <span>Upcoming Calls</span>
                </CardTitle>
                <CardDescription className="text-xs">Your scheduled video discussions</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-neutral-bg/20 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-primary/5 border border-primary/10 text-primary">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800">1:1 Project Mentoring Sync</p>
                    <p className="text-[10px] text-slate-550 mt-1">Today at 4:30 PM</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Assigned: {isMentorRole ? 'Sarah Watson' : 'Jane Doe'}</p>
                    <Button variant="primary" size="sm" className="w-full mt-3.5 h-8.5 text-xs font-bold">
                      Join Call Room
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <Star className="w-4.5 h-4.5 text-amber-500" />
                  <span>Mentor Resources</span>
                </CardTitle>
                <CardDescription className="text-xs">Quick links and articles</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-xs font-bold">
                <a href="#" className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-bg/50 transition-colors text-slate-600 hover:text-slate-900">
                  <span>How to conduct effective code reviews</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a href="#" className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-bg/50 transition-colors text-slate-600 hover:text-slate-900">
                  <span>Setting career roadmaps in tech</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
