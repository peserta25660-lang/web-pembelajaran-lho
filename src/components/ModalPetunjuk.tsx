import React from 'react';
import { X, BookOpen, Lightbulb, Compass, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface ModalPetunjukProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPetunjuk: React.FC<ModalPetunjukProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600/60 rounded-xl">
              <BookOpen className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Petunjuk Pengamatan LHO</h2>
              <p className="text-xs text-emerald-100">Prinsip Meaningful Learning (Pembelajaran Bermakna Ausubel)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-600/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {/* Konsep Meaningful Learning */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm mb-1">Apa itu Pengamatan Bermakna (Meaningful Learning)?</h4>
              <p className="text-emerald-800 text-xs">
                Kamu tidak perlu mengarang atau berimajinasi abstrak! Amatilah <strong>objek atau fasilitas nyata yang ada di lingkungan sekolahmu</strong>. 
                Dengan mengamati langsung melalui panca indra (melihat, meraba, mengukur), pengetahuan barumu akan bermakna dan mudah dituangkan ke dalam teks laporan.
              </p>
            </div>
          </div>

          {/* Rekomendasi Objek Observasi di Sekolah */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <Compass className="w-4 h-4 text-emerald-600" />
              Contoh Objek Nyata di Lingkungan Sekolah:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-emerald-700">1. Laboratorium Komputer / IPA:</span>
                <p className="text-slate-600 mt-0.5">Perangkat PC, proyektor, mikroskop, luas ruangan, dan fungsinya.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-emerald-700">2. Perpustakaan Sekolah:</span>
                <p className="text-slate-600 mt-0.5">Koleksi buku, rak katalog, meja baca, sirkulasi peminjaman.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-emerald-700">3. Kantin Sehat Sekolah:</span>
                <p className="text-slate-600 mt-0.5">Stan makanan higienis, tempat cuci tangan, tata letak meja.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-emerald-700">4. Taman / Hutan Sekolah:</span>
                <p className="text-slate-600 mt-0.5">Spesies tanaman obat (TOGA), sistem penyiraman, gazebo belajar.</p>
              </div>
            </div>
          </div>

          {/* Aturan Emas Teks LHO */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <Layers className="w-4 h-4 text-emerald-600" />
              Karakteristik Utama Teks LHO (Wajib Diperhatikan):
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Objektif & Berdasarkan Fakta:</strong> Tuliskan apa yang benar-benar ada di lapangan, bukan dugaan atau prasangka.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Gunakan Kalimat Definisi Baku:</strong> Pada bagian pernyataan umum, gunakan kata kopula <em>"adalah"</em> atau <em>"merupakan"</em>.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Hindari Opini Subjektif Berlebihan:</strong> Kurangi kata seperti <em>"sangat bagus sekali"</em>, <em>"indah memukau"</em>. Ganti dengan fakta terukur, misalnya <em>"kondisi cat terawat rapi"</em>.</span>
              </li>
            </ul>
          </div>

          {/* 4 Tahap Scaffolding */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold text-slate-800 text-sm mb-1.5">Alur Kerja Scaffolding Mandiri:</h4>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600">
              <li><strong>Tahap 1 (Observasi):</strong> Jawab 13 pertanyaan terpandu sesuai objek nyata yang kamu lihat.</li>
              <li><strong>Tahap 2 (Kalimat):</strong> Perbaiki draf kalimat agar efektif sesuai kaidah PUEBI/EYD VI.</li>
              <li><strong>Tahap 3 (Paragraf):</strong> Rangkai kalimat-kalimat menjadi 3 paragraf kohesif dengan konjungsi antarkalimat.</li>
              <li><strong>Tahap 4 (Hasil & PDF):</strong> Periksa lembar kerja LHO dan unduh lembar PDF atau cetak sebagai portofolio.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            Mengerti, Mulai Observasi
          </button>
        </div>
      </div>
    </div>
  );
};
