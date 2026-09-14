import { useState, useCallback, useRef } from 'react';
import mammoth from 'mammoth';
import type { ResumeData } from '../data/resume';

const PARSE_PROMPT = `Below is text extracted from a resume Word document. Extract all information and return ONLY a JSON object — no markdown, no explanation, just raw JSON.

JSON structure:
{
  "personal": {
    "name": "full name",
    "title": "job title or professional role",
    "email": "email address",
    "phone": "phone number",
    "location": "city, country",
    "github": "GitHub URL or empty string",
    "linkedin": "LinkedIn URL or empty string",
    "website": "personal website URL or empty string",
    "avatar": "",
    "titleEn": "English job title, or empty string",
    "tagline": "one-sentence positioning statement, or empty string",
    "summary": "professional summary or objective"
  },
  "stats": [
    { "value": "15+", "label": "short metric label (e.g. years of experience)" }
  ],
  "strengths": [
    { "title": "core strength name", "titleEn": "English label", "description": "one or two sentences" }
  ],
  "skills": [
    { "category": "category name (e.g. Frontend, Backend, Database, DevOps)", "items": ["skill1", "skill2"] }
  ],
  "experience": [
    {
      "company": "company name",
      "position": "job title",
      "period": "date range (e.g. 2022.03 — present)",
      "location": "city",
      "description": ["responsibility or achievement 1", "responsibility 2"]
    }
  ],
  "projects": [
    {
      "name": "project name",
      "period": "date range",
      "tech": ["technology1", "technology2"],
      "org": "role and client, or empty string",
      "description": "brief project description",
      "highlights": [{ "label": "short tag (e.g. 战略执行)", "text": "key achievement" }],
      "link": "project URL or empty string"
    }
  ],
  "education": [
    {
      "school": "school name",
      "degree": "degree · major (e.g. Bachelor · Computer Science)",
      "period": "date range",
      "gpa": "GPA or empty string",
      "honors": ["honor or award 1", "honor 2"]
    }
  ],
  "certifications": [
    { "name": "certification name", "level": "level or grade" }
  ]
}

Rules:
- Keep the original language of the resume content
- Missing fields: use "" for strings, [] for arrays
- stats: derive 3-4 headline numbers from the resume; omit the array if nothing quantifiable exists
- strengths: derive 3-4 core competency cards from the summary and experience
- highlights: each entry may be a plain string or a { "label", "text" } object; prefer labeled objects
- Sort experience and projects by date descending (most recent first)
- Group skills by category; infer appropriate categories from the content
- Return ONLY the JSON object

Resume text:
`;

async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

function extractJson(text: string): string {
  const block = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (block) return block[1].trim();
  const obj = text.match(/\{[\s\S]*\}/);
  return obj ? obj[0] : text.trim();
}

const ACCEPT = '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

type Status = 'idle' | 'dragging' | 'reading' | 'parsing' | 'success' | 'error';

export default function UploadResume({ onUpdate }: { onUpdate: (data: ResumeData) => void }) {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') ?? '');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleApiKey = (v: string) => {
    setApiKey(v);
    localStorage.setItem('anthropic_api_key', v);
  };

  const openPanel = () => { setOpen(true); setStatus('idle'); setErrorMsg(''); };
  const closePanel = () => {
    if (status === 'reading' || status === 'parsing') return;
    setOpen(false);
    setStatus('idle');
    setErrorMsg('');
  };

  const isLoading = status === 'reading' || status === 'parsing';

  const processFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.docx')) {
      setStatus('error');
      setErrorMsg('请上传 .docx 格式的 Word 文档');
      return;
    }
    if (!apiKey.trim()) {
      setStatus('error');
      setErrorMsg('请先填写 Anthropic API Key（sk-ant-api03-...）');
      return;
    }
    setErrorMsg('');

    try {
      setStatus('reading');
      const resumeText = await extractDocxText(file);
      if (!resumeText) {
        throw new Error('文档内容为空，请检查 .docx 文件是否包含文字');
      }

      setStatus('parsing');
      const res = await fetch('/api/anthropic/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-opus-5',
          max_tokens: 16000,
          output_config: { effort: 'low' },
          messages: [{ role: 'user', content: PARSE_PROMPT + resumeText }],
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: { message?: string } };
        throw new Error(body.error?.message ?? `请求失败 (HTTP ${res.status})`);
      }

      // Opus 5 默认开启 adaptive thinking，content[0] 可能是空的 thinking 块，
      // 必须按 type 取 text 块，不能直接索引 [0]
      const result = await res.json() as { content: Array<{ type: string; text?: string }> };
      const text = result.content.find(b => b.type === 'text')?.text ?? '';
      if (!text) {
        throw new Error('模型未返回文本内容，请重试');
      }
      const parsed = JSON.parse(extractJson(text)) as ResumeData;
      onUpdate(parsed);
      setStatus('success');
      setTimeout(() => { setOpen(false); setStatus('idle'); }, 1800);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : '解析失败，请重试');
    }
  }, [apiKey, onUpdate]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setStatus('idle');
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const showDropContent = status === 'idle' || status === 'dragging' || status === 'error';

  return (
    <>
      <div className="upload-bar">
        <button className="upload-trigger" onClick={openPanel}>
          <UploadIcon />
          上传简历文档
        </button>
      </div>

      {open && (
        <div className="upload-overlay" onClick={closePanel}>
          <div className="upload-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="上传简历文档">
            <div className="upload-modal-header">
              <span className="upload-modal-title">上传简历文档</span>
              <button className="upload-modal-close" onClick={closePanel} disabled={isLoading} aria-label="关闭">
                <CloseIcon />
              </button>
            </div>

            <label className="upload-field-label" htmlFor="upload-api-key">Anthropic API Key</label>
            <input
              id="upload-api-key"
              className="upload-input"
              type="password"
              value={apiKey}
              onChange={e => handleApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              autoComplete="off"
              spellCheck={false}
            />
            <p className="upload-input-hint">Key 仅保存在本地浏览器，不会传输至其他服务器</p>

            <div
              className={`upload-dropzone${status === 'dragging' ? ' is-dragging' : ''}`}
              onClick={() => !isLoading && fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setStatus('dragging'); }}
              onDragLeave={() => setStatus(s => s === 'dragging' ? 'idle' : s)}
            >
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPT}
                style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ''; }}
              />

              {isLoading && (
                <div className="upload-loading">
                  <div className="upload-spinner" />
                  <p>{status === 'reading' ? '正在读取文档内容…' : 'Claude 正在解析简历…'}</p>
                </div>
              )}

              {status === 'success' && (
                <div className="upload-success">
                  <CheckIcon />
                  <p>简历更新成功！</p>
                </div>
              )}

              {showDropContent && (
                <div className="upload-dropzone-content">
                  <DocxIcon />
                  <p className="upload-dropzone-primary">拖拽 .docx 文件到此处，或点击选择</p>
                  <p className="upload-dropzone-secondary">仅支持 Word .docx 格式</p>
                </div>
              )}
            </div>

            {status === 'error' && errorMsg && (
              <p className="upload-error-msg">{errorMsg}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function DocxIcon() {
  return (
    <svg className="upload-dropzone-icon" width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="24" height="40" rx="3" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M32 4l8 8h-8V4z" fill="var(--accent)" opacity=".6" />
      <path d="M32 4v8h8" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="14" y="20" width="16" height="1.6" rx=".8" fill="var(--accent)" opacity=".5" />
      <rect x="14" y="25" width="12" height="1.6" rx=".8" fill="var(--accent)" opacity=".5" />
      <rect x="14" y="30" width="14" height="1.6" rx=".8" fill="var(--accent)" opacity=".5" />
      <rect x="14" y="35" width="10" height="1.6" rx=".8" fill="var(--accent)" opacity=".5" />
    </svg>
  );
}
