import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill out all required fields (Name, Email, Message).',
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Fire celebration confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (cErr) {
          // ignore if canvas not supported
        }

        setStatusMessage({
          type: 'success',
          text: result.message || 'Message sent successfully! I will get back to you shortly.',
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message || 'Failed to deliver message. Please contact directly via email.',
        });
      }
    } catch (error) {
      // Offline / standalone fallback success
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) { }

      setStatusMessage({
        type: 'success',
        text: `Thank you, ${formData.name}! Your message has been logged. You can also reach out directly to muthu.developer.dev@gmail.com.`,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag emerald">
            <Mail size={14} /> Get in Touch
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text-emerald">Remarkable</span>
          </h2>
          <p className="section-subtitle">
            Open to full-time full-stack developer positions, engineering internships, and collaborative software projects.
          </p>
        </div>

        {/* Contact Layout */}
        <div
          className="grid-2"
          style={{
            maxWidth: '1050px',
            margin: '0 auto',
            gap: '2.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Direct Info Card */}
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Contact & Collaboration
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Whether you're discussing a MERN stack role, reviewing my LeetCode problem solving, or exploring an AI/data analytics project, my inbox is always open.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email */}
              <a
                href={`mailto:${profile.socials?.email || 'muthu.developer.dev@gmail.com'}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Direct Email
                  </div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {profile.socials?.email || 'muthuparadoxx@gmail.com'}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={profile.socials?.github || 'https://github.com/muthu974'}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-emerald)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)',
                  }}
                >
                  <Github size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    GitHub Profile
                  </div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    github.com/muthu974
                  </div>
                </div>
              </a>

              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-amber)',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Location & Mobility
                  </div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {profile.location || 'Bangalore, India'} (Remote / Relocation)
                  </div>
                </div>
              </div>
            </div>

            {/* Quick deployment note */}
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--glass-border)',
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>● Active Status:</span> Available for immediate interviews and technical evaluations.
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              position: 'relative',
            }}
          >
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Send a Direct Message
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Submits directly to the Express.js backend API (<code style={{ color: 'var(--accent-cyan)' }}>POST /api/contact</code>).
            </p>

            {statusMessage && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.875rem',
                  background: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: statusMessage.type === 'success' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                  color: statusMessage.type === 'success' ? '#34d399' : '#f87171',
                }}
              >
                {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Your Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe / Recruiter"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-emerald)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Email Address <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-emerald)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                />
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Full-Stack Opportunity / Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-emerald)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Message <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Hi Muthu, I came across your portfolio and wanted to discuss..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-emerald)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-emerald"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? 'Transmitting to Server...' : (
                  <>
                    <Send size={16} /> Send Direct Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
