import { assertLocale, getContent } from '@/lib/content';
import HomeView from '@/components/HomeView';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  assertLocale(locale);

  return <HomeView content={getContent(locale)} locale={locale} />;
}
