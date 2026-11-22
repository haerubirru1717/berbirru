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

// 6. Bahasa desain BARU: panel tidak boleh memakai token/font sistem lama
const blokPanel = profile.slice(profile.indexOf('Panel Pengaturan (bentuk C) — BAHASA'), profile.indexOf('</style>'));
for (const lama of ['border-thick', 'shadow-offset', 'Archivo Black', 'var(--ink)', 'var(--blue)', 'var(--white)']) {
  assert.ok(!blokPanel.includes(lama), `panel tidak boleh memakai sistem lama: ${lama}`);
}
const token = baca('src/web/design-baru.ts');
assert.match(token, /--s-bg:\s*#FAFAF9/, 'berkas token bahasa baru wajib memuat palet');
assert.match(token, /--s-hi:\s*#E5484D/, 'berkas token wajib memuat aksen tunggal');
assert.match(blokPanel, /var\(--s-bg\)|var\(--s-line\)/, 'panel wajib memakai token bersama');
assert.ok(!/--s-bg:#/.test(blokPanel), 'panel tidak boleh mendefinisikan tokennya sendiri lagi');
assert.match(profile, /from '\.\/design-baru'/, 'profil wajib mengimpor token bersama');
assert.match(profile, /family=Inter/, 'font Inter wajib dimuat untuk bahasa baru');

// 7. Jendela TIDAK layar penuh: lembar menempel bawah, tinggi mengikuti isi
const aturanStg = blokPanel.slice(blokPanel.indexOf('.stg {'), blokPanel.indexOf('.stg-head'));
assert.match(aturanStg, /bottom:0/, 'panel wajib menempel di bawah');
assert.match(aturanStg, /max-height:88vh/, 'panel wajib dibatasi tinggi, bukan layar penuh');
assert.ok(!/inset:0/.test(aturanStg), 'aturan .stg tidak boleh memenuhi layar (inset:0)');
assert.match(profile, /class="stg-root"/, 'isi root wajib dibungkus agar sub-panel bisa menggantikannya');

console.log('OK — jendela setinggi isi (bukan layar penuh)');
console.log('OK — panel memakai bahasa desain baru (bukan sistem lama)');
console.log('OK — kontrak panel pengaturan (bentuk C) + tanggal bergabung privat');
