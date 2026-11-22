// CSS dasar halaman Akun. Dipindahkan UTUH dari modul Pasar saat Pasar dicabut — isi tidak diubah.
const BRAND_CSS = `
    .brand-header { text-align: center; margin-bottom: 18px; }
    .brand-wrap { display: inline-flex; align-items: center; text-decoration: none; position: relative; }
    .brand-badge {
      display: inline-flex; align-items: center; gap: 6px; background: var(--blue-primary);
      color: #FFFFFF; padding: 6px 14px; border: var(--border-thick); border-radius: var(--radius);
      box-shadow: var(--shadow-hard); transform: rotate(-1deg); position: relative; z-index: 2;
    }
    .brand-badge h1 { margin: 0; font-family: 'Archivo Black', sans-serif; font-size: 19px; font-weight: 800; letter-spacing: 0.5px; color: #FFFFFF; line-height: 1; }
    .brand-badge svg { width: 16px; height: 16px; stroke: #FFFFFF; stroke-width: 2; fill: none; flex-shrink: 0; }
    .brand-com-tag {
      font-family: 'Archivo Black', sans-serif; font-size: 26px; font-weight: 900;
      color: var(--blue-primary); position: relative; display: inline-block;
      transform: rotate(2deg); margin-left: 4px; margin-top: 2px; z-index: 1; line-height: 1;
      padding-bottom: 3px;
    }
    .brand-com-tag::after {
      content: ''; position: absolute; left: -24px; bottom: -3px; width: calc(100% + 28px); height: 6px;
      background: var(--accent-yellow); border-radius: 3px; z-index: -1;
    }`;

const BASE_CSS = `
    :root{--blue:#1D61E7;--deep:#0F3E99;--ink:#0B192C;--paper:#FFF9E9;--white:#FFFEF8;--yellow:#FDE047;--coral:#FF735F;--mint:#88E6BD;--soft:#E0EEFD;--red:#EF4444;--green:#059669;--line:3px solid var(--ink);--thin:2px solid var(--ink);--shadow:6px 7px 0 #26364A;--small-shadow:3px 4px 0 #26364A;--bg-main:var(--paper);--bg-card:#fff;--bg-blue-subtle:var(--soft);--shadow-ink:#26364A;--blue-primary:var(--blue);--blue-deep:var(--deep);--blue-light:#60A5FA;--accent-yellow:var(--yellow);--border-thick:var(--line);--border-med:3px solid var(--ink);--border-thin:var(--thin);--shadow-hard:var(--small-shadow);--shadow-hard-lg:var(--shadow);--shadow-hard-sm:2px 3px 0 #26364A;--radius:0;--radius-sm:0}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--paper);color:var(--ink);font-family:'DM Sans',sans-serif;min-height:100vh;padding:18px 14px 104px}button,input,textarea,select{font:inherit}button,a{-webkit-tap-highlight-color:transparent}:focus-visible{outline:4px solid var(--yellow);outline-offset:3px}
    .container{width:min(1080px,100%);margin:auto}.form-label{display:block;margin-bottom:6px;font:700 11px 'Roboto Mono';letter-spacing:.04em}.form-input{width:100%;min-height:46px;padding:10px 12px;border:2.5px solid var(--ink);border-radius:0;background:#fff;color:var(--ink);font-weight:700;outline:none}.form-input:focus{box-shadow:3px 3px 0 var(--blue);border-color:var(--ink)}textarea.form-input{resize:vertical;min-height:105px}
    .btn-primary{min-height:48px;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 18px;background:var(--blue);color:#fff;border:var(--line);border-radius:0;box-shadow:var(--small-shadow);font-weight:900;text-decoration:none;cursor:pointer;font-family:inherit}.btn-yellow{background:var(--yellow);color:var(--ink)}.btn-primary:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #26364A}
    .bottom-navbar{position:fixed;bottom:0;left:0;right:0;transform:none;width:100%;max-width:none;z-index:70;background:#fff;border-top:2px solid var(--ink);padding:6px 12px calc(6px + env(safe-area-inset-bottom));box-shadow:0 -5px 0 rgba(11,25,44,.07)}.navbar-inner{max-width:560px;margin:auto;background:transparent;border:0;border-radius:0;box-shadow:none;display:grid;grid-template-columns:repeat(5,1fr);padding:0}.nav-item{min-height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-decoration:none;color:#6A788D;font-size:10px;font-weight:800;cursor:pointer;padding:0}.nav-item svg{width:20px;height:20px;stroke:currentColor;stroke-width:2.2;fill:none;stroke-linecap:round;stroke-linejoin:round}.nav-item.active{color:var(--blue)}.nav-item-center{position:relative;top:-9px}.btn-create-floating{width:46px;height:46px;display:grid;place-items:center;background:var(--yellow);color:var(--ink);border:2.5px solid var(--ink);box-shadow:3px 3px 0 var(--ink);transform:rotate(-2deg)}.btn-create-floating svg{width:20px;height:20px}.ico{width:18px;height:18px;stroke:currentColor;stroke-width:2.2;fill:none;stroke-linecap:round;stroke-linejoin:round}.sec-title{font:700 clamp(40px,7vw,64px)/.95 'Newsreader',serif;letter-spacing:-.04em;margin:0;display:flex;align-items:center;gap:8px}
`;

export const AKUN_BASE_CSS = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,700;1,6..72,500&family=Roboto+Mono:wght@600;700&display=swap" rel="stylesheet">
    <style>${BASE_CSS}${BRAND_CSS}</style>`;
