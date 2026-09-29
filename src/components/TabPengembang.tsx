import React from 'react';
import { 
  GraduationCap, 
  User, 
  School, 
  BookOpen, 
  CheckCircle2, 
  Mail, 
  Award, 
  Layers, 
  Target, 
  FileCheck,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { RUBRIK_PENILAIAN } from '../data/scaffoldingGuide';

export const TabPengembang: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Banner Profil */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-5 sm:p-7 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white shadow-md shrink-0">
              <GraduationCap className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-200" />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/70 px-2.5 py-0.5 rounded-full border border-emerald-400/30 text-emerald-100">
                <Sparkles className="w-3 h-3 text-emerald-200" /> Pengembang Media Pembelajaran PTK
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Wisnu Tri Cahyo
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                NIM: 25248610027 • PPG Calon Guru / Daljab Bahasa Indonesia
              </p>
              <p className="text-xs text-emerald-200/90 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5" />
                <span>Universitas PGRI Yogyakarta (UPY)</span>
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 sm:p-4 rounded-xl border border-white/20 text-xs text-emerald-100 space-y-1 self-start md:self-auto">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span>Kontak Pengembang:</span>
            </div>
            <a 
              href="mailto:wisnutric03@gmail.com" 
              className="text-emerald-200 hover:text-white underline block"
            >
              wisnutric03@gmail.com
            </a>
            <span className="text-[11px] text-emerald-300/80 block">
              Universitas PGRI Yogyakarta
            </span>
          </div>
        </div>
      </div>

      {/* Rincian Profil & Identitas Penelitian Tindakan Kelas (PTK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Data Peneliti & LPTK */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <User className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Identitas Peneliti & LPTK
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Nama Lengkap</span>
              <span className="font-bold text-slate-900">Wisnu Tri Cahyo</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Nomor Induk Mahasiswa (NIM)</span>
              <span className="font-mono font-bold text-emerald-700">25248610027</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Program Studi</span>
              <span className="font-semibold text-slate-900">Pendidikan Profesi Guru (PPG) Bahasa Indonesia</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Perguruan Tinggi (LPTK)</span>
              <span className="font-semibold text-slate-900">Universitas PGRI Yogyakarta</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Sasaran Pengguna</span>
              <span className="font-semibold text-emerald-700">Peserta Didik Fase E / Kelas X SMA/SMK</span>
            </div>
          </div>
        </div>

        {/* Card 2: Fokus PTK & Teori Belajar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Fokus Penelitian Tindakan Kelas (PTK)
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <p className="leading-relaxed">
              <strong>Judul PTK:</strong> <em>"Peningkatan Keterampilan Menulis Teks Laporan Hasil Observasi (LHO) Melalui Media Pembelajaran Interaktif Berbasis Scaffolding Digital pada Siswa Kelas X"</em>.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="font-semibold text-emerald-800 block">Landasan Teoretis:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                <li><strong>Scaffolding (Lev Vygotsky):</strong> Pendampingan berjenjang dari Zona Perkembangan Proksimal (ZPD) hingga siswa mandiri.</li>
                <li><strong>Meaningful Learning (David Ausubel):</strong> Menghubungkan teks dengan objek fisik nyata di sekolah.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Petunjuk Penggunaan untuk Guru dan Siswa */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            Petunjuk Penggunaan Media Pembelajaran
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Untuk Siswa */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <User className="w-4 h-4 text-emerald-700" />
              <span>Petunjuk untuk Siswa:</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 leading-relaxed">
              <li>
                <strong>Bawa HP saat observasi di sekolah:</strong> Datangi fasilitas yang ingin diamati (perpustakaan, lab, kantin, dll).
              </li>
              <li>
                <strong>Tab 1 (Observasi):</strong> Jawab 13 pertanyaan pemandu satu per satu. Data disimpan otomatis di browsermu.
              </li>
              <li>
                <strong>Tab 2 (Kalimat):</strong> Ubah jawaban mentah menjadi kalimat efektif. Perhatikan huruf kapital dan tanda titik.
              </li>
              <li>
                <strong>Tab 3 (Paragraf):</strong> Rangkai kalimat menjadi 3 paragraf utuh dengan bantuan tombol "Bank Konjungsi".
              </li>
              <li>
                <strong>Tab 4 (PDF):</strong> Unduh file PDF hasil karyamu atau gunakan "Cetak via Browser" untuk disimpan di HP dan diserahkan ke guru.
              </li>
            </ol>
          </div>

          {/* Untuk Guru */}
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-teal-950 font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>Petunjuk untuk Guru Pengampu:</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 leading-relaxed">
              <li>
                <strong>Fasilitasi Siklus PTK:</strong> Bagikan tautan aplikasi web ini kepada siswa di awal jam pelajaran materi Teks LHO.
              </li>
              <li>
                <strong>Eksplorasi Lapangan (30 Menit):</strong> Instruksikan siswa berpencar mengamati fasilitas sekolah secara berkelompok atau individu.
              </li>
              <li>
                <strong>Pendampingan Berjenjang (Scaffolding):</strong> Bimbing siswa pada Tab 2 dan 3 untuk memperbaiki kohesi dan koherensi.
              </li>
              <li>
                <strong>Pengumpulan & Asesmen:</strong> Terima hasil ekspor PDF siswa dan berikan penilaian formatif berdasar rubrik di bawah.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Rubrik Penilaian Teks LHO Kelas X */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Rubrik Penilaian Keterampilan Menulis Teks LHO
              </h3>
              <p className="text-xs text-slate-500">
                Pedoman penskoran autentik Kurikulum Merdeka Bahasa Indonesia Kelas X
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
            Skala Skor 1 - 4
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-2.5 font-bold w-1/4">Aspek Penilaian</th>
                <th className="p-2.5 font-bold text-emerald-800">Sangat Baik (Skor 4)</th>
                <th className="p-2.5 font-bold text-slate-800">Baik (Skor 3)</th>
                <th className="p-2.5 font-bold text-slate-800">Cukup (Skor 2)</th>
                <th className="p-2.5 font-bold text-rose-800">Perlu Bimbingan (Skor 1)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {RUBRIK_PENILAIAN.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-2.5 font-semibold text-slate-800 align-top bg-slate-50/50">
                    {item.aspek}
                  </td>
                  <td className="p-2.5 align-top text-emerald-900 bg-emerald-50/30">
                    {item.skor4}
                  </td>
                  <td className="p-2.5 align-top">
                    {item.skor3}
                  </td>
                  <td className="p-2.5 align-top">
                    {item.skor2}
                  </td>
                  <td className="p-2.5 align-top text-rose-900 bg-rose-50/20">
                    {item.skor1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-2">
          <span>Nilai Akhir = (Total Perolehan Skor / 16) × 100</span>
          <span className="font-semibold text-emerald-700">Kriteria Ketercapaian Tujuan Pembelajaran (KKTP): 75</span>
        </div>
      </div>
    </div>
  );
};
