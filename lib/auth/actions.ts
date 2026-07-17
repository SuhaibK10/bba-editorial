"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { site } from "@/data/site";

const NOT_CONFIGURED =
  "Authentication isn't live yet — Supabase keys are missing from .env.local.";

function backWithError(path: "/login" | "/signup", message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) backWithError("/login", "Enter your email and password.");
  if (!supabaseConfigured()) backWithError("/login", NOT_CONFIGURED);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) backWithError("/login", error.message);

  redirect("/account");
}

export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) backWithError("/signup", "Enter an email and a password.");
  if (password.length < 8) backWithError("/signup", "Password must be at least 8 characters.");
  if (!supabaseConfigured()) backWithError("/signup", NOT_CONFIGURED);

  const origin = (await headers()).get("origin") ?? site.url;
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });
  if (error) backWithError("/signup", error.message);

  redirect(
    `/login?message=${encodeURIComponent(
      "Almost there — check your inbox and confirm your email, then sign in."
    )}`
  );
}

export async function signInWithGoogle() {
  if (!supabaseConfigured()) backWithError("/login", NOT_CONFIGURED);

  const origin = (await headers()).get("origin") ?? site.url;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback?next=/account` },
  });
  if (error || !data.url) {
    backWithError("/login", error?.message ?? "Could not start Google sign-in.");
  }

  redirect(data.url);
}

export async function signOut() {
  if (supabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
