"use client";

import React from "react";

export default function ContactWindow() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/7sg56"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/7sg56"
    },
    {
      name: "Twitter",
      url: "https://x.com/sourishghosh777"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/7sg56"
    },
    {
      name: "Email",
      url: "mailto:7sg56.dev@gmail.com"
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-theme mb-2">Contact</h1>
          <p className="text-theme-2">Get in touch with me</p>
        </div>

        {/* Social Links */}
        <div className="max-w-2xl mx-auto">
          <p className="text-theme-2 font-bold text-center mb-6">
            I&apos;m always ready to collaborate and build things together! 
            <br />
            <span className="text-accent">Let&apos;s connect and make it happen.</span>
          </p>
          <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <div key={link.name} className="space-y-1">
                  <div className="text-theme font-medium">
                    {link.name} : <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 underline"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
