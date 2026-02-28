import { useState } from "react";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";
import AIPanel from "./AIPanel";
import Console from "./Console";

export default function App() {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar setAiData={setAiData} />
        <CodeEditor setAiData={setAiData} setLoading={setLoading} />
        <AIPanel data={aiData} loading={loading} />
      </div>
      <Console />
    </div>
  );
}