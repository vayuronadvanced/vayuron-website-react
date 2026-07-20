{/*StatusBadge.jsx*/}

const COLORS = {
  new: 'border-cyan/40 text-cyan',
  submitted: 'border-cyan/40 text-cyan',
  open: 'border-cyan/40 text-cyan',
  draft: 'border-white/30 text-white/70',
  in_progress: 'border-yellow-400/40 text-yellow-300',
  under_review: 'border-yellow-400/40 text-yellow-300',
  reviewed: 'border-yellow-400/40 text-yellow-300',
  shortlisted: 'border-yellow-400/40 text-yellow-300',
  quoted: 'border-green-400/40 text-green-300',
  hired: 'border-green-400/40 text-green-300',
  published: 'border-green-400/40 text-green-300',
  closed: 'border-white/20 text-white/50',
  rejected: 'border-red-400/40 text-red-300',
}

export default function StatusBadge({ status }) {
  const classes = COLORS[status] || 'border-white/20 text-white/50'
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest border rounded-sm ${classes}`}
    >
      {status?.replace(/_/g, ' ')}
    </span>
  )
}
