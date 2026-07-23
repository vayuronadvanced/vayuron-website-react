{/*DashboardQuestionsPage.jsx*/ }

import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatusBadge from '../../components/dashboard/StatusBadge'
import { useApi } from '../../hooks'
import { deleteQuestion, getAllQuestions, publishQuestion } from '../../lib/api/contacts'

export default function DashboardQuestionsPage() {
  const { data, loading, error, run: fetchQuestions } = useApi(getAllQuestions)
  const { run: publish } = useApi(publishQuestion)
  const { run: remove } = useApi(deleteQuestion)

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const questions = data?.results || data || []

  const handlePublish = async (id) => {
    await publish(id)
    fetchQuestions()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question? This cannot be undone.')) return
    await remove(id)
    fetchQuestions()
  }

  return (
    <>
      <Helmet>
        <title>Community Q&amp;A — Dashboard</title>
      </Helmet>

      <DashboardLayout title="Community Q&A">
      {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && questions.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No questions yet. Submissions from the Contact page will appear here.
        </p>
      )}

      <div className="space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-4 rounded-sm flex flex-wrap items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-white font-medium truncate max-w-lg">{q.question_text}</p>
              {(q.name || q.email) && (
                <p className="text-xs text-cyan mt-1">
                  {[q.name, q.email].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={q.status} />
              <Link
                to={`/dashboard/questions/${q.id}/edit`}
                className="border border-white/20 text-white/100 px-3 py-1.5 text-xs uppercase tracking-widest hover:border-cyan hover:text-cyan transition-all"
              >
                {q.status === 'published' ? 'Edit' : 'Answer'}
              </Link>
              {q.status !== 'published' && (
                <button
                  onClick={() => handlePublish(q.id)}
                  disabled={!q.answer_text}
                  title={!q.answer_text ? 'Add an answer before publishing' : undefined}
                  className="border border-cyan text-cyan px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-cyan hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cyan"
                >
                  Publish
                </button>
              )}
              <button
                onClick={() => handleDelete(q.id)}
                className="border border-red-400/40 text-red-300 px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-red-400/10 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </DashboardLayout>
    </>
  )
}
