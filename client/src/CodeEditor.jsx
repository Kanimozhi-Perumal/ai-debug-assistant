import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

export default function CodeEditor({ setAiData, setLoading, aiData }) {
  const [code, setCode] = useState(
`function test() {
  console.log("Hello");
}`
  );

  const [language, setLanguage] = useState("javascript");

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Save editor & monaco reference
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  // ✅ Proper Error Highlighting
  useEffect(() => {
    if (
      aiData?.errorLine &&
      editorRef.current &&
      monacoRef.current
    ) {
      editorRef.current.deltaDecorations([], [
        {
          range: new monacoRef.current.Range(
            aiData.errorLine,
            1,
            aiData.errorLine,
            1
          ),
          options: {
            isWholeLine: true,
            className: "error-line-highlight",
          },
        },
      ]);
    }
  }, [aiData]);

  const handleDebug = async () => {
    if (!code.trim()) {
      alert("Please enter some code first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/debug", {
        code,
        language,
      });

      setAiData(res.data);
    } catch (err) {
      console.error(err);
      alert("Debugging failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 flex flex-col">

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-3 bg-gray-800 text-white p-2 rounded w-48"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="typescript">TypeScript</option>
      </select>

      <Editor
        height="70vh"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(val) => setCode(val || "")}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      <button
        onClick={handleDebug}
        className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
      >
        Debug Code
      </button>
    </div>
  );
}