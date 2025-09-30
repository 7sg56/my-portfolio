"use client";

import React, { useMemo, useState } from "react";

export default function ContactWindow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const to = "sourish@example.com"; // TODO: replace with your real email
    const subject = encodeURIComponent(`Portfolio contact from ${name || "anonymous"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  return (
    <div className="flex h-full w-full flex-col gap-6 text-theme-2">
      <div className="rounded-2xl border border-theme glass-1 p-6">
        <h2 className="text-xl font-semibold text-theme">Contact / Socials</h2>
        <p>Find me online or send a quick note.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Socials */}
        <div className="rounded-2xl border border-theme glass-2 p-5">
          <div className="text-sm font-semibold text-theme mb-3">Socials</div>
          <div className="flex flex-col gap-2 text-sm">
            <a className="hover:text-accent text-theme-2" href="https://github.com/your-handle" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="hover:text-accent text-theme-2" href="https://x.com/your-handle" target="_blank" rel="noreferrer">Twitter/X ↗</a>
            <a className="hover:text-accent text-theme-2" href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        {/* Mail form */}
        <div className="lg:col-span-2 rounded-2xl border border-theme glass-2 p-5">
          <div className="text-sm font-semibold text-theme mb-3">Quick mail</div>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="px-3 py-2 rounded-md glass-1 border border-theme text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 ring-accent" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="px-3 py-2 rounded-md glass-1 border border-theme text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 ring-accent" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <textarea className="w-full min-h-32 px-3 py-2 rounded-md glass-1 border border-theme text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 ring-accent" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className="flex items-center gap-3">
              <a href={mailto} className="px-4 py-2 rounded-md bg-accent/80 hover:bg-accent text-white text-sm transition-colors">Open email app</a>
              <span className="text-xs text-theme-2">No backend needed — this opens your email client.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
