"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MinecraftCharacter, MINECRAFT_MODELS, type MinecraftKind } from "@/components/three/Minecraft";
import * as THREE from "three";

// Single-active summon coordination so only the latest stays active
let activeSummonId: string | null = null;
const activeListeners = new Set<(id: string | null) => void>();
function setActiveSummon(id: string | null) {
  activeSummonId = id;
  activeListeners.forEach((fn) => fn(id));
}

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

export type Project = {
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

export const PROJECTS: Project[] = [
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
  about: "aboutme",
  surprise: "spawn", // backward-compatible alias
};

// Follow-the-mouse character (tracking defaults ON). Keys: q stops, f toggles.
function CharacterFollow({ kind, active }: { kind: MinecraftKind; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [tracking, setTracking] = useState<boolean>(true);
  const mouse = useRef({ x: 0, y: 0 });
  const effectiveTracking = tracking && active;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!effectiveTracking) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.x = x;
      mouse.current.y = y;
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "q") setTracking(false);
      if (k === "f") setTracking((v) => !v);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [effectiveTracking]);

  useFrame(() => {
    if (!groupRef.current || !effectiveTracking) return;
    const targetYaw = mouse.current.x * Math.PI * 0.3;
    // Invert pitch so moving mouse up tilts model up
    const targetPitch = mouse.current.y * Math.PI * 0.15;
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * 0.1;
  });

  const s = 0.075; // slightly smaller for better fit
  return (
    <group ref={groupRef} scale={[-s, s, s]}>
      <MinecraftCharacter kind={kind} position={[0, -0.95, 0]} />
    </group>
  );
}

function CharacterSpawn({ forcedKind }: { forcedKind?: MinecraftKind | null }) {
  const [kind, setKind] = useState<MinecraftKind | null>(forcedKind ?? null);
  const [id] = useState<string>(() => crypto.randomUUID());
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Pick specific kind if forced, else select random
    if (forcedKind) {
      setKind(forcedKind);
      return;
    }
    const list = [...MINECRAFT_MODELS];
    const idx = Math.floor(Math.random() * list.length);
    setKind(list[idx]);
  }, [forcedKind]);

  useEffect(() => {
    const onActive = (activeId: string | null) => setIsActive(activeId === id);
    activeListeners.add(onActive);
    // become active on mount
    setActiveSummon(id);
    return () => {
      activeListeners.delete(onActive);
      if (activeSummonId === id) setActiveSummon(null);
    };
  }, [id]);

  // Choose camera based on model
  const cam = (() => {
    if (kind === 'enderman') return { position: [0, 1.6, 11.5] as [number, number, number], fov: 26 };
    if (kind === 'steve') return { position: [0, 1.2, 10.0] as [number, number, number], fov: 28 };
    return { position: [0, 1.0, 5.5] as [number, number, number], fov: 35 };
  })();

  return (
    <div className="mt-2 mb-4 block rounded border border-zinc-700/70 bg-black/40" style={{ width: 260, height: 260, display: isActive ? 'block' : 'none', overflow: 'hidden' }}>
      <Canvas camera={cam}>
        {/* Base lights */}
        <ambientLight intensity={1.0} />
        <hemisphereLight intensity={0.7} args={[0xffffff, 0x444444]} />
        <directionalLight intensity={1.2} position={[2, 3, 2]} />
        {/* Extra lighting for Enderman (very dark) */}
        {kind === 'enderman' && (
          <>
            {/* Strong front fill */}
            <directionalLight intensity={3.0} position={[0, 3, 6]} />
            <pointLight intensity={1.8} position={[0, 2.2, 2.5]} />
            {/* Overhead spotlight to brighten full body */}
            <spotLight intensity={2.4} position={[0, 6, 3]} angle={0.6} penumbra={0.5} />
            {/* Rim/back light for silhouette separation */}
            <directionalLight intensity={1.2} position={[-2, 3.5, -3]} />
            {/* Slight ambient boost */}
            <ambientLight intensity={0.5} />
          </>
        )}
        {kind && <CharacterFollow kind={kind} active={isActive} />}
      </Canvas>
      <div className="text-[10px] text-zinc-400 p-1 px-2">{kind ? `${kind} spawned. (f: toggle follow, q: stop)` : "Loading..."}</div>
    </div>
  );
}

export const commands: Record<string, CommandHandler> = {
  help: () => (
    <div className="space-y-2">
      <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 font-mono text-sm">
        <div className="text-green-400">help</div>
        <div>List all commands</div>
        <div className="text-green-400">aboutme</div>
        <div>Who am I?</div>
        <div className="text-green-400">experience</div>
        <div>Companies / Societies / Clubs I have worked for</div>
        <div className="text-green-400">skills</div>
        <div>My tech stack</div>
        <div className="text-green-400">projects</div>
        <div>View my projects</div>
        <div className="text-green-400">socials</div>
        <div>View my socials</div>
        <div className="text-green-400">resume</div>
        <div>Download resume (optionally: resume &lt;filename.pdf&gt;)</div>
        <div className="text-green-400">spawn</div>
        <div>Spawn a character (spawn [creeper|zombie|steve|enderman])</div>
        <div className="text-green-400">shutdown</div>
        <div>Return to GRUB menu (asks for confirmation)</div>
        <div className="text-green-400">clear</div>
        <div>Clear terminal</div>
      </div>
    </div>
  ),

  // aboutme
  aboutme: () => (
    <div className="space-y-1">
      <div className="text-zinc-100 font-semibold">{PROFILE.name}</div>
      <div className="text-zinc-300">{PROFILE.tagline}</div>
      <div className="text-zinc-400 whitespace-pre-wrap">{PROFILE.about}</div>
    </div>
  ),

  // experience
  experience: () => (
    <div className="space-y-1">
      <div className="text-zinc-100">Experience</div>
      <ul className="list-disc pl-6 text-zinc-300 space-y-1">
        <li>SRMIST — Active member, coding communities and hackathons</li>
        <li>Open-source / Personal projects — {PROJECTS.length}+ projects, focusing on web apps and tooling</li>
        <li>Clubs & Societies — Developer roles in campus clubs</li>
      </ul>
      <div className="text-zinc-500">Note: Replace with specific organizations and roles as they become available.</div>
    </div>
  ),

  // skills (keep existing component)
  skills: () => <Skills />,

  // projects (keep existing implementation)
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

  // socials (keep existing)
  socials: () => (
    <div className="space-y-1">
      <div className="text-zinc-100">Links & Contact</div>
      <div>GitHub: {link(PROFILE.socials.github)}</div>
      <div>LinkedIn: {link(PROFILE.socials.linkedin)}</div>
      <div>Twitter/X: {link(PROFILE.socials.twitter)}</div>
      <div>Portfolio: {link(PROFILE.socials.portfolio)}</div>
      <div>Email: <span className="text-zinc-200">{PROFILE.contact.email_masked}</span></div>
    </div>
  ),

  // resume: attempt to download a PDF from /public
  resume: (args) => {
    const target = (args[0] || 'resume.pdf').replace(/^\/+/, '');
    const url = `/${target}`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {}
    return (
      <div className="space-y-1">
        <div>Attempting download: <span className="text-zinc-200">{url}</span></div>
        
      </div>
    );
  },

  // spawn: random or specific minecraft character
  spawn: (args) => {
    const arg = (args[0] || "").toLowerCase();
    const asKind = (MINECRAFT_MODELS as readonly string[]).includes(arg) ? (arg as MinecraftKind) : null;
    return <CharacterSpawn forcedKind={asKind} />;
  },

  // shutdown with confirmation
  shutdown: () => (
    <div className="space-y-2">
      <div className="text-zinc-100">Shutdown requested</div>
      <div className="text-zinc-400">Return to GRUB menu? This will leave the terminal.</div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800"
          onClick={() => { try { window.location.assign('/'); } catch {} }}
        >
          Yes
        </button>
        <button
          className="px-2 py-1 rounded border border-zinc-700 hover:bg-zinc-800"
          onClick={() => { /* no-op: user can continue */ }}
        >
          No
        </button>
      </div>
      <div className="text-zinc-500 text-xs">Tip: type <span className="text-zinc-200">help</span> to continue.</div>
    </div>
  ),
  // Remove legacy commands below — replaced by the new set above
};
