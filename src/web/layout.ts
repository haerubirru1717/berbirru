import { THEME } from './theme';

export function renderBottomNav(
  activeTab: 'feed' | 'compose' | 'notifications' | 'profile' | 'akun' | '',
  currentUser: any = null,
  isMe = false,
): string {
  const akun = currentUser ? '/u/' + currentUser.pen_name : '/login';
  const on = (k: string) => (activeTab === k ? ' is-on' : '');

  const item = (href: string, label: string, svg: string, aktif: string, dot = false) => `
      <a href="${href}" class="bnav-item${aktif}">
        <svg viewBox="0 0 24 24">${svg}</svg>
        <span class="bnav-lbl">${label}</span>
        ${dot ? '<span class="bnav-dot" id="notifDot" style="display:none"></span>' : ''}
      </a>`;

  const icoHome = '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>';
  const icoBell = '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>';
  const icoUser = '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
  const icoTulis = '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.4 2.6a2.1 2.1 0 1 1 3 3L12 15l-4 1 1-4Z"/>';
  const plus = '<path d="M12 5v14M5 12h14"/>';

  const isi = item('/feed', 'Beranda', icoHome, on('feed'))
      + `
      <a href="/feed?action=compose" class="bnav-plus" data-mode="sosial" onclick="if(typeof openStudioModal==='function'){event.preventDefault();openStudioModal()}">
        <span class="p"><svg viewBox="0 0 24 24">${icoTulis}</svg></span>
        <span>Tulis</span>
      </a>`
      + item('/notifications', 'Notifikasi', icoBell, on('notifications'), true)
      + item(akun, 'Profil', icoUser, activeTab === 'profile' && isMe ? ' is-on' : '');

  return `
  <style>
    .bnav-count{position:absolute;top:1px;right:13px;min-width:16px;height:16px;padding:0 4px;border-radius:9px;background:#B42318;color:#fff;font:900 9px 'DM Sans';display:grid;place-items:center;line-height:1}
    body:has(> nav.bnav){padding-bottom:92px}
    .bnav{position:fixed;left:0;right:0;bottom:0;z-index:75;background:#fff;border-top:2.5px solid ${THEME.ink};
      padding:7px 10px calc(7px + env(safe-area-inset-bottom));box-shadow:0 -4px 0 rgba(11,25,44,.06)}
    .bnav[data-mode="sosial"]{border-top-color:${THEME.ink}}
    .bnav-in{width:100%;max-width:560px;margin:auto;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:center;gap:2px}
    .bnav-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:46px;
      text-decoration:none;color:${THEME.muted};font:800 9.5px 'DM Sans';letter-spacing:.01em;cursor:pointer;-webkit-tap-highlight-color:transparent}
    .bnav-item svg{width:21px;height:21px;stroke:currentColor;stroke-width:2.1;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .bnav-lbl{padding:1px 6px;border:1.5px solid transparent}
    .bnav[data-mode="sosial"] .bnav-item.is-on{color:${THEME.blue}}
    .bnav-item.is-on svg{stroke-width:2.5}
    .bnav[data-mode="sosial"] .bnav-item.is-on .bnav-lbl{background:#DBEAFE;border-color:${THEME.ink};box-shadow:1px 1px 0 ${THEME.inkSoft}}
    .bnav-plus{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:60px;text-decoration:none;color:${THEME.ink};
      font:900 9.5px 'DM Sans';transform:translateY(-11px)}
    .bnav-plus .p{width:46px;height:46px;display:grid;place-items:center;background:${THEME.accent};border:2.5px solid ${THEME.ink};box-shadow:3px 3px 0 ${THEME.inkSoft}}
    .bnav-plus[data-mode="sosial"] .p{background:#DBEAFE}
    .bnav-plus .p svg{width:22px;height:22px;stroke:${THEME.ink};stroke-width:2.8;fill:none;stroke-linecap:round}
    .bnav-plus:active .p{transform:translate(2px,2px);box-shadow:1px 1px 0 ${THEME.inkSoft}}
    .bnav-ico{position:relative;display:inline-flex;line-height:0}
    .bnav-bell{position:relative;display:inline-flex}
    .bnav-dot{position:absolute;top:-2px;right:-3px;width:8px;height:8px;border-radius:50%;background:#B42318;border:1.5px solid #fff}
  </style>
  <nav class="bnav" data-mode="sosial">
    <div class="bnav-in">${isi}
    </div>
  </nav>
  `;
}
