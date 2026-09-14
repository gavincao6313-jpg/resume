import { useState } from "react";
import { resumeData, type ResumeData } from "./data/resume";
import Header from "./components/Header";
import Strengths from "./components/Strengths";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import UploadResume from "./components/UploadResume";
import "./App.css";

function App() {
  const [data, setData] = useState<ResumeData>(resumeData);

  return (
    <div className="page">
      {/* 简历上传解析是本地编辑工具，依赖 vite dev 的 Anthropic 代理；
          线上公开版不渲染，避免访客看到 API Key 输入框且功能不可用 */}
      {import.meta.env.DEV && <UploadResume onUpdate={setData} />}
      <Header data={data.personal} stats={data.stats} />
      {data.strengths && data.strengths.length > 0 && <Strengths data={data.strengths} />}
      <main className="main-content">
        <aside className="sidebar">
          <Skills data={data.skills} />
          <Education data={data.education} />
          {data.certifications && data.certifications.length > 0 && (
            <Certifications data={data.certifications} />
          )}
        </aside>
        <div className="main-col">
          <Experience data={data.experience} />
          <Projects data={data.projects} />
        </div>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {data.personal.name} · 用 React 构建</p>
      </footer>
    </div>
  );
}

export default App;
