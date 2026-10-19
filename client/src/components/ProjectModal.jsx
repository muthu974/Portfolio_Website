import React from 'react';
import { X, Layers, Database, Server, Cpu, CheckCircle, ExternalLink, Github, Code, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(10, 15, 29, 0.96)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.2)',
          padding: '2rem',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'var(--accent-rose)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="badge badge-applied">{project.badge || project.category}</span>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
              {project.category}
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            {project.title}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Detailed Overview */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-main)' }}>
            Architecture Overview & Solution Design
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            {project.detailedOverview || project.overview || project.description}
          </p>
        </div>

        {/* Tech Stack Breakdown Table */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Technology Stack Breakdown
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {project.techStack && Object.entries(project.techStack).map(([layer, items]) => (
              <div
                key={layer}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem',
                }}
              >
                <div style={{ textTransform: 'capitalize', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {layer}
                </div>
                <ul style={{ listStyle: 'none', fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem' }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Implemented APIs Table */}
        {project.apis && project.apis.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              REST API Endpoints & Contract
            </h3>
            <div
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '0.65rem 0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', width: '90px' }}>Method</th>
                    <th style={{ padding: '0.65rem 0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>Endpoint</th>
                    <th style={{ padding: '0.65rem 0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>Functionality</th>
                  </tr>
                </thead>
                <tbody>
                  {project.apis.map((api, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: idx === project.apis.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      <td style={{ padding: '0.6rem 0.85rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            fontSize: '0.725rem',
                            padding: '0.2rem 0.45rem',
                            borderRadius: '4px',
                            background:
                              api.method === 'GET' ? 'rgba(56, 189, 248, 0.15)' :
                              api.method === 'POST' ? 'rgba(16, 185, 129, 0.15)' :
                              api.method === 'PUT' ? 'rgba(245, 158, 11, 0.15)' :
                              api.method === 'DELETE' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                            color:
                              api.method === 'GET' ? '#38bdf8' :
                              api.method === 'POST' ? '#34d399' :
                              api.method === 'PUT' ? '#fbbf24' :
                              api.method === 'DELETE' ? '#f87171' : '#c084fc',
                          }}
                        >
                          {api.method}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem 0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-main)', fontSize: '0.8rem' }}>
                        {api.endpoint}
                      </td>
                      <td style={{ padding: '0.6rem 0.85rem', color: 'var(--text-muted)' }}>
                        {api.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Database & Architecture Flow Notes */}
        {project.architecture && (
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1.75rem',
              fontSize: '0.85rem',
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Database size={15} /> Database & Data Flow Pipeline:
            </div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {project.architecture.dataFlow}
            </div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              <strong>Schema Design:</strong> {project.architecture.databaseDesign}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Github size={15} /> Repository
              </a>
            )}
            <a href="#contact" onClick={onClose} className="btn btn-primary btn-sm">
              Discuss This Project
            </a>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
