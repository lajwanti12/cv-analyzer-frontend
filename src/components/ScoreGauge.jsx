import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function scoreColor(score) {
  if (score >= 75) return { path: '#22c55e', text: '#16a34a' }
  if (score >= 50) return { path: '#f59e0b', text: '#d97706' }
  return { path: '#ef4444', text: '#dc2626' }
}

function scoreLabel(score) {
  if (score >= 75) return { text: 'Strong', cls: 'text-green-600 bg-green-50' }
  if (score >= 50) return { text: 'Fair', cls: 'text-amber-600 bg-amber-50' }
  return { text: 'Weak', cls: 'text-red-600 bg-red-50' }
}

export default function ScoreGauge({ score, label }) {
  const { path, text } = scoreColor(score)
  const tag = scoreLabel(score)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-28 h-28">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: path,
            textColor: text,
            trailColor: '#f1f5f9',
            textSize: '28px',
            pathTransitionDuration: 0.8,
          })}
        />
      </div>
      {label && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>}
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tag.cls}`}>{tag.text}</span>
    </div>
  )
}
