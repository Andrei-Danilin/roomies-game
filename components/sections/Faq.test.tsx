import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Content } from '@/lib/content';
import content from '@/content/en.json';
import Faq from './Faq';

function getJsonLd(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script!.textContent ?? '');
}

describe('Faq', () => {
  it('renders FAQPage JSON-LD matching the visible FAQ items', () => {
    const { container } = render(<Faq content={content as Content} />);
    const data = getJsonLd(container);

    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(content.faq.items.length);
    expect(data.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: content.faq.items[0].q,
      acceptedAnswer: { '@type': 'Answer', text: content.faq.items[0].a },
    });
  });

  it('renders FAQ copy containing "</script>" as a safe JSON text child', () => {
    const withScriptBreakout: Content = {
      ...(content as Content),
      faq: {
        ...content.faq,
        items: [{ q: 'Is this </script> safe?', a: 'Yes.' }],
      },
    };
    const { container } = render(<Faq content={withScriptBreakout} />);
    const data = getJsonLd(container);

    expect(data.mainEntity[0].name).toBe('Is this </script> safe?');
  });
});
