import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aiAnimation from "./assets/ai-animation.json";

export default function AIPanel({ data, loading }) {

  // 🧠 Loading State
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#0b1120]">
        <p className="animate-pulse text-gray-300 text-lg">
          AI is analyzing your code...
        </p>
      </div>
    );
  }

  // 🌟 HERO STYLE EMPTY STATE
  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="w-40 mx-auto mb-6">
            <Lottie animationData={aiAnimation} loop />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            AI Code Debug Assistant
          </h2>

          <p className="text-blue-400 mb-6">
            Fix logical bugs, detect syntax errors,
            and optimize performance instantly.
          </p>

          <p className="text-gray-400 text-sm">
            Click "Debug Current File" to begin analysis 🚀
          </p>
        </motion.div>

      </div>
    );
  }

  // 🔍 DEBUG RESULT VIEW
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#0f172a] text-white space-y-6">

      <div>
        <h3 className="font-bold text-red-400">🛑 Syntax Errors</h3>
        <p className="text-gray-300">{data.syntaxErrors}</p>
      </div>

      <div>
        <h3 className="font-bold text-yellow-400">⚠ Logical Errors</h3>
        <p className="text-gray-300">{data.logicErrors}</p>
      </div>

      <div>
        <h3 className="font-bold text-blue-400">📘 Explanation</h3>
        <p className="text-gray-300">{data.why}</p>
      </div>

      <div>
        <h3 className="font-bold text-green-400">✅ Fixed Code</h3>
        <pre className="bg-black/70 p-4 rounded-lg overflow-x-auto text-sm">
          {data.fixedCode}
        </pre>
      </div>

      <div>
        <h3 className="font-bold text-purple-400">🚀 Optimized Code</h3>
        <pre className="bg-black/70 p-4 rounded-lg overflow-x-auto text-sm">
          {data.optimizedCode}
        </pre>
      </div>

      <div className="flex gap-4 flex-wrap text-sm mt-6">
        <span className="bg-blue-600 px-3 py-1 rounded">
          ⏱ {data.timeComplexity}
        </span>

        <span className="bg-green-600 px-3 py-1 rounded">
          💾 {data.spaceComplexity}
        </span>

        <span className="bg-purple-600 px-3 py-1 rounded">
          🎯 Confidence: {data.confidence}
        </span>
      </div>

    </div>
  );
}