// Penjaga: /akun tetap hidup sebagai pengalihan ke profil, dan pengaturan
// tinggal di panel "Pengaturan" pada halaman profil (bukan halaman terpisah lagi).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const index = readFileSync(new URL('../src/index.ts', import.meta.url), 'utf8');
const profile = readFileSync(new URL('../src/web/profile.ts', import.meta.url), 'utf8');

assert.match(index, /app\.get\('\/akun'/, 'rute /akun wajib tetap terdaftar (jangan sampai 404)');
const blok = index.slice(index.indexOf("app.get('/akun'"), index.indexOf("app.get('/feed'"));
assert.match(blok, /c\.redirect\('\/u\/'/, '/akun wajib mengalihkan ke profil pemiliknya');
assert.ok(!/renderAkunPage/.test(index), 'halaman akun lama tidak boleh dipakai lagi');
assert.ok(!/web\/akun/.test(index), 'modul akun lama wajib sudah dilepas');

assert.match(profile, /data-panel="pengaturan"/, 'panel pengaturan wajib ada di halaman profil');
console.log('OK — /akun dialihkan ke profil; pengaturan ada di panel');
