import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CSFundamentals from './components/CSFundamentals';
import InteractiveTerminal from './components/InteractiveTerminal';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import { profileData, skillsData, projectsData } from './data/portfolioData';

export default function App() {
  const [profile, setProfile] = useState(profileData);
  const [skills, setSkills] = useState(skillsData);
  const [projects, setProjects] = useState(projectsData);
  const [backendOnline, setBackendOnline] = useState(false);
  const [dbState, setDbState] = useState('fallback-mode');
  const [activeSection, setActiveSection] = useState('hero');

  // Attempt to synchronize with live backend Express REST APIs
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const healthRes = await fetch('/api/health');
        if (healthRes.ok) {
          const healthData = await healthRes.json();
          setBackendOnline(true);
          setDbState(healthData.database?.state || 'connected');
        }

        // Fetch skills from API
        const skillsRes = await fetch('/api/skills');
        if (skillsRes.ok) {
          const sData = await skillsRes.json();
          if (sData.data && sData.data.length > 0) {
            setSkills(sData.data);
          }
        }

        // Fetch projects from API
        const projectsRes = await fetch('/api/projects');
        if (projectsRes.ok) {
          const pData = await projectsRes.json();
          if (pData.data && pData.data.length > 0) {
            setProjects(pData.data);
          }
        }

        // Fetch profile from API
        const profileRes = await fetch('/api/profile');
        if (profileRes.ok) {
          const profData = await profileRes.json();
          if (profData.data) {
            setProfile(profData.data);
          }
        }
      } catch (err) {
        console.log('Running in client-standalone mode with complete local profile data.');
      }
    };

    fetchBackendData();
  }, []);

  // Track active section for navbar highlighting
  useEffect(() => {
    const sections = ['hero', 'skills', 'projects', 'cs-fundamentals', 'terminal', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Dynamic Ambient Background Orbs */}
      <div className="ambient-glow-wrapper" aria-hidden="true">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div className="ambient-orb-3" />
      </div>

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} backendOnline={backendOnline} dbState={dbState} />

      {/* Hero Header */}
      <Hero profile={profile} />

      {/* Skills Matrix (PDF Section 1, 2, 3, 4, 5, 8) */}
      <SkillsSection skills={skills} />

      {/* Practical Projects (PDF Section 6) with Interactive Playgrounds */}
      <ProjectsSection projects={projects} />

      {/* Computer Science Rigor & DBMS Normalization (PDF Section 3 & DSA) */}
      <CSFundamentals />

      {/* Developer Interactive Terminal CLI */}
      <InteractiveTerminal skills={skills} projects={projects} profile={profile} />

      {/* Practical Work Timeline */}
      <ExperienceTimeline />

      {/* Contact & Hire Form */}
      <ContactSection profile={profile} />

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
}
