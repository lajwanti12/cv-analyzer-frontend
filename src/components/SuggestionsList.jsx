const PRIORITY_CONFIG = {
  high:   { dot: 'bg-red-500',   badge: 'bg-red-50 text-red-700 border border-red-100',   bar: 'bg-red-500' },
  medium: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border border-amber-100', bar: 'bg-amber-400' },
  low:    { dot: 'bg-slate-300', badge: 'bg-slate-50 text-slate-500 border border-slate-200', bar: 'bg-slate-300' },
}

const CATEGORY_ICON = {
  content: '✏️',
  format: '📐',
  keywords: '🔑',
  experience: '💼',
}

export default function SuggestionsList({ suggestions }) {
  return (
    <div className="space-y-3">
      {suggestions.map((s, i) => {
        const cfg = PRIORITY_CONFIG[s.priority] || PRIORITY_CONFIG.medium
        return (
          <div key={i} className="group relative bg-white rounded-xl border border-slate-100 hover:border-brand-200 hover:shadow-card-md transition-all duration-200 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar}`} />
            <div className="pl-5 pr-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {s.priority?.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">
                  {CATEGORY_ICON[s.category] || '•'} {s.category}
                </span>
                <span className="ml-auto text-xs text-slate-300 font-mono">#{i + 1}</span>
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{s.suggestion}</p>
              {s.example && (
                <div className="mt-2.5 flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-brand-400 text-xs mt-0.5 shrink-0">→</span>
                  <p className="text-xs text-slate-500 italic leading-relaxed">{s.example}</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
