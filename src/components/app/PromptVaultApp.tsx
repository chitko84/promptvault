'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Check, Download, LibraryBig, Menu, Moon, Plus, Search, Sparkles, Star, Sun, Upload, X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Dialog from '@/components/ui/Dialog';
import PromptCard from '@/components/app/PromptCard';
import PromptForm, { FormHeading, type PromptDraft } from '@/components/app/PromptForm';
import Footer from '@/components/app/Footer';
import { defaultCats, seed, type Prompt } from '@/lib/types';
import { btnGhost, btnPrimary, btnSecondary, iconBtn, inputCls } from '@/lib/styles';

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Prompts', href: '#library' },
  { label: 'Categories', href: '#categories' },
  { label: 'Favorites', href: '#library', favorites: true },
];

export default function PromptVaultApp() {
  // null = not loaded from localStorage yet (prevents saving defaults over stored data)
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [dark, setDark] = useState<boolean | null>(null);
  const [cats] = useState(defaultCats);
  const [search, setSearch] = useState('');
  const [fav, setFav] = useState(false);
  const [activeCat, setActiveCat] = useState('All');
  const [mobile, setMobile] = useState(false);
  const [editing, setEditing] = useState<Prompt | null>(null);
  const [viewing, setViewing] = useState<Prompt | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ---- load once / persist (keys unchanged) ----
  useEffect(() => {
    setPrompts(JSON.parse(localStorage.getItem('promptvault_prompts') || 'null') || seed);
    setDark(localStorage.getItem('promptvault_dark') === '1');
  }, []);
  useEffect(() => {
    if (prompts !== null) localStorage.setItem('promptvault_prompts', JSON.stringify(prompts));
  }, [prompts]);
  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('promptvault_dark', dark ? '1' : '0');
  }, [dark]);

  const items = prompts ?? [];
  const update = (fn: (p: Prompt[]) => Prompt[]) => setPrompts(prev => fn(prev ?? []));

  // ---- filtering (search + favorites + category) ----
  const list = useMemo(() => items.filter(p =>
    (!fav || p.favorite) &&
    (activeCat === 'All' || p.category === activeCat) &&
    JSON.stringify(p).toLowerCase().includes(search.toLowerCase())
  ), [items, fav, search, activeCat]);

  // ---- CRUD ----
  function savePrompt(draft: PromptDraft) {
    if (editing) {
      update(ps => ps.map(p => (p.id === editing.id ? { ...p, ...draft } : p)));
      setEditing(null);
    } else {
      update(ps => [
        { id: crypto.randomUUID(), ...draft, favorite: false, created: new Date().toISOString() },
        ...ps,
      ]);
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function remove(id: string) {
    update(ps => ps.filter(p => p.id !== id));
    setConfirmDelete(null);
    if (editing?.id === id) setEditing(null);
  }
  function toggleFav(id: string) {
    update(ps => ps.map(p => (p.id === id ? { ...p, favorite: !p.favorite } : p)));
  }
  function copyPrompt(p: Prompt) {
    navigator.clipboard?.writeText(p.content).then(() => {
      setCopiedId(p.id);
      setTimeout(() => setCopiedId(c => (c === p.id ? null : c)), 1500);
    }).catch(() => {});
  }

  // ---- import / export ----
  function exportJson() {
    const b = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = 'promptvault-backup.json'; a.click();
  }
  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const parsed = JSON.parse(String(r.result));
        if (Array.isArray(parsed)) setPrompts(parsed);
        else alert('Invalid JSON: expected an array of prompts');
      } catch { alert('Invalid JSON file'); }
    };
    r.readAsText(f);
    e.target.value = '';
  }

  // Favorites can be triggered from the nav or the footer
  function goFavorites() {
    setFav(true);
    setMobile(false);
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  }

  const favCount = items.filter(p => p.favorite).length;

  return (
    <main id="top" className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-night-950 dark:text-slate-100">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-night-950/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30">
              <Sparkles size={17} />
            </span>
            <span className="text-[17px] font-semibold tracking-tight">PromptVault</span>
          </a>

          {/* desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map(l => (
              <button
                key={l.label}
                type="button"
                onClick={() => (l.favorites ? goFavorites() : setMobile(false))}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {l.favorites ? `Favorites${favCount ? ` (${favCount})` : ''}` : l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setDark(d => !(d ?? false))}
              className={iconBtn}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={() => { setEditing(null); document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`${btnPrimary} hidden md:inline-flex`}
            >
              <Plus size={15} /> Create Prompt
            </button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobile(!mobile)}
              className={`${iconBtn} lg:hidden`}
            >
              {mobile ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* mobile dropdown */}
        {mobile && (
          <div className="border-t border-slate-200/70 bg-white/95 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-night-900/95">
            <div className="space-y-0.5 px-4 py-3">
              {navLinks.map(l => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => {
                    if (l.favorites) goFavorites();
                    else document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    setMobile(false);
                  }}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  {l.favorites ? `Favorites${favCount ? ` (${favCount})` : ''}` : l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => { setEditing(null); setMobile(false); document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`${btnPrimary} mt-2 w-full`}
              >
                <Plus size={15} /> Create Prompt
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pt-10 sm:px-6 md:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/20 via-violet-400/20 to-fuchsia-400/20 blur-3xl dark:from-indigo-500/10 dark:via-violet-500/10 dark:to-fuchsia-500/10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 py-12 text-center shadow-xs md:px-14 md:py-16 dark:border-white/10 dark:bg-night-900"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            <Sparkles size={12} className="text-indigo-500" />
            Your AI prompt arsenal, organized
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Your Personal AI Prompt Library
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg dark:text-slate-400">
            Save, organize and reuse your best AI prompts in one place.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => { setEditing(null); document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`${btnPrimary} w-full sm:w-auto`}
            >
              <Plus size={16} /> Create Prompt
            </button>
            <a href="#library" className={`${btnSecondary} w-full sm:w-auto`}>
              <LibraryBig size={16} /> Explore Library
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================= DASHBOARD ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ---- left: search, filters, cards ---- */}
          <div id="library" className="scroll-mt-24 lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search prompts…"
                  className={`${inputCls} pl-10`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFav(!fav)}
                  aria-pressed={fav}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
                    fav
                      ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                  }`}
                >
                  <Star size={15} fill={fav ? 'currentColor' : 'none'} /> Favorites{favCount ? ` (${favCount})` : ''}
                </button>
              </div>
            </div>

            {/* category chips */}
            <div id="categories" className="mt-4 flex flex-wrap gap-2 scroll-mt-24">
              {['All', ...cats].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCat(c)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    activeCat === c
                      ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* result count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {list.length} prompt{list.length === 1 ? '' : 's'}
                {(fav || activeCat !== 'All' || search) && ' matching filters'}
              </p>
              {(fav || activeCat !== 'All' || search) && (
                <button
                  type="button"
                  onClick={() => { setSearch(''); setFav(false); setActiveCat('All'); }}
                  className={btnGhost}
                >
                  <X size={13} /> Clear filters
                </button>
              )}
            </div>

            {/* prompt cards */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {list.map(p => (
                <PromptCard
                  key={p.id}
                  prompt={p}
                  copied={copiedId === p.id}
                  onToggleFavorite={toggleFav}
                  onCopy={copyPrompt}
                  onView={setViewing}
                  onEdit={p => { setEditing(p); document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' }); }}
                  onDelete={setConfirmDelete}
                />
              ))}
            </div>

            {prompts !== null && list.length === 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center dark:border-white/15 dark:bg-white/5">
                <Search size={24} className="mx-auto text-slate-400" />
                <p className="mt-3 font-semibold text-slate-900 dark:text-white">No prompts found</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Try a different search, category, or clear the favorites filter.
                </p>
              </div>
            )}
          </div>

          {/* ---- right: create / edit form ---- */}
          <aside id="create" className="scroll-mt-24">
            <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-night-900 dark:shadow-black/20">
              <FormHeading editing={!!editing} />
              <div className="mt-5">
                <PromptForm
                  key={editing?.id ?? 'new'}
                  cats={cats}
                  editing={editing}
                  onSave={savePrompt}
                  onCancel={() => setEditing(null)}
                  onExport={exportJson}
                  onImport={importJson}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer onFavorites={goFavorites} onExport={exportJson} onImport={importJson} />

      {/* ================= VIEW DIALOG ================= */}
      <Dialog open={!!viewing} onClose={() => setViewing(null)} title={viewing?.title ?? ''}>
        {viewing && (
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
                {viewing.category}
              </span>
              {viewing.tags.map(t => (
                <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-white/10 dark:text-slate-400">{t}</span>
              ))}
            </div>
            {viewing.description && (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{viewing.description}</p>
            )}
            <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-relaxed text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {viewing.content}
            </pre>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => copyPrompt(viewing)}
                className={`${btnSecondary} flex-1`}
              >
                {copiedId === viewing.id ? <Check size={15} className="text-emerald-500" /> : null}
                {copiedId === viewing.id ? 'Copied' : 'Copy Prompt'}
              </button>
              <button
                type="button"
                onClick={() => { const p = viewing; setViewing(null); setEditing(p); document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`${btnPrimary} flex-1`}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </Dialog>

      {/* ================= DELETE CONFIRM DIALOG ================= */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete prompt">
        {confirmDelete && (
          <div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Delete <span className="font-semibold text-slate-900 dark:text-white">"{confirmDelete.title}"</span>? This cannot be undone.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className={`${btnSecondary} flex-1`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => remove(confirmDelete.id)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </main>
  );
}
