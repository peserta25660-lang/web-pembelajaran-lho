import React, { useState } from 'react';
import { 
  User, 
  School, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Check, 
  Info,
  Sparkles,
  ClipboardList,
  Building,
  Hash
} from 'lucide-react';
import { StudentIdentity, ObservationData } from '../types';
import { 
  PERNYATAAN_UMUM_QUESTIONS, 
  DESKRIPSI_BAGIAN_QUESTIONS, 
  DESKRIPSI_MANFAAT_QUESTIONS,
  QuestionScaffold 
} from '../data/scaffoldingGuide';

interface TabObservasiProps {
  identity: StudentIdentity;
  setIdentity: React.Dispatch<React.SetStateAction<StudentIdentity>>;
  observation: ObservationData;
  setObservation: React.Dispatch<React.SetStateAction<ObservationData>>;
  onNextTab: () => void;
  onOpenGuide: () => void;
}

export const TabObservasi: React.FC<TabObservasiProps> = ({
  identity,
  setIdentity,
  observation,
  setObservation,
  onNextTab,
  onOpenGuide,
}) => {
  // Track open scaffolding tips per question ID
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleIdentityChange = (field: keyof StudentIdentity, value: string) => {
    setIdentity((prev) => ({ ...prev, [field]: value }));
  };

  const handleObservationChange = (field: keyof ObservationData, value: string) => {
    setObservation((prev) => ({ ...prev, [field]: value }));
  };

  // Quick calculate completed questions
  const totalQuestions = 13;
  const answeredCount = Object.values(observation).filter((val) => val && val.trim().length > 3).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const renderQuestionCard = (q: QuestionScaffold, index: number) => {
    const value = observation[q.field as keyof ObservationData] || '';
    const isHintOpen = !!openHints[q.id];
    const isFilled = value.trim().length > 0;

    return (
      <div 
        key={q.id}
        className={`bg-white rounded-xl border p-4 sm:p-5 transition-all shadow-2xs ${
          isFilled ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isFilled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {q.questionNumber}
            </span>
            {isFilled && (
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 gap-0.5">
                <Check className="w-3 h-3" /> Terisi
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleHint(q.id)}
            className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>{isHintOpen ? 'Tutup Tips' : 'Tips Scaffolding'}</span>
            {isHintOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-1">
          {q.question}
        </h4>
        <p className="text-xs text-slate-500 mb-3">
          {q.subGuide}
        </p>

        {/* Collapsible Scaffolding Box */}
        {isHintOpen && (
          <div className="mb-3 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-start gap-1.5 font-semibold text-emerald-900">
              <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span>Petunjuk Observasi Lapangan:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-emerald-800 pl-1">
              {q.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
            <div className="pt-1.5 border-t border-emerald-200/60 flex items-start gap-1.5">
              <span className="font-semibold text-emerald-900 shrink-0">Contoh Jawaban:</span>
              <span className="text-slate-700 italic">"{q.example}"</span>
            </div>
            <div className="text-[11px] bg-white/70 p-2 rounded-lg border border-emerald-200/50 text-slate-700">
              <strong className="text-emerald-800">Tips Kalimat:</strong> {q.sentenceScaffold.rule}
            </div>
          </div>
        )}

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={2}
            value={value}
            onChange={(e) => handleObservationChange(q.field as keyof ObservationData, e.target.value)}
            placeholder={q.placeholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-hidden transition-all bg-slate-50/50 focus:bg-white resize-y"
          />
          <div className="flex justify-end items-center mt-1 px-1 text-[11px] text-slate-400">
            <span>{value.length > 0 ? `${value.length} karakter` : 'Belum diisi'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner Meaningful Learning Card */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-4 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-200" /> Tahap 1: Pengamatan Terbimbing
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Observasi Objek Nyata di Lingkungan Sekolah
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Catat fakta empiris yang kamu lihat, sentuh, dan ukur secara langsung pada fasilitas sekolah.
              Jawab pertanyaan berurutan di bawah ini untuk membentuk bahan tulisan teks LHO yang lengkap.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenGuide}
            className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Buka Petunjuk Pengamatan</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-emerald-600/50">
          <div className="flex items-center justify-between text-xs text-emerald-100 mb-1.5">
            <span>Progres Pengisian Pertanyaan Observasi</span>
            <span className="font-bold">{answeredCount} dari {totalQuestions} Soal ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-emerald-950/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-300 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Identitas Siswa / Pengamat (Form Input) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Identitas Siswa / Pengamat
            </h3>
            <p className="text-xs text-slate-500">
              Lengkapi identitasmu untuk lembar kerja resmi LHO
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          {/* 1. Nama Lengkap */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              1. Nama Lengkap Siswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={identity.namaLengkap || ''}
              onChange={(e) => handleIdentityChange('namaLengkap', e.target.value)}
              placeholder="Contoh: Ahmad Fauzi Pratama"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder:text-slate-400 outline-hidden transition-all bg-slate-50 focus:bg-white text-xs sm:text-sm"
            />
          </div>

          {/* 2. Kelas */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              2. Kelas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={identity.kelas || ''}
              onChange={(e) => handleIdentityChange('kelas', e.target.value)}
              placeholder="Contoh: X-A"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder:text-slate-400 outline-hidden transition-all bg-slate-50 focus:bg-white text-xs sm:text-sm"
            />
          </div>

          {/* 3. Jurusan */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              3. Jurusan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={identity.jurusan || ''}
              onChange={(e) => handleIdentityChange('jurusan', e.target.value)}
              placeholder="Contoh: Rekayasa Perangkat Lunak (RPL)"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder:text-slate-400 outline-hidden transition-all bg-slate-50 focus:bg-white text-xs sm:text-sm"
            />
          </div>

          {/* 4. Nomor Absen */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              4. Nomor Presensi (Absen) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={identity.nomorAbsen || ''}
              onChange={(e) => handleIdentityChange('nomorAbsen', e.target.value)}
              placeholder="Contoh: 04"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder:text-slate-400 outline-hidden transition-all bg-slate-50 focus:bg-white text-xs sm:text-sm"
            />
          </div>

          {/* 5. Nama Sekolah */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              5. Nama Sekolah / Instansi
            </label>
            <input
              type="text"
              value={identity.namaSekolah || ''}
              onChange={(e) => handleIdentityChange('namaSekolah', e.target.value)}
              placeholder="Contoh: SMA Negeri 1 / SMK Negeri 2 Yogyakarta"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder:text-slate-400 outline-hidden transition-all bg-slate-50 focus:bg-white text-xs sm:text-sm"
            />
          </div>

          {/* 6. Waktu Observasi */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              6. Waktu Observasi (Tanggal)
            </label>
            <input
              type="date"
              value={identity.waktuObservasi || ''}
              onChange={(e) => handleIdentityChange('waktuObservasi', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 outline-hidden transition-all bg-slate-50 focus:bg-white text-xs sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* Bagian 1: Pernyataan Umum / Klasifikasi (5 Soal Guided) */}
      <section className="space-y-3">
        <div className="bg-emerald-50/70 border-l-4 border-emerald-600 px-4 py-3 rounded-r-xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold text-xs px-2 py-0.5 rounded-md">
              Struktur I
            </span>
            <h3 className="font-bold text-emerald-950 text-sm sm:text-base">
              Pernyataan Umum & Klasifikasi (5 Soal Terpandu)
            </h3>
          </div>
          <p className="text-xs text-emerald-800 mt-1">
            Fokus: Memperkenalkan nama objek, klasifikasi jenis, lokasi, waktu observasi, dan definisi baku (kata kopula).
          </p>
        </div>

        <div className="space-y-3">
          {PERNYATAAN_UMUM_QUESTIONS.map((q, idx) => renderQuestionCard(q, idx))}
        </div>
      </section>

      {/* Bagian 2: Deskripsi Bagian (5 Soal Rincian Objek) */}
      <section className="space-y-3 pt-2">
        <div className="bg-teal-50/70 border-l-4 border-teal-600 px-4 py-3 rounded-r-xl">
          <div className="flex items-center gap-2">
            <span className="bg-teal-600 text-white font-bold text-xs px-2 py-0.5 rounded-md">
              Struktur II
            </span>
            <h3 className="font-bold text-teal-950 text-sm sm:text-base">
              Deskripsi Bagian (5 Soal Rincian Objek)
            </h3>
          </div>
          <p className="text-xs text-teal-800 mt-1">
            Fokus: Menguraikan ciri fisik terukur, bahan penyusun, komponen utama, tata warna/letak, dan kondisi nyata saat diamati.
          </p>
        </div>

        <div className="space-y-3">
          {DESKRIPSI_BAGIAN_QUESTIONS.map((q, idx) => renderQuestionCard(q, idx + 5))}
        </div>
      </section>

      {/* Bagian 3: Deskripsi Manfaat / Kesimpulan (3 Soal) */}
      <section className="space-y-3 pt-2">
        <div className="bg-emerald-50/70 border-l-4 border-emerald-600 px-4 py-3 rounded-r-xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold text-xs px-2 py-0.5 rounded-md">
              Struktur III
            </span>
            <h3 className="font-bold text-emerald-950 text-sm sm:text-base">
              Deskripsi Manfaat & Simpulan
            </h3>
          </div>
          <p className="text-xs text-emerald-800 mt-1">
            Fokus: Menguraikan fungsi objek bagi aktivitas belajar siswa, manfaat bagi sekolah, serta simpulan/saran perawatan bersama.
          </p>
        </div>

        <div className="space-y-3">
          {DESKRIPSI_MANFAAT_QUESTIONS.map((q, idx) => renderQuestionCard(q, idx + 10))}
        </div>
      </section>

      {/* Bottom Navigation CTA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-slate-800 text-sm">
            Sudah selesai mencatat data observasi?
          </h4>
          <p className="text-xs text-slate-500">
            Lanjutkan ke Tahap 2 untuk menyunting jawaban mentah menjadi kalimat efektif sesuai kaidah PUEBI/EYD VI.
          </p>
        </div>
        <button
          type="button"
          onClick={onNextTab}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <span>Lanjut ke Tahap 2: Kalimat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
