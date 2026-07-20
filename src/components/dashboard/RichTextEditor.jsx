{/*RichTextEditor.jsx*/}

import { useEffect, useRef } from 'react'

const TOOLBAR = [
  { command: 'bold', label: 'B', className: 'font-bold' },
  { command: 'italic', label: 'I', className: 'italic' },
  { command: 'underline', label: 'U', className: 'underline' },
  { command: 'formatBlock:h2', label: 'H2' },
  { command: 'formatBlock:h3', label: 'H3' },
  { command: 'formatBlock:p', label: 'P' },
  { command: 'insertUnorderedList', label: '• List' },
  { command: 'insertOrderedList', label: '1. List' },
  { command: 'createLink', label: 'Link' },
]

/**
 * Lightweight rich text editor built on contentEditable + document.execCommand.
 * Deliberately dependency-free (no react-quill/tiptap) to keep the bundle
 * lean — sufficient for blog post bodies. Stores/emits raw HTML.
 */
export default function RichTextEditor({ value, onChange, placeholder = 'Write your post…' }) {
  const editorRef = useRef(null)
  const isInternalChange = useRef(false)

  // Sync external value changes (e.g. loading an existing post) into the DOM,
  // but skip re-syncing when the change originated from this editor itself
  // (avoids clobbering cursor position while typing).
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const handleInput = () => {
    isInternalChange.current = true
    onChange(editorRef.current.innerHTML)
  }

  const runCommand = (command) => {
    editorRef.current.focus()
    if (command.startsWith('formatBlock:')) {
      document.execCommand('formatBlock', false, command.split(':')[1])
    } else if (command === 'createLink') {
      const url = window.prompt('Link URL:')
      if (url) document.execCommand('createLink', false, url)
    } else {
      document.execCommand(command, false, null)
    }
    handleInput()
  }

  return (
    <div className="border border-cyan/20 bg-black/60">
      <div className="flex flex-wrap gap-1 border-b border-cyan/20 p-2">
        {TOOLBAR.map((btn) => (
          <button
            key={btn.command}
            type="button"
            onClick={() => runCommand(btn.command)}
            className={`px-2.5 py-1 text-xs text-white/80 border border-white/10 hover:border-cyan hover:text-cyan transition-colors ${btn.className || ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="min-h-[240px] px-4 py-3 text-sm text-white/90 leading-relaxed focus:outline-none [&_h2]:text-xl [&_h2]:font-display [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-display [&_h3]:text-white [&_h3]:mt-3 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-cyan [&_a]:underline empty:before:content-[attr(data-placeholder)] empty:before:text-white/40"
      />
    </div>
  )
}
