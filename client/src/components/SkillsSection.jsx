import React, { useState, useMemo } from 'react';
import {
  Code,
  Search,
  CheckCircle,
  Sparkles,
  Info,
  Filter,
  FileCode,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Database,
  Table,
  GitFork,
  Binary,
  BarChart2,
  PieChart,
  Activity,
  Brain,
  Monitor,
  GitBranch,
  Package,
  Gamepad2,
  Box,
  Layout,
  Server,
  Atom,
  Coffee,
} from 'lucide-react';
import { skillsCategories } from '../data/portfolioData';

// Map icon strings to Lucide components
const ICON_MAP = {
  Coffee: Coffee,
  FileCode: FileCode,
  Terminal: Terminal,
  Cpu: Cpu,
  Gamepad2: Gamepad2,
  Atom: Atom,
  Server: Server,
  Layers: Layers,
  Globe: Globe,
  Layout: Layout,
  Database: Database,
  Table: Table,
  GitFork: GitFork,
  Binary: Binary,
  BarChart2: BarChart2,
  PieChart: PieChart,
  Activity: Activity,
  Brain: Brain,
  Sparkles: Sparkles,
  Monitor: Monitor,
  GitBranch: GitBranch,
  Package: Package,
  Box: Box,
  Code: Code,
};

export default function SkillsSection({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter skills based on category, level, and search text
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      // Category filter
      if (selectedCategory !== 'all' && skill.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && skill.level !== selectedLevel) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inName = skill.name.toLowerCase().includes(query);
        const inEvidence = skill.evidence.toLowerCase().includes(query);
        const inSubCategory = (skill.subCategory || '').toLowerCase().includes(query);
        const inTags = (skill.tags || []).some((tag) => tag.toLowerCase().includes(query));
        if (!inName && !inEvidence && !inSubCategory && !inTags) return false;
      }

      return true;
    });
  }, [skills, selectedCategory, selectedLevel, searchQuery]);

  // Helper for badge color
  const getLevelBadgeClass = (level) => {
    if (level.includes('Proficient')) return 'badge-proficient';
    if (level.includes('Intermediate')) return 'badge-applied';
    return 'badge-exploring';
  };

  const getProgressColor = (level) => {
    if (level.includes('Proficient')) return 'linear-gradient(90deg, #059669, #10b981)';
    if (level.includes('Intermediate')) return 'linear-gradient(90deg, #0284c7, #38bdf8)';
    return 'linear-gradient(90deg, #d97706, #fbbf24)';
  };

  return (
    <section id="skills" className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} /> Technical Skills Inventory
          </div>
          <h2 className="section-title">
            Skills Profile & <span className="gradient-text">Demonstrated Evidence</span>
          </h2>
          <p className="section-subtitle">
            Consolidated inventory of programming, web development, databases, AI/ML, tools, and hands-on project context.
          </p>
        </div>

        {/* Section 8 Accuracy Note Callout Banner from PDF */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.45)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ color: 'var(--accent-cyan)', marginTop: '2px', flexShrink: 0 }}>
            <Info size={20} />
          </div>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-main)' }}>Authentic Assessment & Skill Demarcation:</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>
              In accordance with the profile guidelines, hands-on production and academic project experience (Java, JavaScript, MERN Stack, Python/Pandas, SQL/MongoDB, C)
              is distinguished from active exploratory learning targets (TensorFlow, Hugging Face, AI agents, Unity 3D).
            </span>
          </div>
        </div>

        {/* Filters & Search Bar Toolbar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Domain Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {skillsCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'transparent',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: selectedCategory === cat.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Level Filter & Search Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Level Toggle Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginRight: '0.25rem' }}>
                <Filter size={12} style={{ display: 'inline', marginRight: '4px' }} /> Level:
              </span>
              {[
                { id: 'all', label: 'All Levels' },
                { id: 'Proficient / Hands-on', label: 'Proficient / Hands-on' },
                { id: 'Intermediate / Applied', label: 'Intermediate' },
                { id: 'Exploration / Learning Target', label: 'Exploring' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  style={{
                    background: selectedLevel === lvl.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedLevel === lvl.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    border: selectedLevel === lvl.id ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.775rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {lvl.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                minWidth: '260px',
                flex: '1 1 260px',
                maxWidth: '400px',
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dim)',
                }}
              />
              <input
                type="text"
                placeholder="Search skills, topics, tags (e.g. MERN, AVL, Pandas)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-main)',
                  padding: '0.55rem 1rem 0.55rem 2.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredSkills.map((skill) => {
            const IconComponent = ICON_MAP[skill.icon] || Code;

            return (
              <div
                key={skill.name}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  {/* Top row: Icon, Name, Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'rgba(56, 189, 248, 0.08)',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-cyan)',
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          {skill.name}
                        </h3>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                          {skill.subCategory}
                        </span>
                      </div>
                    </div>

                    <span className={`badge ${getLevelBadgeClass(skill.level)}`}>
                      {skill.level.split('/')[0].trim()}
                    </span>
                  </div>

                  {/* Evidence / Context Quote from PDF */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '3px solid var(--accent-cyan)',
                      marginBottom: '1.25rem',
                      fontSize: '0.835rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.55,
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Evidence & Practical Context
                    </div>
                    {skill.evidence}
                  </div>
                </div>

                <div>
                  {/* Progress / Depth Meter */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                      <span>Proficiency & Readiness</span>
                      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{skill.proficiency || 80}%</span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${skill.proficiency || 80}%`,
                          height: '100%',
                          background: getProgressColor(skill.level),
                          borderRadius: 'var(--radius-full)',
                          transition: 'width 0.8s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(skill.tags || []).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.715rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-dim)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
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

        {/* Empty Search Result */}
        {filteredSkills.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              background: 'rgba(15, 23, 42, 0.4)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--glass-border)',
            }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1rem' }}>
              No skills found matching your filter "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="btn btn-outline btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
