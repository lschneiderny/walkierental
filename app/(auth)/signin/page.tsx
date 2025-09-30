"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    // next-auth handles redirect on success
    if (res?.error) setError("Invalid email or password");
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    setError("");
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="mx-auto max-w-sm px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-black text-white dark:bg-white dark:text-black py-2 text-sm">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/10 dark:border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-black/60 dark:text-white/60">or continue with</span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          disabled={oauthLoading !== null}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-black/10 dark:border-white/10 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-medium">
            {oauthLoading === "google" ? "Connecting..." : "Google"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleOAuthSignIn("github")}
          disabled={oauthLoading !== null}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-black/10 dark:border-white/10 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-medium">
            {oauthLoading === "github" ? "Connecting..." : "GitHub"}
          </span>
        </button>
      </div>

      <p className="text-sm text-black/60 dark:text-white/60 mt-4">
        No account? <a href="/register" className="underline">Register</a>
      </p>
    </div>
  );
}
