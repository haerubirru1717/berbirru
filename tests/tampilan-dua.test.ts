// Kontrak: mulai sekarang hanya ada DUA tampilan (bersih & krem kertas) yang memakai
// satu bahasa desain. Neobrutalism dihapus dari halaman yang sudah pindah, dan
// penimpa gaya lama tidak boleh lagi menempel di halaman itu.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const baca = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const token = baca('src/web/design-baru.ts');
const profile = baca('src/web/profile.ts');
const index = baca('src/index.ts');
const kern = baca('src/web/kern-theme.ts');

// 1. Dua palet, satu bentuk. Tidak ada warna merek (cobalt) lagi di palet.
assert.match(token, /bersih: \{ bg: '#FAFAF9'/, 'palet bersih');
assert.match(token, /kertas: \{ bg: '#EFEBE3'/, 'palet krem kertas');
assert.match(token, /export function tokenCss\(/, 'token dipilih lewat fungsi');
const paletBlok = token.slice(token.indexOf('export const PALET'), token.indexOf('export type Tampilan'));
assert.ok(!/#1D61E7|#0F3E99|#FDE047/i.test(paletBlok), 'tidak boleh ada warna merek lama di palet');

// 2. Cookie lama tetap terbaca (kern→kertas, neo→bersih) supaya pembaca lama tak melihat keanehan.
assert.match(token, /nilai === 'kertas' \|\| nilai === 'kern'/, 'cookie lama kern tetap dihormati');

// 3. Halaman profil sudah pindah: bertanda, tanpa THEME neobrutalism, tanpa Archivo Black.
assert.match(profile, /<html lang="id" data-bahasa="baru">/, 'halaman wajib bertanda bahasa baru');
assert.ok(!/from '\.\/theme'/.test(profile), 'palet neobrutalism (THEME) tidak boleh dipakai lagi');
assert.ok(!/Archivo Black/.test(profile), 'fon neobrutalism tidak boleh tersisa');
assert.ok(!/--border-thick:var\(--line\)/.test(profile), 'pemisah tebal neobrutalism tidak boleh tersisa');
assert.match(profile, /--border-thick:1px solid var\(--s-line\)/, 'pemisah wajib jadi garis rambut');
assert.match(profile, /--shadow:0 0 transparent/, 'bayangan keras wajib hilang');

// 4. Penimpa krem lama berhenti di halaman yang sudah pindah (satu penjaga, bukan tambalan per halaman).
assert.match(kern, /if \(html\.includes\('data-bahasa="baru"'\)\) return html;/, 'penjaga di fungsi bersama');

// 5. Pilihan tampilan diteruskan server (tanpa kedipan warna saat halaman dimuat).
assert.match(index, /tampilanDariCookie\(c\.req\.header\('cookie'\), c\.env\.KERN_THEME_PRESET\)/, 'rute mengirim pilihan tampilan');
console.log('OK — dua tampilan (bersih & krem kertas), neobrutalism dilepas dari halaman profil');
