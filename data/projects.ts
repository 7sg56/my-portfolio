export type Project = {
  name: string;
  slug: string;
  desc: string;
  tech: string[];
  repo?: string;
  demo?: string;
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
  {
    name: "Portfolio OS — Retro Desktop UI",
    slug: "portfolio-os",
    desc: "A retro, macOS-inspired desktop interface with widgets, dock, and windows.",
    tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
    repo: "https://github.com/7sg56/my-portfolio",
    demo: "/os/mac",
  },
  {
    name: "3D Playground — WebGL Experiments",
    slug: "3d-playground",
    desc: "Interactive 3D scenes and shaders showcasing rendering experiments.",
    tech: ["Three.js", "Next.js", "TypeScript"],
    repo: "https://github.com/7sg56/3d-playground",
  },
];
