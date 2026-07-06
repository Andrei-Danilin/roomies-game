import Image from 'next/image';
import type { Content } from '@/lib/content';
import { charsMeta } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

export default function Chars({ content }: { content: Content }) {
  return (
    <section id="chars" style={{ maxWidth: 1160, margin: '0 auto', padding: '84px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontSize: 13,
            color: '#FF4FA3',
          }}
        >
          {content.chars.kicker}
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
          {content.chars.title}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5B5470', maxWidth: 560, margin: '0 auto' }}>
          {content.chars.intro}
        </p>
      </div>
      <div
        style={{
          background: '#fff',
          border: '2px solid #F0E6D8',
          borderRadius: 28,
          padding: 18,
          boxShadow: '0 16px 40px rgba(42,36,64,0.08)',
          marginBottom: 30,
        }}
      >
        <Image
          src="/assets/characters.jpg"
          alt="The four Roomies"
          width={1200}
          height={799}
          style={{ width: '100%', height: 'auto', borderRadius: 18, display: 'block' }}
        />
      </div>
      <div className={styles.charsGrid}>
        {charsMeta.map((meta) => {
          const item = content.chars.items[meta.key];
          return (
            <div
              key={meta.key}
              style={{
                background: '#fff',
                border: '2px solid #F0E6D8',
                borderRadius: 22,
                padding: '22px 20px',
                borderTop: `6px solid ${meta.color}`,
              }}
            >
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22 }}>{item.name}</div>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontWeight: 600,
                  fontSize: 14,
                  color: meta.color,
                  margin: '2px 0 10px',
                }}
              >
                {item.role}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: '#6B6480' }}>{item.desc}</div>
            </div>
          );
        })}
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#A59CB3', margin: '18px 0 0' }}>{content.chars.note}</p>
    </section>
  );
}
