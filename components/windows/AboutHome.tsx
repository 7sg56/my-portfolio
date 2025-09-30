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
          <h1 className="text-[70px] font-bold text-theme" style={{ fontFamily: 'Bevan, serif'}}>Sourish Ghosh</h1>
        </div>

        {/* Roles */}
        <div className="flex flex-row gap-6">
          <span className="text-lg text-theme-2 font-medium">Software Engineer</span>
          <span className="text-theme-2 text-lg font-medium">&</span>
          <span className="text-lg text-theme-2 font-medium">Full Stack Developer</span>
      </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setCurrentView("about")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-3 py-1.5 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-xs"
          >
            About
          </button>
          
          <button
            onClick={() => setCurrentView("experience")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-3 py-1.5 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-xs"
          >
            Experience
          </button>
          
          <button
            onClick={() => onOpen("projects")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-3 py-1.5 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-xs"
          >
            Projects
          </button>
          
          <button
            onClick={() => onOpen("skills")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-3 py-1.5 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-xs"
          >
            Skills
          </button>
          
          <button
            onClick={() => onOpen("contact")}
            className="rounded-lg border border-theme glass-2 hover:glass-1 text-theme px-3 py-1.5 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg hover:shadow-theme/20 text-xs"
          >
            Contact
          </button>
        </div>
    </div>
  );

  const renderAbout = () => (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      {/* Minimal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-theme">About</h1>
        <button
          className="text-theme-2 hover:text-theme transition-colors text-sm px-3 py-1 rounded hover:bg-gray-700/50"
          onClick={() => setCurrentView("home")}
        >
          ← Back
        </button>
      </div>

      {/* Minimal Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* About Me */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-theme">About Me</h2>
            <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
              <p className="text-theme-2 leading-relaxed mb-4">
                I&apos;m a passionate full-stack developer who loves turning ideas into reality through code. 
                I specialize in building modern web applications using React, Next.js, and TypeScript.
              </p>
              <p className="text-theme-2 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
                  <div className="space-y-4">
            <h2 className="text-xl font-semibold text-theme">Tech Stack</h2>
            <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
              <div className="grid md:grid-cols-3 gap-6">
                    <div>
                  <h3 className="text-sm font-medium text-theme mb-3">Frontend</h3>
                      <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs border border-accent/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                  <h3 className="text-sm font-medium text-theme mb-3">Backend</h3>
                      <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "PostgreSQL", "MongoDB"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs border border-accent/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                  <h3 className="text-sm font-medium text-theme mb-3">Tools</h3>
                      <div className="flex flex-wrap gap-2">
                    {["AWS", "Docker", "Git", "Vercel"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs border border-accent/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          {/* Contact */}
                  <div className="space-y-4">
            <h2 className="text-xl font-semibold text-theme">Get In Touch</h2>
            <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
              <p className="text-theme-2 mb-4">
                I&apos;m always open to discussing new opportunities and interesting projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:contact@example.com" className="text-accent hover:text-accent/80 underline">
                  📧 Email
                </a>
                <a href="https://github.com/7sg56" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 underline">
                  🐙 GitHub
                </a>
                <a href="#" className="text-accent hover:text-accent/80 underline">
                  💼 LinkedIn
                </a>
              </div>
            </div>
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
