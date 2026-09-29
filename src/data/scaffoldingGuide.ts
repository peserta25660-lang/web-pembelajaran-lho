export interface QuestionScaffold {
  id: string;
  field: string;
  questionNumber: string;
  question: string;
  subGuide: string;
  placeholder: string;
  hints: string[];
  example: string;
  sentenceScaffold: {
    rule: string;
    suggestion: string;
  };
}

export const PERNYATAAN_UMUM_QUESTIONS: QuestionScaffold[] = [
  {
    id: 'pu_namaObjek',
    field: 'pu_namaObjek',
    questionNumber: 'Soal 1',
    question: 'Apa nama objek / fasilitas yang kamu amati?',
    subGuide: 'Sebutkan nama objek atau fasilitas spesifik di lingkungan sekolahmu.',
    placeholder: 'Contoh: Laboratorium Komputer Multimedia / Perpustakaan Digital Sekolah',
    hints: ['Pilih objek nyata yang mudah diakses', 'Gunakan nama resmi objek tersebut di sekolah'],
    example: 'Laboratorium Komputer Multimedia SMK Negeri 2 Yogyakarta',
    sentenceScaffold: {
      rule: 'Gunakan frasa pembuka yang lugas. Hindari kata opini seperti "sangat keren".',
      suggestion: 'Laboratorium Komputer Multimedia merupakan salah satu fasilitas penting di sekolah kami.'
    }
  },
  {
    id: 'pu_kategori',
    field: 'pu_kategori',
    questionNumber: 'Soal 2',
    question: 'Masuk dalam kategori / jenis apakah objek tersebut?',
    subGuide: 'Kelompokkan objek ke dalam kelas atau kategori yang lebih luas (klasifikasi umum).',
    placeholder: 'Contoh: Fasilitas penunjang pembelajaran teknologi informasi dan komunikasi',
    hints: ['Hubungkan dengan fungsi umum di sekolah', 'Gunakan istilah kategori baku'],
    example: 'Sarana penunjang pembelajaran teknologi informasi dan komunikasi.',
    sentenceScaffold: {
      rule: 'Gunakan kata kerja klasifikasi seperti "termasuk", "tergolong", atau "diklasifikasikan ke dalam".',
      suggestion: 'Ruang ini termasuk ke dalam kategori sarana penunjang pembelajaran teknologi informasi dan komunikasi.'
    }
  },
  {
    id: 'pu_lokasi',
    field: 'pu_lokasi',
    questionNumber: 'Soal 3',
    question: 'Di mana lokasi keberadaan objek tersebut di sekolah?',
    subGuide: 'Jelaskan letak posisi atau denah objek tersebut secara objektif.',
    placeholder: 'Contoh: Gedung Sayap Barat Lantai 2 bersebelahan dengan Ruang Server',
    hints: ['Sebutkan patokan gedung atau lantai', 'Gunakan kata depan "di" yang dipisah (di lantai, di gedung)'],
    example: 'Gedung Sayap Barat Lantai 2 bersebelahan dengan Ruang Server.',
    sentenceScaffold: {
      rule: 'Perhatikan penulisan kata depan "di" yang menunjukkan tempat harus dipisah.',
      suggestion: 'Fasilitas ini berlokasi strategis di Gedung Sayap Barat Lantai 2, tepat bersebelahan dengan Ruang Server sekolah.'
    }
  },
  {
    id: 'pu_waktu',
    field: 'pu_waktu',
    questionNumber: 'Soal 4',
    question: 'Kapan waktu observasi dilakukan?',
    subGuide: 'Tuliskan hari, tanggal, dan perkiraan jam pelaksanaan pengamatan lapangmu.',
    placeholder: 'Contoh: Senin, 28 September 2026 pukul 09.00 WIB',
    hints: ['Teks LHO harus berdasar fakta temporal nyata', 'Gunakan format baku waktu Indonesia'],
    example: 'Senin, 28 September 2026 pukul 09.00 WIB.',
    sentenceScaffold: {
      rule: 'Awali dengan keterangan waktu yang jelas untuk menunjukkan keaslian data observasi.',
      suggestion: 'Kegiatan pengamatan dilaksanakan secara langsung pada hari Senin, 28 September 2026.'
    }
  },
  {
    id: 'pu_definisi',
    field: 'pu_definisi',
    questionNumber: 'Soal 5',
    question: 'Buat 1 kalimat definisi menggunakan kata "adalah" atau "merupakan"!',
    subGuide: 'Rumuskan pengertian menyeluruh objek tersebut menggunakan kata kopula baku.',
    placeholder: 'Contoh: Laboratorium Komputer Multimedia adalah sarana edukasi berbasis digital yang digunakan untuk praktikum komputasi di sekolah.',
    hints: ['Wajib memuat kata "adalah", "merupakan", atau "ialah"', 'Jelaskan hakikat umum objek tersebut'],
    example: 'Laboratorium Komputer Multimedia adalah salah satu sarana edukasi berbasis digital yang digunakan untuk kegiatan praktikum komputasi dan multimedia di sekolah.',
    sentenceScaffold: {
      rule: 'Kalimat definisi harus berstruktur Subjek + Kopula (adalah/merupakan) + Predikat Konseptual.',
      suggestion: 'Laboratorium Komputer Multimedia adalah sarana edukasi berbasis digital yang dirancang untuk mendukung praktikum komputasi peserta didik.'
    }
  }
];

export const DESKRIPSI_BAGIAN_QUESTIONS: QuestionScaffold[] = [
  {
    id: 'db_ciriFisik',
    field: 'db_ciriFisik',
    questionNumber: 'Soal 6',
    question: 'Bagaimana ciri fisik, bentuk, dan ukuran objek yang kamu amati?',
    subGuide: 'Uraikan bentuk geometris, luas/panjang ruangan atau dimensi fisik objek secara faktual.',
    placeholder: 'Contoh: Ruangan ini memiliki luas sekitar 9 x 8 meter dengan pendingin udara (AC) sentral serta pencahayaan LED yang memadai.',
    hints: ['Gunakan satuan baku (meter, centimeter, buah)', 'Hindari kata subjektif berlebihan seperti "sangat luas sekali"'],
    example: 'Ruangan ini memiliki luas sekitar 9 x 8 meter dengan pendingin udara (AC) sentral serta pencahayaan lampu LED yang memadai.',
    sentenceScaffold: {
      rule: 'Gunakan frasa pemerian ukuran terukur untuk memperkuat sifat ilmiah teks LHO.',
      suggestion: 'Secara fisik, ruangan ini berukuran 9 x 8 meter dan dilengkapi dengan pendingin ruangan ganda serta ventilasi yang memadai.'
    }
  },
  {
    id: 'db_bahan',
    field: 'db_bahan',
    questionNumber: 'Soal 7',
    question: 'Terbuat dari bahan apa sajakah objek atau komponen di dalamnya?',
    subGuide: 'Sebutkan material penyusun objek (contoh: kayu jati, kaca tempered, logam, plastik polimer).',
    placeholder: 'Contoh: Lantai beralaskan keramik putih antiselip, meja komputer terbuat dari kayu lapis berangka besi kokoh.',
    hints: ['Amati tekstur dan material penyusun', 'Sebutkan minimal 2 bahan utama'],
    example: 'Lantai beralaskan keramik putih antiselip, meja komputer terbuat dari kayu lapis berangka besi kokoh, dan kursi ergonomis berlapis busa.',
    sentenceScaffold: {
      rule: 'Rangkai dengan konjungsi seperti "terdiri atas", "berbahan dasar", atau "terbuat dari".',
      suggestion: 'Perabotan di dalamnya terdiri atas meja komputer berbahan kayu lapis berangka besi kokoh serta kursi kerja ergonomis berlapis kain.'
    }
  },
  {
    id: 'db_komponen',
    field: 'db_komponen',
    questionNumber: 'Soal 8',
    question: 'Apa saja bagian-bagian atau fasilitas utama di dalam objek tersebut?',
    subGuide: 'Rincilah bagian-bagian terpenting yang menyusun objek atau isi fasilitas tersebut.',
    placeholder: 'Contoh: Terdapat 36 unit komputer personal (PC), 1 unit proyektor LCD resolusi tinggi, sakelar jaringan LAN, dan papan tulis.',
    hints: ['Pilah berdasarkan letak (depan, tengah, sudut)', 'Sebutkan rincian fasilitas secara sistematis'],
    example: 'Terdapat 36 unit komputer personal (PC), 1 unit proyektor LCD resolusi tinggi, sakelar jaringan LAN gigabit, dan papan tulis interaktif.',
    sentenceScaffold: {
      rule: 'Gunakan perincian runtut menggunakan tanda baca koma (,) sebelum konjungsi "dan" pada pemerian tiga unsur atau lebih.',
      suggestion: 'Komponen utama di dalam ruangan meliputi 36 unit komputer siswa, satu unit server mini, satu proyektor LCD, serta panel distribusi daya.'
    }
  },
  {
    id: 'db_warnaTataLetak',
    field: 'db_warnaTataLetak',
    questionNumber: 'Soal 9',
    question: 'Apa warna dominan dan bagaimana tata letak (susunan) bagian objek tersebut?',
    subGuide: 'Jelaskan skema warna dan bagaimana penataan objek menciptakan fungsi yang teratur.',
    placeholder: 'Contoh: Dinding ruangan dicat warna putih berpadu hijau sage lembut dengan formasi meja berjajar rapi menghadap ke depan.',
    hints: ['Sebutkan warna objektif yang terlihat', 'Gambarkan formasi penataan ruang/benda'],
    example: 'Dinding ruangan dicat warna putih berpadu hijau sage lembut dengan formasi meja berjajar rapi menghadap ke depan ruangan.',
    sentenceScaffold: {
      rule: 'Gabungkan unsur warna dan tata letak dalam kalimat majemuk setara.',
      suggestion: 'Dinding ruangan bernuansa putih bersih dipadu aksen hijau sage, dengan susunan meja berjajar rapi menghadap ke depan.'
    }
  },
  {
    id: 'db_kondisi',
    field: 'db_kondisi',
    questionNumber: 'Soal 10',
    question: 'Bagaimana kondisi fisik objek saat kamu amati?',
    subGuide: 'Amati tingkat kebersihan, keterawatan, kerapian, dan kelayakan fungsinya.',
    placeholder: 'Contoh: Seluruh perangkat keras dalam kondisi bersih, terawat baik, dan berfungsi secara normal.',
    hints: ['Catat fakta kelayakan fungsi', 'Berikan penilaian kondisi berdasarkan bukti nyata'],
    example: 'Seluruh perangkat keras dan periferal dalam kondisi bersih, terawat baik, serta terhubung dengan jaringan internet yang stabil.',
    sentenceScaffold: {
      rule: 'Gunakan verba deskriptif keadaan seperti "berfungsi secara optimal", "terpelihara dengan baik".',
      suggestion: 'Berdasarkan observasi, seluruh perangkat dalam kondisi prima, sistem pengabelan tertata rapi, dan kebersihan terjaga secara optimal.'
    }
  }
];

export const DESKRIPSI_MANFAAT_QUESTIONS: QuestionScaffold[] = [
  {
    id: 'dm_fungsiSiswa',
    field: 'dm_fungsiSiswa',
    questionNumber: 'Soal 11',
    question: 'Apa fungsi atau manfaat utama objek tersebut bagi kegiatan belajar siswa?',
    subGuide: 'Jelaskan manfaat langsung yang dirasakan siswa saat memanfaatkan fasilitas ini.',
    placeholder: 'Contoh: Berfungsi utama sebagai tempat siswa mempraktikkan keterampilan pemrograman, desain grafis, dan simulasi asesmen digital.',
    hints: ['Fokus pada manfaat edukatif', 'Sebutkan aktivitas nyata siswa'],
    example: 'Laboratorium ini berfungsi utama sebagai tempat siswa mempraktikkan keterampilan pemrograman, penyuntingan video grafis, dan simulasi asesmen digital.',
    sentenceScaffold: {
      rule: 'Gunakan frasa "berfungsi untuk", "bermanfaat dalam", atau "berguna bagi".',
      suggestion: 'Fasilitas ini bermanfaat utama untuk melatih kemandirian siswa dalam mempraktikkan pemrograman dan pengolahan data digital.'
    }
  },
  {
    id: 'dm_manfaatSekolah',
    field: 'dm_manfaatSekolah',
    questionNumber: 'Soal 12',
    question: 'Apa manfaat keberadaan objek tersebut bagi seluruh warga sekolah / guru?',
    subGuide: 'Jelaskan peran objek dalam mendukung program sekolah secara lebih luas.',
    placeholder: 'Contoh: Mendukung peningkatan literasi digital sekolah dan menunjang kelancaran asesmen nasional berbasis daring.',
    hints: ['Kaitkan dengan visi misi sekolah / lingkungan', 'Sebutkan manfaat bagi guru dan staf'],
    example: 'Keberadaan laboratorium ini mendukung peningkatan literasi digital sekolah dan menunjang kelancaran asesmen nasional berbasis komputer.',
    sentenceScaffold: {
      rule: 'Gunakan konjungsi antarkalimat atau intrakalimat penambahan seperti "di samping itu" atau "selain itu".',
      suggestion: 'Di samping itu, laboratorium ini juga bermanfaat bagi pihak sekolah sebagai pusat pelaksanaan ujian daring dan pelatihan literasi teknologi.'
    }
  },
  {
    id: 'dm_kesimpulanSaran',
    field: 'dm_kesimpulanSaran',
    questionNumber: 'Soal 13',
    question: 'Bagaimana kesimpulan atau saran umum mengenai pentingnya merawat objek tersebut?',
    subGuide: 'Tuliskan simpulan penutup serta ajakan menjaga kelestarian atau ketertiban fasilitas tersebut.',
    placeholder: 'Contoh: Secara keseluruhan, fasilitas ini merupakan sarana vital yang kebersihan dan perawatannya patut dirawat bersama oleh seluruh warga sekolah.',
    hints: ['Tuliskan simpulan singkat dan objektif', 'Tegaskan komitmen bersama merawat fasilitas'],
    example: 'Secara keseluruhan, laboratorium komputer ini merupakan sarana vital sekolah yang kebersihan dan perawatannya harus senantiasa dijaga bersama oleh seluruh warga sekolah.',
    sentenceScaffold: {
      rule: 'Awali kalimat simpulan dengan "Dengan demikian," atau "Secara keseluruhan,".',
      suggestion: 'Dengan demikian, keberadaan fasilitas ini sangat krusial dalam menunjang mutu pendidikan sehingga disiplin pemeliharaannya wajib ditegakkan.'
    }
  }
];

export const RUBRIK_PENILAIAN = [
  {
    aspek: 'Pernyataan Umum (Definisi & Klasifikasi)',
    skor4: 'Memuat klasifikasi objek secara jelas dan kalimat definisi baku yang tepat (adalah/merupakan).',
    skor3: 'Memuat klasifikasi dan definisi, namun kalimat definisi kurang efektif.',
    skor2: 'Hanya memuat klasifikasi tanpa kalimat definisi yang jelas.',
    skor1: 'Tidak memuat klasifikasi maupun definisi objek.',
  },
  {
    aspek: 'Deskripsi Bagian (Fakta Fisik & Rincian)',
    skor4: 'Memerinci ciri fisik, bahan, komponen, dan kondisi secara faktual, mendalam, dan terstruktur.',
    skor3: 'Memerinci ciri fisik dan komponen, namun ada aspek kondisi/bahan yang belum lengkap.',
    skor2: 'Rincian bagian bersifat umum, minim data faktual atau tercampur opini subjektif.',
    skor1: 'Deskripsi bagian tidak jelas, sangat pendek, dan tidak faktual.',
  },
  {
    aspek: 'Deskripsi Manfaat & Simpulan',
    skor4: 'Menjelaskan manfaat bagi siswa dan sekolah secara komprehensif disertai simpulan logis.',
    skor3: 'Menjelaskan manfaat bagi siswa, namun manfaat bagi sekolah atau simpulan kurang terelaborasi.',
    skor2: 'Penjelasan manfaat sangat singkat dan belum mengaitkan fungsi nyata.',
    skor1: 'Tidak terdapat deskripsi manfaat atau simpulan.',
  },
  {
    aspek: 'Kaidah Kebahasaan & PUEBI/EYD',
    skor4: 'Kalimat efektif, konjungsi antarkalimat bervariasi, huruf kapital dan tanda baca tepat 100%.',
    skor3: 'Sebagian besar kalimat efektif, terdapat 1-2 kesalahan kecil huruf kapital/tanda baca.',
    skor2: 'Banyak kalimat tidak efektif, konjungsi di awal kalimat tidak baku, ejaan belum rapi.',
    skor1: 'Struktur kalimat rancu, ejaan dan tanda baca tidak diperhatikan.',
  }
];
