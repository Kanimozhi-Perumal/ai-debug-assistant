import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    syntaxErrors: {
      type: String,
      default: "No syntax errors found.",
    },
    logicErrors: {
      type: String,
      default: "No logical errors found.",
    },
    why: {
      type: String,
    },
    fixedCode: {
      type: String,
    },
    optimizedCode: {
      type: String,
    },
    timeComplexity: {
      type: String,
    },

    // ✅ NEW FIELDS ADDED
    spaceComplexity: {
      type: String,
    },
    optimizationPossible: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    improvementSuggestions: [
      {
        type: String,
      },
    ],

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    confidence: {
      type: String,
      default: "90%",
    },
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);