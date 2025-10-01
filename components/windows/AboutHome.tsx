"use client";

import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { getAllExperience, getResume } from "@/lib/data";

export type OpenAppFn = (app: "about" | "projects" | "skills" | "contact") => void;

type View = "about" | "experience";

export default function AboutHome({ onOpen }: { onOpen: OpenAppFn }) {
  const [currentView, setCurrentView] = useState<View>("about");

  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bevan:ital@0;1&family=Rammetto+One&family=Roboto+Slab:wght@400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const renderAbout = () => {
    const resume = getResume();
    
    return (
      <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
        {/* Header with CTA buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-black/30 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-theme">About</h1>
          <div className="flex flex-row gap-2">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-theme">Welcome</h2>
              <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm relative overflow-hidden">
                <p className="text-theme-2 leading-relaxed mb-4">
                  I'm Sourish Ghosh, a software developer living in India.
                </p>
                <p className="text-theme-2 leading-relaxed">
                  Thanks for taking the time to explore my portfolio. I hope you enjoy it as much I did enjoy developing it. 
                  If you have any questions or comments, please contact me via my socials or shoot me a mail at{" "}
                  <a 
                    href="mailto:sghosh.ile.7@gmail.com" 
                    className="text-red-400 hover:text-red-300 underline transition-colors font-medium"
                  >
                    sghosh.ile.7@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Resume Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-theme">Looking for my Resume?</h2>
              <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm relative overflow-hidden">
                <a 
                  href={resume.url} 
                  download={resume.filename}
                  className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Click here to download it
                </a>
              </div>
            </div>

            {/* About Me Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-theme">About me</h2>
              <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm relative overflow-hidden">
                <p className="text-theme-2 leading-relaxed mb-4">
                  From a young age, I was captivated by computers and technology - particularly games. 
                  What began as simple curiosity grew into a true passion for programming and development.
                </p>
                <p className="text-theme-2 leading-relaxed mb-4">
                  I am currently pursuing my B.Tech in Computer Science (Software Engineering) at SRMIST, Chennai, 
                  where I have built a strong groundwork in programming, data structures and web development. 
                  Throughout my studies, I have developed a keen interest in machine learning and Linux networking, 
                  which I pursued alongside my core technologies.
                </p>
                <p className="text-theme-2 leading-relaxed">
                  I am currently working in full-stack web development (MERN) to develop my problem-solving skills 
                  through DSA while diving into new technologies that require me to think differently.
                </p>
              </div>
            </div>

            {/* Hobbies Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-theme">Hobbies</h2>
              <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm relative overflow-hidden">
                <p className="text-theme-2 leading-relaxed">
                  Outside of tech, I'm a big Soulsborne fan when it comes to gaming (yes, I've chased those platinum trophies). 
                  I'm also a proud cat lover, and when I'm not coding or gaming, I enjoy cooking and experimenting in the kitchen. 
                  On the strategic side, I like playing chess, where I currently hold a 1500 rating on Chess.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderExperience = () => {
    const experience = getAllExperience();
    
    return (
      <div className="flex flex-col gap-6 text-theme-2 max-w-7xl h-full overflow-y-auto">
        <div className="flex items-center justify-between sticky top-0 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm z-10 pb-4 px-6 py-4">
          <h2 className="text-2xl font-bold text-theme">Experience</h2>
          <button 
            className="text-theme hover:text-theme-2 transition-colors"
            onClick={() => setCurrentView("about")}
          >
            ← Back to About
          </button>
        </div>

        <div className="space-y-3">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={index}
              title={exp.title}
              company={exp.company}
              duration={exp.period}
              description={exp.description}
              isCurrent={exp.period.includes("Present")}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full">
      {currentView === "about" && renderAbout()}
      {currentView === "experience" && renderExperience()}
    </div>
  );
}
