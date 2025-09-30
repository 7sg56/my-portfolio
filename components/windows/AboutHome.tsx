"use client";

import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";

export type OpenAppFn = (app: "about" | "projects" | "skills" | "contact") => void;

type View = "home" | "about" | "experience";

export default function AboutHome({ onOpen }: { onOpen: OpenAppFn }) {
  const [currentView, setCurrentView] = useState<View>("home");

  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bevan:ital@0;1&family=Rammetto+One&family=Roboto+Slab:wght@400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const renderHome = () => (
    <div className="flex flex-col items-center gap-6 text-center">
        {/* Name */}
        <div>
          <h1 className="text-7xl font-bold text-theme" style={{ fontFamily: 'Bevan, serif'}}>Sourish Ghosh</h1>
        </div>

        {/* Roles */}
        <div className="flex flex-row gap-6">
          <span className="text-lg text-theme-2 font-medium">Software Engineer</span>
          <span className="text-theme-2">&</span>
          <span className="text-lg text-theme-2 font-medium">Full Stack Developer</span>
      </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setCurrentView("about")}
            className="rounded-lg border-2 border-theme glass-2 hover:glass-1 text-theme px-4 py-2 transition-all duration-200 font-bold hover:scale-105 hover:shadow-lg hover:shadow-theme/25 text-sm"
          >
            About
          </button>
          
          <button
            onClick={() => setCurrentView("experience")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-4 py-2 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-sm"
          >
            Experience
          </button>
          
          <button
            onClick={() => onOpen("projects")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-4 py-2 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-sm"
          >
            Projects
          </button>
          
          <button
            onClick={() => onOpen("skills")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-4 py-2 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-sm"
          >
            Skills
          </button>
          
          <button
            onClick={() => onOpen("contact")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-4 py-2 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-sm"
          >
            Contact
          </button>
        </div>
    </div>
  );

  const renderAbout = () => (
    <div className="flex flex-col gap-6 text-theme-2 max-w-7xl h-full overflow-y-auto">
      <div className="flex items-center justify-between sticky top-0 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm z-10 pb-4">
        <h2 className="text-2xl font-bold text-theme">About — Detailed</h2>
          <button
          className="text-theme hover:text-theme-2 transition-colors"
          onClick={() => setCurrentView("home")}
        >
          ← Back to Home
        </button>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="border-b border-theme/20 pb-4">
          <h1 className="text-4xl font-bold text-theme">Sourish Ghosh</h1>
          <p className="text-xl text-theme-2 mt-2">Full-Stack Developer & Software Engineer</p>
        </div>

        {/* Table of Contents */}
        <div className="border border-theme/40 rounded-lg p-6 glass-1">
          <h2 className="text-xl font-bold text-theme mb-4">📋 Table of Contents</h2>
          <ul className="space-y-2 text-theme-2">
            <li><a href="#about" className="text-blue-400 hover:text-blue-300 underline">• About</a></li>
            <li><a href="#tech-stack" className="text-blue-400 hover:text-blue-300 underline">• Tech Stack</a></li>
            <li><a href="#experience" className="text-blue-400 hover:text-blue-300 underline">• Experience</a></li>
            <li><a href="#projects" className="text-blue-400 hover:text-blue-300 underline">• Projects</a></li>
            <li><a href="#contact" className="text-blue-400 hover:text-blue-300 underline">• Contact</a></li>
            <li><a href="#resume" className="text-blue-400 hover:text-blue-300 underline">• Resume</a></li>
          </ul>
        </div>

        {/* About Section */}
        <div id="about" className="border border-theme/40 rounded-lg p-6 glass-1">
          <h1 className="text-3xl font-bold text-theme mb-4">About</h1>
          <p className="text-theme-2 leading-relaxed mb-4">
            I&apos;m a passionate software developer with expertise in modern web technologies. 
            I love building scalable applications and exploring new technologies. 
            Currently focused on Next.js, TypeScript, and full-stack development.
          </p>
          <p className="text-theme-2 leading-relaxed mb-4">
            From a young age, I was fascinated by computers and games. This curiosity led me to explore 
            programming and eventually pursue a career in software development.
          </p>
          <p className="text-theme-2 leading-relaxed">
            I specialize in building modern web applications using React, Next.js, and TypeScript. 
            I enjoy working on both frontend and backend development, with a particular interest in 
            creating seamless user experiences and scalable architectures.
          </p>
        </div>

        {/* Tech Stack Section */}
        <div id="tech-stack" className="border border-theme/40 rounded-lg p-6 glass-1">
          <h1 className="text-3xl font-bold text-theme mb-4">Tech Stack</h1>
          <p className="text-theme-2 leading-relaxed mb-4">
            Here are the technologies and tools I work with:
          </p>
          
          <h2 className="text-xl font-bold text-theme mb-3">Frontend</h2>
          <p className="text-theme-2 leading-relaxed mb-4">
            Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Three.js
          </p>
          
          <h2 className="text-xl font-bold text-theme mb-3">Backend</h2>
          <p className="text-theme-2 leading-relaxed mb-4">
            Node.js, Express, tRPC, GraphQL, Prisma, PostgreSQL, MongoDB
          </p>
          
          <h2 className="text-xl font-bold text-theme mb-3">DevOps & Tools</h2>
          <p className="text-theme-2 leading-relaxed">
            AWS, Docker, Kubernetes, GitHub Actions, Vercel, Redis, Git
          </p>
        </div>

        {/* Experience Section */}
        <div id="experience" className="border border-theme/40 rounded-lg p-6 glass-1">
          <h1 className="text-3xl font-bold text-theme mb-4">Experience</h1>
          <p className="text-theme-2 leading-relaxed mb-4">
            I have experience working on various projects and technologies. Here&apos;s a brief overview:
          </p>
          
          <h2 className="text-xl font-bold text-theme mb-3">Current Role</h2>
          <p className="text-theme-2 leading-relaxed mb-4">
            <strong>Senior Full-Stack Developer</strong> at TechCorp Solutions (2023 - Present)
          </p>
          <p className="text-theme-2 leading-relaxed mb-4">
            Leading development of enterprise-scale web applications using Next.js and TypeScript. 
            Architected microservices infrastructure serving 100k+ daily active users.
          </p>
          
          <h2 className="text-xl font-bold text-theme mb-3">Previous Experience</h2>
          <p className="text-theme-2 leading-relaxed">
            I&apos;ve worked as a Frontend Developer at Digital Agency Pro, completed internships at startups, 
            and have freelance experience building custom web solutions for various clients.
          </p>
        </div>

        {/* Projects Section */}
        <div id="projects" className="border border-theme/40 rounded-lg p-6 glass-1">
          <h1 className="text-3xl font-bold text-theme mb-4">Projects</h1>
          <p className="text-theme-2 leading-relaxed mb-4">
            Here are some of my notable projects:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-theme-2">
            <li><a href="#" className="text-blue-400 hover:text-blue-300 underline">Stamped - Event Management System</a></li>
            <li><a href="#" className="text-blue-400 hover:text-blue-300 underline">Portfolio Website (This one!)</a></li>
            <li><a href="#" className="text-blue-400 hover:text-blue-300 underline">E-commerce Platform</a></li>
            <li><a href="#" className="text-blue-400 hover:text-blue-300 underline">Task Management App</a></li>
          </ul>
          <p className="text-theme-2 leading-relaxed mt-4">
            Check out my <a href="#" className="text-blue-400 hover:text-blue-300 underline">GitHub</a> for more projects and code samples.
          </p>
        </div>

        {/* Contact Section */}
        <div id="contact" className="border border-theme/40 rounded-lg p-6 glass-1">
          <h1 className="text-3xl font-bold text-theme mb-4">Contact</h1>
          <p className="text-theme-2 leading-relaxed mb-4">
            I&apos;m always open to discussing new opportunities and interesting projects. 
            Feel free to reach out!
          </p>
          <ul className="space-y-2 text-theme-2">
            <li>📧 Email: <a href="mailto:contact@example.com" className="text-blue-400 hover:text-blue-300 underline">contact@example.com</a></li>
            <li>💼 LinkedIn: <a href="#" className="text-blue-400 hover:text-blue-300 underline">linkedin.com/in/sourishghosh</a></li>
            <li>🐙 GitHub: <a href="#" className="text-blue-400 hover:text-blue-300 underline">github.com/7sg56</a></li>
            <li>🐦 Twitter: <a href="#" className="text-blue-400 hover:text-blue-300 underline">@sourishghosh</a></li>
          </ul>
        </div>

        {/* Resume Section */}
        <div id="resume" className="border border-theme/40 rounded-lg p-6 glass-1">
          <h1 className="text-3xl font-bold text-theme mb-4">Resume</h1>
          <p className="text-theme-2 leading-relaxed mb-4">
            You can download my resume in PDF format:
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-theme/20 hover:bg-theme/30 text-theme px-4 py-2 rounded-lg transition-colors">
              📄 Download PDF
            </a>
            <a href="#" className="bg-theme/20 hover:bg-theme/30 text-theme px-4 py-2 rounded-lg transition-colors">
              👁️ View Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="flex flex-col gap-6 text-theme-2 max-w-7xl h-full overflow-y-auto">
      <div className="flex items-center justify-between sticky top-0 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm z-10 pb-4">
        <h2 className="text-2xl font-bold text-theme">Experience</h2>
        <button 
          className="text-theme hover:text-theme-2 transition-colors"
          onClick={() => setCurrentView("home")}
        >
          ← Back to Home
        </button>
      </div>

      <div className="space-y-3">
        <ExperienceCard
          title="Senior Full‑stack Developer"
          company="TechCorp Solutions"
          duration="2023 — Present"
          description="Leading development of enterprise-scale web applications using Next.js and TypeScript. Architected microservices infrastructure serving 100k+ daily active users."
          tech={["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"]}
          achievements={[
            "Built feature‑rich applications with optimized render paths",
            "Led team of 3 developers",
            "Improved performance by 60%"
          ]}
          isCurrent={true}
        />

        <ExperienceCard
          title="Frontend Developer"
          company="Digital Agency Pro"
          duration="2021 — 2023"
          description="Specialized in creating responsive, accessible web applications for diverse client portfolio. Focused on performance optimization and user experience enhancement."
          tech={["React", "TypeScript", "Tailwind CSS", "Figma", "Webpack", "Jest"]}
          achievements={[
            "Led component library development",
            "Enhanced UX metrics by 40%",
            "Improved accessibility compliance"
          ]}
        />

        <ExperienceCard
          title="Software Engineering Intern"
          company="StartupXYZ"
          duration="2020 — 2021"
          description="Gained hands-on experience with modern web development practices and agile methodologies. Worked on internal tools and customer-facing applications."
          tech={["Node.js", "Express", "MongoDB", "React", "Git", "Docker"]}
          achievements={[
            "Developed internal dashboard",
            "Built REST APIs",
            "Implemented CI/CD pipelines"
          ]}
        />

        <ExperienceCard
          title="Freelance Web Developer"
          company="Independent"
          duration="2019 — 2021"
          description="Delivered custom web solutions for small to medium businesses, focusing on modern technologies and best practices."
          tech={["React", "Node.js", "MongoDB", "Stripe", "Vercel", "Netlify"]}
          achievements={[
            "Delivered 15+ client projects",
            "Built e-commerce solutions",
            "Provided ongoing maintenance"
          ]}
        />

        <ExperienceCard
          title="Bachelor of Technology in Computer Science"
          company="University of Technology"
          duration="2017 — 2021"
          description="Specialized in Software Engineering, Data Structures, and Algorithms. Focused on full-stack development and software architecture."
          tech={["AWS Developer Associate", "Google Cloud Professional", "React Developer", "Agile Project Management"]}
          achievements={[
            "CGPA: 8.5/10",
            "Multiple group projects",
            "Research in ML/NLP"
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      {currentView === "home" && renderHome()}
      {currentView === "about" && renderAbout()}
      {currentView === "experience" && renderExperience()}
    </div>
  );
}
