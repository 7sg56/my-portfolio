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
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header - VS Code style */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-300 ml-4">about.md</span>
        </div>
        <button
          className="text-gray-300 hover:text-white transition-colors text-sm px-3 py-1 rounded hover:bg-gray-700"
          onClick={() => setCurrentView("home")}
        >
          ← Back to Home
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - VS Code Explorer style */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Explorer</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              <div className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide font-medium">About.md</div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                  <span className="text-blue-400">📄</span>
                  <span>About</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                  <span className="text-green-400">⚙️</span>
                  <span>Tech Stack</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                  <span className="text-yellow-400">💼</span>
                  <span>Experience</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                  <span className="text-purple-400">🚀</span>
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                  <span className="text-pink-400">📞</span>
                  <span>Contact</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                  <span className="text-red-400">📄</span>
                  <span>Resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - VS Code Editor style */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Editor Tabs */}
          <div className="flex items-center bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-r border-gray-700">
              <span className="text-sm text-gray-300">about.md</span>
              <button className="text-gray-400 hover:text-gray-200">×</button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Title */}
              <div className="border-b border-gray-700 pb-6">
                <h1 className="text-4xl font-bold text-white mb-2">Sourish Ghosh</h1>
                <p className="text-xl text-gray-300">Full-Stack Developer & Software Engineer</p>
              </div>

              {/* About Section */}
              <div id="about" className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-blue-400">📄</span>
                  About
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I&apos;m a passionate software developer with expertise in modern web technologies. 
                    I love building scalable applications and exploring new technologies. 
                    Currently focused on Next.js, TypeScript, and full-stack development.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    From a young age, I was fascinated by computers and games. This curiosity led me to explore 
                    programming and eventually pursue a career in software development.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    I specialize in building modern web applications using React, Next.js, and TypeScript. 
                    I enjoy working on both frontend and backend development, with a particular interest in 
                    creating seamless user experiences and scalable architectures.
                  </p>
                </div>
              </div>

              {/* Tech Stack Section */}
              <div id="tech-stack" className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-green-400">⚙️</span>
                  Tech Stack
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Here are the technologies and tools I work with:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm border border-blue-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Backend</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Node.js", "Express", "tRPC", "GraphQL", "Prisma", "PostgreSQL", "MongoDB"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm border border-green-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">DevOps & Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        {["AWS", "Docker", "Kubernetes", "GitHub Actions", "Vercel", "Redis", "Git"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div id="experience" className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-yellow-400">💼</span>
                  Experience
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I have experience working on various projects and technologies. Here&apos;s a brief overview:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Current Role</h3>
                      <p className="text-gray-300 font-medium mb-2">
                        <strong>Senior Full-Stack Developer</strong> at TechCorp Solutions (2023 - Present)
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Leading development of enterprise-scale web applications using Next.js and TypeScript.
                        Architected microservices infrastructure serving 100k+ daily active users.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-gray-600 pl-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Previous Experience</h3>
                      <p className="text-gray-300 leading-relaxed">
                        I&apos;ve worked as a Frontend Developer at Digital Agency Pro, completed internships at startups, 
                        and have freelance experience building custom web solutions for various clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div id="projects" className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">🚀</span>
                  Projects
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Here are some of my notable projects:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <span className="text-green-400">🔗</span>
                      <a href="#" className="text-green-400 hover:text-green-300 underline">Stamped - Event Management System</a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <span className="text-green-400">🔗</span>
                      <a href="#" className="text-green-400 hover:text-green-300 underline">Portfolio Website (This one!)</a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <span className="text-green-400">🔗</span>
                      <a href="#" className="text-green-400 hover:text-green-300 underline">E-commerce Platform</a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <span className="text-green-400">🔗</span>
                      <a href="#" className="text-green-400 hover:text-green-300 underline">Task Management App</a>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Check out my <a href="https://github.com/7sg56" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">GitHub</a> for more projects and code samples.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div id="contact" className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-pink-400">📞</span>
                  Contact
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I&apos;m always open to discussing new opportunities and interesting projects. 
                    Feel free to reach out!
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-blue-400">📧</span>
                      <span className="text-gray-300">Email: </span>
                      <a href="mailto:contact@example.com" className="text-blue-400 hover:text-blue-300 underline">contact@example.com</a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-blue-600">💼</span>
                      <span className="text-gray-300">LinkedIn: </span>
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">linkedin.com/in/sourishghosh</a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-400">🐙</span>
                      <span className="text-gray-300">GitHub: </span>
                      <a href="https://github.com/7sg56" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">github.com/7sg56</a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-blue-500">🐦</span>
                      <span className="text-gray-300">Twitter: </span>
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">@sourishghosh</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div id="resume" className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-red-400">📄</span>
                  Resume
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    You can download my resume in PDF format:
                  </p>
                  <div className="flex gap-4">
                    <a href="/resume.pdf" download="Sourish_Ghosh_Resume.pdf" className="bg-blue-900/50 hover:bg-blue-900/70 text-blue-300 px-4 py-2 rounded-lg transition-colors border border-blue-700 flex items-center gap-2">
                      <span>📄</span>
                      Download PDF
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-green-900/50 hover:bg-green-900/70 text-green-300 px-4 py-2 rounded-lg transition-colors border border-green-700 flex items-center gap-2">
                      <span>👁️</span>
                      View Online
                    </a>
                  </div>
                </div>
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
