import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import EditorPage from "./EditorPage";

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Debug Editor */}
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  );
}