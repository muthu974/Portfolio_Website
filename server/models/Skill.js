import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['programming', 'web_fullstack', 'databases_cs', 'aiml_data', 'tools'],
    },
    subCategory: {
      type: String,
      default: '',
    },
    level: {
      type: String,
      enum: ['Proficient / Hands-on', 'Intermediate / Applied', 'Exploration / Learning Target'],
      default: 'Intermediate / Applied',
    },
    statusNote: {
      type: String,
      default: '',
    },
    evidence: {
      type: String,
      required: true,
    },
    proficiencyPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    icon: {
      type: String,
      default: 'Code',
    },
    tags: [{ type: String }],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
