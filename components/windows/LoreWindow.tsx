"use client";

import React, { useState } from "react";

export default function LoreWindow() {
  const [currentSection, setCurrentSection] = useState("learning");

  const learningTopics = [
    {
      title: "Advanced React Patterns",
      status: "Currently Learning",
      description: "Exploring compound components, render props, and custom hooks for better component composition.",
      progress: 60,
      resources: ["React Patterns by Michael Chan", "Advanced React by Kent C. Dodds"]
    },
    {
      title: "System Design",
      status: "In Progress",
      description: "Understanding distributed systems, microservices architecture, and scalability patterns.",
      progress: 40,
      resources: ["Designing Data-Intensive Applications", "System Design Interview"]
    },
    {
      title: "Machine Learning Fundamentals",
      status: "Planning",
      description: "Getting started with ML concepts, Python for data science, and basic algorithms.",
      progress: 10,
      resources: ["Hands-On Machine Learning", "Python for Data Analysis"]
    },
    {
      title: "Blockchain Development",
      status: "Exploring",
      description: "Learning Web3, smart contracts, and decentralized application development.",
      progress: 25,
      resources: ["Ethereum Development", "Web3.js Documentation"]
    }
  ];

  const completedTopics = [
    {
      title: "Next.js 14 App Router",
      completed: "December 2024",
      description: "Mastered the new App Router, server components, and streaming in Next.js 14."
    },
    {
      title: "TypeScript Advanced Types",
      completed: "November 2024", 
      description: "Learned conditional types, mapped types, and utility types for better type safety."
    },
    {
      title: "Docker & Containerization",
      completed: "October 2024",
      description: "Containerized applications, multi-stage builds, and Docker Compose orchestration."
    }
  ];

  const renderLearning = () => (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-theme">Currently Learning</h1>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentSection === "learning" 
                ? "bg-accent text-white" 
                : "text-theme-2 hover:text-theme hover:bg-gray-700/50"
            }`}
            onClick={() => setCurrentSection("learning")}
          >
            Learning
          </button>
          <button
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentSection === "completed" 
                ? "bg-accent text-white" 
                : "text-theme-2 hover:text-theme hover:bg-gray-700/50"
            }`}
            onClick={() => setCurrentSection("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {currentSection === "learning" ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-theme mb-2">Active Learning Journey</h2>
                <p className="text-theme-2">Technologies and concepts I&apos;m currently exploring</p>
              </div>

              <div className="grid gap-6">
                {learningTopics.map((topic, index) => (
                  <div key={index} className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-theme mb-2">{topic.title}</h3>
                        <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs border border-accent/20">
                          {topic.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-accent text-sm font-medium">{topic.progress}%</span>
                        <div className="w-20 bg-gray-700/30 rounded-full h-1 mt-1">
                          <div 
                            className="h-1 rounded-full bg-accent transition-all duration-500"
                            style={{ width: `${topic.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-theme-2 mb-4 leading-relaxed">{topic.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-medium text-theme mb-2">Resources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {topic.resources.map((resource, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-700/30 text-theme-2 rounded text-xs">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-theme mb-2">Completed Learning</h2>
                <p className="text-theme-2">Technologies and concepts I&apos;ve mastered</p>
              </div>

              <div className="grid gap-6">
                {completedTopics.map((topic, index) => (
                  <div key={index} className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-theme mb-2">{topic.title}</h3>
                        <span className="inline-block px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">
                          Completed {topic.completed}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-theme-2 leading-relaxed">{topic.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return renderLearning();
}
