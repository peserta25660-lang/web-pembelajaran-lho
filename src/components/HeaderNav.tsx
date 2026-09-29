import React from 'react';
import { 
  FileText, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Edit3,
  AlignLeft,
  Download,
  UserCheck
} from 'lucide-react';

interface HeaderNavProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  lastSaved: string | null;
  onReset: () => void;
  onOpenGuide: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  lastSaved,
  onReset,
  onOpenGuide,
}) => {
  const tabs = [
    { id: 1, label: '1. Observasi', shortLabel: '1. Observasi', icon: Eye },
    { id: 2, label: '2. Kalimat', shortLabel: '2. Kalimat', icon: Edit3 },
    { id: 3, label: '3. Paragraf', shortLabel: '3. Paragraf', icon: AlignLeft },
    { id: 4, label: '4. Hasil & PDF', shortLabel: '4. PDF & Cetak', icon: Download },
    { id: 5, label: '5. Pengembang', shortLabel: '5. Profil', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs no-print">
      {/* Top Banner / Identity Bar */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-3 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Title and Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-slate-800 text-base sm:text-lg leading-tight">
                  Media Scaffolding Teks LHO
                </h1>
                <span className="text-[11px] font-semibold tracking-wide bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Kelas X • PTK
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">
                Panduan bertahap menulis Laporan Hasil Observasi berbasis objek nyata
              </p>
            </div>
          </div>

          {/* Quick Actions & Auto-save Status */}
          <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap text-xs">
            {/* Realtime LocalStorage Auto-save Indicator */}
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 font-medium"
              title="Perubahan disimpan otomatis di memori browser perangkat ini"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="hidden xs:inline">Tersimpan otomatis di browser ini</span>
              <span className="xs:hidden">Tersimpan</span>
              {lastSaved && (
                <span className="text-[10px] text-emerald-600/80 hidden md:inline">({lastSaved})</span>
              )}
            </div>

            {/* Utility Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 text-xs font-medium transition-colors"
                title="Buka Petunjuk Pengamatan"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Petunjuk</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 text-xs font-medium transition-colors"
                title="Kosongkan semua data dan mulai baru"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="sr-only">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Navigation Tabs (Mobile-first with horizontal smooth scroll) */}
      <div className="max-w-5xl mx-auto px-2 sm:px-6">
        <nav 
          className="flex space-x-1 overflow-x-auto scrollbar-none py-1.5 -mb-px" 
          aria-label="Tahapan Scaffolding"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
