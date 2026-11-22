-- Laporan akun: tombol "Laporkan akun" di profil orang lain kini benar-benar tersimpan.
-- Sebelumnya hanya memunculkan pesan tanpa mencatat apa pun (perasaan aman palsu).
--
-- Keputusan bentuk:
--  * UNIQUE (reporter_id, target_user_id): satu pelapor = satu laporan per akun.
--    Ini sekaligus pembatas laju alami (tidak bisa membanjiri tabel) dan membuat
--    kiriman ulang cukup memperbarui laporan lama.
--  * reason dibatasi aplikasi (daftar tetap) supaya tidak jadi tempat menyimpan teks bebas.
--  * status disimpan untuk penyaringan di halaman admin (belum ada tindakan otomatis).
CREATE TABLE IF NOT EXISTS account_reports (
  id             TEXT PRIMARY KEY,
  reporter_id    TEXT NOT NULL,
  target_user_id TEXT NOT NULL,
  reason         TEXT NOT NULL,
  note           TEXT,
  status         TEXT NOT NULL DEFAULT 'new',
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (reporter_id, target_user_id)
);

CREATE INDEX IF NOT EXISTS idx_account_reports_target ON account_reports(target_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_account_reports_created ON account_reports(created_at DESC);
