export type CommandResult = string | string[];

export type CommandHandler = (args: string[]) => CommandResult;

export const asciiTitle = [
  "  ____                        _     _     ",
  " / ___| _   _ _ __ _ __ ___ (_) __| | ___ ",
  " \\___ \\ | | | '__| '_ ` _ \\| |/ _` |/ _ \\",
  "  ___) | |_| | |  | | | | | | | (_| |  __/",
  " |____/ \\__,_|_|  |_| |_| |_|_|\\__,_|\\___|",
  "",
  " Sourish Ghosh — Portfolio CLI",
];

export const commands: Record<string, CommandHandler> = {
  help: () => [
    "Available commands:",
    "- help         Show this help",
    "- about        Short intro",
    "- projects     List of projects with links",
    "- techstack    Skills / tools",
    "- resume       Get CV download link",
    "- contact      Social links",
    "- ping <name> <msg>   Send a test message",
    "- shutdown     Exit to Goodbye screen",
  ],
  about: () => [
    "Hi, I'm Sourish — Software Engineer & Creative Developer.",
    "I build performant web experiences, playful interfaces, and dev tooling.",
  ],
  projects: () => [
    "- Project A — https://example.com/a",
    "- Project B — https://example.com/b",
    "- Project C — https://example.com/c",
  ],
  techstack: () => [
    "React, Next.js, TypeScript, Tailwind, motion (Framer Motion), Three.js",
    "Node.js, APIs, tooling, CI/CD",
  ],
  resume: () => [
    "Resume: /resume.pdf (replace with actual CV path)",
  ],
  contact: () => [
    "GitHub: https://github.com/7sg56",
    "X/Twitter: https://x.com/7sg56",
    "Email: hello@sourish.is-a.dev (example)",
  ],
  ping: (args) => {
    const [name = "world", ...rest] = args;
    const msg = rest.join(" ") || "hello";
    return `PONG to ${name}: ${msg}`;
  },
};
