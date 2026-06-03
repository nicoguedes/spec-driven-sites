import { type Locale } from '../i18n/config';
import { getDictionary } from '../i18n/dictionaries';
import { Home } from '../components/Home';

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  return <Home locale={locale} dict={dict} />;
}
