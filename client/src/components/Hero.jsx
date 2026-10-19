import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Github, Linkedin, Mail, ExternalLink, Sparkles, Database, Code, CheckCircle2 } from 'lucide-react';

const TYPEWRITER_WORDS = [
  'Full-Stack MERN Applications',
  'Scalable REST API Architectures',
  'MongoDB Atlas Cloud Integrations',
  'Algorithmic Problem Solving in Java',
  'Data Visualization with Pandas & Power BI',
];

export const TECH_TICKER = [
  { name: 'React.js', color: '#38bdf8' },
  { name: 'Node.js', color: '#22c55e' },
  { name: 'Express.js', color: '#e2e8f0' },
  { name: 'MongoDB Atlas', color: '#10b981' },
  { name: 'Java (OOP/DSA)', color: '#f97316' },
  { name: 'Python (Pandas)', color: '#3b82f6' },
  { name: 'SQL & Normalization', color: '#a855f7' },
  { name: 'Power BI', color: '#eab308' },
  { name: 'Ubuntu / Linux', color: '#f43f5e' },
  { name: 'Unity 3D (C#)', color: '#94a3b8' },
];

export default function Hero({ profile }) {
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === TYPEWRITER_WORDS[textIndex].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setTextIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 35 : 75);

    return () => clearTimeout(timeout);
  }, [subIndex, textIndex, reverse]);

  return (
    <section id="hero" className="section-wrapper" style={{ paddingTop: '8.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Availability Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
            }}
          >
            <span className="pulse-indicator" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#34d399',
                letterSpacing: '0.02em',
              }}
            >
              Ready for Full-Stack Roles & Immediate Deployment
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.035em',
            }}
          >
            Hi, I'm <span className="gradient-text">{profile?.name || 'Muthu A.'}</span>
            <br />
            <span style={{ color: 'var(--text-main)', fontSize: '0.85em', fontWeight: 700 }}>
              Engineering{' '}
            </span>
            <span
              style={{
                color: 'var(--accent-cyan)',
                borderRight: '3px solid var(--accent-cyan)',
                paddingRight: '4px',
                animation: 'blink 0.9s infinite',
                fontSize: '0.82em',
              }}
            >
              {TYPEWRITER_WORDS[textIndex].substring(0, subIndex)}
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: '760px',
              margin: '0 auto 2.25rem auto',
            }}
          >
            Computer Science Engineer specializing in the{' '}
            <strong style={{ color: '#38bdf8' }}>MERN Stack</strong> (MongoDB Atlas, Express.js, React, Node.js).
            Backed by rigorous CS fundamentals in{' '}
            <strong style={{ color: '#10b981' }}>Data Structures & Algorithms (Java)</strong>,{' '}
            <strong style={{ color: '#a855f7' }}>DBMS Theory (1NF-BCNF & 2PL)</strong>, and{' '}
            <strong style={{ color: '#f59e0b' }}>Data Analytics (Pandas & Power BI)</strong>.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '3.5rem',
            }}
          >
            <a href="#projects" className="btn btn-primary">
              Explore Featured Projects <ArrowRight size={16} />
            </a>
            <a href="#terminal" className="btn btn-outline">
              <Terminal size={16} /> Open Interactive CLI
            </a>
            <a href="#skills" className="btn btn-outline">
              <Code size={16} /> View Skills Matrix
            </a>
          </div>

          {/* Key Metrics / Highlights Grid */}
          <div
            className="grid-4"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
              textAlign: 'left',
              marginBottom: '3rem',
            }}
          >
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-cyan)' }}><CheckCircle2 size={18} /></span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Architecture
                </span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>MERN Stack</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>React, Node, Express, MongoDB Atlas</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-emerald)' }}><CheckCircle2 size={18} /></span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Problem Solving
                </span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>120+ Solved</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Java DSA, AVL Trees, Quick/Merge Sort</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-purple)' }}><CheckCircle2 size={18} /></span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Database Rigor
                </span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#c084fc' }}>1NF → BCNF</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Normalization, 2PL, SQL Joins & EXISTS</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-amber)' }}><CheckCircle2 size={18} /></span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Data & Applied AI
                </span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fbbf24' }}>Pandas & Power BI</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Wine Analytics & Disease ML Integration</div>
            </div>
          </div>

          {/* Tech Ticker Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.65rem',
              justifyContent: 'center',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {TECH_TICKER.map((item) => (
              <span
                key={item.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = item.color;
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color }} />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
