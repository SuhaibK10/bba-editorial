import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

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
