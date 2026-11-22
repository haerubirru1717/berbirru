// Kontrak "Laporkan akun": dulu hanya memunculkan pesan tanpa menyimpan apa pun.
// Sekarang laporan benar-benar tercatat, terekam ke halaman admin, dan tidak bisa
// dipakai sebagai jalan pintas: pelapor SELALU dari sesi, satu pelapor = satu laporan.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const baca = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const mig = 'migrations/0038_account_reports.sql';
assert.ok(existsSync(new URL('../' + mig, import.meta.url)), 'migrasi tabel laporan wajib ada');
const sql = baca(mig);
assert.match(sql, /CREATE TABLE IF NOT EXISTS account_reports/, 'tabel laporan wajib dibuat');
assert.match(sql, /UNIQUE \(reporter_id, target_user_id\)/, 'satu pelapor = satu laporan per akun');
assert.match(baca('schema.sql'), /account_reports/, 'DB lokal baru wajib ikut punya tabelnya');

const social = baca('src/routes/social.ts');
const rute = social.slice(social.indexOf("app.post('/api/reports'"));
assert.ok(rute.length > 200, 'rute /api/reports wajib ada');
assert.match(rute, /const user = await getAuthUser\(c\)/, 'pelapor wajib dari sesi, bukan dari body');
assert.match(rute, /hitRate\(c\.env\.DB, `lapor:/, 'wajib ada pembatas laju laporan');
assert.match(rute, /ALASAN = \['spam', 'harassment', 'fraud', 'other'\]/, 'alasan wajib dari daftar tetap');
assert.match(rute, /target\.id === user\.id[\s\S]*Tidak bisa melaporkan diri sendiri/, 'lapor diri sendiri wajib ditolak');
assert.match(rute, /ON CONFLICT \(reporter_id, target_user_id\) DO UPDATE/, 'kiriman ulang memperbarui laporan lama');
assert.match(rute, /slice\(0, 300\)/, 'catatan wajib dibatasi panjangnya');

const profile = baca('src/web/profile.ts');
// Lembar lapor hanya untuk profil ORANG LAIN dan hanya bila ada sesi.
assert.match(profile, /!isMe && currentUser \? `[\s\S]{0,400}id="laporPanel"/, 'lembar lapor wajib hanya di profil orang lain');
assert.match(profile, /body: JSON\.stringify\(\{ pen_name: currentPenName/, 'sasaran laporan = penulis halaman');
// Panel pengaturan hanya ada di profil sendiri: baris lapor di dalamnya sudah dibuang.
const panel = profile.slice(profile.indexOf('data-panel="pengaturan"'), profile.indexOf('<!-- 5-TAB DOCKED BOTTOM NAVBAR -->'));
assert.ok(!/Laporkan akun<\/span>/.test(panel), 'panel sendiri tidak boleh punya tombol lapor (tak ada gunanya)');

const admin = baca('src/web/admin.ts');
assert.match(admin, /LAPORAN AKUN/, 'halaman admin wajib menampilkan laporan');
assert.match(admin, /d\.reports\?\.latest/, 'admin wajib membaca daftar laporan');
assert.match(baca('src/lib/admin-social.ts'), /FROM account_reports/, 'dasbor admin wajib mengambil laporan dari DB');
console.log('OK — laporan akun tercatat, terlindung dari penyalahgunaan, dan tampil di admin');
