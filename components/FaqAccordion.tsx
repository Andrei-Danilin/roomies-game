'use client';

import { useState } from 'react';
import type { Content } from '@/lib/content';
import { fontDisplay } from '@/lib/theme';

export default function FaqAccordion({ items }: { items: Content['faq']['items'] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} style={{ background: '#fff', border: '2px solid #F0E6D8', borderRadius: 18, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '20px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 18,
                color: '#2A2440',
              }}
            >
              <span style={{ flex: 1 }}>{item.q}</span>
              <span
                style={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#FFF1DD',
                  color: '#FF7A1A',
                  fontSize: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {open ? '–' : '+'}
              </span>
            </button>
            {open && (
              <div style={{ padding: '0 22px 22px', fontSize: 16, lineHeight: 1.6, color: '#5B5470' }}>{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
