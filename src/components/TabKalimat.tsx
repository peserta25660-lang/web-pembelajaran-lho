import React, { useState } from 'react';
import { 
  Edit3, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  RotateCcw,
  Check,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { ObservationData, SentenceRepairData } from '../types';
import { 
  PERNYATAAN_UMUM_QUESTIONS, 
  DESKRIPSI_BAGIAN_QUESTIONS, 
  DESKRIPSI_MANFAAT_QUESTIONS,
  QuestionScaffold 
} from '../data/scaffoldingGuide';

interface TabKalimatProps {
  observation: ObservationData;
  sentences: SentenceRepairData;
  setSentences: React.Dispatch<React.SetStateAction<SentenceRepairData>>;
  onNextTab: () => void;
  onPrevTab: () => void;
}

export const TabKalimat: React.FC<TabKalimatProps> = ({
  observation,
  sentences,
  setSentences,
  onNextTab,
  onPrevTab,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pu' | 'db' | 'dm'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSentenceChange = (field: keyof SentenceRepairData, value: string) => {
    setSentences((prev) => ({ ...prev, [field]: value }));
  };

  // Sync all raw answers from observation to sentences if sentences are empty
  const handleSyncAllFromRaw = () => {
    setSentences((prev) => {
      const next = { ...prev };
      (Object.keys(observation) as (keyof ObservationData)[]).forEach((key) => {
        if (!next[key] && observation[key]) {
          next[key] = observation[key];
        }
      });
      return next;
    });
  };

  const copyRawToSentence = (field: keyof SentenceRepairData, rawValue: string) => {
    handleSentenceChange(field, rawValue);
    setCopiedId(field);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const applyScaffoldSuggestion = (q: QuestionScaffold) => {
    const raw = observation[q.field as keyof ObservationData] || '';
    let suggestionText = q.sentenceScaffold.suggestion;
    if (raw) {
      if (q.id === 'pu_namaObjek') {
        suggestionText = `${raw} merupakan salah satu fasilitas penting yang ada di lingkungan sekolah kami.`;
      } else if (q.id === 'pu_kategori') {
        suggestionText = `Fasilitas ini tergolong ke dalam ${raw.toLowerCase().startsWith('sarana') || raw.toLowerCase().startsWith('fasilitas') ? raw : 'kategori ' + raw}.`;
      } else if (q.id === 'pu_lokasi') {
        suggestionText = `Objek ini berlokasi di ${raw}.`;
      } else if (q.id === 'pu_waktu') {
        suggestionText = `Pengamatan langsung dilaksanakan pada ${raw}.`;
      } else if (q.id === 'pu_definisi') {
        suggestionText = raw.includes('adalah') || raw.includes('merupakan') 
          ? raw 
          : `${observation.pu_namaObjek || 'Objek ini'} adalah ${raw}`;
      } else {
        suggestionText = raw.endsWith('.') ? raw : `${raw}.`;
      }
    }
    handleSentenceChange(q.field as keyof SentenceRepairData, suggestionText);
  };

  // Grammar & Quality Checker for each sentence
  const checkQuality = (text: string) => {
    if (!text || text.trim().length === 0) {
      return { isClean: false, startsCap: false, endsDot: false, noBadConjunction: true, lengthOk: false };
    }
    const trimmed = text.trim();
    const startsCap = /^[A-Z0-9"']/.test(trimmed);
    const endsDot = trimmed.endsWith('.') || trimmed.endsWith('!') || trimmed.endsWith('?');
    const lengthOk = trimmed.length >= 15;
    
    // Check if sentence starts with forbidden intrakalimat conjunction (e.g. "Dan", "Sehingga", "Karena", "Tetapi")
    const lowerFirstWord = trimmed.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    const badStarters = ['dan', 'sehingga', 'karena', 'tetapi', 'sedangkan', 'atau'];
    const noBadConjunction = !badStarters.includes(lowerFirstWord);

    const isClean = startsCap && endsDot && lengthOk && noBadConjunction;
    return { isClean, startsCap, endsDot, noBadConjunction, lengthOk };
  };

  const renderSentenceCard = (q: QuestionScaffold) => {
    const rawVal = observation[q.field as keyof ObservationData] || '';
    const currentVal = sentences[q.field as keyof SentenceRepairData] || '';
    const quality = checkQuality(currentVal);

    return (
      <div 
        key={q.id}
        className={`bg-white rounded-xl border p-4 sm:p-5 shadow-2xs transition-all ${
          quality.isClean ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {q.questionNumber}
            </span>
            <span className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-1">
              {q.question}
            </span>
          </div>
          {quality.isClean && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Efektif
            </span>
          )}
        </div>

        {/* Original Draft Display (from Tab 1) */}
        <div className="mb-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium mb-1">
            <span>Draf Jawaban Mentah (Tahap 1):</span>
            {rawVal && (
              <button
                type="button"
                onClick={() => copyRawToSentence(q.field as keyof SentenceRepairData, rawVal)}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                title="Salin ke area sunting"
              >
                {copiedId === q.field ? (
                  <span className="text-emerald-700 flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Tersalin
                  </span>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin ke Suntingan</span>
                  </>
                )}
              </button>
            )}
          </div>
          <p className="text-slate-700 italic">
            {rawVal ? `"${rawVal}"` : <span className="text-amber-700 font-normal">Belum diisi di Tahap 1.</span>}
          </p>
        </div>

        {/* Scaffolding Helper Box */}
        <div className="mb-3 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-900 block">Kaidah Kalimat Efektif:</span>
            <p className="text-emerald-800 text-[11px]">{q.sentenceScaffold.rule}</p>
          </div>
          <button
            type="button"
            onClick={() => applyScaffoldSuggestion(q)}
            className="self-start sm:self-center shrink-0 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>Terapkan Pola Efektif</span>
          </button>
        </div>

        {/* Editing Area */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Kalimat Efektif Hasil Suntinganmu:
          </label>
          <textarea
            rows={2}
            value={currentVal || ''}
            onChange={(e) => handleSentenceChange(q.field as keyof SentenceRepairData, e.target.value)}
            placeholder={`Contoh: ${q.sentenceScaffold.suggestion}`}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 placeholder:italic outline-hidden transition-all bg-white"
          />

          {/* Quality Indicator Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
            <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
              quality.startsCap ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100 text-slate-500'
            }`}>
              {quality.startsCap ? '✓' : '•'} Huruf Kapital Awal
            </span>
            <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
              quality.endsDot ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100 text-slate-500'
            }`}>
              {quality.endsDot ? '✓' : '•'} Tanda Titik Akhir (.)
            </span>
            <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
              quality.noBadConjunction ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-rose-100 text-rose-800 font-bold'
            }`}>
              {quality.noBadConjunction ? '✓' : '✗'} Bukan Konjungsi Terlarang di Awal
            </span>
            <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
              quality.lengthOk ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100 text-slate-500'
            }`}>
              {quality.lengthOk ? '✓' : '•'} Panjang Kalimat ({currentVal.length} kar)
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Calculate overall effectiveness score in Tab 2
  const allFields = [
    ...PERNYATAAN_UMUM_QUESTIONS,
    ...DESKRIPSI_BAGIAN_QUESTIONS,
    ...DESKRIPSI_MANFAAT_QUESTIONS,
  ];
  const effectiveCount = allFields.filter((q) => {
    const text = sentences[q.field as keyof SentenceRepairData] || '';
    return checkQuality(text).isClean;
  }).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Scaffolding Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-4 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-200" /> Tahap 2: Scaffolding Kalimat Efektif
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Penyuntingan Kalimat Sesuai PUEBI / EYD VI
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Ubah draf jawaban mentah hasil observasimu menjadi kalimat tunggal atau majemuk yang baku, 
              padat informasi, dan tidak bertele-tele sebelum digabung menjadi paragraf.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSyncAllFromRaw}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
              title="Salin jawaban mentah yang belum diedit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tarik Semua dari Observasi</span>
            </button>
          </div>
        </div>

        {/* Quality Progress */}
        <div className="mt-4 pt-4 border-t border-emerald-600/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-100">
          <span>Kesiapan Kalimat Efektif: <strong>{effectiveCount} dari 13 Kalimat Siap</strong></span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-emerald-200">
              {effectiveCount === 13 ? '🌟 Sempurna! Siap disusun ke paragraf.' : 'Sunting draf kalimat agar memenuhi standar baku.'}
            </span>
          </div>
        </div>
      </div>

      {/* Scaffolding Rules Guide Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          5 Prinsip Scaffolding Kalimat Teks LHO:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-600">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-800 block text-xs">1. Subjek & Predikat Jelas</strong>
            <span>Setiap kalimat harus memiliki subjek yang pasti dan predikat yang tidak menggantung.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-800 block text-xs">2. Huruf Kapital & Tanda Titik</strong>
            <span>Awali kalimat dengan huruf kapital, gunakan kapital untuk nama geografi/sekolah, dan akhiri tanda titik.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-800 block text-xs">3. Hindari Konjungsi di Awal</strong>
            <span>Jangan mengawali kalimat mandiri dengan kata "Dan", "Sehingga", "Karena", atau "Tetapi".</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-800 block text-xs">4. Gunakan Verba Kopula Baku</strong>
            <span>Gunakan "adalah" atau "merupakan" pada definisi umum, bukan "yaitu" di awal klausa utama.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-800 block text-xs">5. Fakta Terukur (Tanpa Opini)</strong>
            <span>Hindari kata berlebihan seperti "sangat bagus sekali". Sebutkan data fisik konkret objek.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-medium text-center">
            <span>Gunakan tombol "Terapkan Pola Efektif" untuk bantuan contoh instan!</span>
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeCategory === 'all' 
              ? 'bg-emerald-600 text-white shadow-2xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Semua Bagian (13)
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('pu')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeCategory === 'pu' 
              ? 'bg-emerald-600 text-white shadow-2xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          I. Pernyataan Umum (5)
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('db')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeCategory === 'db' 
              ? 'bg-emerald-600 text-white shadow-2xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          II. Deskripsi Bagian (5)
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('dm')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeCategory === 'dm' 
              ? 'bg-emerald-600 text-white shadow-2xs' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          III. Deskripsi Manfaat (3)
        </button>
      </div>

      {/* Render Questions based on Filter */}
      <div className="space-y-4">
        {(activeCategory === 'all' || activeCategory === 'pu') && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Bagian 1: Pernyataan Umum & Definisi
            </h3>
            {PERNYATAAN_UMUM_QUESTIONS.map((q) => renderSentenceCard(q))}
          </div>
        )}

        {(activeCategory === 'all' || activeCategory === 'db') && (
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              Bagian 2: Deskripsi Bagian & Rincian Fisik
            </h3>
            {DESKRIPSI_BAGIAN_QUESTIONS.map((q) => renderSentenceCard(q))}
          </div>
        )}

        {(activeCategory === 'all' || activeCategory === 'dm') && (
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Bagian 3: Deskripsi Manfaat & Simpulan
            </h3>
            {DESKRIPSI_MANFAAT_QUESTIONS.map((q) => renderSentenceCard(q))}
          </div>
        )}
      </div>

      {/* Bottom Navigation CTAs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <button
          type="button"
          onClick={onPrevTab}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Observasi</span>
        </button>

        <button
          type="button"
          onClick={onNextTab}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 order-1 sm:order-2"
        >
          <span>Lanjut ke Tahap 3: Penggabungan Paragraf</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
