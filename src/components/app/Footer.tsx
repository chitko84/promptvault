'use client';

import { Download, Sparkles, Upload } from 'lucide-react';

export default function Footer({
  onFavorites,
  onExport,
  onImport,
}: {
  onFavorites: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const linkCls =
    'text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white';

  return (
    <footer className="border-t border-slate-200/70 bg-white dark:border-white/10 dark:bg-night-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
                <Sparkles size={15} />
              </span>
              <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                PromptVault
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Organize, manage and reuse your best AI prompts in one place.
            </p>
          </div>

          {/* product links */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Product
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              <li><a href="#top" className={linkCls}>Home</a></li>
              <li><a href="#library" className={linkCls}>Prompts</a></li>
              <li><a href="#categories" className={linkCls}>Categories</a></li>
              <li>
                <button type="button" onClick={onFavorites} className={linkCls}>
                  Favorites
                </button>
              </li>
            </ul>
          </nav>

          {/* data actions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Your Data
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              <li><a href="#create" className={linkCls}>Create a prompt</a></li>
              <li>
                <button type="button" onClick={onExport} className={`${linkCls} inline-flex items-center gap-1.5`}>
                  <Download size={14} /> Export backup
                </button>
              </li>
              <li>
                <label className={`${linkCls} inline-flex cursor-pointer items-center gap-1.5`}>
                  <Upload size={14} /> Import backup
                  <input hidden type="file" accept="application/json" onChange={onImport} />
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © 2026 PromptVault. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Developed by{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">Chit Ko Ko</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
