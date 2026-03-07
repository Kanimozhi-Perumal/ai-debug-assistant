import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import aiAnimation from "./assets/ai-animation.json";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative min-h-screen overflow-x-hidden transition-all duration-500">

        {/* 🌑 Base Gradient Layer */}
        <div
          className={`absolute inset-0 -z-40 ${
            darkMode
              ? "bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black"
              : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
          }`}
        />

        {/* 🌌 Aurora Animated Background */}
        <div className="absolute inset-0 -z-30">
          <div className="absolute w-[1200px] h-[1200px] bg-purple-600/30 rounded-full blur-[200px] animate-pulse top-[-300px] left-[-300px]" />
          <div className="absolute w-[1000px] h-[1000px] bg-blue-600/30 rounded-full blur-[200px] animate-pulse bottom-[-300px] right-[-200px]" />
        </div>

        {/* 🌠 Radial Spotlight Center */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_70%)]" />

        {/* 🌌 Particle Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0 -z-10"
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              number: { value: 50 },
              color: { value: darkMode ? "#3b82f6" : "#6366f1" },
              links: {
                enable: true,
                color: darkMode ? "#3b82f6" : "#6366f1",
                distance: 150,
              },
              move: { enable: true, speed: 1 },
              size: { value: 2 },
              opacity: { value: 0.4 },
            },
          }}
        />

        {/* 🔥 NAVBAR */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* HERO */}
        <div className="relative flex flex-col items-center justify-center text-center px-6 pt-52">

          <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`relative backdrop-blur-2xl border shadow-2xl rounded-3xl p-12 max-w-3xl ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <div className="w-48 mx-auto mb-6">
              <Lottie animationData={aiAnimation} loop />
            </div>

            <h1
              className={`text-5xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              AI Code Debug Assistant
            </h1>

            <p
              className={`text-lg mb-8 h-10 ${
                darkMode ? "text-blue-400" : "text-indigo-600"
              }`}
            >
              <Typewriter
                words={[
                  "Fix Logical Bugs with AI",
                  "Detect Syntax Errors Instantly",
                  "Optimize Performance Smartly",
                  "Analyze Time & Space Complexity",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/editor")}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-semibold shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
            >
              Start Debugging 🚀
            </motion.button>

            <p
              className={`mt-8 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Built with MERN + AI
            </p>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="relative grid md:grid-cols-3 gap-8 px-10 mt-32 pb-32 max-w-6xl mx-auto">
          {[{
            title: "Syntax Detection",
            desc: "Instantly detect and fix syntax issues in your code.",
          },{
            title: "Logic Analysis",
            desc: "Understand why your code fails and how to correct it.",
          },{
            title: "Performance Optimization",
            desc: "Improve time & space complexity with AI insights.",
          }].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`backdrop-blur-xl border rounded-2xl p-8 shadow-xl transition-all duration-300 ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:shadow-blue-500/20"
                  : "bg-white border-gray-200 hover:shadow-indigo-300/40"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}