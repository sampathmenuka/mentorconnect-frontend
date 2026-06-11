"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Button } from '../ui/Button';
import { isAdmin, formatRole } from '@/utils/role';
import { LogOut, Menu, X, Shield, LayoutDashboard, Home } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
    setProfileDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: ROUTES.HOME, icon: Home, show: true },
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard, show: isAuthenticated },
    { label: 'Admin Panel', href: ROUTES.ADMIN, icon: Shield, show: isAuthenticated && isAdmin(user?.role) },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b border-slate-200/60 backdrop-blur-md px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-sm transition-transform group-hover:scale-102">
            <span className="text-white font-black text-base">M</span>
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-wide">
            Mentor<span className="text-primary font-black">Connect</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks
            .filter((l) => l.show)
            .map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors tracking-wide uppercase ${
                    isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all cursor-pointer focus:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-black text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-700">{user.name.split(' ')[0]}</span>
                <div className="text-[9px] px-2 py-0.5 rounded-full bg-secondary/25 border border-secondary text-primary font-extrabold uppercase tracking-wide">
                  {formatRole(user.role)}
                </div>
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-black text-slate-800 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-650 hover:text-red-700 hover:bg-red-500/5 rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={ROUTES.LOGIN}>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks
              .filter((l) => l.show)
              .map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2 px-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-colors ${
                      isActive ? 'bg-primary/5 border border-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="flex flex-col gap-2.5 px-1.5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary/5 border border-primary/15 flex items-center justify-center text-primary font-black uppercase text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 leading-none">{user.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                </div>
                <Button variant="danger" size="sm" onClick={handleLogout} className="w-full flex items-center gap-2 justify-center">
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2.5">
                <Link href={ROUTES.LOGIN} className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER} className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
