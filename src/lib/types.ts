export type Prompt = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  favorite: boolean;
  created: string;
};

export const defaultCats = ['Development', 'Marketing', 'Writing', 'AI', 'Design', 'Business'];

export const seed: Prompt[] = [
  {
    id: '1',
    title: 'React Expert',
    description: 'Build React apps',
    content: 'Create a modern React component',
    category: 'Development',
    tags: ['react', 'frontend'],
    favorite: true,
    created: new Date().toISOString(),
  },
];

const categoryStyles: Record<string, string> = {
  Development: 'bg-blue-50 text-blue-700 ring-blue-200/70 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20',
  Marketing: 'bg-pink-50 text-pink-700 ring-pink-200/70 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-400/20',
  Writing: 'bg-amber-50 text-amber-700 ring-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20',
  AI: 'bg-violet-50 text-violet-700 ring-violet-200/70 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20',
  Design: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  Business: 'bg-sky-50 text-sky-700 ring-sky-200/70 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20',
};

export const categoryBadge = (category: string) =>
  categoryStyles[category] ??
  'bg-slate-100 text-slate-600 ring-slate-200/70 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10';

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
