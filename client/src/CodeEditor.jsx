import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

export default function CodeEditor({ setAiData, setLoading, aiData }) {

  const [files, setFiles] = useState([
    {
      name: "main.js",
      content: `function test() {
  console.log("Hello World");
}`
    }
  ]);

  const [activeFile, setActiveFile] = useState("main.js");
  const [language, setLanguage] = useState("javascript");

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const currentFile = files.find(file => file.name === activeFile);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleCodeChange = (value) => {
    setFiles(prev =>
      prev.map(file =>
        file.name === activeFile
          ? { ...file, content: value || "" }
          : file
      )
    );
  };

  const createFile = () => {
    const fileName = prompt("Enter file name");
    if (!fileName) return;
    if (files.some(file => file.name === fileName)) {
      alert("File already exists");
      return;
    }
    const newFile = { name: fileName, content: "" };
    setFiles([...files, newFile]);
    setActiveFile(fileName);
  };

  const deleteFile = (fileName) => {
    if (files.length === 1) return alert("Cannot delete last file");
    const updated = files.filter(f => f.name !== fileName);
    setFiles(updated);
    setActiveFile(updated[0].name);
  };

  useEffect(() => {
    if (aiData?.errorLine && editorRef.current && monacoRef.current) {
      editorRef.current.deltaDecorations([], [
        {
          range: new monacoRef.current.Range(
            aiData.errorLine, 1,
            aiData.errorLine, 1
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
    if (!currentFile.content.trim()) return alert("File is empty.");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/debug",
        { code: currentFile.content, language }
      );
      setAiData(res.data);
    } catch (err) {
      console.error(err);
      alert("Debugging failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col 
                    bg-[#111827]/80 
                    backdrop-blur-xl 
                    rounded-2xl 
                    shadow-2xl 
                    border border-white/5 p-6">

      {/* Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto">
        {files.map(file => (
          <div
            key={file.name}
            onClick={() => setActiveFile(file.name)}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300 cursor-pointer
              ${
                activeFile === file.name
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-800/60 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
          >
            {file.name}
            <span
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(file.name);
              }}
              className="ml-2 text-red-400"
            >
              ✕
            </span>
          </div>
        ))}

        <button
          onClick={createFile}
          className="bg-green-600 px-3 py-1 rounded-lg hover:scale-105 transition"
        >
          + New
        </button>
      </div>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 bg-gray-800 text-white p-2 rounded-lg w-48"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>

      {/* Monaco Editor Container (flex grows properly) */}
      <div className="flex-1 rounded-xl overflow-hidden 
                      border border-white/10 
                      shadow-lg shadow-blue-500/10">

        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          value={currentFile.content}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {/* Debug Button (Always visible now) */}
      <button
        onClick={handleDebug}
        className="mt-4 bg-gradient-to-r 
                   from-blue-600 to-indigo-600
                   py-3 rounded-2xl 
                   text-white font-semibold tracking-wide
                   shadow-lg shadow-blue-500/30
                   hover:shadow-blue-500/50
                   hover:scale-[1.02]
                   transition-all duration-300"
      >
        Debug Current File
      </button>

      <div className="text-xs text-gray-400 mt-2">
        Active File: {activeFile}
      </div>

    </div>
  );
}