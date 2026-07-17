import { signInWithGoogle } from "@/lib/auth/actions";
import GoogleIcon from "@/components/shared/icons/GoogleIcon";

// "Continue with Google" + the or-divider, shared by /login and /signup.
// A plain form + server action: the action asks Supabase for the Google
// consent URL and redirects, /auth/callback completes the session.
export default function GoogleButton() {
  return (
    <div className="flex flex-col gap-6">
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 rounded-full border border-border bg-white
                     px-6 py-3 font-body text-sm font-medium text-text-primary
                     hover:border-accent transition-colors duration-200"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </form>

      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-border" />
        <span className="font-body text-xs uppercase tracking-wider text-text-faint">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
