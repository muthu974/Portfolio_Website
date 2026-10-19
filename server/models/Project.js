import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: 'Featured Project',
    },
    description: {
      type: String,
      required: true,
    },
    detailedOverview: {
      type: String,
      default: '',
    },
    techStack: {
      frontend: [{ type: String }],
      backend: [{ type: String }],
      database: [{ type: String }],
      tools: [{ type: String }],
    },
    keyFeatures: [{ type: String }],
    apisImplemented: [
      {
        method: { type: String },
        endpoint: { type: String },
        description: { type: String },
      },
    ],
    architectureDetails: {
      dataFlow: { type: String },
      databaseDesign: { type: String },
      securityNotes: { type: String },
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveDemoUrl: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '#38bdf8',
    },
    icon: {
      type: String,
      default: 'Layers',
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
