'use client';

import { motion } from 'framer-motion';
import { Calendar, Check, Copy, Eye, Pencil, Star, Trash2 } from 'lucide-react';
import { categoryBadge, formatDate, type Prompt } from '@/lib/types';
import { btnGhost } from '@/lib/styles';

export default function PromptCard({
  prompt,
  copied,
  onToggleFavorite,
  onCopy,
  onView,
  onEdit,
  onDelete,
}: {
  prompt: Prompt;
  copied: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (prompt: Prompt) => void;
  onView: (prompt: Prompt) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-night-900 dark:shadow-black/20 dark:hover:border-white/20"
    >
      {/* header: category + favorite */}
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${categoryBadge(prompt.category)}`}>
          {prompt.category}
        </span>
        <button
          type="button"
          aria-label={prompt.favorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => onToggleFavorite(prompt.id)}
          className={`-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-lg transition ${
            prompt.favorite
              ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10'
              : 'text-slate-300 hover:bg-slate-100 hover:text-amber-500 dark:text-slate-600 dark:hover:bg-white/10 dark:hover:text-amber-400'
          }`}
        >
          <Star size={17} fill={prompt.favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* body — clicking the preview opens the full view */}
      <button type="button" onClick={() => onView(prompt)} className="mt-3 flex-1 text-left">
        <h3 className="text-[15px] font-semibold tracking-tight text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {prompt.title}
        </h3>
        {prompt.description && (
          <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">{prompt.description}</p>
        )}
        <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
          {prompt.content || 'No content yet'}
        </p>
        {prompt.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {prompt.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-white/10 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* footer: date + actions */}
      <div className="mt-4 flex items-center gap-1 border-t border-slate-100 pt-3 dark:border-white/5">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <Calendar size={12} />
          {formatDate(prompt.created)}
        </span>
        <div className="ml-auto flex items-center gap-0.5">
          <button type="button" onClick={() => onView(prompt)} className={btnGhost} aria-label="View prompt">
            <Eye size={14} /> View
          </button>
          <button type="button" onClick={() => onCopy(prompt)} className={btnGhost} aria-label="Copy prompt">
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" onClick={() => onEdit(prompt)} className={btnGhost} aria-label="Edit prompt">
            <Pencil size={14} /> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(prompt)}
            aria-label="Delete prompt"
            className="inline-flex items-center justify-center rounded-lg px-2 py-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
