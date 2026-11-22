# HANDOFF — KitaTulis (rebrand dari Birru/Berbirru)

Ditulis 22 Nov 2026 untuk agent/pengembang berikutnya. Semua yang di bawah ini
sudah diverifikasi, bukan perkiraan.

## Keadaan kode (bersih, tanpa perubahan menggantung)

- Klon kerja: `/tmp/main-merge`. Sumber resmi: `https://github.com/haerubirru1717/berbirru.git`
- Cabang aktif: **`feat/cabut-pasar`** — berisi: pencabutan Pasar Buku (4 batch),
  rebranding KITATULIS, panel Pengaturan, fitur laporan akun, dan **revert** repaint
  halaman profil yang ditolak pemilik.
- Commit terakhir: `be7a27a` (spesifikasi desain). Semua sudah dipush.
- **PRODUKSI BELUM DISENTUH.** `berbirru.com` masih BERBIRRU + neobrutalism.
  Tidak ada deploy dari sesi ini. Yang di bawah ini semuanya lokal/repo.
- Uji: `npm test` = `tsc --noEmit` + 39 berkas tes. Semua hijau (`EXIT=0`).
- Dev lokal: `npx wrangler dev --local --port 8787`. DB lokal = `schema.sql` +
  37 migrasi. Data uji: `uji1`/`uji2`, cookie `kitatulis_session=uji-lokal-token`.
- Potret & audit otomatis: skrip playwright di `/tmp/shot/*.mjs`.

## TUGAS UTAMA YANG MENUNGGU

**Pindahkan seluruh aplikasi ke bahasa desain baru, dengan acuan yang ditunjuk pemilik:**

`docs/spesifikasi-desain/` — 8 berkas (5 halaman + token + foto contoh).
Acuan utama: `5-profil-sendiri.html` (pemilik menunjuk ini sebagai "desain yang
terlihat profesional" yang ia inginkan). Kerabatnya: `4-profil-publik.html`,
`1-beranda.html`, `2-studio.html`, `3-warkah.html`.

Ciri WAJIB dari acuan (jangan diubah tanpa izin pemilik):

- Palet (`c-base.css`): latar `#FAFAF9`, tinta `#0B0C0E`, pudar `#71717A`,
  garis `#E7E7E9`. Tanpa warna merek; aksen hanya untuk hal penting/bahaya.
- **Nama & judul warkah memakai serif**; isi sans; metadata mono kecil.
- Sampul + avatar **bulat** menumpuk dengan pil overlay ("Ubah sampul"/"Ubah foto").
- Statistik **sebaris teks** (`12 warkah · 84 pengikut · 23 mengikuti`) — BUKAN kotak.
- Dua tombol pil: **Sunting Profil** (hitam pekat) + **Bagikan** (putih bergaris).
- Tab Karya/Disukai/Tersimpan/Balasan, garis bawah hitam di tab aktif.
- Warkah = **baris polos** dipisah garis rambut; tanpa kartu, tanpa bayangan.
- Navigasi bawah **5 ikon**: beranda, cari, tulis (bulat hitam), notifikasi, profil.

Urutan kerja: (1) profil sendiri → tunjukkan potret → (2) profil publik →
(3) beranda/feed → (4) studio tulis → (5) halaman baca warkah → (6) hapus
neobrutalism (`src/web/theme.ts` + `THEME` di tiap halaman) dan sisa penimpa
`src/web/kern-theme.ts`.

Juga perlu disamakan: **panel Pengaturan** dan **lembar "Laporkan akun"**
(keduanya sekarang memakai gaya netral-Inter buatan sesi sebelumnya).

## ATURAN KERJA DARI PEMILIK (jangan dilanggar)

1. **Jangan mengecat ulang satu halaman penuh tanpa persetujuan eksplisit.**
   Persetujuan atas *arah bahasa* bukan izin repaint. Tunjukkan mockup/potret dulu.
2. "Gas" = boleh eksekusi + deploy. Pesan berbentuk bahasan/pertanyaan = **jangan deploy**.
3. Jangan menyentuh produksi atau DB produksi tanpa izin tegas. Migrasi ke prod
   **manual `--file`**, bukan `migrations apply`.
4. **Jangan menamai apa pun atas inisiatif sendiri** (berkas, layanan, variabel brand).
   Istilah "krem" pernah menyesatkan pemilik — pakai nama berkas spesifikasi, bukan julukan.
5. Jangan pernah menampilkan rahasia/kunci di chat. Kunci masuk Worker Secret.
6. Akun Cloudflare aset **terkunci permanen** (Google `haerubirru17@gmail.com` dibanned):
   jangan tanya atau usulkan lagi. Deploy produksi menunggu keputusan pemilik.
7. Hapus data produksi: hitung dulu baris terdampak + 1 konfirmasi via pilihan +
   backup `wrangler d1 export`.

## PERANGKAP TEKNIS YANG SUDAH MEMAKAN KORBAN

- **JS klien ditulis di dalam templat string HTML** → `esbuild` dan suite tes TIDAK
  memeriksa sintaksnya; kerusakan baru terlihat di browser. Pakai
  `node scripts/cek-js-klien.mjs <url> "<cookie>"`. Sejak sesi ini `npm test`
  menjalankan `tsc --noEmit` lebih dulu — pemeriksa tipe sudah menangkap rute baru
  yang tertempel di luar fungsi ekspor (`app is not defined`).
- **Memotong blok kode dengan penanda awal/akhir**: penanda AKHIR ikut terhapus.
  Pernah menghapus kepala fungsi `setSkin` dan deklarasi `activeProfileTab`
  sehingga JS halaman mati total. Setelah memotong, periksa definisi SESUDAH-nya.
- **Mengganti semua warna pada baris yang memuat `box-shadow`**: satu baris CSS
  sering berisi `color:` DAN `box-shadow:` — ikon bisa jadi tak terlihat.
  Batasi penggantian pada nilai `box-shadow` saja.
- **Teknik cepat memindahkan halaman**: pertahankan nama alias lama
  (`--ink`, `--blue`, `--border-thick`) tapi arahkan ke palet baru dalam satu blok
  `:root`. Catatan: cara ini cepat tapi TIDAK menyelamatkan karakter — lihat di bawah.
- **Audit otomatis tidak mengukur rasa.** Skrip yang menghitung bayangan keras,
  garis tebal, warna merek, dan kontras bisa melaporkan "0 masalah" sementara
  pemilik menolaknya keras karena kehilangan karakter (serif, komposisi, proporsi).
  Ukur dengan membandingkan potret terhadap `docs/spesifikasi-desain/`.
