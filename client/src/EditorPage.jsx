import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";
import AIPanel from "./AIPanel";
import ChatPanel from "./ChatPanel";

export default function EditorPage() {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("debug");

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-black" />

      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 40 },
            color: { value: "#3b82f6" },
            links: { enable: true, color: "#3b82f6", distance: 150 },
            move: { enable: true, speed: 1 },
            size: { value: 2 },
            opacity: { value: 0.4 },
          },
        }}
      />

      {/* MAIN */}
      <div className="relative z-10 flex flex-col h-full min-h-0">

        <Topbar />

        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Sidebar */}
          <div className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">
            <Sidebar setAiData={setAiData} />
          </div>

          {/* Editor */}
          <div className="flex-1 p-6 min-h-0 overflow-hidden">
            <CodeEditor
              setAiData={setAiData}
              setLoading={setLoading}
              aiData={aiData}
            />
          </div>

          {/* AI Panel */}
          <div className="w-96 bg-white/5 backdrop-blur-2xl border-l border-white/10 flex flex-col min-h-0 overflow-hidden">

            {/* Toggle */}
            <div className="flex border-b border-white/10 flex-shrink-0">
              <button
                onClick={() => setMode("debug")}
                className={`flex-1 p-4 ${
                  mode === "debug"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Debug Mode
              </button>

              <button
                onClick={() => setMode("chat")}
                className={`flex-1 p-4 ${
                  mode === "chat"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Chat Mode
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {mode === "debug" ? (
                  <motion.div
                    key="debug"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col min-h-0"
                  >
                    <AIPanel data={aiData} loading={loading} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col min-h-0"
                  >
                    <ChatPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}