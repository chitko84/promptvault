'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Download, Pencil, Plus, Upload, X } from 'lucide-react';
import type { Prompt } from '@/lib/types';
import { btnPrimary, inputCls, labelCls } from '@/lib/styles';

export type PromptDraft = Pick<Prompt, 'title' | 'description' | 'content' | 'category' | 'tags'>;

export default function PromptForm({
  cats,
  editing,
  onSave,
  onCancel,
  onExport,
  onImport,
}: {
  cats: string[];
  editing: Prompt | null;
  onSave: (draft: PromptDraft) => void;
  onCancel: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(cats[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Sync the form with the prompt being edited (or clear it for a fresh create)
  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setContent(editing.content);
      setCategory(editing.category || cats[0]);
      setTags(editing.tags ?? []);
    } else {
      setTitle('');
      setDescription('');
      setContent('');
      setCategory(cats[0]);
      setTags([]);
    }
    setTagInput('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  function addTag(raw: string) {
    const tag = raw.trim().replace(/,+$/, '');
    if (tag && !tags.some(t => t.toLowerCase() === tag.toLowerCase())) setTags([...tags, tag]);
    setTagInput('');
  }

  function onTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      content,
      category,
      tags: tags.map(t => t.trim()).filter(Boolean),
    });
    setTitle('');
    setDescription('');
    setContent('');
    setTags([]);
    setTagInput('');
  }

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="pv-title" className={labelCls}>Title</label>
        <input id="pv-title" className={inputCls} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Blog post outline" />
      </div>

      <div>
        <label htmlFor="pv-desc" className={labelCls}>Description</label>
        <input id="pv-desc" className={inputCls} value={description} onChange={e => setDescription(e.target.value)} placeholder="What is it for?" />
      </div>

      <div>
        <label htmlFor="pv-content" className={labelCls}>Prompt Content</label>
        <textarea
          id="pv-content"
          className={`${inputCls} min-h-36 resize-y leading-relaxed`}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write the prompt…"
        />
        <p className="mt-1.5 text-right text-[11px] text-slate-400 dark:text-slate-500">{words} words</p>
      </div>

      <div>
        <label htmlFor="pv-cat" className={labelCls}>Category</label>
        <select id="pv-cat" className={inputCls} value={category} onChange={e => setCategory(e.target.value)}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="pv-tags" className={labelCls}>Tags</label>
        <div
          className={`${inputCls} flex min-h-11 flex-wrap items-center gap-1.5 py-2`}
          onClick={() => tagInputRef.current?.focus()}
        >
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove tag ${tag}`}
                onClick={() => setTags(tags.filter(t => t !== tag))}
                className="rounded-full p-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/20 dark:hover:text-white"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          <input
            ref={tagInputRef}
            id="pv-tags"
            className="min-w-24 flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
            onBlur={() => tagInput && addTag(tagInput)}
            placeholder={tags.length ? '' : 'Add tags — press Enter'}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className={`${btnPrimary} flex-1`}>
          {editing ? <Check size={16} /> : <Plus size={16} />}
          {editing ? 'Save Changes' : 'Add Prompt'}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">
            <X size={15} /> Cancel
          </button>
        )}
      </div>

      <div className="border-t border-slate-100 pt-4 dark:border-white/5">
        <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Backup</p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onExport} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
            <Download size={14} /> Export JSON
          </button>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
            <Upload size={14} /> Import JSON
            <input hidden type="file" accept="application/json" onChange={onImport} />
          </label>
        </div>
      </div>
    </form>
  );
}

// Small header used above the form so both modes read clearly
export function FormHeading({ editing }: { editing: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
        {editing ? <Pencil size={14} /> : <Plus size={14} />}
      </span>
      <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
        {editing ? 'Edit Prompt' : 'Create Prompt'}
      </h2>
    </div>
  );
}
