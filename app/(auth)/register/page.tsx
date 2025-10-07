"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    if (res.ok) {
      await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    } else {
      const data = await res.json();
      setError(data?.error || "Failed to register");
    }
    setLoading(false);
  };

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-10 text-center">Register</h1>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 bg-transparent focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 bg-transparent focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 bg-transparent focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]" />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white py-3 text-base font-semibold transition-colors disabled:opacity-50">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
        <p className="text-center text-sm text-black/60 dark:text-white/60 mt-8">
          Already have an account? <a href="/signin" className="text-[color:var(--primary)] hover:underline font-medium">Sign in</a>
        </p>
      </div>
    </div>
  );
}
