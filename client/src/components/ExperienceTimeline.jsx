import React from 'react';
import { Calendar, Award, Code, Database, Brain, Gamepad2, Compass, CheckCircle } from 'lucide-react';

export default function ExperienceTimeline() {
  const milestones = [
    {
      period: 'Full-Stack MERN Milestone',
      title: 'MERN Stack Expense Tracker & Atlas Cloud',
      role: 'Full-Stack Architect',
      icon: Database,
      accent: '#10b981',
      description:
        'Engineered an end-to-end personal expense tracking system with Express.js REST APIs, React SPA, and MongoDB Atlas cloud database. Implemented secure CRUD operations, schema validations, and monthly analytical breakdowns.',
      tags: ['MongoDB Atlas', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    },
    {
      period: 'Machine Learning & Integration Milestone',
      title: 'AI Disease Prediction & Clinical Datasets',
      role: 'AI / Full-Stack Integration',
      icon: Brain,
      accent: '#38bdf8',
      description:
        'Explored machine learning classification models for clinical symptom datasets. Formulated the MERN stack bridge architecture, integrating predictive ML endpoints with an accessible patient symptom selector UI.',
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'MERN Integration', 'Healthcare AI'],
    },
    {
      period: 'Business Intelligence & Data Analytics',
      title: 'Wine Quality Exploratory Analysis & Power BI',
      role: 'Data Analyst',
      icon: Award,
      accent: '#ec4899',
      description:
        'Conducted statistical data exploration across physicochemical attributes. Visualized correlation matrices with Matplotlib and Seaborn, and designed interactive executive dashboards in Power BI.',
      tags: ['Power BI', 'Pandas', 'Seaborn', 'Plotly', 'Data Modeling'],
    },
    {
      period: 'Computer Science & Algorithmic Rigor',
      title: 'DSA in Java & DBMS Relational Theory',
      role: 'CS Engineering Core',
      icon: Code,
      accent: '#a855f7',
      description:
        'Mastered Object-Oriented Programming and Data Structures in Java (AVL Trees, Merge/Quick Sort, Stack/Queue). Solved canonical LeetCode problems and proved relational DBMS Normalization (1NF-BCNF) and 2PL concurrency.',
      tags: ['Java', 'AVL Trees', 'LeetCode', '1NF-BCNF Normalization', '2PL'],
    },
    {
      period: 'Innovation & Hackathons',
      title: 'Smart India Hackathon & Smart City Concepts',
      role: 'Hackathon Innovator',
      icon: Compass,
      accent: '#f59e0b',
      description:
        'Conceptualized automated timetable generation via Constraint Satisfaction algorithms for Smart India Hackathon, and designed the SAVER Smart Emergency Transit preemption architecture.',
      tags: ['SIH Hackathon', 'Constraint Algorithms', 'SAVER Transit', 'IoT Systems'],
    },
  ];

  return (
    <section id="experience" className="section-wrapper" style={{ background: 'rgba(10, 15, 27, 0.4)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag amber">
            <Calendar size={14} /> Practical Journey & Milestones
          </div>
          <h2 className="section-title">
            Engineering Milestones & <span className="gradient-text">Practical Work</span>
          </h2>
          <p className="section-subtitle">
            Chronological progression of full-stack implementations, data science research, algorithmic mastery, and hackathon challenges.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '2.5rem',
            borderLeft: '2px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          {milestones.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  marginBottom: '2.5rem',
                }}
              >
                {/* Timeline node bullet */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-3.35rem',
                    top: '0.2rem',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#0a0f1d',
                    border: `2px solid ${item.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.accent,
                    boxShadow: `0 0 15px ${item.accent}40`,
                  }}
                >
                  <Icon size={16} />
                </div>

                {/* Milestone Content Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderTop: `2px solid ${item.accent}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: item.accent, fontWeight: 700, textTransform: 'uppercase' }}>
                      {item.period}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {item.role}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.725rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-dim)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
