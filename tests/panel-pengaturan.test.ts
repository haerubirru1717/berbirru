// Kontrak panel pengaturan (bentuk C: kotak cepat 2x2 + daftar) — gaya setelan ChatGPT.
// Dijaga di sini supaya bentuk panel tidak melenceng dan tidak diam-diam kembali ke popover lama.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const baca = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const profile = baca('src/web/profile.ts');
const social = baca('src/routes/social.ts');

// 1. Panel ada, dan bentuknya bentuk C
assert.match(profile, /data-panel="pengaturan"/, 'panel pengaturan wajib ada');
const tiles = [...profile.matchAll(/data-tile="([a-z-]+)"/g)].map((m) => m[1]);
const kotak = tiles.filter((t) => ['akun', 'profil', 'keamanan', 'tampilan'].includes(t));
assert.equal(new Set(kotak).size, 4, `kotak cepat wajib tepat 4, dapat: ${[...new Set(kotak)].join(', ')}`);

// 2. Daftar "Lainnya" memuat baris yang disepakati
for (const label of ['Foto & Sampul', 'Bantuan', 'Tentang', 'Keluar Akun']) {
  assert.ok(profile.includes(label), `baris daftar wajib ada: ${label}`);
}

// 3. Mekanisme panel: buka/tutup + sub-panel satu tingkat
for (const fn of ['function openSettings', 'function closeSettings', 'function stgOpen', 'function stgBack']) {
  assert.ok(profile.includes(fn), `fungsi wajib ada: ${fn}`);
}
assert.match(profile, /id="stgSub"/, 'wadah sub-panel wajib ada');

// 4. Privasi: tanggal bergabung tidak lagi tampil publik
assert.ok(!profile.includes('profileSince'), 'label "Sejak" publik wajib dihapus');

// 5. Privasi: endpoint profil publik tidak mengirim created_at ke pengunjung lain
const blok = social.slice(social.indexOf("app.get('/api/users/:pen_name'"), social.indexOf("app.get('/api/users/:pen_name'") + 3000);
assert.match(blok, /isSelf/, 'endpoint profil wajib menghitung isSelf');
assert.match(blok, /delete .*created_at|created_at: undefined/, 'created_at wajib dibuang untuk pengunjung lain');

console.log('OK — kontrak panel pengaturan (bentuk C) + tanggal bergabung privat');
