import { useAnalyze } from './hooks/useAnalyze'
import UploadForm from './components/UploadForm'
import ResultsPanel from './components/ResultsPanel'

export default function App() {
  const { result, loading, error, analyze, reset } = useAnalyze()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">ResumeAI</span>
          </div>

          {result && (
            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Analysis
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {!result ? (
          <UploadForm onSubmit={analyze} loading={loading} error={error} />
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-10 animate-slide-up">
            <ResultsPanel result={result} onReset={reset} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-5 mt-auto">
        <p className="text-center text-xs text-slate-400">
          Powered by Google Gemini · Built with FastAPI + React
        </p>
      </footer>
    </div>
  )
}
