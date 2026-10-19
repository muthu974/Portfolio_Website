import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Profile from '../models/Profile.js';

dotenv.config();

export const defaultProfileData = {
  name: 'Muthu A.',
  title: 'Full-Stack MERN Developer & Computer Science Engineer',
  tagline: 'Building high-performance MERN stack web applications, scalable REST APIs, and intelligent data-driven systems.',
  about: 'Computer science engineer with practical hands-on experience in full-stack web development (MERN stack: MongoDB, Express.js, React, Node.js), strong core fundamentals in Data Structures & Algorithms, and relational DBMS architecture. Skilled in Java, Python, and JavaScript, with active exploration into Machine Learning pipelines and interactive 3D simulations.',
  location: 'Bangalore, India',
  status: 'Open to Full-Stack Developer Roles & Collaborations',
  stats: {
    dsaProblemsSolved: 120,
    coreTechnologies: 18,
    fullStackProjects: 6,
    databaseSystems: 3,
  },
  csCoursework: [
    'Object-Oriented Programming (OOP)',
    'Data Structures and Algorithms (DSA)',
    'Database Management Systems (DBMS)',
    'Operating Systems (OS)',
    'Digital Design & Computer Organization',
    'ARM Architecture & Pipelining',
    'RISC vs CISC Architecture',
    'Embedded Systems Architecture'
  ],
  dsaTopics: [
    'Stack & Queue implementations',
    'Singly & Doubly Linked Lists',
    'AVL Tree Insertion & Self-Balancing',
    'Merge Sort & Quick Sort Algorithms',
    'Time & Space Complexity (Big-O Analysis)',
    'LeetCode Patterns (Two Sum, Palindrome Checks, Longest Common Prefix)'
  ],
  dbmsSpecialties: [
    'Functional Dependencies & Candidate Keys',
    'Minimal Cover Computation',
    'Database Normalization (1NF, 2NF, 3NF, BCNF)',
    'Conflict Serializability & Dependency Graphs',
    'Two-Phase Locking (2PL) Concurrency Protocol',
    'Complex SQL Queries (Joins, EXISTS, Nested & Correlated Subqueries)'
  ],
  socialLinks: {
    github: 'https://github.com/muthu974',
    linkedin: 'https://linkedin.com/in/muthu-good',
    email: 'muthuparadoxx@gmail.com',
    leetcode: 'https://leetcode.com',
  },
  socials: {
    github: 'https://github.com/muthu974',
    linkedin: 'https://linkedin.com/in/muthu-good',
    email: 'muthuparadoxx@gmail.com',
    leetcode: 'https://leetcode.com',
  },
};

export const defaultSkillsData = [
  // 1. Programming Languages
  {
    name: 'Java',
    category: 'programming',
    subCategory: 'Core Languages',
    level: 'Proficient / Hands-on',
    statusNote: 'Hands-on project and LeetCode experience',
    evidence: 'Object-oriented programming, Maven setup, inheritance, polymorphism, constructors, super keyword, and interview/LeetCode algorithmic practice.',
    proficiencyPercentage: 85,
    icon: 'Coffee',
    tags: ['OOP', 'Maven', 'DSA', 'LeetCode', 'Inheritance'],
    featured: true,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'programming',
    subCategory: 'Core Languages',
    level: 'Proficient / Hands-on',
    statusNote: 'Primary language for full-stack MERN development',
    evidence: 'DOM manipulation, modern ES6+ functions, asynchronous promises/async-await, front-end scripting, and full-stack MERN application engineering.',
    proficiencyPercentage: 90,
    icon: 'FileCode',
    tags: ['Async/Await', 'ES6+', 'DOM', 'MERN', 'Full-Stack'],
    featured: true,
  },
  {
    name: 'Python',
    category: 'programming',
    subCategory: 'Core Languages',
    level: 'Proficient / Hands-on',
    statusNote: 'Data analysis, plotting, and machine learning scripts',
    evidence: 'Programming fundamentals, Matplotlib, Pandas, Seaborn, data exploration scripts, and machine learning integration pipelines.',
    proficiencyPercentage: 82,
    icon: 'Terminal',
    tags: ['Pandas', 'Matplotlib', 'Data Analysis', 'ML Scripts'],
    featured: true,
  },
  {
    name: 'C',
    category: 'programming',
    subCategory: 'Systems Programming',
    level: 'Proficient / Hands-on',
    statusNote: 'Low-level fundamentals and file handling',
    evidence: 'Core C programming, stdio, memory concepts, and file handling (fopen, fgetc, fputc, fclose, binary file copy utilities).',
    proficiencyPercentage: 80,
    icon: 'Cpu',
    tags: ['File I/O', 'stdio', 'Memory Management', 'Algorithms'],
    featured: false,
  },
  {
    name: 'C#',
    category: 'programming',
    subCategory: 'Game Development',
    level: 'Exploration / Learning Target',
    statusNote: 'Applied in beginner Unity 3D game prototype exercises',
    evidence: 'Basic C# scripting, Unity 3D component lifecycle, vector math, and playable prototype controls.',
    proficiencyPercentage: 55,
    icon: 'Gamepad2',
    tags: ['Unity 3D', 'Game Scripts', 'Prototypes'],
    featured: false,
  },

  // 2. Web Development and Full-Stack
  {
    name: 'React.js',
    category: 'web_fullstack',
    subCategory: 'Front end',
    level: 'Proficient / Hands-on',
    statusNote: 'Modern SPA development with Hooks and component hierarchy',
    evidence: 'Component-driven UI architecture, state and effect hooks, responsive layouts, DOM lifecycle, and front-to-back REST integration.',
    proficiencyPercentage: 88,
    icon: 'Atom',
    tags: ['Hooks', 'SPA', 'Component Hierarchy', 'UI/UX'],
    featured: true,
  },
  {
    name: 'Node.js',
    category: 'web_fullstack',
    subCategory: 'Back end and APIs',
    level: 'Proficient / Hands-on',
    statusNote: 'Backend server environment and event loop',
    evidence: 'Node.js runtime, asynchronous I/O, module systems (CommonJS/ESM), and scalable server architectures.',
    proficiencyPercentage: 86,
    icon: 'Server',
    tags: ['Async I/O', 'Runtime', 'Backend', 'Event Loop'],
    featured: true,
  },
  {
    name: 'Express.js',
    category: 'web_fullstack',
    subCategory: 'Back end and APIs',
    level: 'Proficient / Hands-on',
    statusNote: 'RESTful API engineering and middleware integration',
    evidence: 'REST API concepts, connecting front end to back end, CRUD operations, middleware chaining, request validation, and error handling.',
    proficiencyPercentage: 88,
    icon: 'Layers',
    tags: ['REST APIs', 'Middleware', 'CRUD', 'Routing'],
    featured: true,
  },
  {
    name: 'MERN Stack Integration',
    category: 'web_fullstack',
    subCategory: 'Full-stack stack',
    level: 'Proficient / Hands-on',
    statusNote: 'End-to-end full-stack development with MongoDB Atlas',
    evidence: 'Built Personal Expense Tracker with MERN and MongoDB Atlas, managing client state, server endpoints, and cloud database persistence.',
    proficiencyPercentage: 90,
    icon: 'Globe',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Atlas'],
    featured: true,
  },
  {
    name: 'HTML5 & CSS3',
    category: 'web_fullstack',
    subCategory: 'Front end',
    level: 'Proficient / Hands-on',
    statusNote: 'Semantic markup, modern layouts, and responsive design',
    evidence: 'Responsive web design, Flexbox, Grid, CSS animations, DOM styling, and modern glassmorphism aesthetics.',
    proficiencyPercentage: 92,
    icon: 'Layout',
    tags: ['Flexbox', 'CSS Grid', 'Keyframe Animations', 'Semantic HTML'],
    featured: false,
  },

  // 3. Databases and Core Computer Science
  {
    name: 'MongoDB & MongoDB Atlas',
    category: 'databases_cs',
    subCategory: 'Databases',
    level: 'Proficient / Hands-on',
    statusNote: 'Cloud database connection, schema design, and CRUD',
    evidence: 'MongoDB Atlas cluster setup, connection security, Mongoose schemas, document CRUD operations, and index optimization.',
    proficiencyPercentage: 87,
    icon: 'Database',
    tags: ['NoSQL', 'Atlas Cloud', 'Mongoose', 'Document Store'],
    featured: true,
  },
  {
    name: 'SQL & Relational Databases',
    category: 'databases_cs',
    subCategory: 'Databases',
    level: 'Proficient / Hands-on',
    statusNote: 'Relational query mastery and DBMS design',
    evidence: 'SQL queries, INNER/OUTER joins, EXISTS clauses, nested and correlated subqueries, database schemas, and DBMS concepts.',
    proficiencyPercentage: 85,
    icon: 'Table',
    tags: ['SQL', 'Joins', 'EXISTS', 'Correlated Queries', 'DBMS'],
    featured: true,
  },
  {
    name: 'DBMS Theory & Normalization',
    category: 'databases_cs',
    subCategory: 'DBMS theory and practice',
    level: 'Proficient / Hands-on',
    statusNote: 'Theoretical rigor and transaction processing',
    evidence: 'Functional dependencies, candidate keys, minimal cover computation, normalization (1NF, 2NF, 3NF, BCNF), conflict serializability, and two-phase locking (2PL).',
    proficiencyPercentage: 88,
    icon: 'GitFork',
    tags: ['1NF-BCNF', 'Candidate Keys', 'Conflict Serializability', '2PL'],
    featured: true,
  },
  {
    name: 'Data Structures & Algorithms (DSA)',
    category: 'databases_cs',
    subCategory: 'Algorithms',
    level: 'Proficient / Hands-on',
    statusNote: 'Algorithmic problem solving and complexity analysis',
    evidence: 'Stack, queue, linked list, AVL tree insertion & balancing, merge sort, quick sort, time/space complexity analysis, and LeetCode problem solving (Two Sum, Palindrome checks, Longest Common Prefix).',
    proficiencyPercentage: 84,
    icon: 'Binary',
    tags: ['AVL Trees', 'Quick Sort', 'Merge Sort', 'LeetCode', 'Big-O'],
    featured: true,
  },
  {
    name: 'Computer Architecture & OS',
    category: 'databases_cs',
    subCategory: 'CS Coursework',
    level: 'Intermediate / Applied',
    statusNote: 'Deep hardware-software interface understanding',
    evidence: 'Operating systems principles, digital design, computer organization, ARM architecture, CPU pipeline, CPSR register, RISC vs CISC, and embedded systems.',
    proficiencyPercentage: 78,
    icon: 'Cpu',
    tags: ['ARM', 'RISC vs CISC', 'CPU Pipeline', 'Operating Systems'],
    featured: false,
  },

  // 4. AI, Machine Learning, and Data
  {
    name: 'Data Analysis (Pandas & NumPy)',
    category: 'aiml_data',
    subCategory: 'Data analysis and visualization',
    level: 'Proficient / Hands-on',
    statusNote: 'Data exploration and statistical manipulation',
    evidence: 'Data cleaning, feature transformation, statistical summaries, and hands-on wine-quality dataset analysis and reporting.',
    proficiencyPercentage: 82,
    icon: 'BarChart2',
    tags: ['Pandas', 'Wine Dataset', 'Data Wrangling', 'Statistics'],
    featured: true,
  },
  {
    name: 'Data Visualization (Matplotlib, Seaborn, Plotly, Bokeh)',
    category: 'aiml_data',
    subCategory: 'Data analysis and visualization',
    level: 'Proficient / Hands-on',
    statusNote: 'Interactive and publication-quality plots',
    evidence: 'Generating statistical distributions, correlation heatmaps, interactive charts in Plotly/Bokeh, and saving high-res visualizations.',
    proficiencyPercentage: 84,
    icon: 'PieChart',
    tags: ['Matplotlib', 'Seaborn', 'Plotly', 'Bokeh', 'Visual Dashboards'],
    featured: false,
  },
  {
    name: 'Power BI',
    category: 'aiml_data',
    subCategory: 'Analytics & Dashboards',
    level: 'Intermediate / Applied',
    statusNote: 'Business intelligence and interactive KPI reporting',
    evidence: 'Power BI report design, interactive data slicers, data modeling, and wine-quality dashboard presentation.',
    proficiencyPercentage: 75,
    icon: 'Activity',
    tags: ['Dashboards', 'KPIs', 'Data Modeling', 'Business Intelligence'],
    featured: false,
  },
  {
    name: 'Machine Learning & Disease Prediction',
    category: 'aiml_data',
    subCategory: 'AI / ML',
    level: 'Intermediate / Applied',
    statusNote: 'ML project development and MERN app integration',
    evidence: 'Dataset exploration, model-to-application integration flow, healthcare disease prediction concepts, and GitHub AI_PROJECT review.',
    proficiencyPercentage: 74,
    icon: 'Brain',
    tags: ['ML Classification', 'Model Integration', 'Healthcare AI'],
    featured: true,
  },
  {
    name: 'TensorFlow, Hugging Face & AI Agents',
    category: 'aiml_data',
    subCategory: 'AI / ML Learning Targets',
    level: 'Exploration / Learning Target',
    statusNote: 'Active learning interests in modern AI systems',
    evidence: 'Exploring transformer models, prompt engineering, Hugging Face models, and AI agent architectures as next-generation learning targets.',
    proficiencyPercentage: 50,
    icon: 'Sparkles',
    tags: ['Hugging Face', 'AI Agents', 'TensorFlow', 'LLMs'],
    featured: false,
  },

  // 5. Tools, Platforms, and Environments
  {
    name: 'VS Code & Web Dev Tools',
    category: 'tools',
    subCategory: 'Development',
    level: 'Proficient / Hands-on',
    statusNote: 'Daily driver for modern web engineering',
    evidence: 'VS Code multi-root workspaces, debugging, linting, browser developer tools, DOM inspection, and network profiling.',
    proficiencyPercentage: 92,
    icon: 'Monitor',
    tags: ['VS Code', 'Chrome DevTools', 'Debugging', 'Extensions'],
    featured: false,
  },
  {
    name: 'GitHub & Version Control',
    category: 'tools',
    subCategory: 'Development',
    level: 'Proficient / Hands-on',
    statusNote: 'Collaborative code management and repository workflows',
    evidence: 'Git version control, GitHub repositories, pull requests, code navigation, and project codebase reviews.',
    proficiencyPercentage: 86,
    icon: 'GitBranch',
    tags: ['Git', 'GitHub', 'Version Control', 'Repositories'],
    featured: true,
  },
  {
    name: 'Maven',
    category: 'tools',
    subCategory: 'Development',
    level: 'Intermediate / Applied',
    statusNote: 'Java dependency and build lifecycle management',
    evidence: 'Configuring pom.xml, Maven project lifecycles, plugins, and dependency resolution for Java projects.',
    proficiencyPercentage: 78,
    icon: 'Package',
    tags: ['Java', 'Maven', 'pom.xml', 'Build Tools'],
    featured: false,
  },
  {
    name: 'Linux / Ubuntu & Windows 11',
    category: 'tools',
    subCategory: 'Operating Systems',
    level: 'Proficient / Hands-on',
    statusNote: 'Dual-environment development and command-line mastery',
    evidence: 'Ubuntu/Linux bash navigation, troubleshooting, permissions, environment variable configuration, and Windows 11 workflow.',
    proficiencyPercentage: 85,
    icon: 'Terminal',
    tags: ['Ubuntu', 'Linux Bash', 'Windows 11', 'Shell Scripts'],
    featured: false,
  },
  {
    name: 'Unity 3D Engine',
    category: 'tools',
    subCategory: 'Game Development',
    level: 'Exploration / Learning Target',
    statusNote: '3D game development and prototyping',
    evidence: 'Unity Hub, 3D scenes, GameObject hierarchy, collider physics, UI canvas, and playable prototype compilation.',
    proficiencyPercentage: 56,
    icon: 'Box',
    tags: ['Unity 3D', 'Physics', 'Playable Demos'],
    featured: false,
  },
];

export const defaultProjectsData = [
  {
    title: 'Personal Expense Tracker (MERN)',
    slug: 'mern-personal-expense-tracker',
    subtitle: 'Full-Stack Personal Finance & Analytics Web Application',
    category: 'Full-Stack MERN',
    badge: 'Flagship MERN Application',
    description: 'A robust full-stack expense tracking platform built with the MERN stack and MongoDB Atlas. Features real-time CRUD operations, interactive spending categorizations, monthly budget thresholds, and analytical breakdowns.',
    detailedOverview: 'Engineered as a complete end-to-end full-stack application. Designed to provide users with a clean, responsive UI to manage personal finances with zero friction. The backend exposes secure REST API endpoints connecting to a cloud-hosted MongoDB Atlas cluster with comprehensive data validation and schema indexing.',
    techStack: {
      frontend: ['React.js (Hooks & SPA)', 'Vanilla CSS Glassmorphism', 'Responsive Charts', 'Lucide Icons'],
      backend: ['Node.js', 'Express.js REST APIs', 'CORS & Rate Limiting', 'MVC Architecture'],
      database: ['MongoDB Atlas (Cloud)', 'Mongoose ODM', 'Index Optimization'],
      tools: ['VS Code', 'Ubuntu Linux', 'Postman / DevTools'],
    },
    keyFeatures: [
      'Full CRUD REST APIs for logging, editing, and deleting personal transactions',
      'Categorized expense breakdown (Housing, Food, Tech, Education, Transit)',
      'Monthly budget progress tracker with threshold alert indicators',
      'MongoDB Atlas cloud storage with automated schema timestamps',
      'Responsive design optimized for both mobile screens and desktop workstations',
    ],
    apisImplemented: [
      { method: 'GET', endpoint: '/api/expenses', description: 'Retrieve all user expenses with category filtering and sorting' },
      { method: 'POST', endpoint: '/api/expenses', description: 'Create a new expense entry with input validation' },
      { method: 'PUT', endpoint: '/api/expenses/:id', description: 'Modify an existing expense amount, date, or category' },
      { method: 'DELETE', endpoint: '/api/expenses/:id', description: 'Safely delete an expense entry with confirmation' },
      { method: 'GET', endpoint: '/api/expenses/analytics', description: 'Aggregate monthly totals and category percentages' },
    ],
    architectureDetails: {
      dataFlow: 'Client React components make asynchronous fetch requests -> Express routing middleware authenticates and validates payload -> Mongoose ODM performs operations against MongoDB Atlas -> JSON payload sent back with standardized response format.',
      databaseDesign: 'Collections: Expenses (amount: Number, category: String, date: Date, description: String, userRef: ObjectId). Indexed on userRef and date for high-speed chronological queries.',
      securityNotes: 'CORS policies enforced, request rate limiting applied, environment variables isolated via dotenv.',
    },
    githubUrl: 'https://github.com/muthu-a/mern-expense-tracker',
    liveDemoUrl: '#demo-expense-tracker',
    accentColor: '#10b981',
    icon: 'Wallet',
    featured: true,
  },
  {
    title: 'AI Disease Prediction Platform',
    slug: 'ai-disease-prediction-platform',
    subtitle: 'Intelligent Healthcare Diagnostic Portal & ML Model Integration',
    category: 'AI & Healthcare MERN',
    badge: 'Machine Learning + MERN',
    description: 'An AI-powered healthcare assistant designed to assess symptoms against trained predictive models, providing real-time risk classification, disease indications, and actionable medical guidance.',
    detailedOverview: 'Built to bridge the gap between machine learning intelligence and user-friendly web portals. Analyzed dataset requirements and backend model-to-application integration to convert complex statistical predictions into understandable, accessible healthcare insights.',
    techStack: {
      frontend: ['React.js', 'Dynamic Multi-Select Symptom UI', 'Visual Risk Gauge', 'Vanilla CSS'],
      backend: ['Node.js', 'Express.js', 'Python Flask / ML Bridge API', 'RESTful Endpoints'],
      database: ['MongoDB Atlas', 'Patient Diagnostic Logs Schema'],
      tools: ['Pandas', 'Scikit-Learn', 'VS Code', 'GitHub AI_PROJECT'],
    },
    keyFeatures: [
      'Interactive multi-symptom selector with instant search and category grouping',
      'Classification engine predicting probable conditions based on clinical datasets',
      'Visual risk probability score with color-coded severity warning levels',
      'Preventative care recommendations and specialist consultation guidance',
      'Historical diagnostic records stored securely in MongoDB Atlas',
    ],
    apisImplemented: [
      { method: 'POST', endpoint: '/api/predict', description: 'Send symptom vector and receive probability distribution across conditions' },
      { method: 'GET', endpoint: '/api/symptoms', description: 'Fetch comprehensive dictionary of searchable clinical symptoms' },
      { method: 'GET', endpoint: '/api/history', description: 'Retrieve past prediction assessments for verified session' },
    ],
    architectureDetails: {
      dataFlow: 'React symptom inputs -> Node.js API Gateway -> Python Model Inference service -> Result normalization in Express -> MongoDB record creation -> Client visualization.',
      databaseDesign: 'Collections: DiagnosticSessions (symptoms: Array, predictedCondition: String, confidence: Number, timestamp: Date).',
      securityNotes: 'Sanitized input vectors, strict validation schemas, decoupled prediction layer for scalability.',
    },
    githubUrl: 'https://github.com/muthu-a/AI_PROJECT',
    liveDemoUrl: '#demo-ai-disease',
    accentColor: '#38bdf8',
    icon: 'Activity',
    featured: true,
  },
  {
    title: 'Wine Quality Data Analysis & Power BI Dashboard',
    slug: 'wine-quality-analytics-powerbi',
    subtitle: 'Multivariate Statistical Exploration & Business Intelligence Reporting',
    category: 'Data Analytics & BI',
    badge: 'Analytics & Visualization',
    description: 'End-to-end data analytics pipeline examining physicochemical attributes of wine varieties. Leveraged Python libraries (Pandas, Matplotlib, Seaborn, Plotly, Bokeh) for statistical distributions and created an interactive Power BI dashboard for executive reporting.',
    detailedOverview: 'Investigated chemical features such as fixed acidity, volatile acidity, citric acid, residual sugar, chlorides, free sulfur dioxide, and alcohol percentage to uncover decisive factors influencing wine quality scores. Exported visual reports into interactive dashboards.',
    techStack: {
      frontend: ['Power BI Desktop', 'Plotly Interactive HTML Plots', 'Bokeh Visualizers'],
      backend: ['Python 3', 'Jupyter Notebooks', 'Automated Plot Exporters'],
      database: ['Structured CSV / Relational Tables', 'Pandas DataFrames'],
      tools: ['Pandas', 'Matplotlib', 'Seaborn', 'Power BI Service'],
    },
    keyFeatures: [
      'Correlation matrix and heatmaps identifying key quality indicators (e.g., alcohol content vs volatile acidity)',
      'Boxplots and distribution plots tracking outlier detection across pH and sulfate concentrations',
      'Interactive Power BI report with dynamic filtering by quality score and alcohol tiers',
      'High-resolution exported vector plots for academic and professional technical documentation',
    ],
    apisImplemented: [
      { method: 'GET', endpoint: '/data/wine-quality-report.pdf', description: 'Download structured analytical presentation' },
      { method: 'GET', endpoint: '/data/correlation-matrix', description: 'Interactive JSON correlation coefficients for web display' },
    ],
    architectureDetails: {
      dataFlow: 'Raw CSV dataset -> Pandas cleaning & missing value handling -> Seaborn/Matplotlib exploratory analysis -> Power BI data model creation -> Interactive visual reporting.',
      databaseDesign: 'Normalized tables for red and white variants with standardized physicochemical parameters.',
      securityNotes: 'Reproducible analysis script with clean separation of raw data and exported plots.',
    },
    githubUrl: 'https://github.com/muthu-a/wine-quality-analysis',
    liveDemoUrl: '#demo-wine-analytics',
    accentColor: '#ec4899',
    icon: 'PieChart',
    featured: true,
  },
  {
    title: 'Unity 3D Game Prototype',
    slug: 'unity-3d-game-prototype',
    subtitle: 'Playable 3D Physics & Gameplay Mechanics Exploration',
    category: 'Game Development',
    badge: 'Unity 3D & C# Prototype',
    description: 'An interactive 3D prototype created in Unity 3D with C# scripts. Features character movement physics, collider triggers, collectible token mechanics, obstacle navigation, and dynamic UI HUD display.',
    detailedOverview: 'Built to explore low-level game loops, C# object-oriented programming in real-time simulations, vector arithmetic, and game state management in a 3D environment.',
    techStack: {
      frontend: ['Unity UI Canvas', 'Particle Systems', 'Cinemachine Camera'],
      backend: ['C# Scripting Engine', 'Unity Component Architecture'],
      database: ['PlayerPrefs / Local State JSON'],
      tools: ['Unity 3D Hub', 'Visual Studio Code', 'Ubuntu / Windows'],
    },
    keyFeatures: [
      'Custom C# PlayerController handling 3D movement, jump physics, and raycast ground checks',
      'Interactive collectible objects with trigger colliders and audio-visual feedback',
      'Dynamic HUD tracking score, elapsed time, and player health bar',
      'Modular level layout with moving platforms and hazard zones',
    ],
    apisImplemented: [
      { method: 'EVENT', endpoint: 'OnPlayerCollectToken', description: 'Trigger score increment and UI particle burst' },
      { method: 'EVENT', endpoint: 'OnPlayerHitHazard', description: 'Deduct player health and respawn if depleted' },
    ],
    architectureDetails: {
      dataFlow: 'Input Manager -> Player Controller -> Unity Physics Engine -> Collision Events -> Game Manager Singleton -> UI Canvas Update.',
      databaseDesign: 'Serialized Game State ScriptableObjects for high scores and level progression.',
      securityNotes: 'Clean modular decoupling between player physics and game manager logic.',
    },
    githubUrl: 'https://github.com/muthu-a/unity-3d-prototype',
    liveDemoUrl: '#demo-unity-3d',
    accentColor: '#f59e0b',
    icon: 'Gamepad2',
    featured: true,
  },
  {
    title: 'Smart India Hackathon: AI Timetable Generator',
    slug: 'ai-timetable-generator',
    subtitle: 'Automated Academic Schedule Optimization Engine',
    category: 'Algorithms & AI',
    badge: 'Hackathon Innovation',
    description: 'A constraint-satisfaction scheduling system formulated for academic institutions to eliminate instructor conflicts, room overbooking, and student timetable overlaps through automated algorithmic allocation.',
    detailedOverview: 'Conceptualized for the Smart India Hackathon challenge. Models timetable generation as a Constraint Satisfaction Problem (CSP) with hard constraints (no double-booking of rooms/professors) and soft constraints (balanced weekly workloads).',
    techStack: {
      frontend: ['React.js', 'Interactive Weekly Grid Schedule Matrix'],
      backend: ['Node.js / Python', 'Constraint Satisfaction Engine', 'RESTful API'],
      database: ['MongoDB / SQL Tables', 'Faculty, Course & Classroom Schemas'],
      tools: ['VS Code', 'GitHub', 'Algorithmic Optimization'],
    },
    keyFeatures: [
      'Automated conflict detection across faculty schedules and laboratory allocations',
      'Custom constraint settings for preferred teacher hours and room capacities',
      'One-click schedule regeneration with collision report diagnostics',
      'Exportable timetable schedules in PDF, CSV, and interactive web views',
    ],
    apisImplemented: [
      { method: 'POST', endpoint: '/api/timetable/generate', description: 'Run constraint algorithm across courses and faculty' },
      { method: 'GET', endpoint: '/api/timetable/view/:id', description: 'Retrieve department timetable grid' },
    ],
    architectureDetails: {
      dataFlow: 'User inputs course requirements -> Constraint validation -> Backtracking search with MRV heuristics -> Conflict-free schedule persisted to database.',
      databaseDesign: 'Relational entities for Faculty, Classrooms, Subjects, and TimeSlots.',
      securityNotes: 'Role-based access control for department heads and faculty.',
    },
    githubUrl: 'https://github.com/muthu-a/sih-ai-timetable',
    liveDemoUrl: '#demo-timetable',
    accentColor: '#8b5cf6',
    icon: 'Calendar',
    featured: false,
  },
  {
    title: 'SAVER: Smart Emergency Transit & Smart Ambulance',
    slug: 'saver-smart-emergency-transit',
    subtitle: 'Intelligent Green Corridor & Emergency Route Priority Architecture',
    category: 'IoT & Systems Design',
    badge: 'Systems Innovation Concept',
    description: 'A smart city transit framework designed to automate dynamic green light corridors for emergency ambulances, cutting transit latency during critical patient golden hours using simulated GPS telemetry.',
    detailedOverview: 'Combines embedded system architectures, real-time telemetry streaming, and automated intersection control to clear traffic paths ahead of dispatched emergency vehicles.',
    techStack: {
      frontend: ['React.js', 'Real-time Map Visualizer', 'Intersection Telemetry Dashboard'],
      backend: ['Node.js', 'Express.js', 'Socket.IO Real-Time Engine'],
      database: ['MongoDB', 'Vehicle & Route Incident Records'],
      tools: ['ARM & Embedded concepts', 'VS Code', 'Ubuntu Linux'],
    },
    keyFeatures: [
      'Simulated real-time GPS tracking of moving emergency vehicles',
      'Automated signal preemption triggering green lights at upcoming intersections',
      'Hospital emergency room ETA notification and bed availability synchronization',
      'Incident log archiving for municipal traffic performance audits',
    ],
    apisImplemented: [
      { method: 'POST', endpoint: '/api/transit/dispatch', description: 'Register emergency dispatch and compute green corridor path' },
      { method: 'WS', endpoint: '/ws/telemetry', description: 'Real-time WebSocket coordinates stream' },
    ],
    architectureDetails: {
      dataFlow: 'Ambulance GPS coordinates broadcast over WebSockets -> Dispatch server computes intersection proximity -> Triggers signal override command -> Confirms green light to driver.',
      databaseDesign: 'EmergencyDispatches, TrafficSignals, and HospitalAvailability collections.',
      securityNotes: 'Encrypted telemetry stream and fail-safe timeout returning signals to normal cycling.',
    },
    githubUrl: 'https://github.com/muthu-a/saver-emergency-transit',
    liveDemoUrl: '#demo-saver',
    accentColor: '#ef4444',
    icon: 'Radio',
    featured: false,
  },
];

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('ℹ️  Skipping direct MongoDB seed: MONGODB_URI not set. In-memory data will be served.');
      return;
    }

    await mongoose.connect(mongoUri);
    console.log('🔄 Seeding MongoDB Atlas database with skills profile data...');

    // Clear existing data
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Profile.deleteMany({});

    // Seed new data
    await Skill.insertMany(defaultSkillsData);
    await Project.insertMany(defaultProjectsData);
    await Profile.create(defaultProfileData);

    console.log('✅ Database successfully seeded with:');
    console.log(`   - ${defaultSkillsData.length} Skills categorized`);
    console.log(`   - ${defaultProjectsData.length} Projects detailed`);
    console.log(`   - Developer Profile configured`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  seedDatabase().then(() => process.exit(0));
}
