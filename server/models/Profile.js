import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Muthu A.',
    },
    title: {
      type: String,
      default: 'Full-Stack MERN Developer & Computer Science Engineer',
    },
    tagline: {
      type: String,
      default: 'Crafting robust full-stack web applications, scalable REST APIs, and data-driven solutions.',
    },
    about: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Bangalore, India',
    },
    status: {
      type: String,
      default: 'Available for Full-Time Roles & Full-Stack Projects',
    },
    stats: {
      dsaProblemsSolved: { type: Number, default: 150 },
      coreTechnologies: { type: Number, default: 20 },
      fullStackProjects: { type: Number, default: 8 },
      databaseSystems: { type: Number, default: 3 },
    },
    csCoursework: [{ type: String }],
    dsaTopics: [{ type: String }],
    dbmsSpecialties: [{ type: String }],
    socialLinks: {
      github: { type: String, default: 'https://github.com/muthu974' },
      linkedin: { type: String, default: 'https://linkedin.com/in/muthu-good' },
      email: { type: String, default: 'muthuparadoxx@gmail.com' },
      leetcode: { type: String, default: 'https://leetcode.com' },
    },
    socials: {
      github: { type: String, default: 'https://github.com/muthu974' },
      linkedin: { type: String, default: 'https://linkedin.com/in/muthu-good' },
      email: { type: String, default: 'muthuparadoxx@gmail.com' },
      leetcode: { type: String, default: 'https://leetcode.com' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
