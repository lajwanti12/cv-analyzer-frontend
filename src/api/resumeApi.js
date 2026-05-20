import axios from 'axios'

export async function analyzeResume(file, jobDescription) {
  const form = new FormData()
  form.append('resume', file)
  if (jobDescription?.trim()) {
    form.append('job_description', jobDescription.trim())
  }

  const { data } = await axios.post('/api/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  })
  return data
}
