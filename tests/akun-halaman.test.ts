// Penjaga halaman Akun: rutenya terdaftar, dan tidak ada sisa Pasar di halamannya.
// (Rute /akun pernah ikut terhapus bersama modul Pasar — tes ini mencegahnya terulang.)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { register } from 'node:module';
register(new URL('./ts-ext-hook.mjs', import.meta.url));

const index = readFileSync(new URL('../src/index.ts', import.meta.url), 'utf8');
assert.match(index, /app\.get\('\/akun',/, 'rute /akun wajib terdaftar di index.ts');
assert.match(index, /renderAkunPage/, 'rute /akun wajib merender halaman Akun');

const akun = await import('../src/web/akun.ts');
const pengguna = { pen_name: 'uji', email: 'uji@contoh.id', seller_status: null, is_owner: false };
const html = akun.renderAkunPage(pengguna, false);

for (const sisa of ['/pasar', 'Refund', 'Rekber', 'Toko Saya', 'Saldo']) {
  assert.ok(!html.includes(sisa), `halaman Akun tidak boleh memuat sisa Pasar: ${sisa}`);
}
assert.ok(html.includes('/u/uji'), 'tautan profil publik tetap ada');
assert.ok(html.includes('KITATULIS'), 'judul halaman memakai merek baru');

console.log('OK — halaman Akun: rute terdaftar, tanpa sisa Pasar');
