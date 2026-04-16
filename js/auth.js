const Auth = {
  currentUser: null,
  init() {
    const s = sessionStorage.getItem('slv_user');
    if (s) this.currentUser = JSON.parse(s);
    return this.currentUser;
  },
  async login(name, password) {
    try {
      const { data, error } = await db.from('users').select('*').eq('name', name).eq('password', password).single();
      if (error || !data) return { success: false, message: '이름 또는 비밀번호가 올바르지 않습니다.' };
      this.currentUser = data;
      sessionStorage.setItem('slv_user', JSON.stringify(data));
      return { success: true, user: data };
    } catch(e) { return { success: false, message: '로그인 오류가 발생했습니다.' }; }
  },
  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('slv_user');
    window.location.href = '../index.html';
  },
  isLoggedIn()  { return !!this.currentUser; },
  isManager()   { return this.currentUser?.role === 'manager'; },
  requireLogin() {
    if (!this.isLoggedIn()) { window.location.href = '../index.html'; return false; }
    return true;
  }
};
