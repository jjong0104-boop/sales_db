const Utils = {
  fmtDate(d) { return d ? d.replace(/-/g, '.') : '-'; },
  today() { return new Date().toISOString().split('T')[0]; },
  statusChip(s) {
    const m = { '계약완료':'chip-green','협의중':'chip-amber','진행중':'chip-blue' };
    return `<span class="chip ${m[s]||'chip-gray'}">${s||'-'}</span>`;
  },
  repChip(n) {
    const m = { '이원태':'chip-green','권현우':'chip-blue','나경덕':'chip-amber','최용준':'chip-coral' };
    return `<span class="chip ${m[n]||'chip-gray'}">${n||'-'}</span>`;
  },
  typeChip(t) {
    const m = { '신규고객':'chip-green','기존고객':'chip-blue','신규 재취업체':'chip-amber','기존 재취업체':'chip-coral' };
    return `<span class="chip ${m[t]||'chip-gray'}">${t||'-'}</span>`;
  },
  toast(msg, duration=2500) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg; el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration);
  },
  setLoading(show) { document.getElementById('loading-overlay')?.classList.toggle('show', show); },
  openModal(id)  { document.getElementById(id)?.classList.add('open'); },
  closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
};

const Layout = {
  renderTopbar() {
    const u = Auth.currentUser;
    const el = document.getElementById('topbar');
    if (!el) return;
    el.innerHTML = `
      <div class="tb-left">
        <button class="hamburger" onclick="Layout.toggleSidebar()" aria-label="메뉴">
          <span></span><span></span><span></span>
        </button>
        <a href="dashboard.html" class="tb-logo">
          <span class="logo-dot"></span>통신본부 방문일지
        </a>
      </div>
      <div class="tb-right">
        <div class="user-chip">
          <div class="user-av">${(u?.name||'??').slice(0,2)}</div>
          <span class="user-nm">${u?.name||''}</span>
          ${u?.role==='manager'?'<span class="chip chip-coral" style="font-size:10px">관리자</span>':''}
        </div>
        <button class="btn btn-outline btn-sm" onclick="Auth.logout()">로그아웃</button>
      </div>`;
  },
  activateNav(pageId) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === pageId));
  },
  toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebar-overlay');
    sb?.classList.toggle('open');
    ov?.classList.toggle('show');
  },
  closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('show');
  }
};
