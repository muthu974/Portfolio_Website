import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Layers, Cpu, Mail, Menu, X, CheckCircle, Database } from 'lucide-react';

export default function Navbar({ activeSection, backendOnline, dbState }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Skills Matrix', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'CS & DBMS', href: '#cs-fundamentals' },
    { name: 'Interactive CLI', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(8, 12, 20, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1.15rem',
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
            }}
          >
            <Code2 size={20} />
          </div>
          <span style={{ color: 'var(--text-main)' }}>
            Muthu<span style={{ color: 'var(--accent-cyan)' }}>.dev</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1.75rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: activeSection === link.href.slice(1) ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent-cyan)')}
                  onMouseLeave={(e) =>
                    (e.target.style.color =
                      activeSection === link.href.slice(1) ? 'var(--accent-cyan)' : 'var(--text-muted)')
                  }
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Backend Status indicator pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--glass-border)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
            }}
            title={dbState ? `Database: ${dbState}` : 'MERN Backend Status'}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: backendOnline ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                boxShadow: backendOnline
                  ? '0 0 8px rgba(16, 185, 129, 0.8)'
                  : '0 0 8px rgba(245, 158, 11, 0.8)',
              }}
            />
            <span>{backendOnline ? 'MERN Live' : 'Standalone'}</span>
          </div>

          <a href="#contact" className="btn btn-primary btn-sm">
            <Mail size={14} /> Hire / Contact
          </a>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="mobile-toggle"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'rgba(8, 12, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setMobileMenuOpen(false)}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Mail size={16} /> Hire / Contact
          </a>
        </div>
      )}

      {/* Responsive Inline CSS for Navbar */}
      <style>{`
        @media (max-width: 868px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
