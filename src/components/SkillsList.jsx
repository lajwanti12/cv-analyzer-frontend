const SECTIONS = [
  { key: 'technical',      label: 'Technical',           cls: 'bg-blue-50 text-blue-700 border border-blue-100' },
  { key: 'tools',          label: 'Tools & Frameworks',  cls: 'bg-emerald-50 text-emerald-700 border border-emerald-100' },
  { key: 'soft',           label: 'Soft Skills',         cls: 'bg-violet-50 text-violet-700 border border-violet-100' },
  { key: 'certifications', label: 'Certifications',      cls: 'bg-amber-50 text-amber-700 border border-amber-100' },
]

export default function SkillsList({ skills }) {
  const hasAny = SECTIONS.some(({ key }) => skills[key]?.length)
  if (!hasAny) return <p className="text-sm text-slate-400">No skills extracted.</p>

  return (
    <div className="space-y-5">
      {SECTIONS.map(({ key, label, cls }) => {
        const items = skills[key] || []
        if (!items.length) return null
        return (
          <div key={key}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">{label}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span key={skill} className={`text-xs font-medium px-3 py-1 rounded-full ${cls}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
