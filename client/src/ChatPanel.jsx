import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello 👋 I am your AI assistant." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full text-white">

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">
            AI Assistant
          </span>

          {/* Online Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>

        <span className="text-xs text-green-400">Online</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`max-w-[75%] ${
                msg.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-white/10 backdrop-blur-md border border-white/5 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/5 w-fit">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-white/10 backdrop-blur-xl">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something about your code..."
            className="flex-1 px-4 py-2 rounded-xl 
                       bg-white/10 text-white 
                       placeholder-gray-400
                       outline-none
                       focus:ring-2 focus:ring-blue-500
                       transition"
          />

          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-xl 
                       bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white 
                       hover:scale-105 
                       transition"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}