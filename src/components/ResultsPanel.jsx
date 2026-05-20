import ScoreGauge from './ScoreGauge'
import SkillsList from './SkillsList'
import SuggestionsList from './SuggestionsList'

function atsBarColor(score) {
  if (score >= 75) return { bar: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' }
  if (score >= 50) return { bar: 'bg-amber-400', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' }
  return { bar: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' }
}

function SectionCard({ title, icon, children }) {
  return (
    <div className="card p-6">
      <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-5">
        <span className="text-base">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function ResultsPanel({ result }) {
  const { ats_score, fit_score, skills, suggestions, summary, candidate_name, current_title, years_of_experience, contact_email } = result

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Profile header */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-card shrink-0">
            {candidate_name ? candidate_name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-800 truncate">
              {candidate_name || 'Candidate'}
            </h2>
            {current_title && <p className="text-slate-500 text-sm mt-0.5">{current_title}</p>}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {years_of_experience != null && (
                <span className="badge bg-slate-100 text-slate-600">
                  🗓 {years_of_experience} yrs exp
                </span>
              )}
              {contact_email && (
                <span className="badge bg-slate-100 text-slate-600 truncate max-w-[200px]">
                  ✉ {contact_email}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Score row */}
      <div className={`grid gap-5 ${fit_score ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {/* ATS Score */}
        {ats_score && (() => {
          const c = atsBarColor(ats_score.overall)
          return (
            <div className="card p-6">
              <p className="section-title">ATS Compatibility</p>
              <div className="flex items-center gap-6">
                <ScoreGauge score={ats_score.overall} label="ATS Score" />
                <div className="flex-1">
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{ats_score.rationale}</p>
                  <div className="space-y-3">
                    {ats_score.strengths.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-green-700 mb-1.5">Strengths</p>
                        <ul className="space-y-1">
                          {ats_score.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                              <span className="text-green-500 shrink-0 mt-0.5">✓</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ats_score.weaknesses.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-red-600 mb-1.5">Weaknesses</p>
                        <ul className="space-y-1">
                          {ats_score.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                              <span className="text-red-400 shrink-0 mt-0.5">✗</span>{w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Job Fit Score */}
        {fit_score && (
          <div className="card p-6">
            <p className="section-title">Job Fit Score</p>
            <div className="flex items-center gap-6">
              <ScoreGauge score={fit_score.overall} label="Fit Score" />
              <div className="flex-1">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{fit_score.rationale}</p>
                <div className="space-y-3">
                  {fit_score.matched_keywords.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1.5">Matched</p>
                      <div className="flex flex-wrap gap-1">
                        {fit_score.matched_keywords.map((k) => (
                          <span key={k} className="badge bg-green-50 text-green-700 border border-green-100">{k}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {fit_score.missing_keywords.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-red-600 mb-1.5">Missing</p>
                      <div className="flex flex-wrap gap-1">
                        {fit_score.missing_keywords.map((k) => (
                          <span key={k} className="badge bg-red-50 text-red-700 border border-red-100">{k}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <SectionCard title="Professional Summary" icon="📋">
        <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Extracted Skills" icon="⚡">
        <SkillsList skills={skills} />
      </SectionCard>

      {/* Suggestions */}
      <SectionCard title="Improvement Suggestions" icon="💡">
        <SuggestionsList suggestions={suggestions} />
      </SectionCard>
    </div>
  )
}
