import { StudentIdentity, ObservationData, SentenceRepairData, ParagraphData } from '../types';

export const initialIdentity: StudentIdentity = {
  namaLengkap: '',
  kelas: '',
  jurusan: '',
  nomorAbsen: '',
  namaSekolah: '',
  waktuObservasi: '',
};

export const initialObservation: ObservationData = {
  pu_namaObjek: '',
  pu_kategori: '',
  pu_lokasi: '',
  pu_waktu: '',
  pu_definisi: '',

  db_ciriFisik: '',
  db_bahan: '',
  db_komponen: '',
  db_warnaTataLetak: '',
  db_kondisi: '',

  dm_fungsiSiswa: '',
  dm_manfaatSekolah: '',
  dm_kesimpulanSaran: '',
};

export const initialSentences: SentenceRepairData = {
  pu_namaObjek: '',
  pu_kategori: '',
  pu_lokasi: '',
  pu_waktu: '',
  pu_definisi: '',

  db_ciriFisik: '',
  db_bahan: '',
  db_komponen: '',
  db_warnaTataLetak: '',
  db_kondisi: '',

  dm_fungsiSiswa: '',
  dm_manfaatSekolah: '',
  dm_kesimpulanSaran: '',
};

export const initialParagraphs: ParagraphData = {
  judul: '',
  paragrafPernyataanUmum: '',
  paragrafDeskripsiBagian: '',
  paragrafDeskripsiManfaat: '',
};

export const sampleExample = {
  identity: {
    namaLengkap: 'Ahmad Fauzi Pratama',
    kelas: 'X-A',
    jurusan: 'Rekayasa Perangkat Lunak',
    nomorAbsen: '04',
    namaSekolah: 'SMK Negeri 2 Yogyakarta',
    waktuObservasi: '2026-09-28',
  },
  observation: {
    pu_namaObjek: 'Laboratorium Komputer Multimedia',
    pu_kategori: 'Fasilitas penunjang pembelajaran teknologi informasi dan komunikasi',
    pu_lokasi: 'Gedung Sayap Barat Lantai 2 bersebelahan dengan Ruang Server',
    pu_waktu: 'Senin, 28 September 2026 pukul 09.00 WIB',
    pu_definisi: 'Laboratorium Komputer Multimedia adalah salah satu sarana edukasi berbasis digital yang digunakan untuk kegiatan praktikum komputasi dan multimedia di sekolah.',

    db_ciriFisik: 'Ruangan ini memiliki luas sekitar 9 x 8 meter dengan pendingin udara (AC) sentral serta pencahayaan lampu LED yang memadai.',
    db_bahan: 'Lantai beralaskan keramik putih antiselip, meja komputer terbuat dari kayu lapis berangka besi kokoh, dan kursi ergonomis berlapis busa.',
    db_komponen: 'Terdapat 36 unit komputer personal (PC), 1 unit proyektor LCD resolusi tinggi, sakelar jaringan LAN gigabit, dan papan tulis interaktif.',
    db_warnaTataLetak: 'Dinding ruangan dicat warna putih berpadu hijau sage lembut dengan formasi meja berjajar rapi menghadap ke depan ruangan.',
    db_kondisi: 'Seluruh perangkat keras dan periferal dalam kondisi bersih, terawat baik, serta terhubung dengan jaringan internet serat optik yang stabil.',

    dm_fungsiSiswa: 'Laboratorium ini berfungsi utama sebagai tempat siswa mempraktikkan keterampilan pemrograman, penyuntingan video grafis, dan simulasi asesmen digital.',
    dm_manfaatSekolah: 'Keberadaan laboratorium ini mendukung peningkatan literasi digital sekolah dan menunjang kelancaran asesmen nasional berbasis komputer.',
    dm_kesimpulanSaran: 'Secara keseluruhan, laboratorium komputer ini merupakan sarana vital sekolah yang kebersihan dan perawatannya harus senantiasa dijaga bersama oleh seluruh warga sekolah.',
  },
  sentences: {
    pu_namaObjek: 'Laboratorium Komputer Multimedia merupakan salah satu fasilitas penting di sekolah kami.',
    pu_kategori: 'Ruang ini termasuk ke dalam kategori sarana penunjang pembelajaran teknologi informasi dan komunikasi.',
    pu_lokasi: 'Fasilitas ini berlokasi strategis di Gedung Sayap Barat Lantai 2, tepat bersebelahan dengan Ruang Server sekolah.',
    pu_waktu: 'Kegiatan pengamatan dilaksanakan secara langsung pada hari Senin, 28 September 2026.',
    pu_definisi: 'Laboratorium Komputer Multimedia adalah sarana edukasi berbasis digital yang dirancang untuk mendukung kegiatan praktikum komputasi dan riset informasi peserta didik.',

    db_ciriFisik: 'Secara fisik, ruangan ini berukuran 9 x 8 meter dan dilengkapi dengan pendingin ruangan ganda serta jendela ventilasi kaca yang luas.',
    db_bahan: 'Perabotan di dalamnya terdiri atas meja komputer berbahan kayu lapis berangka besi kokoh serta kursi kerja ergonomis berlapis kain.',
    db_komponen: 'Komponen utama di dalam ruangan meliputi 36 unit komputer siswa, satu unit server mini, satu proyektor LCD resolusi tinggi, serta panel distribusi daya terpusat.',
    db_warnaTataLetak: 'Dinding ruangan bernuansa putih bersih dipadu aksen hijau sage, dengan susunan meja bergaya tapal kuda yang memudahkan mobilitas pengajar.',
    db_kondisi: 'Berdasarkan observasi, seluruh perangkat dalam kondisi prima, sistem pengabelan tertata rapi di dalam trunking lantai, dan sirkulasi udara terasa sejuk.',

    dm_fungsiSiswa: 'Fasilitas ini bermanfaat utama untuk melatih kemandirian siswa dalam mempraktikkan pemrograman perangkat lunak, desain grafis, dan pengolahan data digital.',
    dm_manfaatSekolah: 'Di samping itu, laboratorium ini juga bermanfaat bagi pihak sekolah sebagai pusat pelaksanaan ujian daring dan pelatihan literasi teknologi bagi tenaga kependidikan.',
    dm_kesimpulanSaran: 'Dengan demikian, keberadaan laboratorium komputer multimedia ini sangat krusial dalam menunjang mutu pendidikan sehingga disiplin pemeliharaannya wajib ditegakkan.',
  },
  paragraphs: {
    judul: 'Laporan Hasil Observasi Laboratorium Komputer Multimedia',
    paragrafPernyataanUmum: 'Laboratorium Komputer Multimedia merupakan salah satu sarana edukasi berbasis digital yang berada di lingkungan SMK Negeri 2 Yogyakarta. Fasilitas ini termasuk ke dalam kategori sarana penunjang pembelajaran teknologi informasi dan komunikasi. Fasilitas ini berlokasi strategis di Gedung Sayap Barat Lantai 2, tepat bersebelahan dengan Ruang Server sekolah. Pengamatan ini dilaksanakan pada hari Senin, 28 September 2026. Secara konseptual, laboratorium komputer multimedia adalah sarana edukasi berbasis teknologi yang dirancang khusus untuk mendukung kegiatan praktikum komputasi, pengembangan konten kreatif, dan riset informasi peserta didik.',
    paragrafDeskripsiBagian: 'Secara fisik, laboratorium komputer ini memiliki luas ruangan sekitar 9 x 8 meter yang dilengkapi dengan dua unit pendingin ruangan (AC) sentral serta pencahayaan lampu LED yang memadai. Perabotan di dalamnya terdiri atas meja komputer berbahan kayu lapis berangka besi kokoh serta kursi kerja ergonomis berlapis kain lembut. Komponen utama di dalam ruangan mencakup 36 unit komputer personal dengan spesifikasi mutakhir, satu unit komputer induk (server), proyektor LCD beresolusi tinggi, dan sakelar jaringan berkabel gigabit. Dinding ruangan dicat putih bersih berpadu aksen hijau sage lembut dengan tata letak meja berderet teratur menghadap layar monitor utama di depan. Seluruh perangkat keras dalam kondisi prima, jalur pengabelan terlindung rapi di saluran pelindung kabel bawah meja, dan kebersihan ruangan terjaga secara optimal.',
    paragrafDeskripsiManfaat: 'Keberadaan laboratorium komputer multimedia memiliki fungsi vital bagi seluruh sivitas akademika. Bagi peserta didik, fasilitas ini berfungsi sebagai wahana eksplorasi untuk mengasah keterampilan coding, desain grafis, dan simulasi asesmen berbasis komputer. Di samping itu, bagi pihak sekolah, sarana ini mendukung peningkatan indeks literasi digital serta kelancaran asesmen nasional berbasis daring. Dengan demikian, laboratorium komputer multimedia merupakan aset pendidikan yang sangat berharga sehingga pemanfaatan yang bijak dan pemeliharaan rutin perlu terus dijaga oleh seluruh warga sekolah.',
  }
};

export const CONJUNCTION_BANK = [
  { label: 'Selain itu,', tip: 'Menambahkan poin informasi serupa' },
  { label: 'Di samping itu,', tip: 'Menambahkan keterangan tambahan' },
  { label: 'Adapun', tip: 'Memperinci suatu bagian khusus' },
  { label: 'Secara umum,', tip: 'Menyampaikan gambaran menyeluruh' },
  { label: 'Sementara itu,', tip: 'Menghubungkan dua aspek yang sejalan' },
  { label: 'Dengan demikian,', tip: 'Menarik kesimpulan logis' },
  { label: 'Oleh karena itu,', tip: 'Menyatakan hubungan sebab-akibat' },
  { label: 'Berdasarkan hasil pengamatan,', tip: 'Menegaskan keobjektifan fakta' },
  { label: 'Secara fisik,', tip: 'Mengawali deskripsi kenampakan luar' },
  { label: 'Pada bagian dalam,', tip: 'Menguraikan komponen di dalam objek' },
];
