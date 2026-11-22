// ============================================================================
// BAHASA DESAIN BARU — satu sumber token untuk seluruh aplikasi.
//
// Ini calon PENGGANTI sistem lama (neobrutalist: garis tebal, bayangan keras,
// warna merek cobalt, Archivo Black). Aturannya:
//
//   1. Layar baru WAJIB memakai token --s-* di bawah, bukan token sistem lama.
//   2. Jangan menulis nilai warna/ukuran langsung di komponen — tambahkan token
//      di berkas ini kalau memang belum ada.
//   3. Warna merek tidak dipakai di antarmuka. Satu-satunya aksen (--s-hi)
//      khusus aksi berbahaya/penting.
//   4. Hierarki dibangun dari tipografi + jarak, pemisah berupa garis rambut.
//
// Font: 'Inter' (UI, teks). Dimuat per halaman lewat Google Fonts; lihat
// FONT_URL di bawah supaya pengambilan font seragam.
// ============================================================================

/** Tautan font untuk <head>. Pakai di setiap halaman yang memakai bahasa baru. */
export const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';

/* Dua tampilan: "bersih" (netral) dan "kertas" (krem). Satu bentuk, dua palet —
   memilih tampilan TIDAK mengubah tata letak, hanya warnanya. */
export const PALET = {
  bersih: { bg: '#FAFAF9', ink: '#0B0C0E', mut: '#71717A', line: '#E7E7E9', card: '#FFFFFF', hi: '#E5484D' },
  kertas: { bg: '#EFEBE3', ink: '#121010', mut: '#6E6A62', line: '#DCD5C7', card: '#F8F5EF', hi: '#B4341F' },
} as const;

export type Tampilan = keyof typeof PALET;

/** Blok CSS token. Sisipkan sekali per halaman: <style>${tokenCss(tampilan)}</style> */
export function tokenCss(tampilan: Tampilan = 'bersih'): string {
  const p = PALET[tampilan] || PALET.bersih;
  return `
  :root {
    /* --- warna (tampilan: ${tampilan}) --- */
    --s-bg:   ${p.bg};   /* latar halaman & panel */
    --s-ink:  ${p.ink};  /* teks utama */
    --s-mut:  ${p.mut};  /* teks sekunder, label */
    --s-line: ${p.line}; /* garis pemisah (rambut) */
    --s-card: ${p.card}; /* permukaan kartu */
    --s-hi:   ${p.hi};   /* aksen tunggal: aksi berbahaya/penting */

    /* --- huruf --- */
    --s-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

    /* --- bentuk --- */
    --s-radius: 16px;      /* sudut kartu & panel */
    --s-radius-pill: 999px;/* lencana/pil */
    --s-gap: 10px;         /* jarak antar kartu */
    --s-pad: 18px;         /* padding tepi layar */
  }
`;
}

/** Palet netral sebagai bawaan, untuk halaman yang belum pindah. */
export const TOKEN_CSS = tokenCss('bersih');

const COCOK = /(?:^|;\s*)bb_skin=(bersih|kertas|kern|neo)(?:;|$)/;

/** Tampilan pilihan pembaca: kertas (krem) atau bersih (netral). Nilai lama
 *  "kern"/"neo" tetap diterima supaya cookie lama tidak membuat halaman aneh. */
export function tampilanDariCookie(cookieHeader?: string, envPreset?: string): Tampilan {
  const m = COCOK.exec(cookieHeader || '');
  const nilai = (m ? m[1] : envPreset || 'bersih').toLowerCase();
  if (nilai === 'kertas' || nilai === 'kern') return 'kertas';
  return 'bersih';
}
