"use client";

import React, { useMemo, useState } from "react";

export default function ContactWindow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const to = "7sg56.dev@gmail.com";
    const subject = encodeURIComponent(`Portfolio contact from ${name || "anonymous"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/7sg56"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/sourishghosh"
    },
    {
      name: "Twitter",
      url: "https://x.com/sourishghosh"
    },
    {
      name: "Email",
      url: "mailto:7sg56.dev@gmail.com"
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-theme mb-2">Contact</h1>
          <p className="text-theme-2">Get in touch with me</p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-theme">Social Links</h2>
            <div className="glass-2 rounded-lg p-4 border border-theme bg-black/20 backdrop-blur-sm">
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-theme-2 hover:text-accent transition-colors"
                  >
                    {link.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-theme">Send Message</h2>
            <div className="glass-2 rounded-lg p-4 border border-theme bg-black/20 backdrop-blur-sm">
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="w-full px-3 py-2 rounded glass-1 border border-theme text-theme placeholder-theme-2 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded glass-1 border border-theme text-theme placeholder-theme-2 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  className="w-full min-h-24 px-3 py-2 rounded glass-1 border border-theme text-theme placeholder-theme-2 focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <a
                  href={mailto}
                  className="inline-block px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm rounded transition-colors"
                >
                  Send Message
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
