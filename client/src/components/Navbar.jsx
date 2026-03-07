import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 🔷 Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            AI Debug
          </span>
        </motion.div>

        {/* 🖥 Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          {["Features", "About", "Contact"].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -2 }}
              href="#"
              className="text-gray-300 hover:text-white transition"
            >
              {item}
            </motion.a>
          ))}

          {/* 🌙 Dark Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition text-white"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* 📱 Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl px-6 py-4 space-y-4">
          {["Features", "About", "Contact"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="block text-gray-300 hover:text-white"
            >
              {item}
            </a>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="block text-left text-white"
          >
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}