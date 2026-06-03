import type { ReactNode } from 'react';

/**
 * Generic layout primitives shared across sites. Intentionally small — the
 * per-site header/footer live in each app so they can carry locale nav and
 * branding, but these handle the common shell + tool result chrome.
 */

/** Page-width shell with consistent horizontal padding. */
export function SiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** A labelled input row — keeps every tool's form fields consistent and a11y-correct. */
export function FieldRow({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
}

/**
 * The result surface of a tool. Renders one of the required UX states distinctly
 * (see CONSTITUTION.md → "UX states"): empty, error, or result.
 */
export function ResultCard({
  state,
  emptyHint,
  errorMessage,
  children,
}: {
  state: 'empty' | 'error' | 'result';
  emptyHint: string;
  errorMessage?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role={state === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50"
    >
      {state === 'empty' && <p className="text-sm text-gray-500 dark:text-gray-400">{emptyHint}</p>}
      {state === 'error' && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
      {state === 'result' && children}
    </div>
  );
}
