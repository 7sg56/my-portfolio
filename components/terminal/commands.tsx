"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MinecraftCharacter, MINECRAFT_MODELS, type MinecraftKind } from "@/components/three/Minecraft";
import * as THREE from "three";

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
};

// Minecraft character that looks towards the user's mouse; press 'q' to stop tracking
function CharacterLookAt({ kind, initialTracking = true }: { kind: MinecraftKind; initialTracking?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [tracking, setTracking] = useState<boolean>(initialTracking);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] with respect to window
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.x = x;
      mouse.current.y = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "q") setTracking(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current || !tracking) return;
    // Map normalized mouse to gentle yaw/pitch
    const targetYaw = mouse.current.x * Math.PI * 0.3; // left/right
    const targetPitch = -mouse.current.y * Math.PI * 0.15; // up/down (invert)
    // Smoothly interpolate
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * 0.1;
  });

  // Use negative X scale to mirror across X so the model faces forward
  const s = 0.075; // slightly smaller for better fit
  return (
    <group ref={groupRef} scale={[-s, s, s]}>
      <MinecraftCharacter kind={kind} position={[0, -0.95, 0]} />
    </group>
  );
}

function CharacterSummon() {
  const [kind, setKind] = useState<MinecraftKind | null>(null);
  useEffect(() => {
    // Select one random model on mount
    const list = [...MINECRAFT_MODELS];
    const idx = Math.floor(Math.random() * list.length);
    setKind(list[idx]);
  }, []);

  // Choose camera based on model; only Enderman is further out
  const cam = kind === 'enderman'
    ? { position: [0, 1.6, 11.5] as [number, number, number], fov: 26 }
    : { position: [0, 1.0, 5.5] as [number, number, number], fov: 35 };

  return (
    <div className="mt-2 inline-block rounded border border-zinc-700/70 bg-black/40" style={{ width: 260, height: 260 }}>
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
        {kind && <CharacterLookAt kind={kind} initialTracking />}
      </Canvas>
      <div className="text-[10px] text-zinc-400 p-1 px-2">{kind ? `${kind} summoned. Press q to stop looking at cursor.` : "Loading..."}</div>
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
        <div className="text-green-400">ping</div>
        <div>Ping me a message (ping &lt;message&gt;)</div>
        <div className="text-green-400">surprise</div>
        <div>It&apos;s a surprise</div>
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

  // ping
  ping: (args) => {
    const msg = args.join(" ") || "hello";
    return <div className="text-green-400">pong: <span className="text-zinc-200">{msg}</span></div>;
  },

  // surprise: random minecraft character
  surprise: () => <CharacterSummon />,

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
