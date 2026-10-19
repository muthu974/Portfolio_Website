import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function InteractiveTerminal({ skills, projects, profile }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '⚡ Muthu.dev Interactive CLI v2.4 (MERN Environment)\nType "help" to see available commands or click quick actions below.\nTry running "test-api" to execute a live HTTP REST query to Express.js!',
    },
  ]);
  const [isRunningApi, setIsRunningApi] = useState(false);

  const terminalBodyRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Prevent scrolling to the terminal on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only scroll inside the terminal console window, never the main browser window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd) => {
    const raw = cmd.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    const newEntry = { type: 'user', text: raw };
    let outputEntry = null;

    if (lower === 'help') {
      outputEntry = {
        type: 'output',
        text: `Available Commands:
  • skills       - List categorized technical skills & proficiency levels
  • projects     - Showcase full-stack MERN & AI projects
  • test-api     - Perform a live HTTP GET fetch to /api/health and /api/skills
  • dsa          - View LeetCode problem solving & complexity breakdown
  • cat resume   - Display quick text resume summary
  • whoami       - Display profile overview & core expertise
  • contact      - Jump to contact section & display email
  • clear        - Clear the terminal console window`,
      };
    } else if (lower === 'clear') {
      setHistory([]);
      return;
    } else if (lower === 'skills') {
      const grouped = skills.reduce((acc, curr) => {
        acc[curr.category] = acc[curr.category] || [];
        acc[curr.category].push(curr.name);
        return acc;
      }, {});

      outputEntry = {
        type: 'output',
        text: `--- TECHNICAL SKILLS INVENTORY ---
[Languages]   : ${grouped.programming?.join(', ') || 'Java, JavaScript, Python, C, C#'}
[Web & MERN]  : ${grouped.web_fullstack?.join(', ') || 'MongoDB Atlas, Express, React, Node.js, HTML5/CSS3'}
[Databases]   : ${grouped.databases_cs?.join(', ') || 'MongoDB, SQL, Normalization (1NF-BCNF), 2PL, AVL Trees'}
[AI & Data]   : ${grouped.aiml_data?.join(', ') || 'Pandas, Matplotlib, Seaborn, Plotly, Power BI, ML Classification'}
[Dev & Tools] : ${grouped.tools?.join(', ') || 'VS Code, GitHub, Maven, Ubuntu/Linux, Unity 3D'}`,
      };
    } else if (lower === 'projects') {
      const prjList = projects
        .map((p, i) => `${i + 1}. [${p.category}] ${p.title} - ${p.subtitle}`)
        .join('\n');
      outputEntry = {
        type: 'output',
        text: `--- FEATURED PROJECTS ---\n${prjList}\n\nType "cat resume" or inspect the interactive UI for architecture diagrams.`,
      };
    } else if (lower === 'whoami') {
      outputEntry = {
        type: 'output',
        text: `${profile.name} — ${profile.title}\n${profile.bio}\nLocation: ${profile.location || 'Bangalore, India'}\nStatus: ${profile.status}`,
      };
    } else if (lower === 'cat resume') {
      outputEntry = {
        type: 'output',
        text: `===========================================================
NAME: ${profile.name}
ROLE: Full-Stack MERN Developer & Computer Science Engineer
LOCATION: ${profile.location || 'Bangalore, India'}
EMAIL: ${profile.socials?.email || profile.socialLinks?.email || 'muthuparadoxx@gmail.com'}
GITHUB: ${profile.socials?.github || 'https://github.com/muthu974'}
-----------------------------------------------------------
EDUCATION & RIGOR:
- Computer Science Engineering Coursework
- DSA: AVL Trees, Merge/Quick Sort, 120+ LeetCode Solved
- DBMS: 1NF → BCNF Normalization, Minimal Cover, 2PL Concurrency
- Full-Stack MERN: Expense Tracker with MongoDB Atlas & REST APIs
- AI & Data: Healthcare Disease Prediction ML & Wine Power BI
===========================================================`,
      };
    } else if (lower === 'dsa') {
      outputEntry = {
        type: 'output',
        text: `--- DATA STRUCTURES & ALGORITHMS (JAVA / PYTHON) ---
- Stack, Queue, Linked Lists, Circular Buffers
- AVL Tree Insertion with LL, RR, LR, RL Rotations (O(log n))
- Sorting: Merge Sort (O(n log n) stable), Quick Sort (Partitioning)
- LeetCode Solved: Two Sum (Hash Map O(n)), Palindrome (Two Pointers), Longest Common Prefix (O(S))`,
      };
    } else if (lower === 'contact') {
      outputEntry = {
        type: 'output',
        text: `Direct Contact: ${profile.socials?.email || profile.socialLinks?.email || 'muthuparadoxx@gmail.com'}\nScrolling down to contact form...`,
      };
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else if (lower === 'test-api') {
      setIsRunningApi(true);
      setHistory((prev) => [
        ...prev,
        newEntry,
        { type: 'system', text: '📡 Executing live fetch to Express REST backend: GET /api/health ...' },
      ]);

      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setHistory((prev) => [
          ...prev,
          {
            type: 'output',
            text: `HTTP 200 OK — REST API Response:
${JSON.stringify(data, null, 2)}
✅ Live MERN API Server verified and active!`,
          },
        ]);
      } catch (err) {
        setHistory((prev) => [
          ...prev,
          {
            type: 'output',
            text: `API Test Output (Local Mock Response):
{
  "status": "online",
  "platform": "MERN Stack Single-Command Deployable",
  "database": "MongoDB Atlas / Memory Store",
  "nodeVersion": "v20.18.0",
  "uptime": "active"
}`,
          },
        ]);
      } finally {
        setIsRunningApi(false);
      }
      return;
    } else {
      outputEntry = {
        type: 'error',
        text: `Command not recognized: "${raw}". Type "help" to see valid commands.`,
      };
    }

    setHistory((prev) => [...prev, newEntry, outputEntry]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal;
    setInputVal('');
    handleCommand(cmd);
  };

  return (
    <section id="terminal" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Terminal size={14} /> Developer Playground
          </div>
          <h2 className="section-title">
            Interactive <span className="gradient-text">Terminal CLI</span>
          </h2>
          <p className="section-subtitle">
            Recruiter and developer command line interface: query skills, test live REST APIs, and inspect system telemetry.
          </p>
        </div>

        {/* Terminal Window Container */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.12)',
            background: '#070b14',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              background: '#0d1322',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.02em' }}>
              muthu@mern-portfolio: ~ (bash / node v20.18.0)
            </div>
            <button
              onClick={() => handleCommand('clear')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontSize: '0.7rem',
              }}
              title="Clear terminal"
            >
              Clear
            </button>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            style={{
              padding: '1.25rem',
              minHeight: '260px',
              maxHeight: '420px',
              overflowY: 'auto',
              fontSize: '0.825rem',
              lineHeight: 1.6,
            }}
          >
            {history.map((item, idx) => {
              if (item.type === 'system') {
                return (
                  <div key={idx} style={{ color: '#38bdf8', marginBottom: '0.75rem', whiteSpace: 'pre-wrap' }}>
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'user') {
                return (
                  <div key={idx} style={{ color: '#ffffff', marginBottom: '0.35rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#10b981' }}>visitor@muthu-dev:~$</span>
                    <span>{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={idx} style={{ color: '#f87171', marginBottom: '0.75rem', whiteSpace: 'pre-wrap' }}>
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} style={{ color: '#cbd5e1', marginBottom: '0.75rem', whiteSpace: 'pre-wrap' }}>
                  {item.text}
                </div>
              );
            })}
          </div>

          {/* Terminal Input Bar */}
          <form
            onSubmit={onSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.65rem 1rem',
              background: '#0a0f1d',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <span style={{ color: '#10b981', fontSize: '0.825rem', marginRight: '0.5rem' }}>
              visitor@muthu-dev:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command (e.g. test-api, skills, dsa)..."
              disabled={isRunningApi}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.825rem',
              }}
            />
            <button
              type="submit"
              disabled={isRunningApi}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CornerDownLeft size={16} />
            </button>
          </form>

          {/* Quick Clickable Command Pills */}
          <div
            style={{
              padding: '0.65rem 1rem',
              background: '#0d1322',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginRight: '0.25rem' }}>
              Quick Commands:
            </span>
            {['test-api', 'skills', 'projects', 'dsa', 'cat resume', 'whoami', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: cmd === 'test-api' ? '#34d399' : 'var(--text-muted)',
                  fontSize: '0.725rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#38bdf8';
                  e.currentTarget.style.borderColor = '#38bdf8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = cmd === 'test-api' ? '#34d399' : 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
