import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// True once NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY are set in .env.local.
// Auth surfaces check this so the site degrades gracefully (and still
// builds) before the Supabase project keys are pasted in.
export function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Per-request server client for Server Components, Server Actions and
// Route Handlers. Never create this at module scope.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll from a Server Component render — safe to ignore, the
            // proxy session refresh keeps cookies current.
          }
        },
      },
    }
  );
}

// True once SUPABASE_SERVICE_ROLE_KEY is set — checkout's order-status
// writes degrade to a clear error instead of a crash before it's supplied.
export function serviceRoleConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// Bypasses Row Level Security. Never import into a Client Component and
// never expose this key to the browser. Used only for order status
// transitions (pending → paid/failed) in the checkout API routes, since
// no RLS policy grants that update to anon/authenticated users by design —
// see the "orders"/"order_items" policies in supabase/schema.sql.
export function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
