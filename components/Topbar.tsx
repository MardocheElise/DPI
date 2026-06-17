"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un patient, dossier..."
            className="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl w-72 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-slate-50"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            DM
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-800 leading-tight">Dr. Martin</p>
            <p className="text-xs text-slate-500">Administrateur</p>
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
