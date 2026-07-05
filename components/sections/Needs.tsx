import type { Content } from '@/lib/content';
import { needsMeta } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

export default function Needs({ content }: { content: Content }) {
  return (
    <section style={{ background: '#fff', borderTop: '2px solid #F0E6D8', borderBottom: '2px solid #F0E6D8' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '84px 24px', textAlign: 'center' }}>
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
          {content.needs.kicker}
        </div>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 36,
            lineHeight: 1.12,
            margin: '12px 0 14px',
          }}
        >
          {content.needs.title}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5B5470', maxWidth: 560, margin: '0 auto 44px' }}>
          {content.needs.intro}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
          {needsMeta.map((meta) => {
            const item = content.needs.items[meta.key];
            return (
              <div
                key={meta.key}
                className={styles.needCard}
                style={{
                  background: '#FFFBF5',
                  border: '2px solid #F0E6D8',
                  borderRadius: 22,
                  padding: '26px 14px',
                  transition: 'transform 0.15s',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 30,
                    margin: '0 auto 14px',
                    background: meta.color,
                  }}
                >
                  {meta.icon}
                </div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 19, marginBottom: 6 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.45, color: '#6B6480' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
