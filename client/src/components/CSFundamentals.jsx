import React, { useState } from 'react';
import { Database, Binary, Cpu, GitFork, Check, ArrowRight, ShieldCheck, Terminal, Award, BookOpen } from 'lucide-react';
import { csFundamentalsData } from '../data/portfolioData';

export default function CSFundamentals() {
  const [activeTab, setActiveTab] = useState('dbms'); // 'dbms' | 'dsa' | 'arch'
  const [normStep, setNormStep] = useState(3); // 0: 1NF, 1: 2NF, 2: 3NF, 3: BCNF
  const [activeRotation, setActiveRotation] = useState('LL'); // 'LL' | 'RR' | 'LR' | 'RL'

  const normalizationSteps = [
    {
      stage: '1NF (First Normal Form)',
      requirement: 'Eliminate repeating groups & multivalued attributes',
      rule: 'All attribute values must be atomic. Each row is uniquely identified by a primary key.',
      example: 'Splitting comma-separated multi-phone records or multiple skills into distinct atomic tuples.',
    },
    {
      stage: '2NF (Second Normal Form)',
      requirement: 'Eliminate partial dependencies on composite keys',
      rule: 'Must be in 1NF and no non-prime attribute is functionally dependent on a proper subset of any candidate key (X → Y where X is part of key).',
      example: 'Separating Order Details and Product Metadata into distinct relation tables.',
    },
    {
      stage: '3NF (Third Normal Form)',
      requirement: 'Eliminate transitive dependencies',
      rule: 'Must be in 2NF, and for every non-trivial FD X → A, either X is a superkey or A is a prime attribute.',
      example: 'Removing ZipCode → City dependencies from Customer table into a dedicated Geography lookup.',
    },
    {
      stage: 'BCNF (Boyce-Codd Normal Form)',
      requirement: 'Every determinant is a candidate key',
      rule: 'Strict condition: For every non-trivial functional dependency X → A, X must strictly be a Superkey.',
      example: 'Decomposing relations with overlapping candidate keys to guarantee lossless joins and zero update anomalies.',
    },
  ];

  const avlRotations = {
    LL: {
      name: 'Left-Left (LL) Single Rotation',
      scenario: 'Inserted node into the left subtree of the left child (Balance Factor +2, left child +1).',
      solution: 'Perform single Right Rotation around the unbalanced ancestor node.',
      diagram: '    (C)                (B)\n   /   \\              /   \\\n (B)    T3    -->   (A)   (C)\n /  \\              /  \\   / \\\n(A)  T2           T0  T1 T2 T3',
    },
    RR: {
      name: 'Right-Right (RR) Single Rotation',
      scenario: 'Inserted node into the right subtree of the right child (Balance Factor -2, right child -1).',
      solution: 'Perform single Left Rotation around the unbalanced ancestor node.',
      diagram: '  (A)                  (B)\n /   \\                /   \\\n T0  (B)      -->   (A)   (C)\n     /  \\          /  \\   / \\\n    T1  (C)       T0  T1 T2 T3',
    },
    LR: {
      name: 'Left-Right (LR) Double Rotation',
      scenario: 'Inserted node into the right subtree of the left child (Balance Factor +2, left child -1).',
      solution: 'First perform Left Rotation on left child, followed by Right Rotation on parent.',
      diagram: '    (C)              (C)             (B)\n   /   \\            /   \\           /   \\\n (A)    T3  -->   (B)    T3  -->  (A)   (C)\n   \\             /\n   (B)         (A)',
    },
    RL: {
      name: 'Right-Left (RL) Double Rotation',
      scenario: 'Inserted node into the left subtree of the right child (Balance Factor -2, right child +1).',
      solution: 'First perform Right Rotation on right child, followed by Left Rotation on parent.',
      diagram: '  (A)              (A)               (B)\n /   \\            /   \\             /   \\\n T0  (C)   -->   T0   (B)    -->  (A)   (C)\n     /                  \\\n   (B)                  (C)',
    },
  };

  return (
    <section id="cs-fundamentals" className="section-wrapper" style={{ background: 'rgba(8, 12, 22, 0.6)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag purple">
            <BookOpen size={14} /> Core Computer Science Rigor
          </div>
          <h2 className="section-title">
            CS Fundamentals & <span className="gradient-text">Algorithmic Excellence</span>
          </h2>
          <p className="section-subtitle">
            Theory meets practice: Deep database normalization, strict transaction concurrency, self-balancing trees, and system architectures.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'dbms', label: 'DBMS Normalization & Concurrency (2PL)', icon: Database },
            { id: 'dsa', label: 'Data Structures & Algorithms (AVL & DSA)', icon: Binary },
            { id: 'arch', label: 'Computer Architecture & OS (ARM / RISC)', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: isSelected ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'rgba(15, 23, 42, 0.8)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  border: isSelected ? '1px solid #c084fc' : '1px solid var(--glass-border)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none',
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DBMS & Database Engineering */}
        {activeTab === 'dbms' && (
          <div>
            <div className="grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              {/* Normalization Stepper */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Database size={16} /> Interactive Normalization Pipeline
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Decomposition from 1NF to BCNF
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Click each normal form to inspect how functional dependencies and candidate keys eliminate update, insert, and deletion anomalies.
                </p>

                {/* Normalization Stage Tabs */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {['1NF', '2NF', '3NF', 'BCNF'].map((stage, idx) => (
                    <button
                      key={stage}
                      onClick={() => setNormStep(idx)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        background: normStep === idx ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: normStep === idx ? '#c084fc' : 'var(--text-muted)',
                        border: normStep === idx ? '1px solid #c084fc' : '1px solid var(--glass-border)',
                        cursor: 'pointer',
                      }}
                    >
                      {stage}
                    </button>
                  ))}
                </div>

                {/* Stage Detail Card */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid #c084fc',
                  }}
                >
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    {normalizationSteps[normStep].stage}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                    Core Requirement: {normalizationSteps[normStep].requirement}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    {normalizationSteps[normStep].rule}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '4px' }}>
                    <strong>Practical Example:</strong> {normalizationSteps[normStep].example}
                  </div>
                </div>
              </div>

              {/* Concurrency & 2PL Card */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Transaction Concurrency & ACID
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Two-Phase Locking (2PL) & Serializability
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Theoretical frameworks guaranteeing isolation and serializable transaction execution in relational databases.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-emerald)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                      Strict Two-Phase Locking Protocol (Strict 2PL)
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      <strong>Growing Phase:</strong> Transaction acquires shared/exclusive locks without releasing any lock.
                      <br />
                      <strong>Shrinking Phase:</strong> Exclusive locks are held until commit/abort, completely eliminating cascading aborts.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-cyan)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                      Conflict Serializability & Precedence Graphs
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      Schedules are conflict-equivalent to a serial schedule iff their precedence graph has <em>no directed cycles</em>. Conflict operations: Read-Write, Write-Read, or Write-Write on matching data items.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-amber)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                      Advanced SQL Operators & Optimization
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      Formulation of nested subqueries, correlated queries evaluating row-by-row with outer table references, and `EXISTS` / `NOT EXISTS` predicates.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DSA & Algorithms */}
        {activeTab === 'dsa' && (
          <div>
            <div className="grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              {/* AVL Self-Balancing Tree Visualizer */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Binary size={16} /> Self-Balancing BST
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  AVL Tree Insertion & Rotations
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Maintains balance factor BF ∈ {'{-1, 0, +1}'} via single & double rotations, guaranteeing worst-case O(log n) time.
                </p>

                {/* Rotation Selector */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {['LL', 'RR', 'LR', 'RL'].map((rot) => (
                    <button
                      key={rot}
                      onClick={() => setActiveRotation(rot)}
                      style={{
                        flex: 1,
                        padding: '0.45rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        background: activeRotation === rot ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: activeRotation === rot ? 'var(--accent-cyan)' : 'var(--text-muted)',
                        border: activeRotation === rot ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                        cursor: 'pointer',
                      }}
                    >
                      {rot} Rotation
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    {avlRotations[activeRotation].name}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <strong>Trigger Scenario:</strong> {avlRotations[activeRotation].scenario}
                  </div>
                  <pre
                    style={{
                      background: '#040711',
                      padding: '0.85rem',
                      borderRadius: '4px',
                      color: '#38bdf8',
                      fontSize: '0.75rem',
                      lineHeight: 1.45,
                      overflowX: 'auto',
                      border: '1px solid rgba(56, 189, 248, 0.15)',
                    }}
                  >
                    {avlRotations[activeRotation].diagram}
                  </pre>
                </div>
              </div>

              {/* Sorting & Complexity Proofs */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Award size={16} /> Divide & Conquer & LeetCode
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Algorithm Complexity Analysis
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Rigorous Big-O time and space complexity evaluations implemented across Java and Python.
                </p>

                {/* Table of algorithms */}
                <div style={{ border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-dim)' }}>Algorithm</th>
                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-dim)' }}>Time (Avg)</th>
                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-dim)' }}>Time (Worst)</th>
                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-dim)' }}>Space</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>Merge Sort</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(n log n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(n log n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>O(n)</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>Quick Sort</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(n log n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#f87171', fontFamily: 'var(--font-mono)' }}>O(n²)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>O(log n)</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>AVL Search / Insert</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(log n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(log n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>O(n)</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>Two Sum (HashMap)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(n)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>O(n)</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>Longest Common Prefix</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(S)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>O(S)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>O(1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Computer Architecture & Systems */}
        {activeTab === 'arch' && (
          <div>
            <div className="grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Cpu size={16} /> ARM Architecture
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  ARM 5-Stage CPU Pipeline
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Instruction level parallelism, hazard management, and condition code status flags.
                </p>

                {/* Visual Pipeline Flow */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {[
                    { stage: '1. Instruction Fetch (IF)', desc: 'Load instruction from Program Counter into instruction register.' },
                    { stage: '2. Instruction Decode (ID)', desc: 'Decode opcode and read operand registers from register file.' },
                    { stage: '3. Execute (EX)', desc: 'ALU arithmetic operation or effective address computation.' },
                    { stage: '4. Memory Access (MEM)', desc: 'Load data from memory or write store data into RAM cache.' },
                    { stage: '5. Write-Back (WB)', desc: 'Store ALU result or loaded data back into destination register.' },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span style={{ color: '#fbbf24', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{step.stage}</span>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{step.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <strong>CPSR Status Register:</strong> Tracks N (Negative), Z (Zero), C (Carry), and V (Overflow) condition flags for conditional execution instructions.
                </div>
              </div>

              {/* RISC vs CISC Comparison */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Cpu size={16} /> Instruction Set Architectures
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  RISC vs CISC Comparison
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Architectural trade-offs between reduced load-store instructions and complex multi-cycle operations.
                </p>

                <div style={{ border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-dim)' }}>Feature</th>
                        <th style={{ padding: '0.6rem 0.75rem', color: '#38bdf8' }}>RISC (e.g. ARM)</th>
                        <th style={{ padding: '0.6rem 0.75rem', color: '#c084fc' }}>CISC (e.g. x86)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600 }}>Instruction Length</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Fixed (typically 32-bit)</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Variable (1 to 15 bytes)</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600 }}>Memory Access</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Load/Store Only</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Direct in ALU instructions</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600 }}>Pipelining</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: '#34d399' }}>Highly efficient & uniform</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Complex microcode translation</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600 }}>Registers</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Large general-purpose set</td>
                        <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-muted)' }}>Smaller dedicated set</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
