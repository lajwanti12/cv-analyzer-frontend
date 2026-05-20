import { useState, useCallback } from 'react'
import { analyzeResume } from '../api/resumeApi'

export function useAnalyze() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (file, jobDescription) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeResume(file, jobDescription)
      setResult(data)
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Unknown error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, analyze, reset }
}
