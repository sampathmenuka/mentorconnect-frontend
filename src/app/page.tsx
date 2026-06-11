"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Calendar, Compass, ShieldCheck, ArrowRight, Zap, Trophy, MessageSquare, Star } from 'lucide-react';

import { redirect } from 'next/navigation';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  redirect(ROUTES.LOGIN);
  
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center bg-grid-pattern overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[10%] w-[60%] h-[40%] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] w-[50%] h-[35%] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center z-10 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-primary text-xs font-black tracking-wider uppercase mb-2">
          <Zap className="w-3.5 h-3.5 text-secondary" />
          <span>Launch Your Mentorship Program</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-primary leading-tight max-w-4xl">
          Level Up Your Skills.{' '}
          <span className="bg-gradient-to-r from-primary via-[#265328] to-secondary bg-clip-text text-transparent">
            Find Your Mentor.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed mt-2 font-semibold">
          Accelerate your career, build real projects, and learn directly from verified software engineers, product experts, and designers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
            <Button variant="primary" size="lg" className="flex items-center gap-2 px-8">
              <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="px-8">
              Explore Features
            </Button>
          </a>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16 w-full max-w-4xl rounded-3xl border border-slate-200/80 bg-white p-3.5 shadow-xl relative group">
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-secondary/10 blur-2xl pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-24 h-24 bg-primary/5 blur-2xl pointer-events-none rounded-full" />

          <div className="rounded-2xl border border-slate-100 bg-neutral-bg/35 p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[10px] text-slate-400 font-bold ml-2">mentorconnect-dashboard.app</span>
              </div>
              <div className="w-24 h-2 rounded bg-slate-200" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="col-span-2 border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-primary">
                    <Trophy className="w-4.5 h-4.5 text-primary" />
                    <span>Your Learning Milestones</span>
                  </CardTitle>
                  <CardDescription className="text-xs">Weekly objectives set by your mentor</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3.5 text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-bg/40 border border-slate-100">
                    <input type="checkbox" defaultChecked disabled className="rounded text-primary bg-white border-slate-200 w-4 h-4" />
                    <span className="text-slate-500 font-bold line-through">Implement authentication layouts & tokens helper</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-bg/40 border border-slate-100">
                    <input type="checkbox" defaultChecked disabled className="rounded text-primary bg-white border-slate-200 w-4 h-4" />
                    <span className="text-slate-500 font-bold line-through">Configure Axios routing instance with JWT refresh interceptors</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-bg/40 border border-slate-100">
                    <input type="checkbox" disabled className="rounded text-primary bg-white border-slate-200 w-4 h-4" />
                    <span className="text-slate-700 font-bold">Verify role guards middleware & run local build tests</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase">Next Session</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">Today at 4:30 PM</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-primary animate-pulse">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase">Notifications</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">3 unread from Sarah D.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full max-w-7xl mx-auto px-6 py-20 z-10 border-t border-slate-200/80 mt-12">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Key Modules</span>
          <h2 className="text-3xl sm:text-4xl font-black text-primary">
            Designed for Modern Mentoring
          </h2>
          <p className="text-sm text-slate-500 max-w-md font-semibold">
            All the features you need to manage calendars, track accomplishments, and communicate seamlessly in one dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Card hoverEffect className="border-slate-200 bg-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-3">
                <Calendar className="w-5.5 h-5.5" />
              </div>
              <CardTitle className="text-lg text-primary font-black">Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Connect your calendar, configure custom availability windows, and schedule 1-on-1 calls with automatic time zone translations.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card hoverEffect className="border-slate-200 bg-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-primary mb-3">
                <Compass className="w-5.5 h-5.5" />
              </div>
              <CardTitle className="text-lg text-primary font-black">Curated Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Filter mentors by tech stacks, industry domain, seniority levels, and language preferences to match your exact goals.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card hoverEffect className="border-slate-200 bg-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <CardTitle className="text-lg text-primary font-black">Role Access Guard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Integrated JWT authentication mechanism securing dashboard routes and role privileges (Admin, Mentors, and Mentees).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
