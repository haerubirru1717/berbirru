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

/** Blok CSS token. Sisipkan sekali per halaman: <style>${TOKEN_CSS}</style> */
export const TOKEN_CSS = `
  :root {
    /* --- warna --- */
    --s-bg:   #FAFAF9;   /* latar halaman & panel */
    --s-ink:  #0B0C0E;   /* teks utama */
    --s-mut:  #71717A;   /* teks sekunder, label */
    --s-line: #E7E7E9;   /* garis pemisah (rambut) */
    --s-card: #FFFFFF;   /* permukaan kartu */
    --s-hi:   #E5484D;   /* aksen tunggal: aksi berbahaya/penting */

    /* --- huruf --- */
    --s-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

    /* --- bentuk --- */
    --s-radius: 16px;      /* sudut kartu & panel */
    --s-radius-pill: 999px;/* lencana/pil */
    --s-gap: 10px;         /* jarak antar kartu */
    --s-pad: 18px;         /* padding tepi layar */
  }
`;
