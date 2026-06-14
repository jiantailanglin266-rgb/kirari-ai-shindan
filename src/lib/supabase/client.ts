import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ============================================================
   Supabase クライアント（任意接続）
   ------------------------------------------------------------
   .env.local に NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY を設定すると
   有効化されます。未設定時は null を返し、アプリはモックで動作。
   診断履歴の保存やアップロード画像の管理に利用予定。
   ============================================================ */

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    cached = null;
    return cached;
  }

  cached = createClient(url, anonKey);
  return cached;
}

export function isSupabaseEnabled() {
  return getSupabase() !== null;
}
