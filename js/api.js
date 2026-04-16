const API = {
  async getUsers() {
    const { data, error } = await db.from('users').select('id,name,team,role').order('name');
    if (error) throw error; return data;
  },
  async getClients(repId = null) {
    let q = db.from('clients').select('*').order('created_at', { ascending: false });
    if (repId) q = q.eq('rep_id', repId);
    const { data, error } = await q;
    if (error) throw error; return data;
  },
  async createClient(payload) {
    const { data, error } = await db.from('clients').insert(payload).select().single();
    if (error) throw error; return data;
  },
  async updateClient(id, payload) {
    const { data, error } = await db.from('clients').update(payload).eq('id', id).select().single();
    if (error) throw error; return data;
  },
  async getLogs(repId = null) {
    let q = db.from('visit_logs').select('*, meeting_rounds(*)').order('visit_date', { ascending: false });
    if (repId) q = q.eq('rep_id', repId);
    const { data, error } = await q;
    if (error) throw error;
    return (data || []).map(l => ({ ...l, meeting_rounds: (l.meeting_rounds || []).sort((a,b) => a.round_num - b.round_num) }));
  },
  async getLog(id) {
    const { data, error } = await db.from('visit_logs').select('*, meeting_rounds(*)').eq('id', id).single();
    if (error) throw error;
    data.meeting_rounds = (data.meeting_rounds || []).sort((a,b) => a.round_num - b.round_num);
    return data;
  },
  async createLog(logPayload, rounds) {
    const { data: log, error } = await db.from('visit_logs').insert({ ...logPayload, updated_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    if (rounds?.length) {
      const rows = rounds.map((r, i) => ({ log_id: log.id, round_num: i+1, round_date: r.date || null, content: r.content }));
      const { error: e2 } = await db.from('meeting_rounds').insert(rows);
      if (e2) throw e2;
    }
    return log;
  },
  async updateLog(id, logPayload, rounds) {
    const { data: log, error } = await db.from('visit_logs').update({ ...logPayload, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    await db.from('meeting_rounds').delete().eq('log_id', id);
    if (rounds?.length) {
      const rows = rounds.map((r, i) => ({ log_id: id, round_num: i+1, round_date: r.date || null, content: r.content }));
      const { error: e2 } = await db.from('meeting_rounds').insert(rows);
      if (e2) throw e2;
    }
    return log;
  },
  async saveFeedback(id, feedback) {
    const { data, error } = await db.from('visit_logs').update({ feedback, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error; return data;
  }
};
