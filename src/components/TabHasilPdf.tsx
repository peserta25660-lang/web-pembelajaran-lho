import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Share2, 
  ArrowLeft,
  Calendar,
  User,
  School,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { StudentIdentity, ParagraphData, ObservationData } from '../types';

interface TabHasilPdfProps {
  identity: StudentIdentity;
  paragraphs: ParagraphData;
  observation: ObservationData;
  onPrevTab: () => void;
}

export const TabHasilPdf: React.FC<TabHasilPdfProps> = ({
  identity,
  paragraphs,
  observation,
  onPrevTab,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Trigger celebration confetti on mount if student has filled paragraphs
  useEffect(() => {
    if (paragraphs.paragrafPernyataanUmum && paragraphs.paragrafDeskripsiBagian) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#6ee7b7']
        });
      } catch {
        // Ignore in restricted environments
      }
    }
  }, []);

  const documentTitle = paragraphs.judul || `Laporan Hasil Observasi ${observation.pu_namaObjek || 'Objek Sekolah'}`;

  // Robust HTML to PDF generation ensuring NO BLANK PAGE
  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsGeneratingPdf(true);
    setErrorMessage(null);
    setPdfSuccess(false);

    try {
      const element = printRef.current;

      // 1. html2canvas with strict white background, scale: 2, and useCORS
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('printable-lho-sheet');
          if (el) {
            el.style.boxShadow = 'none';
            el.style.border = 'none';
          }
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // 2. jsPDF A4 configuration
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // 10mm margins on left and right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin

      // First page
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);

      // Multi-page handling if document is longer than one A4 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }

      const safeFileName = `${(identity.namaLengkap || 'LHO_Siswa').replace(/[^a-zA-Z0-9]/g, '_')}_LHO_Kelas_X.pdf`;
      pdf.save(safeFileName);

      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal membuat PDF:', err);
      setErrorMessage('Terjadi kendala dalam konversi canvas. Gunakan tombol "Cetak via Browser" di bawah ini untuk menyimpan PDF secara langsung.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Browser Native Print fallback (100% reliable on Chrome Android & Safari iOS)
  const handleBrowserPrint = () => {
    window.print();
  };

  // Copy full text to clipboard
  const handleCopyText = async () => {
    const fullText = `
${documentTitle.toUpperCase()}

LEMBAR KERJA PESERTA DIDIK (LKPD) TEKS LAPORAN HASIL OBSERVASI
Nama Siswa    : ${identity.namaLengkap || '-'}
Kelas / Absen : ${identity.kelas || '-'} / ${identity.nomorAbsen || '-'}
Jurusan       : ${identity.jurusan || '-'}
Sekolah       : ${identity.namaSekolah || '-'}
Tanggal       : ${identity.waktuObservasi || '-'}

==================================================
I. PERNYATAAN UMUM (KLASIFIKASI & DEFINISI)
==================================================
${paragraphs.paragrafPernyataanUmum || '-'}

==================================================
II. DESKRIPSI BAGIAN
==================================================
${paragraphs.paragrafDeskripsiBagian || '-'}

==================================================
III. DESKRIPSI MANFAAT & SIMPULAN
==================================================
${paragraphs.paragrafDeskripsiManfaat || '-'}
    `.trim();

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy
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
    <div className="space-y-6 pb-12">
      {/* Action Banner (Hidden during browser printing) */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-4 sm:p-6 text-white shadow-md no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-600/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-200" /> Tahap 4: Finalisasi & Portofolio
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Lembar Kerja & Hasil Ekspor PDF
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Teks LHO hasil scaffolding telah rapi dalam format akademik resmi. 
              Kamu dapat langsung mengunduh file PDF atau mencetak sebagai tugas PTK portofolio.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Download PDF */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>Membuat PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Unduh Dokumen PDF</span>
                </>
              )}
            </button>

            {/* Fallback Native Browser Print (Mobile Friendly) */}
            <button
              type="button"
              onClick={handleBrowserPrint}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/50 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 active:scale-95"
              title="Cetak langsung atau simpan via dialog browser perangkat"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak via Browser</span>
            </button>

            {/* Copy Text Button */}
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5"
              title="Salin isi teks lengkap untuk tugas WhatsApp / Google Classroom"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-200">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Notifications */}
        {pdfSuccess && (
          <div className="mt-3 p-2.5 bg-emerald-500/30 border border-emerald-300 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Dokumen PDF berhasil diunduh ke perangkatmu!</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-3 p-2.5 bg-rose-500/30 border border-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-200" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Educational Notice for Mobile */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5 no-print">
        <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Tips Pengguna HP (Android / iPhone):</strong>
          <p className="text-amber-800 mt-0.5">
            Jika kamu mengakses melalui browser HP, tombol <strong>"Cetak via Browser"</strong> sangat praktis! Pada menu printer HP, pilih <strong>"Simpan sebagai PDF"</strong> untuk mendapatkan hasil berkas vektor beresolusi tajam tanpa bug halaman kosong.
          </p>
        </div>
      </div>

      {/* PREVIEW CONTAINER / PRINTABLE SHEET */}
      {/* Strictly solid white background (#ffffff) and black text (#000000) for html2canvas anti-blank guarantee */}
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
          {/* Header Kop Dokumen Resmi */}
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

          {/* 1. Kotak Identitas Siswa (Tabel Rapi & Simetris 2 Kolom) */}
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

                {/* Baris 3: Objek Pengamatan & Sisi Kanan Simetris */}
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

          {/* Judul Teks LHO */}
          <div 
            className="text-center my-6"
            style={{ breakInside: 'avoid', pageBreakInside: 'avoid', color: '#000000' }}
          >
            <h1 className="text-sm sm:text-base font-bold uppercase tracking-tight text-black underline decoration-1 underline-offset-4">
              {documentTitle}
            </h1>
          </div>

          {/* Isi Laporan Terstruktur (3 Bagian) */}
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
                  <span className="italic" style={{ color: '#64748b' }}>
                    [Belum ada paragraf pernyataan umum. Silakan susun di Tahap 3.]
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
                  <span className="italic" style={{ color: '#64748b' }}>
                    [Belum ada paragraf deskripsi bagian. Silakan susun di Tahap 3.]
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
                  <span className="italic" style={{ color: '#64748b' }}>
                    [Belum ada paragraf deskripsi manfaat. Silakan susun di Tahap 3.]
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* 3. Kolom Pengesahan Tanda Tangan (2 Kolom Sejajar Rapi) */}
          <div 
            className="flex justify-between items-start mt-8 pt-4 text-center text-xs text-black"
            style={{ 
              borderTop: '1px solid #9ca3af',
              breakInside: 'avoid',
              pageBreakInside: 'avoid',
              color: '#000000',
            }}
          >
            {/* Kolom Kiri: Guru Pengampu */}
            <div className="w-[45%] text-center">
              <p className="text-xs text-black">Mengetahui,</p>
              <p className="text-xs font-bold text-black mt-0.5">Guru Pengampu Bahasa Indonesia</p>
              {/* Ruang kosong (height: 60px) untuk area tanda tangan basah / catatan guru */}
              <div style={{ height: '60px' }} className="h-[60px]" aria-hidden="true" />
              <p className="font-bold underline text-black text-xs">
                Wisnu Tri Cahyo
              </p>
            </div>

            {/* Kolom Kanan: Siswa / Pengamat */}
            <div className="w-[45%] text-center">
              <p className="text-xs text-black">
                {identity.namaSekolah ? (identity.namaSekolah.toLowerCase().includes('yogyakarta') ? 'Yogyakarta' : identity.namaSekolah.split(' ')[0]) : 'Yogyakarta'}, {identity.waktuObservasi || '....................'}
              </p>
              <p className="text-xs font-bold text-black mt-0.5">Siswa / Pengamat,</p>
              {/* Ruang kosong (height: 60px) untuk area tanda tangan basah */}
              <div style={{ height: '60px' }} className="h-[60px]" aria-hidden="true" />
              <p className="font-bold underline uppercase text-black text-xs">
                {identity.namaLengkap 
                  ? identity.namaLengkap 
                  : '( ...................................................... )'}
              </p>
            </div>
          </div>

          {/* 4. Footer Watermark Akademik */}
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

      {/* Bottom Navigation CTA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs no-print">
        <button
          type="button"
          onClick={onPrevTab}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tahap 3 (Paragraf)</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
