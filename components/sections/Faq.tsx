import type { Content } from '@/lib/content';
import FaqAccordion from '@/components/FaqAccordion';
import { fontDisplay } from '@/lib/theme';

function faqJsonLd(items: Content['faq']['items']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export default function Faq({ content }: { content: Content }) {
  return (
    <section style={{ maxWidth: 800, margin: '0 auto', padding: '84px 24px' }}>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd(content.faq.items))}</script>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontSize: 13,
            color: '#FF7A1A',
          }}
        >
          {content.faq.kicker}
        </div>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.14,
            margin: '12px 0 0',
          }}
        >
          {content.faq.title}
        </h2>
      </div>
      <FaqAccordion items={content.faq.items} />
    </section>
  );
}
