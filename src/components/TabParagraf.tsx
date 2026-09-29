import React, { useState } from 'react';
import { 
  AlignLeft, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  Info, 
  PlusCircle,
  FileCheck
} from 'lucide-react';
import { SentenceRepairData, ParagraphData, ObservationData } from '../types';
import { CONJUNCTION_BANK } from '../data/sampleData';

interface TabParagrafProps {
  observation: ObservationData;
  sentences: SentenceRepairData;
  paragraphs: ParagraphData;
  setParagraphs: React.Dispatch<React.SetStateAction<ParagraphData>>;
  onNextTab: () => void;
  onPrevTab: () => void;
}

export const TabParagraf: React.FC<TabParagrafProps> = ({
  observation,
  sentences,
  paragraphs,
  setParagraphs,
  onNextTab,
  onPrevTab,
}) => {
  const [activeTarget, setActiveTarget] = useState<'pu' | 'db' | 'dm'>('pu');

  const handleParagraphChange = (field: keyof ParagraphData, value: string) => {
    setParagraphs((prev) => ({ ...prev, [field]: value }));
  };

  // Helper to construct automatically from edited sentences
  const handleAutoMergeAll = () => {
    // 1. Pernyataan Umum sentences
    const puList = [
      sentences.pu_namaObjek || observation.pu_namaObjek,
      sentences.pu_kategori || observation.pu_kategori,
      sentences.pu_lokasi || observation.pu_lokasi,
      sentences.pu_waktu || observation.pu_waktu,
      sentences.pu_definisi || observation.pu_definisi,
    ].filter(Boolean).map((s) => s.trim().endsWith('.') ? s.trim() : `${s.trim()}.`);

    // 2. Deskripsi Bagian sentences
    const dbList = [
      sentences.db_ciriFisik || observation.db_ciriFisik,
      sentences.db_bahan || observation.db_bahan,
      sentences.db_komponen || observation.db_komponen,
      sentences.db_warnaTataLetak || observation.db_warnaTataLetak,
      sentences.db_kondisi || observation.db_kondisi,
    ].filter(Boolean).map((s) => s.trim().endsWith('.') ? s.trim() : `${s.trim()}.`);

    // 3. Deskripsi Manfaat sentences
    const dmList = [
      sentences.dm_fungsiSiswa || observation.dm_fungsiSiswa,
      sentences.dm_manfaatSekolah || observation.dm_manfaatSekolah,
      sentences.dm_kesimpulanSaran || observation.dm_kesimpulanSaran,
    ].filter(Boolean).map((s) => s.trim().endsWith('.') ? s.trim() : `${s.trim()}.`);

    const defaultTitle = observation.pu_namaObjek 
      ? `Laporan Hasil Observasi ${observation.pu_namaObjek}`
      : 'Laporan Hasil Observasi Fasilitas Sekolah';

    setParagraphs({
      judul: paragraphs.judul || defaultTitle,
      paragrafPernyataanUmum: puList.join(' '),
      paragrafDeskripsiBagian: dbList.join(' '),
      paragrafDeskripsiManfaat: dmList.join(' '),
    });
  };

  // Insert conjunction into target paragraph
  const insertConjunction = (conjunction: string) => {
    let field: keyof ParagraphData = 'paragrafPernyataanUmum';
    if (activeTarget === 'db') field = 'paragrafDeskripsiBagian';
    if (activeTarget === 'dm') field = 'paragrafDeskripsiManfaat';

    const currentText = paragraphs[field] || '';
    const newText = currentText ? `${currentText.trim()} ${conjunction} ` : `${conjunction} `;
    handleParagraphChange(field, newText);
  };

  // Calculate word count
  const countWords = (text: string) => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const totalWords = 
    countWords(paragraphs.paragrafPernyataanUmum) +
    countWords(paragraphs.paragrafDeskripsiBagian) +
    countWords(paragraphs.paragrafDeskripsiManfaat);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-4 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-200" /> Tahap 3: Scaffolding Kohesi & Koherensi
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Penggabungan Kalimat Menjadi Paragraf Padu
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Satukan kalimat-kalimat efektifmu menjadi 3 struktur utama teks LHO. Gunakan konjungsi antarkalimat 
              agar paragraf mengalir logis dan mudah dipahami pembaca.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAutoMergeAll}
            className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            title="Gabungkan otomatis kalimat dari Tahap 2"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Rangkai Otomatis dari Tahap 2</span>
          </button>
        </div>

        {/* Word Count Indicator */}
        <div className="mt-4 pt-4 border-t border-emerald-600/50 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-100">
          <div>
            Total Panjang Naskah: <strong>{totalWords} Kata</strong>
            <span className="text-[11px] text-emerald-200 ml-2">
              (Standar Teks LHO Kelas X: min. 100 - 250 kata)
            </span>
          </div>
          {totalWords >= 100 && (
            <span className="bg-emerald-500/40 text-emerald-100 px-2 py-0.5 rounded-md font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Struktur Panjang Terpenuhi
            </span>
          )}
        </div>
      </div>

      {/* Judul LHO Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <label className="block text-slate-800 font-bold text-xs sm:text-sm mb-1.5">
          Judul Laporan Hasil Observasi (LHO):
        </label>
        <input
          type="text"
          value={paragraphs.judul || ''}
          onChange={(e) => handleParagraphChange('judul', e.target.value)}
          placeholder="Contoh: Laporan Hasil Observasi Laboratorium Komputer Multimedia SMK Negeri 2 Yogyakarta"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-bold text-sm sm:text-base placeholder:text-slate-400 placeholder:font-normal placeholder:italic outline-hidden bg-slate-50 focus:bg-white transition-all"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          Tips: Buatlah judul yang mencerminkan nama objek secara spesifik dan lugas.
        </p>
      </div>

      {/* Bank Konjungsi Antarkalimat (Scaffolding Tool) */}
      <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-950 text-xs sm:text-sm">
                Bank Konjungsi Antarkalimat (Alat Scaffolding)
              </h3>
              <p className="text-[11px] text-emerald-800">
                Klik konjungsi di bawah ini untuk menyisipkan ke dalam paragraf yang sedang aktif:
              </p>
            </div>
          </div>

          {/* Target Selector */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-emerald-200 text-xs">
            <span className="text-[11px] text-slate-500 font-medium px-1.5">Target:</span>
            <button
              type="button"
              onClick={() => setActiveTarget('pu')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition-colors ${
                activeTarget === 'pu' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Paragraf 1
            </button>
            <button
              type="button"
              onClick={() => setActiveTarget('db')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition-colors ${
                activeTarget === 'db' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Paragraf 2
            </button>
            <button
              type="button"
              onClick={() => setActiveTarget('dm')}
              className={`px-2 py-0.5 rounded-lg font-semibold transition-colors ${
                activeTarget === 'dm' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Paragraf 3
            </button>
          </div>
        </div>

        {/* Buttons List */}
        <div className="flex flex-wrap gap-1.5">
          {CONJUNCTION_BANK.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertConjunction(item.label)}
              title={item.tip}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60 text-xs font-semibold shadow-2xs transition-all active:scale-95"
            >
              <PlusCircle className="w-3 h-3 text-emerald-600" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Paragraph Editors */}
      <div className="space-y-5">
        {/* 1. Paragraf Pernyataan Umum */}
        <div 
          className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs transition-all ${
            activeTarget === 'pu' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
          }`}
          onClick={() => setActiveTarget('pu')}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Paragraf I: Pernyataan Umum & Definisi
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {countWords(paragraphs.paragrafPernyataanUmum)} Kata
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Berisi pengenalan objek, klasifikasi jenis, keterangan waktu/tempat observasi, dan definisi baku (kata adalah/merupakan).
          </p>
          <textarea
            rows={5}
            value={paragraphs.paragrafPernyataanUmum || ''}
            onChange={(e) => handleParagraphChange('paragrafPernyataanUmum', e.target.value)}
            placeholder="Contoh: Laboratorium Komputer Multimedia merupakan salah satu sarana edukasi berbasis digital yang berada di lingkungan SMK Negeri 2 Yogyakarta. Fasilitas ini termasuk ke dalam kategori sarana penunjang pembelajaran teknologi informasi dan komunikasi. Fasilitas ini berlokasi strategis di Gedung Sayap Barat Lantai 2, tepat bersebelahan dengan Ruang Server sekolah. Pengamatan ini dilaksanakan pada hari Senin, 28 September 2026. Secara konseptual, laboratorium komputer multimedia adalah sarana edukasi berbasis teknologi yang dirancang khusus untuk mendukung kegiatan praktikum komputasi peserta didik."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 placeholder:italic leading-relaxed outline-hidden bg-slate-50/40 focus:bg-white resize-y"
          />
        </div>

        {/* 2. Paragraf Deskripsi Bagian */}
        <div 
          className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs transition-all ${
            activeTarget === 'db' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
          }`}
          onClick={() => setActiveTarget('db')}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Paragraf II: Deskripsi Bagian & Rincian Fisik
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {countWords(paragraphs.paragrafDeskripsiBagian)} Kata
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Menguraikan ciri-ciri fisik terukur, bahan baku perabotan, komponen fasilitas, tata warna, dan kondisi riil objek.
          </p>
          <textarea
            rows={7}
            value={paragraphs.paragrafDeskripsiBagian || ''}
            onChange={(e) => handleParagraphChange('paragrafDeskripsiBagian', e.target.value)}
            placeholder="Contoh: Secara fisik, laboratorium komputer ini memiliki luas ruangan sekitar 9 x 8 meter yang dilengkapi dengan pendingin ruangan (AC) sentral serta pencahayaan lampu LED yang memadai. Perabotan di dalamnya terdiri atas meja komputer berbahan kayu lapis berangka besi kokoh serta kursi kerja ergonomis berlapis kain lembut. Komponen utama di dalam ruangan mencakup 36 unit komputer personal dengan spesifikasi mutakhir, proyektor LCD beresolusi tinggi, dan sakelar jaringan LAN gigabit. Seluruh perangkat keras dalam kondisi prima dan kebersihan ruangan terjaga secara optimal."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 placeholder:italic leading-relaxed outline-hidden bg-slate-50/40 focus:bg-white resize-y"
          />
        </div>

        {/* 3. Paragraf Deskripsi Manfaat */}
        <div 
          className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs transition-all ${
            activeTarget === 'dm' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
          }`}
          onClick={() => setActiveTarget('dm')}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Paragraf III: Deskripsi Manfaat & Simpulan
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {countWords(paragraphs.paragrafDeskripsiManfaat)} Kata
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Menjelaskan fungsi objek bagi kegiatan belajar siswa, kontribusinya bagi sekolah, serta penutup simpulan perawatan.
          </p>
          <textarea
            rows={5}
            value={paragraphs.paragrafDeskripsiManfaat || ''}
            onChange={(e) => handleParagraphChange('paragrafDeskripsiManfaat', e.target.value)}
            placeholder="Contoh: Keberadaan laboratorium komputer multimedia memiliki fungsi vital bagi seluruh sivitas akademika. Bagi peserta didik, fasilitas ini berfungsi sebagai wahana eksplorasi untuk mengasah keterampilan coding, desain grafis, dan simulasi asesmen berbasis komputer. Di samping itu, bagi pihak sekolah, sarana ini mendukung peningkatan indeks literasi digital sekolah. Dengan demikian, laboratorium komputer multimedia merupakan aset pendidikan yang sangat berharga sehingga disiplin pemeliharaannya wajib ditegakkan."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 placeholder:italic leading-relaxed outline-hidden bg-slate-50/40 focus:bg-white resize-y"
          />
        </div>
      </div>

      {/* Bottom Navigation CTAs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <button
          type="button"
          onClick={onPrevTab}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kalimat</span>
        </button>

        <button
          type="button"
          onClick={onNextTab}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 order-1 sm:order-2"
        >
          <span>Lanjut ke Tahap 4: Pratinjau & Ekspor PDF</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
