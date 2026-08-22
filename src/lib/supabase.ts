// Supabase Client Wrapper
// Designed for seamless transition between local state fallback and live Supabase deployment

export const isSupabaseConfigured = (): boolean => {
  const meta = import.meta as any;
  return Boolean(
    meta.env?.VITE_SUPABASE_URL && 
    meta.env?.VITE_SUPABASE_ANON_KEY
  );
};

export const getSupabaseConfigNotice = () => {
  if (!isSupabaseConfigured()) {
    return {
      status: 'demo_mode',
      message: 'Running in CyberShield Client-Side Demo Mode (Data stored locally in browser storage).'
    };
  }
  return {
    status: 'connected',
    message: 'Connected to live Supabase Backend.'
  };
};
