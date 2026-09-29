import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { TabObservasi } from './components/TabObservasi';
import { TabKalimat } from './components/TabKalimat';
import { TabParagraf } from './components/TabParagraf';
import { TabHasilPdf } from './components/TabHasilPdf';
import { TabPengembang } from './components/TabPengembang';
import { ModalPetunjuk } from './components/ModalPetunjuk';
import { 
  initialIdentity, 
  initialObservation, 
  initialSentences, 
  initialParagraphs 
} from './data/sampleData';
import { StudentIdentity, ObservationData, SentenceRepairData, ParagraphData } from './types';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'scaffolding_lho_kelas_x_v2';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Core Data States
  const [identity, setIdentity] = useState<StudentIdentity>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.identity) return parsed.identity;
      }
    } catch {
      // fallback
    }
    return initialIdentity;
  });

  const [observation, setObservation] = useState<ObservationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.observation) return parsed.observation;
      }
    } catch {
      // fallback
    }
    return initialObservation;
  });

  const [sentences, setSentences] = useState<SentenceRepairData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sentences) return parsed.sentences;
      }
    } catch {
      // fallback
    }
    return initialSentences;
  });

  const [paragraphs, setParagraphs] = useState<ParagraphData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.paragraphs) return parsed.paragraphs;
      }
    } catch {
      // fallback
    }
    return initialParagraphs;
  });

  // Auto-save to LocalStorage whenever data changes
  useEffect(() => {
    try {
      const dataToSave = {
        identity,
        observation,
        sentences,
        paragraphs,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setLastSaved(timeStr);
    } catch (e) {
      console.error('Gagal menyimpan ke LocalStorage:', e);
    }
  }, [identity, observation, sentences, paragraphs]);

  // Reset all state to clean initial
  const handleConfirmReset = () => {
    setIdentity(initialIdentity);
    setObservation(initialObservation);
    setSentences(initialSentences);
    setParagraphs(initialParagraphs);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsResetConfirmOpen(false);
    setActiveTab(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header & Sticky 5-Tab Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastSaved={lastSaved}
        onReset={() => setIsResetConfirmOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {activeTab === 1 && (
          <TabObservasi
            identity={identity}
            setIdentity={setIdentity}
            observation={observation}
            setObservation={setObservation}
            onNextTab={() => setActiveTab(2)}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {activeTab === 2 && (
          <TabKalimat
            observation={observation}
            sentences={sentences}
            setSentences={setSentences}
            onNextTab={() => setActiveTab(3)}
            onPrevTab={() => setActiveTab(1)}
          />
        )}

        {activeTab === 3 && (
          <TabParagraf
            observation={observation}
            sentences={sentences}
            paragraphs={paragraphs}
            setParagraphs={setParagraphs}
            onNextTab={() => setActiveTab(4)}
            onPrevTab={() => setActiveTab(2)}
          />
        )}

        {activeTab === 4 && (
          <TabHasilPdf
            identity={identity}
            paragraphs={paragraphs}
            observation={observation}
            onPrevTab={() => setActiveTab(3)}
          />
        )}

        {activeTab === 5 && (
          <TabPengembang />
        )}
      </main>

      {/* Footer (No print) */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto no-print text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Media Scaffolding Menulis Teks LHO Kelas X • Penelitian Tindakan Kelas (PTK)
          </span>
          <span className="text-emerald-700 font-semibold">
            Wisnu Tri Cahyo (PPG Bahasa Indonesia - Universitas PGRI Yogyakarta)
          </span>
        </div>
      </footer>

      {/* Modal Petunjuk Pengamatan */}
      <ModalPetunjuk
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-xl bg-rose-50">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Kosongkan Semua Data?</h3>
                <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Seluruh isian identitas, jawaban observasi, suntingan kalimat, dan paragraf yang tersimpan di browser ini akan dihapus bersih.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ya, Kosongkan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
