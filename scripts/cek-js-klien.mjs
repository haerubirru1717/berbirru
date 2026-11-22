// Pemeriksa sintaks JS klien.
//
// Kode JS halaman ini ditulis di dalam templat HTML (string), jadi build TIDAK
// memeriksanya: kesalahan sintaks baru muncul sebagai error di browser pengguna.
// Skrip ini mengambil HTML yang benar-benar dikirim server, mengekstrak setiap
// <script> inline, lalu menguji sintaksnya. (Pernah menangkap dua kerusakan nyata.)
//
// Pakai:
//   node scripts/cek-js-klien.mjs http://127.0.0.1:8787/u/uji1 "kitatulis_session=<token>"
//   BB_COOKIE="kitatulis_session=..." node scripts/cek-js-klien.mjs http://127.0.0.1:8787/feed
import vm from 'node:vm';

const url = process.argv[2] || 'http://127.0.0.1:8787/';
const cookie = process.argv[3] || process.env.BB_COOKIE || '';
const res = await fetch(url, { headers: cookie ? { cookie } : {} });
const html = await res.text();
const skrip = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

if (!skrip.length) {
  console.log('tidak ada skrip inline di', url);
  process.exit(0);
}
let rusak = 0;
skrip.forEach((kode, i) => {
  try {
    new vm.Script(kode, { filename: `${url}#${i}` });
    console.log(`  OK   skrip #${i} (${kode.length} karakter)`);
  } catch (e) {
    rusak++;
    console.log(`  RUSAK skrip #${i}: ${e.message}`);
  }
});
console.log(rusak ? `\n${rusak} skrip rusak — perbaiki sebelum deploy.` : `\n${skrip.length} skrip inline bersih.`);
process.exit(rusak ? 1 : 0);
