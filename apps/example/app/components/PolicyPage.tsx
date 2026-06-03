import { type PolicyPage as PolicyPageCopy } from '../i18n/dictionaries';

export function PolicyPage({ content }: { content: PolicyPageCopy }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{content.title}</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{content.updated}</p>
      <div className="mt-8 space-y-8">
        {content.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
