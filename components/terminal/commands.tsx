"use client";

import React from "react";

export type ThemeName = "default" | "mocha";

export type Env = {
  setTheme: (name: ThemeName) => void;
  setBannerVisible: (v: boolean) => void;
  setPrompt: (p: string) => void;
  open: (url: string) => void;
  run: (cmd: string) => void; // programmatically run a command from clickable UI
  theme: ThemeName;
  prompt: string;
  bannerVisible: boolean;
};

export type CommandHandler = (args: string[], env: Env) => React.ReactNode;

type Project = {
  name: string;
  desc: string;
  tech: string[];
  repo?: string;
  demo?: string;
  slug: string; // lowercase key for lookup
};

const PROFILE = {
  name: "Sourish Ghosh",
  handle: "7sg56",
  tagline: "Full-Stack Developer focused on Next.js + design systems",
  about:
    "I’m a B.Tech Computer Science student at SRMIST, Chennai, passionate about building scalable web applications and exploring modern web technologies. I enjoy creating clean, responsive designs and experimenting with full-stack projects. Beyond web development, I’m also interested in machine learning, particularly NLP, and I regularly try to solve problems on LeetCode. I’m currently looking for opportunities to contribute to meaningful projects and continue growing as a developer. Let's connect and create the unimaginable",
  contact: {
    email_masked: "sghosh.ile.7@gmail.com (masked)",
    phone_masked: "You haven't reached that level of closeness to get my number :)",
    open_to: "Open to work / mentorship",
  },
  socials: {
    github: "https://github.com/7sg56",
    linkedin: "https://www.linkedin.com/in/7sg56",
    twitter: "https://x.com/sourishghosh777",
    portfolio: "https://sourishghosh-7sg56.vercel.app",
  },
  education: {
    summary: "B.Tech in CSE w/s SE (2024-2024) CGPA: 9.1",
  },
};

const PROJECTS: Project[] = [
  {
    name: "Stamped — Event management & Attendance system",
    slug: "stamped",
    desc: "Seamless event registration, instant QR check-ins, and real-time analytics.",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind", "JWT"],
    repo: "https://github.com/7sg56/stamped-v0",
    demo: "https://stamped-v0.vercel.app",
  },
];

const Skills = () => (
  <div className="space-y-1">
    <div className="text-zinc-100">Skills</div>
    <ul className="list-disc pl-6 text-zinc-300">
      <li>
        <span className="text-zinc-200">Languages:</span> JavaScript, TypeScript, Python, C++, Java, C
      </li>
      <li>
        <span className="text-zinc-200">Frontend:</span> NextJs, React, Tailwind, SASS
      </li>
      <li>
        <span className="text-zinc-200">Backend:</span> Node.js, Express
      </li>
      <li>
<span className="text-zinc-200">Databases:</span> MongoDB, MySQL, Supabase
      </li>
      <li>
        <span className="text-zinc-200">DevOps/Infra:</span> Git, GitHub Actions, Vercel, Netlify, Render
      </li>
      <li>
        <span className="text-zinc-200">Tools/Other:</span> VSCode, Figma, Postman, WSL
      </li>
    </ul>
  </div>
);

function link(href: string, text?: string) {
  return (
    <a className="text-green-400 underline" href={href} target="_blank" rel="noreferrer">
      {text ?? href}
    </a>
  );
}

export const aliases: Record<string, string> = {
  p: "projects",
  gh: "github",
  li: "linkedin",
  r: "resume",
  ls: "help",
  m: "menu",
};

export const commands: Record<string, CommandHandler> = {
  help: (_, env) => (
    <div className="space-y-2">
      <div className="text-green-400">Quick actions:</div>
      <div className="flex flex-wrap gap-2">
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("about details")}>About</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("projects list")}>Projects</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("skills")}>Skills</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("socials")}>Socials</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("resume")}>Resume</button>
      </div>
      <div className="text-zinc-500">More details only when you ask:</div>
      <ul className="list-disc pl-6">
        <li>about [summary|details]</li>
        <li>projects [list|view &lt;slug|#&gt;]</li>
        <li>skills, socials, resume</li>
        <li>clear</li>
      </ul>
    </div>
  ),
  menu: (_, env) => (
    <div className="space-y-2">
      <div className="text-green-400">Menu</div>
      <div className="flex flex-wrap gap-2">
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("about details")}>About</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("projects list")}>Projects</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("skills")}>Skills</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("socials")}>Socials</button>
        <button className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800" onClick={() => env.run("resume")}>Resume</button>
      </div>
      <div className="text-zinc-500">Tip: type <span className="text-zinc-200">help</span> for syntax, or click above.</div>
    </div>
  ),
  about: (args) => {
    const mode = (args[0] || "summary").toLowerCase();
    if (mode === "details" || mode === "detail" || mode === "full") {
      return (
        <div className="space-y-2">
          <div className="text-zinc-100 font-semibold text-lg">{PROFILE.name}</div>
          <div className="text-zinc-300">{PROFILE.tagline}</div>
          <div className="text-zinc-400 whitespace-pre-wrap">{PROFILE.about}</div>
          <div className="text-zinc-500">{PROFILE.education.summary}</div>
        </div>
      );
    }
    return (
      <div className="space-y-1">
        <div className="text-zinc-100 font-semibold">{PROFILE.name}</div>
        <div className="text-zinc-300">{PROFILE.tagline}</div>
      </div>
    );
  },
  whoami: () => (
    <div>
      <span className="text-zinc-100 font-semibold">{PROFILE.name}</span>
      <span className="text-zinc-400"> — {PROFILE.tagline}</span>
    </div>
  ),
  tagline: () => <div className="text-zinc-300">{PROFILE.tagline}</div>,
  socials: () => (
    <div className="space-y-1">
      <div className="text-zinc-100">Links & Contact</div>
      <div>GitHub: {link(PROFILE.socials.github)}</div>
      <div>LinkedIn: {link(PROFILE.socials.linkedin)}</div>
      <div>Twitter/X: {link(PROFILE.socials.twitter)}</div>
      <div>Portfolio: {link(PROFILE.socials.portfolio)}</div>
      <div>Email: <span className="text-zinc-200">{PROFILE.contact.email_masked}</span></div>
      <div>Phone: <span className="text-zinc-200">{PROFILE.contact.phone_masked}</span></div>
      <div>Status: <span className="text-green-400">{PROFILE.contact.open_to}</span></div>
    </div>
  ),
  contact: () => (
    <div className="space-y-1">
      <div className="text-zinc-400">Use <span className="text-zinc-200">socials</span> to view all links and contact.</div>
      <div className="text-zinc-100">Links & Contact</div>
      <div>GitHub: {link(PROFILE.socials.github)}</div>
      <div>LinkedIn: {link(PROFILE.socials.linkedin)}</div>
      <div>Twitter/X: {link(PROFILE.socials.twitter)}</div>
      <div>Portfolio: {link(PROFILE.socials.portfolio)}</div>
      <div>Email: <span className="text-zinc-200">{PROFILE.contact.email_masked}</span></div>
      <div>Phone: <span className="text-zinc-200">{PROFILE.contact.phone_masked}</span></div>
      <div>Status: <span className="text-green-400">{PROFILE.contact.open_to}</span></div>
    </div>
  ),
  email: () => (
    <div>Email: <span className="text-zinc-200">{PROFILE.contact.email_masked}</span></div>
  ),
  github: () => <div>{link(PROFILE.socials.github, "Open GitHub ↗")}</div>,
  linkedin: () => <div>{link(PROFILE.socials.linkedin, "Open LinkedIn ↗")}</div>,
  twitter: () => <div>{link(PROFILE.socials.twitter, "Open X/Twitter ↗")}</div>,
  portfolio: () => <div>{link(PROFILE.socials.portfolio, "Open Portfolio ↗")}</div>,
  resume: () => (
    <div className="text-zinc-300">Resume not added yet. Provide a public URL or place a file at <span className="text-zinc-100">public/resume.pdf</span>.</div>
  ),
  projects: (args) => {
    const sub = (args[0] || "list").toLowerCase();
    if (sub === "view") {
      const key = (args[1] || "").toLowerCase();
      let p: Project | undefined;
      if (/^\d+$/.test(key)) {
        const idx = parseInt(key, 10) - 1;
        p = PROJECTS[idx];
      } else {
        p = PROJECTS.find((x) => x.slug === key || x.name.toLowerCase().includes(key));
      }
      if (!p) return <div className="text-red-300">Usage: projects view &lt;slug|#&gt;</div>;
      return (
        <div className="space-y-1">
          <div className="text-zinc-100 font-semibold">{p.name}</div>
          <div className="text-zinc-300">{p.desc}</div>
          <div className="text-zinc-400">Tech: {p.tech.join(", ")}</div>
          <div className="space-x-3">
            {p.demo && link(p.demo, "demo")}
            {p.repo && link(p.repo, "repo")}
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-1">
        <div className="text-zinc-100">Projects ({PROJECTS.length})</div>
        <ul className="list-disc pl-6 space-y-1">
          {PROJECTS.map((p, i) => (
            <li key={p.slug}>
              <span className="text-zinc-200">[{i + 1}] {p.name}</span>
              <span className="text-zinc-500"> — {p.desc}</span>{" "}
              {p.demo && link(p.demo, "demo")}
              {p.repo && <span className="ml-2">{link(p.repo, "repo")}</span>}
            </li>
          ))}
        </ul>
        <div className="text-zinc-500">View details: projects view &lt;slug|#&gt;</div>
      </div>
    );
  },
  project: (args) => {
    const key = (args[0] || "").toLowerCase();
    let p: Project | undefined;
    if (/^\d+$/.test(key)) {
      const idx = parseInt(key, 10) - 1;
      p = PROJECTS[idx];
    } else {
      p = PROJECTS.find((x) => x.slug === key || x.name.toLowerCase().includes(key));
    }
    if (!p) return <div className="text-red-300">Project not found. Usage: project &lt;name|#&gt;</div>;
    return (
      <div className="space-y-1">
        <div className="text-zinc-100 font-semibold">{p.name}</div>
        <div className="text-zinc-300">{p.desc}</div>
        <div className="text-zinc-400">Tech: {p.tech.join(", ")}</div>
        <div className="space-x-3">
          {p.demo && link(p.demo, "demo")}
          {p.repo && link(p.repo, "repo")}
        </div>
      </div>
    );
  },
  skills: () => <Skills />,
  experience: () => (
    <div className="text-zinc-400">Experience: None</div>
  ),
  education: () => (
    <div className="text-zinc-300">{PROFILE.education.summary}</div>
  ),
  achievements: () => (
    <div className="text-zinc-400">Achievements: None</div>
  ),
  fetch: () => (
    <div className="space-y-1">
      <div className="text-zinc-100">{PROFILE.name} (@{PROFILE.handle})</div>
      <div className="text-zinc-300">{PROFILE.tagline}</div>
      <div className="text-zinc-400">Theme: Catppuccin Mocha</div>
      <div className="text-zinc-400">Location: Chennai (SRMIST)</div>
      <div className="text-zinc-400">Open to: {PROFILE.contact.open_to}</div>
    </div>
  ),
  open: (args, env) => {
    const url = args[0];
    if (!url) return <div className="text-red-300">Usage: open &lt;url&gt;</div>;
    env.open(url);
    return <div>Opening {url}…</div>;
  },
  theme: (args, env) => {
    const t = (args[0] || "").toLowerCase();
    if (t !== "default" && t !== "mocha") {
      return <div className="text-zinc-400">Unknown theme. Available: default, mocha</div>;
    }
    env.setTheme(t as ThemeName);
    return <div className="text-green-400">Theme set to {t}.</div>;
  },
  banner: (args, env) => {
    const v = (args[0] || "").toLowerCase();
    if (v === "on") env.setBannerVisible(true);
    else if (v === "off") env.setBannerVisible(false);
    else return <div className="text-zinc-400">Usage: banner on|off</div>;
    return <div className="text-green-400">Banner {v}.</div>;
  },
  prompt: (args, env) => {
    if (args[0] === "set") {
      const rest = args.slice(1).join(" ");
      if (!rest) return <div className="text-zinc-400">Usage: prompt set &lt;user@host:~&gt;</div>;
      env.setPrompt(rest);
      return <div className="text-green-400">Prompt updated.</div>;
    }
    return <div className="text-zinc-400">Usage: prompt set &lt;user@host:~&gt;</div>;
  },
  time: () => <div>{new Date().toLocaleString()}</div>,
  date: () => <div>{new Date().toLocaleDateString()}</div>,
};
