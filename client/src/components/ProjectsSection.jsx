import React, { useState } from 'react';
import {
  Layers,
  ExternalLink,
  Github,
  Code2,
  Database,
  ArrowRight,
  Sparkles,
  Wallet,
  Activity,
  PieChart,
  Gamepad2,
  Calendar,
  Radio,
  CheckCircle,
  Play,
  Plus,
  Trash2,
} from 'lucide-react';
import ProjectModal from './ProjectModal';

const PROJECT_ICONS = {
  Wallet: Wallet,
  Activity: Activity,
  PieChart: PieChart,
  Gamepad2: Gamepad2,
  Calendar: Calendar,
  Radio: Radio,
  Layers: Layers,
};

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [playgroundMode, setPlaygroundMode] = useState('expenses'); // 'expenses' | 'ai-disease'

  // Interactive Expense Tracker Simulator State
  const [expensesList, setExpensesList] = useState([
    { id: 1, title: 'MongoDB Atlas Dedicated Cluster', amount: 35, category: 'Tech' },
    { id: 2, title: 'Frontend UI Assets & Hosting', amount: 18, category: 'Tech' },
    { id: 3, title: 'Textbooks & CS Coursework', amount: 45, category: 'Education' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Tech');
  const [lastApiAction, setLastApiAction] = useState('GET /api/expenses [200 OK]');

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;
    const item = {
      id: Date.now(),
      title: newTitle.trim(),
      amount: parseFloat(newAmount),
      category: newCategory,
    };
    setExpensesList([item, ...expensesList]);
    setLastApiAction(`POST /api/expenses [201 Created] -> {"id": "${item.id}", "amount": ${item.amount}}`);
    setNewTitle('');
    setNewAmount('');
  };

  const handleDeleteExpense = (id) => {
    setExpensesList(expensesList.filter((x) => x.id !== id));
    setLastApiAction(`DELETE /api/expenses/${id} [200 OK] -> {"deleted": true}`);
  };

  const totalExpense = expensesList.reduce((acc, curr) => acc + curr.amount, 0);

  // Interactive AI Disease Prediction Simulator State
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Fatigue', 'Mild Fever']);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const availableSymptoms = [
    'Fatigue',
    'Mild Fever',
    'High Fever',
    'Dry Cough',
    'Joint Pain',
    'Skin Rash',
    'Headache',
    'Chest Tightness',
  ];

  const toggleSymptom = (s) => {
    if (selectedSymptoms.includes(s)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== s));
    } else {
      setSelectedSymptoms([...selectedSymptoms, s]);
    }
  };

  const handleRunAiPrediction = () => {
    setIsPredicting(true);
    setPredictionResult(null);

    setTimeout(() => {
      setIsPredicting(false);
      let condition = 'Mild Viral Infection';
      let confidence = 87;
      let riskLevel = 'Low Risk';
      let color = '#10b981';

      if (selectedSymptoms.includes('Chest Tightness') || selectedSymptoms.includes('High Fever')) {
        condition = 'Acute Respiratory Syndrome';
        confidence = 92;
        riskLevel = 'Elevated Risk - Medical Consultation Advised';
        color = '#ef4444';
      } else if (selectedSymptoms.includes('Joint Pain') && selectedSymptoms.includes('Skin Rash')) {
        condition = 'Allergic Dermatitis / Viral Rash';
        confidence = 84;
        riskLevel = 'Moderate Risk';
        color = '#f59e0b';
      }

      setPredictionResult({
        condition,
        confidence,
        riskLevel,
        color,
        timestamp: new Date().toLocaleTimeString(),
        analyzedFeaturesCount: selectedSymptoms.length,
      });
    }, 700);
  };

  // Filter projects by category
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'mern') return p.category.toLowerCase().includes('mern');
    if (activeCategory === 'ai_data') return p.category.toLowerCase().includes('ai') || p.category.toLowerCase().includes('data');
    if (activeCategory === 'other') return !p.category.toLowerCase().includes('mern') && !p.category.toLowerCase().includes('ai');
    return true;
  });

  return (
    <section id="projects" className="section-wrapper" style={{ background: 'rgba(10, 16, 28, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag emerald">
            <Layers size={14} /> Practical Work & System Architecture
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text-emerald">Projects & Systems</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated full-stack applications with MERN stack, cloud MongoDB Atlas, machine learning model integration, and game development.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem',
          }}
        >
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'mern', label: 'Full-Stack MERN' },
            { id: 'ai_data', label: 'AI & Data Analytics' },
            { id: 'other', label: 'Game Dev & Hackathon Concepts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? 'linear-gradient(135deg, #059669, #10b981)' : 'rgba(15, 23, 42, 0.8)',
                color: activeCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
                border: activeCategory === cat.id ? '1px solid #10b981' : '1px solid var(--glass-border)',
                padding: '0.55rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4rem',
          }}
        >
          {filteredProjects.map((project) => {
            const Icon = PROJECT_ICONS[project.icon] || Layers;

            return (
              <div
                key={project.id || project.slug}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${project.accentColor || 'var(--accent-cyan)'}`,
                }}
              >
                <div>
                  {/* Top Badge & Category */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: project.accentColor || 'var(--accent-cyan)',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="badge badge-proficient">
                      {project.badge || project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    {project.title}
                  </h3>
                  <div style={{ fontSize: '0.825rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '0.85rem' }}>
                    {project.subtitle}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {project.description}
                  </p>

                  {/* Key Features List */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.725rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Key Architectural Highlights:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      {(project.features || project.keyFeatures || []).slice(0, 3).map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                          <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {project.techStack &&
                      Object.values(project.techStack)
                        .flat()
                        .slice(0, 5)
                        .map((tech, idx) => (
                          <span
                            key={idx}
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
                            {tech}
                          </span>
                        ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      Inspect Architecture & APIs <ArrowRight size={14} />
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm"
                        title="GitHub Repository"
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Playground Card (WOW Factor) */}
        <div
          id="interactive-preview"
          className="glass-card"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.15)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                <Play size={14} /> Live Prototype Playground
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Test MERN REST APIs & ML Prediction Logic Live
              </h3>
            </div>

            {/* Toggle Modes */}
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.4)', padding: '0.3rem', borderRadius: 'var(--radius-md)' }}>
              <button
                onClick={() => setPlaygroundMode('expenses')}
                style={{
                  background: playgroundMode === 'expenses' ? 'var(--accent-emerald)' : 'transparent',
                  color: playgroundMode === 'expenses' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                MERN Expense Tracker CRUD
              </button>
              <button
                onClick={() => setPlaygroundMode('ai-disease')}
                style={{
                  background: playgroundMode === 'ai-disease' ? 'var(--accent-cyan)' : 'transparent',
                  color: playgroundMode === 'ai-disease' ? '#080c14' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                AI Disease Classifier Simulator
              </button>
            </div>
          </div>

          {/* PLAYGROUND 1: MERN Expense Tracker Simulator */}
          {playgroundMode === 'expenses' ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Form to log expense */}
                <form
                  onSubmit={handleAddExpense}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} style={{ color: 'var(--accent-emerald)' }} /> Log New Transaction (Simulates POST /api/expenses)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Expense title (e.g. Server hosting, Book)"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="number"
                        placeholder="Amount ($)"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        style={{
                          width: '50%',
                          padding: '0.55rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-main)',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      />
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{
                          width: '50%',
                          padding: '0.55rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          background: '#0d1322',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-main)',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      >
                        <option value="Tech">Tech</option>
                        <option value="Education">Education</option>
                        <option value="Living">Living</option>
                        <option value="Food">Food</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-emerald btn-sm" style={{ width: '100%', marginTop: '0.25rem' }}>
                      <Plus size={14} /> Send POST Request
                    </button>
                  </div>
                </form>

                {/* Live List & Summary */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Recent Expenses Collection</span>
                      <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                        Total: ${totalExpense.toFixed(2)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '160px', overflowY: 'auto' }}>
                      {expensesList.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '0.45rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.825rem',
                          }}
                        >
                          <div>
                            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.title}</span>{' '}
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>({item.category})</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: '#34d399', fontWeight: 700 }}>${item.amount.toFixed(2)}</span>
                            <button
                              onClick={() => handleDeleteExpense(item.id)}
                              style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                              title="Delete record"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated API Console Log */}
                  <div
                    style={{
                      marginTop: '0.85rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.725rem',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    API Activity: {lastApiAction}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PLAYGROUND 2: AI Disease Classifier Simulator */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Symptom selector */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-main)' }}>
                    Select Patient Symptoms (ML Feature Vector):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
                    {availableSymptoms.map((sym) => {
                      const isSelected = selectedSymptoms.includes(sym);
                      return (
                        <button
                          key={sym}
                          onClick={() => toggleSymptom(sym)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.775rem',
                            fontFamily: 'var(--font-mono)',
                            background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                            color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                            border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {isSelected ? '✓ ' : '+ '} {sym}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleRunAiPrediction}
                    disabled={isPredicting || selectedSymptoms.length === 0}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    {isPredicting ? 'Evaluating Probabilities...' : 'Run ML Diagnostic Model'}
                  </button>
                </div>

                {/* Prediction Inference Output */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Model Inference Output
                  </div>

                  {predictionResult ? (
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        {predictionResult.condition}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: predictionResult.color, fontWeight: 600, marginBottom: '0.75rem' }}>
                        {predictionResult.riskLevel} • {predictionResult.confidence}% Confidence
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                        <div style={{ width: `${predictionResult.confidence}%`, height: '100%', background: predictionResult.color }} />
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                        Inference completed at {predictionResult.timestamp} across {predictionResult.analyzedFeaturesCount} active clinical markers.
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem', padding: '1rem' }}>
                      Select symptoms and click "Run ML Diagnostic Model" to execute the probabilistic classifier.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Details Modal */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
}
