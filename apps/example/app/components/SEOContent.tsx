import { type ToolSeo } from '../i18n/dictionaries';

/**
 * The editorial content rendered below each tool widget. Substantial, unique
 * copy is what makes a tool page eligible for AdSense (a bare widget is treated
 * as "low value content"). See CLAUDE.md → "SEO checklist".
 */
export function SEOContent({ content }: { content: ToolSeo }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16">
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{content.heading}</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-gray-600 dark:text-gray-300">
          {content.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">{content.useCasesTitle}</h3>
        <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
          {content.useCases.map((u, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
              <span>{u}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">{content.faqTitle}</h3>
        <div className="mt-3 space-y-3">
          {content.faqs.map((faq, i) => (
            <details key={i} className="group rounded-lg border border-gray-200 dark:border-gray-700">
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 font-medium text-gray-900 dark:text-white">
                <span>{faq.q}</span>
                <svg className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="border-t border-gray-200 px-4 py-3 text-gray-600 dark:border-gray-700 dark:text-gray-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
