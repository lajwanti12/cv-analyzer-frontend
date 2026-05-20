import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'

const ACCEPTED = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
}

const FEATURES = [
  { icon: '📊', label: 'ATS Score', desc: 'See how well your resume passes automated screening' },
  { icon: '🎯', label: 'Job Fit Analysis', desc: 'Match against a job description for fit scoring' },
  { icon: '⚡', label: 'Skill Extraction', desc: 'Auto-extract technical, soft skills and certifications' },
  { icon: '💡', label: 'Suggestions', desc: 'Prioritized tips to improve your resume immediately' },
]

const LOADING_STEPS = [
  'Extracting resume content…',
  'Analyzing skills and experience…',
  'Calculating ATS compatibility…',
  'Generating improvement suggestions…',
]

export default function UploadForm({ onSubmit, loading, error }) {
  const [file, setFile] = useState(null)
  const [jd, setJd] = useState('')
  const [jdOpen, setJdOpen] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) return
    setLoadingStep(0)
    const interval = setInterval(() => {
      setLoadingStep((s) => {
        if (s >= LOADING_STEPS.length - 1) { clearInterval(interval); return s }
        return s + 1
      })
    }, 4000)
    onSubmit(file, jd)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-card-lg mb-6">
          <svg className="w-8 h-8 text-white animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Your Resume</h2>
        <p className="text-slate-500 mb-8 text-sm">{LOADING_STEPS[loadingStep]}</p>
        <div className="flex gap-2">
          {LOADING_STEPS.map((_, i) => (
            <div
              key={i}
              className={clsx(
                'h-1.5 rounded-full transition-all duration-500',
                i <= loadingStep ? 'bg-brand-500 w-8' : 'bg-slate-200 w-4'
              )}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-6">This usually takes 10–20 seconds</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200 bg-white/10 px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow"></span>
            AI-Powered · Free
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Get Your Resume<br />
            <span className="text-brand-200">Analyzed in Seconds</span>
          </h1>
          <p className="text-brand-100 text-lg leading-relaxed max-w-xl mx-auto">
            Upload your resume and get instant ATS score, skill breakdown, job fit analysis, and actionable improvement tips — all powered by Google Gemini.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-4 -mt-10 pb-16">
        <div className="card shadow-card-lg p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dropzone */}
            <div>
              <label className="section-title block">Upload Resume</label>
              <div
                {...getRootProps()}
                className={clsx(
                  'relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200',
                  isDragActive
                    ? 'border-brand-500 bg-brand-50 scale-[1.01]'
                    : file
                    ? 'border-brand-400 bg-brand-50/50'
                    : 'border-slate-200 hover:border-brand-400 hover:bg-brand-50/30 bg-slate-50/50'
                )}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-brand-700 text-sm">{file.name}</p>
                    <p className="text-xs text-slate-400">Click or drop to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">
                        {isDragActive ? 'Drop it here!' : 'Drop your resume or click to browse'}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">PDF, DOCX, or TXT · Max 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description — collapsible */}
            <div>
              <button
                type="button"
                onClick={() => setJdOpen((o) => !o)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors w-full"
              >
                <svg
                  className={clsx('w-4 h-4 transition-transform', jdOpen && 'rotate-90')}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span>Add Job Description</span>
                <span className="ml-auto text-xs text-slate-400 font-normal">optional — enables fit scoring</span>
              </button>

              {jdOpen && (
                <div className="mt-3 animate-slide-up">
                  <textarea
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    rows={5}
                    placeholder="Paste the job posting here to get a fit score and matched/missing keywords…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm
                               focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                               resize-none placeholder-slate-400 transition"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-3 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!file}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500
                         hover:from-brand-700 hover:to-brand-600 disabled:opacity-40 disabled:cursor-not-allowed
                         text-white font-semibold py-3.5 rounded-xl transition-all duration-200
                         shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              Analyze Resume
            </button>
          </form>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {FEATURES.map(({ icon, label, desc }) => (
            <div key={label} className="card p-4 text-center hover:shadow-card-md transition-shadow">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-xs font-semibold text-slate-700">{label}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed hidden sm:block">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
