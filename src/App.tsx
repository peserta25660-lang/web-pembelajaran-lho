import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. TIPE DATA (TYPES)
// ==========================================
export interface StudentIdentity {
  namaLengkap: string;
  kelas: string;
  jurusan: string;
  nomorAbsen: string;
  namaSekolah: string;
  waktuObservasi: string;
}

export interface ObservationData {
  pu_namaObjek: string;
  pu_kategori: string;
  pu_lokasi: string;
  pu_waktu: string;
  pu_definisi: string;
  db_ciriFisik: string;
  db_bahanMaterial: string;
  db_komponen: string;
  db_warnaTataLetak: string;
  db_kondisi: string;
  dm_fungsiSiswa: string;
  dm_manfaatSekolah: string;
  dm_kesimpulanSaran: string;
}

export interface SentenceRepairData {
  pu_namaObjek: string;
  pu_kategori: string;
  pu_lokasi: string;
  pu_waktu: string;
  pu_definisi: string;
  db_ciriFisik: string;
  db_bahanMaterial: string;
  db_komponen: string;
  db_warnaTataLetak: string;
  db_kondisi: string;
  dm_fungsiSiswa: string;
  dm_manfaatSekolah: string;
  dm_kesimpulanSaran: string;
}

export interface ParagraphData {
  judul: string;
  paragrafPernyataanUmum: string;
  paragrafDeskripsiBagian: string;
  paragrafDeskripsiManfaat: string;
}

interface QuestionScaffold {
  id: keyof ObservationData;
  field: keyof ObservationData;
  questionNumber: string;
  question: string;
  subGuide: string;
  placeholder: string;
  sentencePrompt: string;
  sentenceSuggestion: string;
  hints: string[];
  example: string;
  sentenceRule: string;
}

// ==========================================
// 2. DATA PANDUAN SCAFFOLDING (QUESTIONS & PLACEHOLDERS)
// ==========================================
const PERNYATAAN_UMUM_QUESTIONS: QuestionScaffold[] = [
  {
    id: 'pu_namaObjek',
    field: 'pu_namaObjek',
    questionNumber: 'Soal 1',
    question: 'Apa nama objek / fasilitas yang kamu amati?',
    subGuide: 'Sebutkan nama objek atau fasilitas sekolah secara spesifik dan jelas.',
    placeholder: 'Contoh: Laboratorium Komputer Multimedia SMA Negeri 1',
    sentencePrompt: 'Kalimat subjek pengamatan',
    sentenceSuggestion: 'Objek yang diobservasi adalah Laboratorium Komputer Multimedia.',
    hints: [
      'Pilih fasilitas nyata di lingkungan sekolah yang mudah diakses dan diamati langsung.',
      'Gunakan nama resmi atau sebutan baku objek tersebut di sekolahmu.'
    ],
    example: 'Laboratorium Komputer Multimedia SMA Negeri 1',
    sentenceRule: 'Gunakan frasa pembuka yang lugas. Hindari kata opini subjektif seperti "sangat keren".'
  },
  {
    id: 'pu_kategori',
    field: 'pu_kategori',
    questionNumber: 'Soal 2',
    question: 'Masuk dalam kategori / jenis apakah objek tersebut?',
    subGuide: 'Tentukan klasifikasi objek (misal: sarana prasarana penunjang pembelajaran TIK).',
    placeholder: 'Contoh: Fasilitas sarana prasarana penunjang pembelajaran TIK dan multimedia',
    sentencePrompt: 'Kalimat klasifikasi / pengelompokan',
    sentenceSuggestion: 'Fasilitas ini termasuk dalam sarana penunjang utama pembelajaran TIK.',
    hints: [
      'Hubungkan fungsi umum objek dengan kegiatan akademis di sekolah.',
      'Gunakan istilah pengelompokan baku (sarana prasarana, fasilitas sanitasi, ruang literasi, dll.).'
    ],
    example: 'Sarana prasarana penunjang pembelajaran teknologi informasi dan multimedia.',
    sentenceRule: 'Gunakan kata kerja klasifikasi seperti "termasuk ke dalam", "tergolong", atau "diklasifikasikan sebagai".'
  },
  {
    id: 'pu_lokasi',
    field: 'pu_lokasi',
    questionNumber: 'Soal 3',
    question: 'Di mana lokasi keberadaan objek tersebut di sekolah?',
    subGuide: 'Sebutkan letak atau posisi ruangan/objek di lingkungan sekolah.',
    placeholder: 'Contoh: Gedung Sayap Barat Lantai 2, bersebelahan dengan Ruang Server',
    sentencePrompt: 'Kalimat keterangan lokasi',
    sentenceSuggestion: 'Laboratorium ini berlokasi di Gedung Sayap Barat Lantai 2 sekolah.',
    hints: [
      'Sebutkan patokan lantai, sayap gedung, atau ruangan penting di sekitarnya.',
      'Perhatikan penulisan kata depan "di" yang menunjukkan tempat harus dipisah (di gedung, di lantai).'
    ],
    example: 'Gedung Sayap Barat Lantai 2, bersebelahan dengan Ruang Server sekolah.',
    sentenceRule: 'Awali keterangan tempat secara spesifik dan pastikan kata depan "di" ditulis terpisah.'
  },
  {
    id: 'pu_waktu',
    field: 'pu_waktu',
    questionNumber: 'Soal 4',
    question: 'Kapan waktu observasi dilakukan?',
    subGuide: 'Tuliskan hari, tanggal, atau waktu kegiatan pengamatan berlangsung.',
    placeholder: 'Contoh: Hari Selasa, 10 September pukul 09.30 WIB saat jam praktik',
    sentencePrompt: 'Kalimat waktu kegiatan',
    sentenceSuggestion: 'Pengamatan dilaksanakan pada hari Selasa saat jam pembelajaran berlangsung.',
    hints: [
      'Teks LHO harus berbasis fakta waktu nyata agar data empiris terpercaya.',
      'Gunakan format baku hari, tanggal, dan perkiraan waktu pelaksanaan.'
    ],
    example: 'Hari Selasa, 10 September 2026 pukul 09.30 WIB saat jam praktik.',
    sentenceRule: 'Gunakan keterangan waktu untuk membuktikan bahwa kegiatan pengamatan dilakukan secara faktual.'
  },
  {
    id: 'pu_definisi',
    field: 'pu_definisi',
    questionNumber: 'Soal 5',
    question: 'Buat 1 kalimat definisi menggunakan kata "adalah" atau "merupakan".',
    subGuide: 'Rumuskan pengertian umum objek pengamatan secara lengkap dan formal.',
    placeholder: 'Contoh: Laboratorium Komputer adalah ruang khusus yang dilengkapi perangkat komputasi modern untuk menunjang literasi digital peserta didik.',
    sentencePrompt: 'Kalimat definisi nominal/kopula',
    sentenceSuggestion: 'Laboratorium Komputer merupakan ruang penunjang yang dilengkapi perangkat komputasi untuk literasi digital siswa.',
    hints: [
      'Wajib memuat kata verba kopula baku: "adalah", "merupakan", atau "ialah".',
      'Jelaskan hakikat umum objek secara konseptual dan bebas dari opini pribadi.'
    ],
    example: 'Laboratorium Komputer adalah ruang edukasi khusus yang dilengkapi sarana komputasi untuk menunjang literasi digital siswa.',
    sentenceRule: 'Struktur baku definisi: Subjek + Kopula (adalah/merupakan) + Predikat Konseptual Pembatas.'
  },
];

const DESKRIPSI_DETAIL_QUESTIONS: QuestionScaffold[] = [
  {
    id: 'db_ciriFisik',
    field: 'db_ciriFisik',
    questionNumber: 'Soal 6',
    question: 'Bagaimana ukuran, bentuk, dan dimensi fisik objek tersebut?',
    subGuide: 'Gambarkan perkiraan luas ruangan, kapasitas meja-kursi, atau bentuk objek.',
    placeholder: 'Contoh: Ruangan berukuran 9 x 8 meter dengan kapasitas 36 unit komputer dan meja modular berderet rapi',
    sentencePrompt: 'Kalimat ukuran dan bentuk',
    sentenceSuggestion: 'Ruangan ini memiliki luas sekitar 72 meter persegi dengan kapasitas 36 unit meja berderet rapi.',
    hints: [
      'Gunakan satuan ukur empiris (meter, unit, buah) atau perkiraan terukur.',
      'Hindari kata berlebihan seperti "luas banget", gunakan perkiraan ukuran faktual.'
    ],
    example: 'Ruangan berukuran 9 x 8 meter dengan kapasitas 36 unit meja komputer modular berderet rapi.',
    sentenceRule: 'Gunakan frasa pemerian dimensi fisik terukur untuk memperkuat sifat ilmiah teks laporan.'
  },
  {
    id: 'db_bahanMaterial',
    field: 'db_bahanMaterial',
    questionNumber: 'Soal 7',
    question: 'Apa bahan, material, atau spesifikasi utama yang kamu amati?',
    subGuide: 'Sebutkan bahan bangunan, spesifikasi perangkat, atau kelengkapan pendingin.',
    placeholder: 'Contoh: Komputer desktop prosesor Intel Core i5, monitor LCD 22 inci, serta pendingin AC ganda',
    sentencePrompt: 'Kalimat bahan dan spesifikasi',
    sentenceSuggestion: 'Setiap unit komputer dilengkapi monitor LCD 22 inci serta didukung pendingin udara ruangan ganda.',
    hints: [
      'Amati material penyusun (keramik, kayu lapis, besi cor, kaca tempered) atau spesifikasi alat.',
      'Sebutkan minimal dua material atau perangkat penting.'
    ],
    example: 'Meja komputer berbahan kayu lapis berangka besi kokoh serta lantai berlapis keramik putih bersih.',
    sentenceRule: 'Rangkai dengan frasa "terbuat dari", "berbahan dasar", atau "dilapisi".'
  },
  {
    id: 'db_komponen',
    field: 'db_komponen',
    questionNumber: 'Soal 8',
    question: 'Sebutkan bagian-bagian atau fasilitas pendukung di dalamnya!',
    subGuide: 'Rincikan komponen pendukung seperti proyektor, papan pintar, atau meja instruktur.',
    placeholder: 'Contoh: Proyektor digital interaktif, server mini, akses Wi-Fi berkecepatan tinggi, dan lemari penyimpanan',
    sentencePrompt: 'Kalimat rincian bagian',
    sentenceSuggestion: 'Fasilitas pendukung di dalamnya meliputi proyektor LCD interaktif, papan tulis, serta jaringan internet kabel.',
    hints: [
      'Rincikan fasilitas secara berurutan (dari bagian depan ruangan ke belakang).',
      'Kelompokkan fasilitas utama (komputer) dan pendukung (proyektor, router, printer).'
    ],
    example: '36 unit komputer desktop, 1 proyektor LCD interaktif, panel sakelar LAN, dan papan tulis.',
    sentenceRule: 'Gunakan tanda baca koma (,) sebelum konjungsi "dan/serta" pada pemerian tiga unsur atau lebih.'
  },
  {
    id: 'db_warnaTataLetak',
    field: 'db_warnaTataLetak',
    questionNumber: 'Soal 9',
    question: 'Bagaimana warna dominan, pencahayaan, dan tata letak perabot?',
    subGuide: 'Deskripsikan warna dinding, pencahayaan alami, dan sirkulasi ruangan.',
    placeholder: 'Contoh: Dinding dicat putih bersih berpadu abu muda, pencahayaan terang alami dari jendela kaca besar',
    sentencePrompt: 'Kalimat estetika dan tata letak',
    sentenceSuggestion: 'Dinding ruangan didominasi warna putih bersih dengan sirkulasi cahaya alami yang memadai.',
    hints: [
      'Sebutkan warna nyata yang terlihat pada dinding dan perabot.',
      'Gambarkan susunan meja/kursi (berjajar ke depan, berbentuk U, atau melingkar).'
    ],
    example: 'Dinding ruangan dicat putih bersih berpadu abu muda, dengan formasi meja berderet menghadap ke layar proyektor.',
    sentenceRule: 'Gabungkan aspek warna dan tata letak dalam kalimat majemuk setara yang harmonis.'
  },
  {
    id: 'db_kondisi',
    field: 'db_kondisi',
    questionNumber: 'Soal 10',
    question: 'Bagaimana kondisi kebersihan dan kelayakan operasional objek?',
    subGuide: 'Catat keterawatan, keteraturan kabel, atau aspek kebersihan fasilitas.',
    placeholder: 'Contoh: Ruangan sangat higienis, bebas debu, lantai berlantai granit bersih, dan kabel tertata rapi di conduit',
    sentencePrompt: 'Kalimat kondisi keterawatan',
    sentenceSuggestion: 'Secara keseluruhan ruangan sangat bersih, berlantai granit higienis, dan kabel data tertata aman.',
    hints: [
      'Periksa apakah perangkat berfungsi dengan normal saat diamati.',
      'Catat aspek kebersihan lantai, keteraturan instalasi kabel, dan kenyamanan sirkulasi udara.'
    ],
    example: 'Kondisi ruangan sangat bersih, bebas debu, pendingin udara berfungsi prima, dan pengabelan tertata di dalam conduit.',
    sentenceRule: 'Gunakan verba deskriptif keadaan seperti "berfungsi secara optimal" atau "terpelihara dengan baik".'
  },
];

const DESKRIPSI_MANFAAT_QUESTIONS: QuestionScaffold[] = [
  {
    id: 'dm_fungsiSiswa',
    field: 'dm_fungsiSiswa',
    questionNumber: 'Soal 11',
    question: 'Apa fungsi atau manfaat utama objek bagi siswa dalam belajar?',
    subGuide: 'Jelaskan kegiatan belajar siswa yang terbantu oleh fasilitas ini.',
    placeholder: 'Contoh: Membantu siswa mempraktikkan pemrograman, desain grafis, riset internet, serta asesmen digital',
    sentencePrompt: 'Kalimat fungsi edukatif',
    sentenceSuggestion: 'Fasilitas ini memberikan manfaat langsung bagi siswa dalam praktikum informatika dan riset mandiri.',
    hints: [
      'Fokus pada aktivitas nyata siswa (praktikum komputasi, riset materi pelajaran, pengerjaan tugas proyek).',
      'Jelaskan dampak positif fasilitas ini terhadap keterampilan teknis siswa.'
    ],
    example: 'Membantu siswa mempraktikkan pemrograman, desain grafis, riset materi daring, serta asesmen digital.',
    sentenceRule: 'Gunakan frasa "berfungsi untuk", "bermanfaat dalam", atau "berguna bagi".'
  },
  {
    id: 'dm_manfaatSekolah',
    field: 'dm_manfaatSekolah',
    questionNumber: 'Soal 12',
    question: 'Apa manfaat objek tersebut bagi kemajuan sekolah secara umum?',
    subGuide: 'Jelaskan perannya bagi pelaksanaan ujian ANBK, administrasi, atau lomba.',
    placeholder: 'Contoh: Menjadi sarana sentral Asesmen Nasional Berbasis Komputer (ANBK) dan uji sertifikasi kejuruan',
    sentencePrompt: 'Kalimat peran institusi',
    sentenceSuggestion: 'Bagi sekolah, laboratorium ini berperan sebagai pusat pelaksanaan Asesmen Nasional (ANBK).',
    hints: [
      'Kaitkan dengan kegiatan berskala sekolah (ANBK, uji sertifikasi, pelatihan guru, olimpiade sains).',
      'Jelaskan bagaimana fasilitas ini mengangkat mutu akreditasi atau teknologi sekolah.'
    ],
    example: 'Menjadi sarana sentral Asesmen Nasional Berbasis Komputer (ANBK) serta pelatihan digital guru.',
    sentenceRule: 'Gunakan konjungsi antarkalimat penambahan seperti "Di samping itu," atau "Selain itu,".'
  },
  {
    id: 'dm_kesimpulanSaran',
    field: 'dm_kesimpulanSaran',
    questionNumber: 'Soal 13',
    question: 'Apa kesimpulan akhir atau saran perawatan yang dapat kamu berikan?',
    subGuide: 'Berikan simpulan dan rekomendasi agar objek tetap terpelihara optimal.',
    placeholder: 'Contoh: Fasilitas ini sangat vital sehingga pemeliharaan berkala perangkat keras perlu dilakukan berkelanjutan',
    sentencePrompt: 'Kalimat simpulan dan saran',
    sentenceSuggestion: 'Keberadaan fasilitas ini sangat krusial sehingga pemeliharaan berkala wajib dijaga bersama.',
    hints: [
      'Tuliskan simpulan objektif mengenai peran fasilitas tersebut di sekolah.',
      'Sertakan ajakan faktual untuk mematuhi tata tertib dan merawat fasilitas bersama-sama.'
    ],
    example: 'Fasilitas ini sangat vital sehingga pemeliharaan berkala perangkat dan disiplin tata tertib wajib dijaga bersama.',
    sentenceRule: 'Awali kalimat penutup dengan frasa simpulan seperti "Dengan demikian," atau "Secara keseluruhan,".'
  },
];

// Inisialisasi awal formulir BERSIH (semua string kosong "")
const initialIdentity: StudentIdentity = {
  namaLengkap: '',
  kelas: '',
  jurusan: '',
  nomorAbsen: '',
  namaSekolah: '',
  waktuObservasi: '',
};

const initialObservation: ObservationData = {
  pu_namaObjek: '',
  pu_kategori: '',
  pu_lokasi: '',
  pu_waktu: '',
  pu_definisi: '',
  db_ciriFisik: '',
  db_bahanMaterial: '',
  db_komponen: '',
  db_warnaTataLetak: '',
  db_kondisi: '',
  dm_fungsiSiswa: '',
  dm_manfaatSekolah: '',
  dm_kesimpulanSaran: '',
};

const initialSentences: SentenceRepairData = {
  pu_namaObjek: '',
  pu_kategori: '',
  pu_lokasi: '',
  pu_waktu: '',
  pu_definisi: '',
  db_ciriFisik: '',
  db_bahanMaterial: '',
  db_komponen: '',
  db_warnaTataLetak: '',
  db_kondisi: '',
  dm_fungsiSiswa: '',
  dm_manfaatSekolah: '',
  dm_kesimpulanSaran: '',
};

const initialParagraphs: ParagraphData = {
  judul: '',
  paragrafPernyataanUmum: '',
  paragrafDeskripsiBagian: '',
  paragrafDeskripsiManfaat: '',
};

const STORAGE_KEY = 'scaffolding_lho_kelas_x_v3';

// ==========================================
// 3. KOMPONEN IKON INLINE SVG (MENCEGAH ERROR MODULE NOT FOUND)
// ==========================================
function SvgIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  switch (name) {
    case 'eye':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
    case 'edit':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
    case 'align-left':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      );
    case 'download':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      );
    case 'printer':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      );
    case 'user-check':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'help':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'rotate':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'check':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'copy':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'alert':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'file-text':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      );
    case 'chevron-up':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      );
    case 'info':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'check-circle':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'filter':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      );
    default:
      return null;
  }
}

// ==========================================
// 4. APLIKASI UTAMA (APP COMPONENT)
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // States
  const [identity, setIdentity] = useState<StudentIdentity>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.identity) return parsed.identity;
        }
      }
    } catch {
      // fallback
    }
    return initialIdentity;
  });

  const [observation, setObservation] = useState<ObservationData>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.observation) return parsed.observation;
        }
      }
    } catch {
      // fallback
    }
    return initialObservation;
  });

  const [sentences, setSentences] = useState<SentenceRepairData>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.sentences) return parsed.sentences;
        }
      }
    } catch {
      // fallback
    }
    return initialSentences;
  });

  const [paragraphs, setParagraphs] = useState<ParagraphData>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.paragraphs) return parsed.paragraphs;
        }
      }
    } catch {
      // fallback
    }
    return initialParagraphs;
  });

  // State untuk Tab 4 (PDF)
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scaffolding & Tips States
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({
    pu_namaObjek: true,
    db_ciriFisik: true,
    dm_fungsiSiswa: true,
  });
  const [tab2Category, setTab2Category] = useState<'all' | 'pu' | 'db' | 'dm'>('all');
  const [copiedSentenceId, setCopiedSentenceId] = useState<string | null>(null);
  const [copiedChip, setCopiedChip] = useState<string | null>(null);

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allHintsOpen = [...PERNYATAAN_UMUM_QUESTIONS, ...DESKRIPSI_DETAIL_QUESTIONS, ...DESKRIPSI_MANFAAT_QUESTIONS].every(
    (q) => !!openHints[q.id]
  );

  const toggleAllHints = () => {
    const newState = !allHintsOpen;
    const updated: Record<string, boolean> = {};
    [...PERNYATAAN_UMUM_QUESTIONS, ...DESKRIPSI_DETAIL_QUESTIONS, ...DESKRIPSI_MANFAAT_QUESTIONS].forEach((q) => {
      updated[q.id] = newState;
    });
    setOpenHints(updated);
  };

  // Helper Cek Kualitas Kalimat Otomatis (Live Grammar Quality Indicator)
  const checkSentenceQuality = (text: string) => {
    if (!text || text.trim().length === 0) {
      return { isClean: false, startsCap: false, endsDot: false, noBadConjunction: true, lengthOk: false };
    }
    const trimmed = text.trim();
    const startsCap = /^[A-Z0-9"']/.test(trimmed);
    const endsDot = /[.!?]$/.test(trimmed);
    const lengthOk = trimmed.length >= 15;

    const lowerFirstWord = trimmed.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '') || '';
    const badStarters = ['dan', 'sehingga', 'karena', 'tetapi', 'sedangkan', 'atau'];
    const noBadConjunction = !badStarters.includes(lowerFirstWord);

    const isClean = startsCap && endsDot && lengthOk && noBadConjunction;
    return { isClean, startsCap, endsDot, noBadConjunction, lengthOk };
  };

  // Salin Draf Mentah ke Kolom Suntingan
  const copyRawToSentence = (field: keyof SentenceRepairData, rawValue: string) => {
    if (!rawValue) return;
    setSentences((prev) => ({ ...prev, [field]: rawValue }));
    setCopiedSentenceId(field);
    setTimeout(() => setCopiedSentenceId(null), 1500);
  };

  // Salin Semua Draf Mentah ke Kolom Suntingan
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

  // Terapkan Pola Kalimat Efektif Cerdas
  const applySmartScaffold = (q: QuestionScaffold) => {
    const raw = observation[q.field] ? observation[q.field].trim() : '';
    let text = q.sentenceSuggestion;
    if (raw) {
      if (q.id === 'pu_namaObjek') {
        text = `${raw} merupakan salah satu fasilitas penting yang ada di lingkungan sekolah kami.`;
      } else if (q.id === 'pu_kategori') {
        text = `Fasilitas ini tergolong ke dalam ${raw.toLowerCase().startsWith('sarana') || raw.toLowerCase().startsWith('fasilitas') ? raw : 'kategori ' + raw}.`;
      } else if (q.id === 'pu_lokasi') {
        const cleanLoc = raw.replace(/^di\s+/i, '');
        text = `Fasilitas ini berlokasi di ${cleanLoc}.`;
      } else if (q.id === 'pu_waktu') {
        const cleanTime = raw.replace(/^pada\s+/i, '');
        text = `Kegiatan pengamatan dilaksanakan secara langsung pada ${cleanTime}.`;
      } else if (q.id === 'pu_definisi') {
        text = raw.includes('adalah') || raw.includes('merupakan') 
          ? (raw.endsWith('.') ? raw : `${raw}.`)
          : `${observation.pu_namaObjek || 'Objek ini'} adalah ${raw}.`;
      } else {
        text = raw.endsWith('.') ? raw : `${raw}.`;
      }
    }
    setSentences((prev) => ({ ...prev, [q.field]: text }));
  };

  // Progres Observasi
  const answeredObsCount = Object.values(observation).filter((v) => v && v.trim().length > 0).length;
  const obsProgressPercent = Math.round((answeredObsCount / 13) * 100);

  // Auto-save LocalStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
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
      }
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [identity, observation, sentences, paragraphs]);

  // Reset Semua Data
  const handleConfirmReset = () => {
    setIdentity(initialIdentity);
    setObservation(initialObservation);
    setSentences(initialSentences);
    setParagraphs(initialParagraphs);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
    setIsResetConfirmOpen(false);
    setActiveTab(1);
  };

  // Navigasi Tab
  const tabs = [
    { id: 1, label: '1. Observasi', icon: 'eye' },
    { id: 2, label: '2. Kalimat', icon: 'edit' },
    { id: 3, label: '3. Paragraf', icon: 'align-left' },
    { id: 4, label: '4. Hasil & PDF', icon: 'download' },
    { id: 5, label: '5. Pengembang', icon: 'user-check' },
  ];

  // Helper Auto-Combine Paragraf
  const handleRangkaiPernyataanUmum = () => {
    const p1 = [
      sentences.pu_definisi || observation.pu_definisi,
      sentences.pu_kategori || observation.pu_kategori ? `Objek ini tergolong ke dalam ${sentences.pu_kategori || observation.pu_kategori}.` : '',
      sentences.pu_lokasi || observation.pu_lokasi ? `Fasilitas ini berlokasi di ${sentences.pu_lokasi || observation.pu_lokasi}.` : '',
      sentences.pu_waktu || observation.pu_waktu ? `Kegiatan observasi dilaksanakan pada ${sentences.pu_waktu || observation.pu_waktu}.` : ''
    ].filter(Boolean).join(' ');
    setParagraphs(prev => ({ ...prev, paragrafPernyataanUmum: p1 }));
  };

  const handleRangkaiDeskripsiBagian = () => {
    const p2 = [
      sentences.db_ciriFisik || observation.db_ciriFisik ? `Secara fisik, ${sentences.db_ciriFisik || observation.db_ciriFisik}.` : '',
      sentences.db_bahanMaterial || observation.db_bahanMaterial ? `Perangkat dan fasilitas tersebut didukung oleh ${sentences.db_bahanMaterial || observation.db_bahanMaterial}.` : '',
      sentences.db_komponen || observation.db_komponen ? `Di samping itu, komponen pendukung lainnya mencakup ${sentences.db_komponen || observation.db_komponen}.` : '',
      sentences.db_warnaTataLetak || observation.db_warnaTataLetak ? `Ruangan didominasi ${sentences.db_warnaTataLetak || observation.db_warnaTataLetak}.` : '',
      sentences.db_kondisi || observation.db_kondisi ? `Adapun kondisi keterawatannya terlihat ${sentences.db_kondisi || observation.db_kondisi}.` : ''
    ].filter(Boolean).join(' ');
    setParagraphs(prev => ({ ...prev, paragrafDeskripsiBagian: p2 }));
  };

  const handleRangkaiDeskripsiManfaat = () => {
    const p3 = [
      sentences.dm_fungsiSiswa || observation.dm_fungsiSiswa ? `Keberadaan fasilitas ini sangat bermanfaat bagi siswa, terutama untuk ${sentences.dm_fungsiSiswa || observation.dm_fungsiSiswa}.` : '',
      sentences.dm_manfaatSekolah || observation.dm_manfaatSekolah ? `Selain itu, bagi pihak sekolah, sarana ini berfungsi sebagai ${sentences.dm_manfaatSekolah || observation.dm_manfaatSekolah}.` : '',
      sentences.dm_kesimpulanSaran || observation.dm_kesimpulanSaran ? `Sebagai simpulan, ${sentences.dm_kesimpulanSaran || observation.dm_kesimpulanSaran}.` : ''
    ].filter(Boolean).join(' ');
    setParagraphs(prev => ({ ...prev, paragrafDeskripsiManfaat: p3 }));
  };

  const handleRangkaiSemuaParagraf = () => {
    handleRangkaiPernyataanUmum();
    handleRangkaiDeskripsiBagian();
    handleRangkaiDeskripsiManfaat();
    if (!paragraphs.judul && (observation.pu_namaObjek || sentences.pu_namaObjek)) {
      const objName = (observation.pu_namaObjek || sentences.pu_namaObjek).toUpperCase();
      setParagraphs(prev => ({
        ...prev,
        judul: prev.judul || `LAPORAN HASIL OBSERVASI ${objName}`
      }));
    }
  };

  // Safe Browser Print (Aman di HP Android/iOS)
  const handleBrowserPrint = () => {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      try {
        window.print();
      } catch (err) {
        console.error('Print dialog error:', err);
      }
    }
  };

  // Safe PDF Download (html2canvas & jspdf dengan fallback aman)
  const handleDownloadPdf = async () => {
    if (typeof window === 'undefined' || !printRef.current) return;
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setPdfSuccess(false);

    try {
      // Dynamic imports agar tidak crash jika library belum ter-load sempurna
      const html2canvasModule = await import('html2canvas-pro').catch(() => import('html2canvas'));
      const html2canvas = html2canvasModule.default || html2canvasModule;
      const { jsPDF } = await import('jspdf');

      const element = printRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // Margin 10mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }

      const safeName = (identity.namaLengkap || 'Siswa_LHO').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`${safeName}_LHO_Kelas_X.pdf`);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal membuat PDF otomatis:', err);
      setErrorMessage('Terjadi kendala pada pustaka canvas. Gunakan tombol "Cetak via Browser" lalu pilih opsi "Simpan sebagai PDF".');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Copy Teks Lengkap
  const handleCopyText = async () => {
    const fullText = `
LEMBAR KERJA PESERTA DIDIK (LKPD) TEKS LAPORAN HASIL OBSERVASI
Nama Siswa    : ${identity.namaLengkap || '-'}
Kelas / Absen : ${identity.kelas || '-'} / ${identity.nomorAbsen || '-'}
Jurusan       : ${identity.jurusan || '-'}
Sekolah       : ${identity.namaSekolah || '-'}
Waktu         : ${identity.waktuObservasi || '-'}

JUDUL: ${(paragraphs.judul || 'LAPORAN HASIL OBSERVASI').toUpperCase()}

I. PERNYATAAN UMUM (KLASIFIKASI & DEFINISI)
${paragraphs.paragrafPernyataanUmum || '-'}

II. DESKRIPSI BAGIAN
${paragraphs.paragrafDeskripsiBagian || '-'}

III. DESKRIPSI MANFAAT & SIMPULAN
${paragraphs.paragrafDeskripsiManfaat || '-'}
    `.trim();

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = fullText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* ==========================================
          HEADER ATAS & NAVIGASI 5 TAB (MOBILE-FIRST)
          ========================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs no-print">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-3 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs shrink-0">
                <SvgIcon name="file-text" className="w-5 h-5" />
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

            <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap text-xs">
              {/* Indikator LocalStorage */}
              <div 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 font-medium"
                title="Tersimpan otomatis di browser ini"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="hidden xs:inline">Tersimpan otomatis di browser ini</span>
                <span className="xs:hidden">Tersimpan</span>
                {lastSaved && <span className="text-[10px] text-emerald-600/80 hidden md:inline">({lastSaved})</span>}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 text-xs font-medium transition-colors"
                >
                  <SvgIcon name="help" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Petunjuk</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 text-xs font-medium transition-colors"
                  title="Kosongkan formulir"
                >
                  <SvgIcon name="rotate" className="w-3.5 h-3.5" />
                  <span className="sr-only">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Bar Horisontal */}
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  <SvgIcon name={tab.icon} className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ==========================================
          AREA KONTEN UTAMA (5 TAB)
          ========================================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {/* ------------------------------------------
            TAB 1: OBSERVASI
            ------------------------------------------ */}
        {activeTab === 1 && (
          <div className="space-y-6 pb-12">
            {/* Banner Pengantar */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-6 text-white shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/50 px-2.5 py-0.5 rounded-full border border-emerald-300/30">
                    <SvgIcon name="sparkles" className="w-3 h-3 text-emerald-200" /> Tahap 1: Pengamatan Objek Nyata
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                    Lembar Observasi & Identitas Pengamat
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                    Isi identitas diri dan jawablah pertanyaan pemandu di bawah ini berdasarkan objek lingkungan sekolah yang kamu amati secara langsung.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
                >
                  <SvgIcon name="help" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Buka Petunjuk Belajar</span>
                </button>
              </div>
            </div>

            {/* Identitas Siswa Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Identitas Siswa / Pengamat
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lengkapi data diri berikut sebagai identitas resmi LKPD.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    1. Nama Lengkap Siswa <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={identity.namaLengkap}
                    onChange={(e) => setIdentity({ ...identity, namaLengkap: e.target.value })}
                    placeholder="Contoh: Ahmad Fauzi Pratama"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    2. Kelas <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={identity.kelas}
                    onChange={(e) => setIdentity({ ...identity, kelas: e.target.value })}
                    placeholder="Contoh: X-1"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    3. Jurusan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={identity.jurusan}
                    onChange={(e) => setIdentity({ ...identity, jurusan: e.target.value })}
                    placeholder="Contoh: MIPA / Rekayasa Perangkat Lunak"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    4. Nomor Presensi (Absen) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={identity.nomorAbsen}
                    onChange={(e) => setIdentity({ ...identity, nomorAbsen: e.target.value })}
                    placeholder="Contoh: 04"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    5. Nama Sekolah / Instansi
                  </label>
                  <input
                    type="text"
                    value={identity.namaSekolah}
                    onChange={(e) => setIdentity({ ...identity, namaSekolah: e.target.value })}
                    placeholder="Contoh: SMA Negeri 1 Yogyakarta"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    6. Waktu Observasi
                  </label>
                  <input
                    type="text"
                    value={identity.waktuObservasi}
                    onChange={(e) => setIdentity({ ...identity, waktuObservasi: e.target.value })}
                    placeholder="Contoh: 10 September 2026"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Progress Bar & Toggle Tips */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span className="font-semibold text-slate-700">Progres Pengisian Lembar Observasi</span>
                    <span className="font-bold text-emerald-700">{answeredObsCount} dari 13 Soal ({obsProgressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${obsProgressPercent}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleAllHints}
                  className="self-start sm:self-center shrink-0 px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <SvgIcon name="lightbulb" className="w-3.5 h-3.5 text-amber-500" />
                  <span>{allHintsOpen ? 'Tutup Semua Tips' : 'Buka Semua Tips (13 Soal)'}</span>
                </button>
              </div>
            </div>

            {/* Bagian 1: Pernyataan Umum */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Struktur 1
                </span>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base mt-1.5">
                  Bagian 1: Pernyataan Umum / Klasifikasi (5 Soal Pemandu)
                </h3>
              </div>
              <div className="space-y-4">
                {PERNYATAAN_UMUM_QUESTIONS.map((q) => {
                  const isFilled = (observation[q.field] || '').trim().length > 0;
                  const isHintOpen = !!openHints[q.id];
                  const charLength = (observation[q.field] || '').length;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                        isFilled ? 'bg-white border-emerald-300 ring-1 ring-emerald-100 shadow-2xs' : 'bg-slate-50/90 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            isFilled ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-slate-700 border-slate-200'
                          }`}>
                            {q.questionNumber}
                          </span>
                          {isFilled && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <SvgIcon name="check" className="w-3 h-3 text-emerald-600" /> Terisi
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleHint(q.id)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 border ${
                            isHintOpen 
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200/80'
                          }`}
                        >
                          <SvgIcon name="lightbulb" className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isHintOpen ? 'Tutup Tips' : 'Tips Scaffolding'}</span>
                          <SvgIcon name={isHintOpen ? 'chevron-up' : 'chevron-down'} className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">{q.question}</h4>
                      <p className="text-[11px] text-slate-500 mb-3">{q.subGuide}</p>

                      {/* Box Scaffolding / Tips */}
                      {isHintOpen && (
                        <div className="mb-3.5 p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs space-y-2.5">
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                              <SvgIcon name="info" className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>Petunjuk Observasi Lapangan:</span>
                            </div>
                            <ul className="list-disc list-inside space-y-0.5 text-emerald-900/90 pl-1 text-[11px]">
                              {q.hints.map((hint, idx) => (
                                <li key={idx}>{hint}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-emerald-200/70">
                            <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">🔍 Contoh Fakta Lapangan:</span>
                            <p className="text-slate-800 italic bg-white/80 p-2 rounded-lg border border-emerald-100 text-[11px]">
                              "{q.example}"
                            </p>
                          </div>

                          <div className="pt-2 border-t border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">✍️ Panduan Menulis Awal:</span>
                              <p className="text-emerald-900 text-[11px]">
                                {q.sentenceRule}
                              </p>
                            </div>
                            {!observation[q.field] && (
                              <button
                                type="button"
                                onClick={() => setObservation(prev => ({ ...prev, [q.field]: q.example }))}
                                className="self-start sm:self-center shrink-0 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 underline bg-white/90 px-2 py-1 rounded-md border border-emerald-200"
                              >
                                Gunakan Contoh
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Textarea */}
                      <textarea
                        rows={2}
                        value={observation[q.field]}
                        onChange={(e) => setObservation({ ...observation, [q.field]: e.target.value })}
                        placeholder={q.placeholder}
                        className="w-full p-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 resize-y"
                      />
                      <div className="flex justify-end items-center mt-1 px-1 text-[10px] text-slate-400">
                        <span>{charLength > 0 ? `${charLength} karakter` : 'Belum diisi'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bagian 2: Deskripsi Bagian */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Struktur 2
                </span>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base mt-1.5">
                  Bagian 2: Deskripsi Bagian (5 Soal Rincian Objek)
                </h3>
              </div>
              <div className="space-y-4">
                {DESKRIPSI_DETAIL_QUESTIONS.map((q) => {
                  const isFilled = (observation[q.field] || '').trim().length > 0;
                  const isHintOpen = !!openHints[q.id];
                  const charLength = (observation[q.field] || '').length;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                        isFilled ? 'bg-white border-emerald-300 ring-1 ring-emerald-100 shadow-2xs' : 'bg-slate-50/90 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            isFilled ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-slate-700 border-slate-200'
                          }`}>
                            {q.questionNumber}
                          </span>
                          {isFilled && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <SvgIcon name="check" className="w-3 h-3 text-emerald-600" /> Terisi
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleHint(q.id)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 border ${
                            isHintOpen 
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200/80'
                          }`}
                        >
                          <SvgIcon name="lightbulb" className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isHintOpen ? 'Tutup Tips' : 'Tips Scaffolding'}</span>
                          <SvgIcon name={isHintOpen ? 'chevron-up' : 'chevron-down'} className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">{q.question}</h4>
                      <p className="text-[11px] text-slate-500 mb-3">{q.subGuide}</p>

                      {/* Box Scaffolding / Tips */}
                      {isHintOpen && (
                        <div className="mb-3.5 p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs space-y-2.5">
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                              <SvgIcon name="info" className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>Petunjuk Observasi Lapangan:</span>
                            </div>
                            <ul className="list-disc list-inside space-y-0.5 text-emerald-900/90 pl-1 text-[11px]">
                              {q.hints.map((hint, idx) => (
                                <li key={idx}>{hint}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-emerald-200/70">
                            <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">🔍 Contoh Fakta Lapangan:</span>
                            <p className="text-slate-800 italic bg-white/80 p-2 rounded-lg border border-emerald-100 text-[11px]">
                              "{q.example}"
                            </p>
                          </div>

                          <div className="pt-2 border-t border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">✍️ Panduan Menulis Awal:</span>
                              <p className="text-emerald-900 text-[11px]">
                                {q.sentenceRule}
                              </p>
                            </div>
                            {!observation[q.field] && (
                              <button
                                type="button"
                                onClick={() => setObservation(prev => ({ ...prev, [q.field]: q.example }))}
                                className="self-start sm:self-center shrink-0 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 underline bg-white/90 px-2 py-1 rounded-md border border-emerald-200"
                              >
                                Gunakan Contoh
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Textarea */}
                      <textarea
                        rows={2}
                        value={observation[q.field]}
                        onChange={(e) => setObservation({ ...observation, [q.field]: e.target.value })}
                        placeholder={q.placeholder}
                        className="w-full p-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 resize-y"
                      />
                      <div className="flex justify-end items-center mt-1 px-1 text-[10px] text-slate-400">
                        <span>{charLength > 0 ? `${charLength} karakter` : 'Belum diisi'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bagian 3: Deskripsi Manfaat */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Struktur 3
                </span>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base mt-1.5">
                  Bagian 3: Deskripsi Manfaat & Simpulan (3 Soal Pemandu)
                </h3>
              </div>
              <div className="space-y-4">
                {DESKRIPSI_MANFAAT_QUESTIONS.map((q) => {
                  const isFilled = (observation[q.field] || '').trim().length > 0;
                  const isHintOpen = !!openHints[q.id];
                  const charLength = (observation[q.field] || '').length;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                        isFilled ? 'bg-white border-emerald-300 ring-1 ring-emerald-100 shadow-2xs' : 'bg-slate-50/90 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            isFilled ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-slate-700 border-slate-200'
                          }`}>
                            {q.questionNumber}
                          </span>
                          {isFilled && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <SvgIcon name="check" className="w-3 h-3 text-emerald-600" /> Terisi
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleHint(q.id)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 border ${
                            isHintOpen 
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200/80'
                          }`}
                        >
                          <SvgIcon name="lightbulb" className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isHintOpen ? 'Tutup Tips' : 'Tips Scaffolding'}</span>
                          <SvgIcon name={isHintOpen ? 'chevron-up' : 'chevron-down'} className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">{q.question}</h4>
                      <p className="text-[11px] text-slate-500 mb-3">{q.subGuide}</p>

                      {/* Box Scaffolding / Tips */}
                      {isHintOpen && (
                        <div className="mb-3.5 p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs space-y-2.5">
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                              <SvgIcon name="info" className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>Petunjuk Observasi Lapangan:</span>
                            </div>
                            <ul className="list-disc list-inside space-y-0.5 text-emerald-900/90 pl-1 text-[11px]">
                              {q.hints.map((hint, idx) => (
                                <li key={idx}>{hint}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-emerald-200/70">
                            <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">🔍 Contoh Fakta Lapangan:</span>
                            <p className="text-slate-800 italic bg-white/80 p-2 rounded-lg border border-emerald-100 text-[11px]">
                              "{q.example}"
                            </p>
                          </div>

                          <div className="pt-2 border-t border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-emerald-950 block text-[11px] mb-0.5">✍️ Panduan Menulis Awal:</span>
                              <p className="text-emerald-900 text-[11px]">
                                {q.sentenceRule}
                              </p>
                            </div>
                            {!observation[q.field] && (
                              <button
                                type="button"
                                onClick={() => setObservation(prev => ({ ...prev, [q.field]: q.example }))}
                                className="self-start sm:self-center shrink-0 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 underline bg-white/90 px-2 py-1 rounded-md border border-emerald-200"
                              >
                                Gunakan Contoh
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Textarea */}
                      <textarea
                        rows={2}
                        value={observation[q.field]}
                        onChange={(e) => setObservation({ ...observation, [q.field]: e.target.value })}
                        placeholder={q.placeholder}
                        className="w-full p-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 resize-y"
                      />
                      <div className="flex justify-end items-center mt-1 px-1 text-[10px] text-slate-400">
                        <span>{charLength > 0 ? `${charLength} karakter` : 'Belum diisi'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tombol Lanjut ke Tab 2 */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab(2)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Lanjut ke Tahap 2 (Perbaikan Kalimat)</span>
                <SvgIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------
            TAB 2: PERBAIKAN KALIMAT (SCAFFOLDING)
            ------------------------------------------ */}
        {activeTab === 2 && (
          <div className="space-y-6 pb-12">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-6 text-white shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/50 px-2.5 py-0.5 rounded-full border border-emerald-300/30">
                    <SvgIcon name="sparkles" className="w-3 h-3 text-emerald-200" /> Tahap 2: Scaffolding Kalimat Efektif
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold mt-1">Perbaikan & Penyuntingan Kalimat (PUEBI/EYD)</h2>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                    Jawaban mentahmu dari Tahap 1 ditampilkan di sini. Ubahlah jawaban mentah menjadi kalimat baku yang efektif menggunakan kata kopula, kata pengelompokan, serta konjungsi yang tepat.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSyncAllFromRaw}
                  className="self-start sm:self-auto shrink-0 px-3.5 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
                  title="Salin semua jawaban dari Tahap 1 yang belum diisi"
                >
                  <SvgIcon name="copy" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Salin Semua dari Tahap 1</span>
                </button>
              </div>
            </div>

            {/* Kotak Pemandu Kaidah PUEBI/EYD & Bank Konjungsi */}
            <div className="bg-white rounded-2xl border border-emerald-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-800">
                <SvgIcon name="lightbulb" className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-xs sm:text-sm">
                  Kaidah Cepat Kalimat Efektif & Bank Kata Penghubung Teks LHO
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <span className="font-bold text-emerald-900 block text-[11px]">1. Verba Kopula (Definisi)</span>
                  <p className="text-emerald-800 text-[11px] mt-0.5">Wajib kata: <strong>adalah, merupakan, ialah</strong></p>
                </div>
                <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100">
                  <span className="font-bold text-teal-900 block text-[11px]">2. Verba Klasifikasi</span>
                  <p className="text-teal-800 text-[11px] mt-0.5">Gunakan: <strong>termasuk dalam, tergolong ke dalam</strong></p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                  <span className="font-bold text-blue-900 block text-[11px]">3. Konjungsi Antarkalimat</span>
                  <p className="text-blue-800 text-[11px] mt-0.5">Awali dengan: <strong>Selain itu,, Di samping itu,, Selanjutnya,</strong></p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
                  <span className="font-bold text-amber-900 block text-[11px]">⚠️ Konjungsi Terlarang</span>
                  <p className="text-amber-800 text-[11px] mt-0.5">Jangan di awal kalimat: <em>Dan, Sehingga, Karena, Tetapi</em></p>
                </div>
              </div>
            </div>

            {/* Filter Tab Kategori Soal */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'Semua Soal (13)' },
                { id: 'pu', label: 'I. Pernyataan Umum (5)' },
                { id: 'db', label: 'II. Deskripsi Bagian (5)' },
                { id: 'dm', label: 'III. Deskripsi Manfaat (3)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setTab2Category(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    tab2Category === cat.id
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* List Perbaikan Kalimat */}
            <div className="space-y-4">
              {[...PERNYATAAN_UMUM_QUESTIONS, ...DESKRIPSI_DETAIL_QUESTIONS, ...DESKRIPSI_MANFAAT_QUESTIONS]
                .filter((q) => {
                  if (tab2Category === 'pu') return PERNYATAAN_UMUM_QUESTIONS.some((item) => item.id === q.id);
                  if (tab2Category === 'db') return DESKRIPSI_DETAIL_QUESTIONS.some((item) => item.id === q.id);
                  if (tab2Category === 'dm') return DESKRIPSI_MANFAAT_QUESTIONS.some((item) => item.id === q.id);
                  return true;
                })
                .map((q) => {
                  const rawAnswer = observation[q.field] || '';
                  const currentSentence = sentences[q.field] || '';
                  const quality = checkSentenceQuality(currentSentence);
                  const isCopied = copiedSentenceId === q.field;

                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs space-y-3.5 transition-all ${
                        quality.isClean ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
                      }`}
                    >
                      {/* Top Bar Kartu */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {q.questionNumber}: {q.sentencePrompt}
                          </span>
                          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                            • {q.question}
                          </span>
                        </div>
                        {quality.isClean && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <SvgIcon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Kalimat Efektif</span>
                          </span>
                        )}
                      </div>

                      {/* Jawaban Mentah (Tahap 1) */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="flex items-center justify-between text-slate-500 mb-1">
                          <span className="font-semibold text-[11px] uppercase tracking-wide">
                            Jawaban Mentah (Tahap 1):
                          </span>
                          {rawAnswer ? (
                            <button
                              type="button"
                              onClick={() => copyRawToSentence(q.field, rawAnswer)}
                              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
                            >
                              <SvgIcon name="copy" className="w-3 h-3 text-emerald-600" />
                              <span>{isCopied ? 'Tersalin!' : 'Salin ke Suntingan'}</span>
                            </button>
                          ) : null}
                        </div>
                        <p className="text-slate-800 italic">
                          {rawAnswer ? `"${rawAnswer}"` : '(Belum diisi pada Tahap 1 - kamu bisa langsung mengetik kalimat di bawah)'}
                        </p>
                      </div>

                      {/* Kotak Tips Scaffolding Kaidah Kalimat */}
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-950 block text-[11px]">
                            💡 Kaidah Kalimat Efektif:
                          </span>
                          <p className="text-emerald-900 text-[11px] leading-relaxed">
                            {q.sentenceRule}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => applySmartScaffold(q)}
                          className="self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                          title="Rangkai otomatis jawabanmu ke dalam kalimat efektif baku"
                        >
                          <SvgIcon name="sparkles" className="w-3 h-3 text-emerald-200" />
                          <span>Terapkan Pola Efektif</span>
                        </button>
                      </div>

                      {/* Kolom Suntingan Siswa */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-slate-700 font-semibold text-xs">
                            Kalimat Efektif Hasil Suntinganmu:
                          </label>
                          <button
                            type="button"
                            onClick={() => setSentences(prev => ({ ...prev, [q.field]: q.sentenceSuggestion }))}
                            className="text-[11px] text-emerald-700 hover:text-emerald-800 underline font-medium"
                          >
                            Pakai Contoh Baku
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={currentSentence}
                          onChange={(e) => setSentences({ ...sentences, [q.field]: e.target.value })}
                          placeholder={`Contoh baku: ${q.sentenceSuggestion}`}
                          className="w-full p-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 resize-y"
                        />

                        {/* Indikator Cek Kualitas Kalimat Otomatis (Live Feedback) */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 text-[10px]">
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
                            {quality.lengthOk ? '✓' : '•'} Panjang Kalimat ({currentSentence.length} kar)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <SvgIcon name="arrow-left" className="w-4 h-4" />
                <span>Kembali ke Tahap 1 (Observasi)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(3)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Lanjut ke Tahap 3 (Rangkai Paragraf)</span>
                <SvgIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------
            TAB 3: PENGGABUNGAN PARAGRAF
            ------------------------------------------ */}
        {activeTab === 3 && (
          <div className="space-y-6 pb-12">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-6 text-white shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/50 px-2.5 py-0.5 rounded-full border border-emerald-300/30">
                    <SvgIcon name="sparkles" className="w-3 h-3 text-emerald-200" /> Tahap 3: Konstruksi Paragraf Padu
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold mt-1">Penggabungan & Penyusunan Paragraf LHO</h2>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                    Rangkai kalimat-kalimat efektif dari Tahap 2 menjadi 3 paragraf utuh berkohesi dan berkoherensi tinggi. Kamu bisa menggunakan tombol "Rangkai Otomatis" lalu menyempurnakannya.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRangkaiSemuaParagraf}
                  className="self-start sm:self-auto shrink-0 px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs sm:text-sm shadow-xs hover:bg-emerald-50 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <SvgIcon name="sparkles" className="w-4 h-4 text-emerald-600" />
                  <span>Rangkai Semua Paragraf</span>
                </button>
              </div>
            </div>

            {/* Kotak Bank Konjungsi Antarkalimat Pemandu */}
            <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-slate-800">
                <SvgIcon name="lightbulb" className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-xs sm:text-sm">
                  Bank Konjungsi Antarkalimat Pemandu (Klik untuk menyalin kata penghubung):
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Selain itu,',
                  'Di samping itu,',
                  'Sementara itu,',
                  'Sebaliknya,',
                  'Selanjutnya,',
                  'Kemudian,',
                  'Dengan demikian,',
                  'Oleh karena itu,',
                  'Secara keseluruhan,',
                ].map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(word);
                        setCopiedChip(word);
                        setTimeout(() => setCopiedChip(null), 1500);
                      } catch {
                        // fallback
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-all active:scale-95 flex items-center gap-1"
                    title="Klik untuk menyalin"
                  >
                    <span>{word}</span>
                    {copiedChip === word && <span className="text-[10px] text-emerald-600 font-bold">✓ Tersalin</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Judul Laporan */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
              <label className="block text-slate-800 font-bold text-xs sm:text-sm mb-1.5">
                Judul Laporan Hasil Observasi:
              </label>
              <input
                type="text"
                value={paragraphs.judul}
                onChange={(e) => setParagraphs({ ...paragraphs, judul: e.target.value })}
                placeholder="Contoh: LAPORAN HASIL OBSERVASI LABORATORIUM KOMPUTER MULTIMEDIA"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold placeholder:text-slate-400 uppercase"
              />
            </div>

            {/* Paragraf 1: Pernyataan Umum */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Paragraf 1
                  </span>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm mt-1">
                    Pernyataan Umum (Definisi & Klasifikasi)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleRangkaiPernyataanUmum}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <SvgIcon name="sparkles" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rangkai Otomatis</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={paragraphs.paragrafPernyataanUmum}
                onChange={(e) => setParagraphs({ ...paragraphs, paragrafPernyataanUmum: e.target.value })}
                placeholder="Contoh: Laboratorium Komputer Multimedia SMA Negeri 1 merupakan fasilitas utama penunjang pembelajaran teknologi informasi dan komunikasi bagi peserta didik..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed placeholder:text-slate-400"
              />
            </div>

            {/* Paragraf 2: Deskripsi Bagian */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Paragraf 2
                  </span>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm mt-1">
                    Deskripsi Bagian (Fisik, Spesifikasi, & Kondisi)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleRangkaiDeskripsiBagian}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <SvgIcon name="sparkles" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rangkai Otomatis</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={paragraphs.paragrafDeskripsiBagian}
                onChange={(e) => setParagraphs({ ...paragraphs, paragrafDeskripsiBagian: e.target.value })}
                placeholder="Contoh: Ruangan laboratorium ini memiliki luas sekitar 72 meter persegi dengan tata letak meja modular yang tertata rapi. Setiap meja dilengkapi perangkat desktop modern..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed placeholder:text-slate-400"
              />
            </div>

            {/* Paragraf 3: Deskripsi Manfaat */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Paragraf 3
                  </span>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm mt-1">
                    Deskripsi Manfaat & Simpulan
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleRangkaiDeskripsiManfaat}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <SvgIcon name="sparkles" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rangkai Otomatis</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={paragraphs.paragrafDeskripsiManfaat}
                onChange={(e) => setParagraphs({ ...paragraphs, paragrafDeskripsiManfaat: e.target.value })}
                placeholder="Contoh: Keberadaan fasilitas ini memberikan dampak signifikan terhadap peningkatan kompetensi digital siswa. Selain sebagai laboratorium pembelajaran harian, fasilitas ini menjadi sentral Asesmen Nasional..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab(2)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <SvgIcon name="arrow-left" className="w-4 h-4" />
                <span>Kembali ke Tahap 2</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(4)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Lihat Hasil & Ekspor PDF</span>
                <SvgIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------
            TAB 4: PRATINJAU & EKSPOR PDF (A4 LKPD)
            ------------------------------------------ */}
        {activeTab === 4 && (
          <div className="space-y-6 pb-12">
            {/* Banner Aksi */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-4 sm:p-6 text-white shadow-md no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    <SvgIcon name="sparkles" className="w-3 h-3 text-emerald-200" /> Tahap 4: Finalisasi LKPD & PDF
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                    Lembar Kerja LKPD Siap Cetak (Standar A4)
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                    Dokumen telah disesuaikan dengan format resmi A4, tabel identitas simetris, dan proteksi pemotongan halaman.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                  >
                    <SvgIcon name="download" className="w-4 h-4 text-emerald-600" />
                    <span>{isGeneratingPdf ? 'Memproses PDF...' : 'Unduh Dokumen PDF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBrowserPrint}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/50 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 active:scale-95"
                    title="Cetak langsung atau simpan sebagai PDF dari menu HP"
                  >
                    <SvgIcon name="printer" className="w-4 h-4" />
                    <span>Cetak via Browser</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="px-3 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                  >
                    <SvgIcon name={copied ? 'check' : 'copy'} className="w-4 h-4 text-emerald-300" />
                    <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
                  </button>
                </div>
              </div>

              {pdfSuccess && (
                <div className="mt-3 p-2.5 bg-emerald-500/30 border border-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <SvgIcon name="check" className="w-4 h-4 text-emerald-200" />
                  <span>Dokumen PDF berhasil dibuat dan diunduh ke perangkatmu!</span>
                </div>
              )}

              {errorMessage && (
                <div className="mt-3 p-2.5 bg-rose-500/30 border border-rose-300 rounded-xl text-xs flex items-center gap-2">
                  <SvgIcon name="alert" className="w-4 h-4 text-rose-200" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Petunjuk Pengguna HP */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5 no-print">
              <SvgIcon name="sparkles" className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Tips Akses HP Android & iOS:</strong>
                <p className="text-amber-800 mt-0.5">
                  Tombol <strong>"Cetak via Browser"</strong> dapat digunakan untuk menyimpan dokumen sebagai PDF langsung dari browser ponselmu dengan resolusi tajam dan bebas bug halaman kosong.
                </p>
              </div>
            </div>

            {/* WADAH LKPD STANDAR KERTAS A4 (LATAR PUTIH & TEKS HITAM) */}
            <div className="overflow-x-auto pb-6">
              <div
                ref={printRef}
                id="printable-lho-sheet"
                className="print-container mx-auto transition-all shadow-md"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  width: '100%',
                  maxWidth: '210mm',
                  minHeight: '297mm',
                  padding: '18mm 16mm',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
                  boxSizing: 'border-box',
                }}
              >
                {/* KOP RESMI DOKUMEN LKPD */}
                <div
                  className="pb-3 mb-5 text-center"
                  style={{
                    borderBottom: '3px double #000000',
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                    color: '#000000',
                  }}
                >
                  <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-black leading-tight">
                    {identity.namaSekolah || 'LEMBAR KERJA PESERTA DIDIK (LKPD)'}
                  </h2>
                  <h3 className="text-xs sm:text-sm font-bold text-black uppercase mt-1 tracking-wider">
                    LAPORAN HASIL OBSERVASI (LHO) - BAHASA INDONESIA KELAS X
                  </h3>
                  <p className="text-[11px] text-black italic mt-0.5">
                    Pendekatan Scaffolding Berbasis Objek Nyata (Penelitian Tindakan Kelas)
                  </p>
                </div>

                {/* 1. KOTAK IDENTITAS SISWA (TABEL SIMETRIS 2 KOLOM TANPA TITIK-TITIK) */}
                <div
                  className="mb-6 p-3.5 rounded-xs text-xs"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #000000',
                    color: '#000000',
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                  }}
                >
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'separate',
                      borderSpacing: '0 6px',
                      fontSize: '12px',
                      color: '#000000',
                    }}
                  >
                    <tbody>
                      {/* Baris 1: Nama Siswa & No. Presensi */}
                      <tr>
                        <td style={{ width: '130px', fontWeight: 'bold', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000', whiteSpace: 'nowrap' }}>
                          Nama Siswa
                        </td>
                        <td style={{ width: '12px', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000' }}>:</td>
                        <td style={{ verticalAlign: 'bottom', paddingRight: '24px' }}>
                          <div
                            style={{
                              borderBottom: '1px solid #9ca3af',
                              minHeight: '20px',
                              paddingBottom: '2px',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              color: '#000000',
                            }}
                          >
                            {identity.namaLengkap || ''}
                          </div>
                        </td>

                        <td style={{ width: '110px', fontWeight: 'bold', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000', whiteSpace: 'nowrap' }}>
                          No. Presensi
                        </td>
                        <td style={{ width: '12px', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000' }}>:</td>
                        <td style={{ width: '140px', verticalAlign: 'bottom' }}>
                          <div
                            style={{
                              borderBottom: '1px solid #9ca3af',
                              minHeight: '20px',
                              paddingBottom: '2px',
                              fontWeight: 600,
                              color: '#000000',
                            }}
                          >
                            {identity.nomorAbsen || ''}
                          </div>
                        </td>
                      </tr>

                      {/* Baris 2: Kelas / Jurusan & Waktu Observasi */}
                      <tr>
                        <td style={{ fontWeight: 'bold', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000', whiteSpace: 'nowrap' }}>
                          Kelas / Jurusan
                        </td>
                        <td style={{ verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000' }}>:</td>
                        <td style={{ verticalAlign: 'bottom', paddingRight: '24px' }}>
                          <div
                            style={{
                              borderBottom: '1px solid #9ca3af',
                              minHeight: '20px',
                              paddingBottom: '2px',
                              fontWeight: 600,
                              color: '#000000',
                            }}
                          >
                            {identity.kelas || identity.jurusan 
                              ? `${identity.kelas || ''}${identity.kelas && identity.jurusan ? ' / ' : ''}${identity.jurusan || ''}` 
                              : ''}
                          </div>
                        </td>

                        <td style={{ fontWeight: 'bold', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000', whiteSpace: 'nowrap' }}>
                          Waktu Observasi
                        </td>
                        <td style={{ verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000' }}>:</td>
                        <td style={{ verticalAlign: 'bottom' }}>
                          <div
                            style={{
                              borderBottom: '1px solid #9ca3af',
                              minHeight: '20px',
                              paddingBottom: '2px',
                              color: '#000000',
                            }}
                          >
                            {identity.waktuObservasi || ''}
                          </div>
                        </td>
                      </tr>

                      {/* Baris 3: Objek Pengamatan */}
                      <tr>
                        <td style={{ fontWeight: 'bold', verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000', whiteSpace: 'nowrap' }}>
                          Objek Pengamatan
                        </td>
                        <td style={{ verticalAlign: 'bottom', paddingBottom: '2px', color: '#000000' }}>:</td>
                        <td style={{ verticalAlign: 'bottom', paddingRight: '24px' }}>
                          <div
                            style={{
                              borderBottom: '1px solid #9ca3af',
                              minHeight: '20px',
                              paddingBottom: '2px',
                              fontWeight: 600,
                              color: '#000000',
                            }}
                          >
                            {observation.pu_namaObjek || ''}
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* JUDUL TEKS LHO */}
                <div
                  className="text-center my-6"
                  style={{ breakInside: 'avoid', pageBreakInside: 'avoid', color: '#000000' }}
                >
                  <h1 className="text-sm sm:text-base font-bold uppercase tracking-tight text-black underline decoration-1 underline-offset-4">
                    {paragraphs.judul || 'LAPORAN HASIL OBSERVASI'}
                  </h1>
                </div>

                {/* ISI LAPORAN HASIL OBSERVASI (3 BAGIAN) */}
                <div className="space-y-6 text-xs sm:text-sm text-black leading-relaxed">
                  {/* Bagian I: Pernyataan Umum */}
                  <div style={{ breakInside: 'avoid', pageBreakInside: 'avoid', color: '#000000' }}>
                    <h4
                      className="font-bold text-xs uppercase tracking-wider mb-2 pb-1 text-black"
                      style={{ borderBottom: '1px solid #9ca3af', color: '#000000' }}
                    >
                      I. Pernyataan Umum (Klasifikasi & Definisi)
                    </h4>
                    <p
                      className="text-justify indent-8 text-black"
                      style={{ lineHeight: '1.5', color: '#000000' }}
                    >
                      {paragraphs.paragrafPernyataanUmum || (
                        <span className="italic text-slate-500">
                          [Belum ada paragraf pernyataan umum. Silakan rangkai di Tahap 3.]
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Bagian II: Deskripsi Bagian */}
                  <div style={{ breakInside: 'avoid', pageBreakInside: 'avoid', color: '#000000' }}>
                    <h4
                      className="font-bold text-xs uppercase tracking-wider mb-2 pb-1 text-black"
                      style={{ borderBottom: '1px solid #9ca3af', color: '#000000' }}
                    >
                      II. Deskripsi Bagian
                    </h4>
                    <p
                      className="text-justify indent-8 text-black"
                      style={{ lineHeight: '1.5', color: '#000000' }}
                    >
                      {paragraphs.paragrafDeskripsiBagian || (
                        <span className="italic text-slate-500">
                          [Belum ada paragraf deskripsi bagian. Silakan rangkai di Tahap 3.]
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Bagian III: Deskripsi Manfaat */}
                  <div style={{ breakInside: 'avoid', pageBreakInside: 'avoid', color: '#000000' }}>
                    <h4
                      className="font-bold text-xs uppercase tracking-wider mb-2 pb-1 text-black"
                      style={{ borderBottom: '1px solid #9ca3af', color: '#000000' }}
                    >
                      III. Deskripsi Manfaat & Simpulan
                    </h4>
                    <p
                      className="text-justify indent-8 text-black"
                      style={{ lineHeight: '1.5', color: '#000000' }}
                    >
                      {paragraphs.paragrafDeskripsiManfaat || (
                        <span className="italic text-slate-500">
                          [Belum ada paragraf deskripsi manfaat. Silakan rangkai di Tahap 3.]
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* BLOK TANDA TANGAN (KIRI: WISNU TRI CAHYO TANPA NIP | KANAN: NAMA SISWA TANPA NIS/NISN) */}
                <div
                  className="flex justify-between items-start mt-8 pt-4 text-center text-xs text-black"
                  style={{
                    borderTop: '1px solid #9ca3af',
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                    color: '#000000',
                  }}
                >
                  {/* Kiri: Guru Pengampu */}
                  <div className="w-[45%] text-center">
                    <p className="text-xs text-black">Mengetahui,</p>
                    <p className="text-xs font-bold text-black mt-0.5">Guru Pengampu Bahasa Indonesia</p>
                    {/* Ruang kosong 60px tanda tangan basah */}
                    <div style={{ height: '60px' }} className="h-[60px]" aria-hidden="true" />
                    <p className="font-bold underline text-black text-xs">
                      Wisnu Tri Cahyo
                    </p>
                  </div>

                  {/* Kanan: Siswa / Pengamat */}
                  <div className="w-[45%] text-center">
                    <p className="text-xs text-black">
                      {identity.namaSekolah ? (identity.namaSekolah.toLowerCase().includes('yogyakarta') ? 'Yogyakarta' : identity.namaSekolah.split(' ')[0]) : 'Yogyakarta'}, {identity.waktuObservasi || '....................'}
                    </p>
                    <p className="text-xs font-bold text-black mt-0.5">Siswa / Pengamat,</p>
                    {/* Ruang kosong 60px tanda tangan basah */}
                    <div style={{ height: '60px' }} className="h-[60px]" aria-hidden="true" />
                    <p className="font-bold underline uppercase text-black text-xs">
                      {identity.namaLengkap ? identity.namaLengkap : '( ...................................................... )'}
                    </p>
                  </div>
                </div>

                {/* Watermark Penelitian Tindakan Kelas (PTK) */}
                <div
                  className="mt-8 pt-2 text-center text-[10px] italic"
                  style={{
                    borderTop: '1px solid #e2e8f0',
                    color: '#64748b',
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                  }}
                >
                  Media Scaffolding Menulis Teks LHO Kelas X • Penelitian Tindakan Kelas (PTK) • PPG Bahasa Indonesia
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center no-print">
              <button
                type="button"
                onClick={() => setActiveTab(3)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
              >
                <SvgIcon name="arrow-left" className="w-4 h-4" />
                <span>Kembali ke Tahap 3 (Paragraf)</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------
            TAB 5: PENGEMBANG
            ------------------------------------------ */}
        {activeTab === 5 && (
          <div className="space-y-6 pb-12">
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-5 sm:p-7 text-white shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white shadow-md shrink-0">
                    <SvgIcon name="user-check" className="w-9 h-9 text-emerald-200" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/70 px-2.5 py-0.5 rounded-full border border-emerald-400/30 text-emerald-100">
                      <SvgIcon name="sparkles" className="w-3 h-3 text-emerald-200" /> Pengembang Media Pembelajaran PTK
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                      Wisnu Tri Cahyo
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                      NIM: 25248610027 • PPG Bahasa Indonesia
                    </p>
                    <p className="text-xs text-emerald-200/90">
                      Universitas PGRI Yogyakarta
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 sm:p-4 rounded-xl border border-white/20 text-xs text-emerald-100 space-y-1">
                  <div className="font-semibold text-white">Kontak Pengembang:</div>
                  <a href="mailto:wisnutric03@gmail.com" className="text-emerald-200 hover:text-white underline block">
                    wisnutric03@gmail.com
                  </a>
                  <span className="text-[11px] text-emerald-300/80 block">
                    Universitas PGRI Yogyakarta
                  </span>
                </div>
              </div>
            </div>

            {/* Rincian Identitas Pengembang */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2">
                Data Peneliti & Identitas LPTK
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Nama Lengkap</span>
                  <span className="font-bold text-slate-900">Wisnu Tri Cahyo</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Nomor Induk Mahasiswa (NIM)</span>
                  <span className="font-mono font-bold text-emerald-700">25248610027</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Program Studi</span>
                  <span className="font-semibold text-slate-900">PPG Bahasa Indonesia</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Perguruan Tinggi (LPTK)</span>
                  <span className="font-semibold text-slate-900">Universitas PGRI Yogyakarta</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Sasaran Pengguna</span>
                  <span className="font-semibold text-emerald-700">Peserta Didik Fase E / Kelas X SMA/SMK</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
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

      {/* MODAL PETUNJUK PENGAMATAN */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <SvgIcon name="help" className="w-4 h-4 text-emerald-600" />
                Petunjuk Pengamatan (Meaningful Learning)
              </h3>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-base font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto text-xs text-slate-600 space-y-3 leading-relaxed">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <strong>Prinsip Observasi Nyata:</strong> Amati objek secara langsung di lingkungan sekolahmu (seperti laboratorium komputer, perpustakaan, kantin, taman sekolah, atau lapangan olahraga).
              </div>
              <p><strong>Langkah 1:</strong> Catat fakta dan data konkret yang dapat dilihat, diraba, atau diukur.</p>
              <p><strong>Langkah 2:</strong> Pada Tahap 2, ubah jawaban menjadi kalimat baku dengan kata kerja kopula (adalah, merupakan) dan konjungsi antar-kalimat yang tepat.</p>
              <p><strong>Langkah 3:</strong> Pada Tahap 3, rangkai kalimat menjadi tiga bagian struktur teks LHO yang utuh.</p>
              <p><strong>Langkah 4:</strong> Pada Tahap 4, unduh dokumen PDF atau cetak sebagai tugas portofolio.</p>
            </div>
            <div className="p-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs"
              >
                Mengerti & Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RESET KONFIRMASI */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-xl bg-rose-50">
                <SvgIcon name="alert" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Kosongkan Semua Data?</h3>
                <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Seluruh isian formulir yang tersimpan di browser ini akan dihapus bersih ke kondisi awal.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Ya, Kosongkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
