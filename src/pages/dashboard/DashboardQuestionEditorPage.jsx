{/*DashboardQuestionEditorPage.jsx*/ }

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatusBadge from '../../components/dashboard/StatusBadge'
import { useApi } from '../../hooks'
import { getAllQuestions, publishQuestion, updateQuestion } from '../../lib/api/contacts'

export default function DashboardQuestionEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [question, setQuestion] = useState(null)
  const [answerText, setAnswerText] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Reuses the list endpoint filtered client-side rather than adding a
  // separate single-question staff fetch — QuestionViewSet already supports
  // retrieve by id (`/contacts/questions/:id/`), but the admin serializer's
  // full record is also returned in the list, so this avoids a second
  // endpoint for what's a very small dataset per question.
  const { run: fetchQuestions } = useApi(getAllQuestions)
  const { run: save } = useApi(updateQuestion)
  const { run: publish } = useApi(publishQuestion)

  useEffect(() => {
    fetchQuestions().then((data) => {
      const list = data?.results || data || []
      const found = list.find((q) => String(q.id) === String(id))
      if (found) {
        setQuestion(found)
        setAnswerText(found.answer_text || '')
      }
    })
  }, [fetchQuestions, id])

  const handleSave = async () => {
    setError(null)
    setSaving(true)
    try {
      await save(id, { answer_text: answerText })
      navigate('/dashboard/questions')
    } catch (err) {
      const data = err?.response?.data
      setError(
        data && typeof data === 'object'
          ? Object.values(data).flat().join(' ')
          : 'Failed to save answer.'
      )
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setError(null)
    setSaving(true)
    try {
      // Save whatever answer text is currently in the field first, so
      // Publish always reflects the latest edit rather than whatever was
      // last saved — then flip status to published.
      await save(id, { answer_text: answerText })
      await publish(id)
      navigate('/dashboard/questions')
    } catch (err) {
      const data = err?.response?.data
      setError(
        data && typeof data === 'object'
          ? Object.values(data).flat().join(' ')
          : 'Failed to publish.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Answer Question — Dashboard</title>
      </Helmet>

      <DashboardLayout title="Answer Question">
        {!question ? (
          <p className="text-sm text-[var(--muted)]">Loading…</p>
        ) : (
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={question.status} />
              {(question.name || question.email) && (
                <p className="text-xs text-cyan">
                  {[question.name, question.email].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[var(--muted)] mb-1">
                Question (submitted by visitor — read only)
              </label>
              <div className="w-full bg-black/30 border border-white/10 px-4 py-3 text-sm text-white/90 leading-relaxed">
                {question.question_text}
              </div>
            </div>

            <div>
              <label className="block text-xs text-[var(--muted)] mb-1">
                Answer (shown publicly once published)
              </label>
              <textarea
                rows={6}
                placeholder="Write the answer that will appear on the Contact page…"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                className="w-full bg-black/60 border border-cyan/20 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-cyan resize-none"
              />
            </div>

            {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="border border-white/20 text-white/100 px-6 py-2.5 text-xs uppercase tracking-widest hover:border-cyan hover:text-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving…' : 'Save Answer'}
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={saving || !answerText.trim()}
                title={!answerText.trim() ? 'Write an answer before publishing' : undefined}
                className="border border-cyan text-cyan px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {question.status === 'published' ? 'Save & Re-publish' : 'Save & Publish'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/questions')}
                className="border border-white/20 text-white/100 px-6 py-2.5 text-xs uppercase tracking-widest hover:border-white/40 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  )
}
