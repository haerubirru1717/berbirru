// Penjaga build: aplikasi WAJIB bisa di-bundle. Tes unit lain hanya mengimpor
// sebagian berkas, jadi kesalahan sintaks di index.ts (mis. middleware yang
// kehilangan penutup) bisa lolos — padahal Worker tidak akan pernah deploy.
// Kasus nyata: blok Pasar dicabut, ikut terhapus `credentials: true, }));` milik CORS.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const esbuild = `${root}node_modules/.bin/esbuild`;
assert.ok(existsSync(esbuild), 'esbuild tidak ada — jalankan npm install');

try {
  execFileSync(esbuild, ['src/index.ts', '--bundle', '--format=esm', '--outfile=/dev/null', '--log-level=warning'],
    { cwd: root, stdio: 'pipe' });
} catch (e) {
  assert.fail(`bundle gagal (aplikasi tak akan bisa deploy):\n${(e.stderr || e.stdout || '').toString().slice(0, 800)}`);
}

console.log('OK — src/index.ts bisa di-bundle (aplikasi bisa deploy)');
