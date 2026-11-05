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

  // Load independent API resources concurrently so the page isn't blocked by
  // sequential network round trips. A failed endpoint won't block the others.
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchJson = async (url) => {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) return null;
      return response.json();
    };

    const fetchBackendData = async () => {
      const results = await Promise.allSettled([
        fetchJson('/api/health'),
        fetchJson('/api/skills'),
        fetchJson('/api/projects'),
        fetchJson('/api/profile'),
      ]);

      if (!isMounted) return;

      const [healthResult, skillsResult, projectsResult, profileResult] = results;
      const healthData = healthResult.status === 'fulfilled' ? healthResult.value : null;
      const skillsData = skillsResult.status === 'fulfilled' ? skillsResult.value : null;
      const projectsData = projectsResult.status === 'fulfilled' ? projectsResult.value : null;
      const profileResponse = profileResult.status === 'fulfilled' ? profileResult.value : null;

      if (healthData) {
        setBackendOnline(true);
        setDbState(healthData.database?.state || 'connected');
      }
      if (skillsData?.data?.length) setSkills(skillsData.data);
      if (projectsData?.data?.length) setProjects(projectsData.data);
      if (profileResponse?.data) setProfile(profileResponse.data);

      if (results.every((result) => result.status === 'rejected')) {
        console.log('Running in client-standalone mode with complete local profile data.');
      }
    };

    fetchBackendData();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
