export interface StudentIdentity {
  namaLengkap: string;
  kelas: string;
  jurusan: string;
  nomorAbsen: string;
  namaSekolah: string;
  waktuObservasi: string;
}

export interface ObservationData {
  // Bagian 1: Pernyataan Umum / Klasifikasi (5 Soal)
  pu_namaObjek: string;
  pu_kategori: string;
  pu_lokasi: string;
  pu_waktu: string;
  pu_definisi: string;

  // Bagian 2: Deskripsi Bagian (5 Soal)
  db_ciriFisik: string;
  db_bahan: string;
  db_komponen: string;
  db_warnaTataLetak: string;
  db_kondisi: string;

  // Bagian 3: Deskripsi Manfaat / Kesimpulan (3 Soal)
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
  db_bahan: string;
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

export interface AppState {
  identity: StudentIdentity;
  observation: ObservationData;
  sentences: SentenceRepairData;
  paragraphs: ParagraphData;
  activeTab: number;
}
