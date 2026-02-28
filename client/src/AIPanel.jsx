import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AIPanel({ data, loading }) {
  if (loading) {
    return (
      <div className="w-96 bg-[#252526] p-4">
        <p className="animate-pulse">AI Thinking...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-96 bg-[#252526] p-4">
        <p>No debug results yet.</p>
      </div>
    );
  }

  const severityColor =
    data.severity === "High"
      ? "text-red-400"
      : data.severity === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  const copyCode = () => {
    navigator.clipboard.writeText(data.fixedCode);
  };

  const downloadCode = () => {
    const blob = new Blob([data.fixedCode], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fixedCode.js";
    link.click();
  };

  // ✅ PDF Download Function
  const downloadPDF = async () => {
    const input = document.getElementById("report");

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Debug_Report.pdf");
  };

  return (
    <div className="w-96 bg-[#252526] p-4 overflow-y-auto space-y-4">

      {/* 🔽 Entire AI Report Wrapped */}
      <div id="report">

        <div>
          <h3 className="font-bold">🛑 Syntax Errors</h3>
          <p>{data.syntaxErrors}</p>
        </div>

        <div>
          <h3 className="font-bold">⚠️ Logical Errors</h3>
          <p>{data.logicErrors}</p>
        </div>

        <div>
          <h3 className="font-bold">📘 Why</h3>
          <p>{data.why}</p>
        </div>

        <div>
          <h3 className="font-bold">✅ Fixed Code</h3>
          <pre className="bg-black p-2 text-sm rounded overflow-x-auto">
            {data.fixedCode}
          </pre>
        </div>

        <div>
          <h3 className="font-bold">🚀 Optimized Code</h3>
          <pre className="bg-black p-2 text-sm rounded overflow-x-auto">
            {data.optimizedCode}
          </pre>
        </div>

        {/* 💡 Improvement Suggestions */}
        <div>
          <h2 className="text-purple-400 font-semibold mt-6">
            💡 Improvement Suggestions
          </h2>

          <ul className="mt-2 space-y-2">
            {data.improvementSuggestions?.map((item, index) => (
              <li
                key={index}
                className="bg-gray-800 p-2 rounded text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 🚀 Badge Section */}
        <div className="flex gap-3 mt-6 flex-wrap">

          <span className="bg-blue-600 px-3 py-1 rounded text-sm">
            ⏱ Time: {data.timeComplexity}
          </span>

          <span className="bg-green-600 px-3 py-1 rounded text-sm">
            💾 Space: {data.spaceComplexity}
          </span>

          <span
            className={`px-3 py-1 rounded text-sm ${
              data.optimizationPossible === "Yes"
                ? "bg-yellow-600"
                : "bg-gray-600"
            }`}
          >
            🚀 Optimization: {data.optimizationPossible}
          </span>

          <span className={`${severityColor} font-semibold`}>
            🔥 Severity: {data.severity}
          </span>

          <span className="text-purple-400 font-semibold">
            🎯 Confidence: {data.confidence}
          </span>

        </div>

      </div>

      {/* ✅ Action Buttons */}
      <div className="mt-4 flex gap-3 flex-wrap">

        <button
          onClick={copyCode}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Copy Code
        </button>

        <button
          onClick={downloadCode}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Download Code
        </button>

        <button
          onClick={downloadPDF}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
        >
          Download Debug Report (PDF)
        </button>

      </div>

    </div>
  );
}