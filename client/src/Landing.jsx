import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl font-bold text-purple-700">
          AI Debug Assistant
        </h1>

        <button
          onClick={() => navigate("/editor")}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-500 transition duration-300"
        >
          Open Editor
        </button>
      </nav>

      {/* Hero Section */}
      <motion.div
        className="flex flex-1 items-center justify-center px-10 gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Left Side - Illustration */}
        <motion.div
          className="w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/illustration.svg"
            alt="Developer Illustration"
            className="w-[400px]"
          />
        </motion.div>

        {/* Right Side - Editor Preview */}
        <motion.div
          className="w-1/2 bg-[#2d2d2d] rounded-2xl shadow-2xl p-6 text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          {/* Fake Window Controls */}
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Code Preview */}
          <pre className="text-sm text-green-400">
{`function debugCode(code) {
  if (!code) {
    return "Error: No code provided";
  }

  return "AI Analysis Complete 🚀";
}`}
          </pre>

        </motion.div>

      </motion.div>

    </div>
  );
}