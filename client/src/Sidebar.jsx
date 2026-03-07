import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar({ setAiData }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/debug/history")
      .then((res) => setHistory(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="w-64 bg-[#0f172a]/70 
                    backdrop-blur-xl 
                    border-r border-white/10 
                    p-5 overflow-y-auto rounded-r-2xl">

      <h2 className="text-lg font-semibold text-gray-300 mb-6">
        History
      </h2>

      {history.length === 0 && (
        <div className="text-gray-500 text-sm">
          No history yet.
        </div>
      )}

      {history.map((item) => (
        <div
          key={item._id}
          onClick={() => setAiData(item)}
          className="cursor-pointer mb-3 p-3 
                     bg-gray-800/60 rounded-2xl 
                     hover:bg-blue-600/20 
                     hover:scale-[1.02]
                     transition-all duration-200"
        >
          <p className="text-xs text-gray-400 truncate">
            {item.code.substring(0, 60)}...
          </p>
        </div>
      ))}
    </div>
  );
}