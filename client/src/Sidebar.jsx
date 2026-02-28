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
    <div className="w-64 bg-[#1e1e1e] border-r border-gray-700 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">History</h2>

      {history.map((item) => (
        <div
          key={item._id}
          onClick={() => setAiData(item)}
          className="cursor-pointer mb-3 p-2 bg-[#252526] rounded hover:bg-gray-700"
        >
          <p className="text-xs truncate">
            {item.code.substring(0, 40)}...
          </p>
        </div>
      ))}
    </div>
  );
}