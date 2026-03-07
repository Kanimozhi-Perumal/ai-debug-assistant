export default function Topbar() {
  return (
    <div className="h-14 bg-[#0f172a]/80 backdrop-blur-xl 
                    border-b border-white/10 
                    flex items-center justify-between px-8">

      <div className="flex items-center gap-3">
        <div className="text-blue-500 text-xl">⚡</div>
        <h1 className="text-lg font-semibold tracking-wide">
          AI Code Studio
        </h1>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Gemini Connected
        </span>
        <span>Multi-File Mode</span>
      </div>
    </div>
  );
}