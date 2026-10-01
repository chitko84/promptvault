// Shared Tailwind class strings — keeps every input/button visually consistent.

export const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs ' +
  'placeholder:text-slate-400 outline-none transition ' +
  'focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 ' +
  'dark:border-white/10 dark:bg-white/5 dark:text-slate-100 ' +
  'dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:ring-indigo-400/10';

export const labelCls = 'mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-400';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 ' +
  'px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ' +
  'hover:opacity-90 active:scale-[0.99]';

export const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 ' +
  'text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-300 ' +
  'dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:border-white/20';

export const btnGhost =
  'inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ' +
  'text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 ' +
  'dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100';

export const iconBtn =
  'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 ' +
  'transition hover:bg-slate-50 hover:text-slate-800 ' +
  'dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100';

export const cardCls =
  'rounded-2xl border border-slate-200/80 bg-white shadow-xs ' +
  'dark:border-white/10 dark:bg-night-900 dark:shadow-black/20';
