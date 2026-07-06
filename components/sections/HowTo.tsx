import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

export default function HowTo({ content }: { content: Content }) {
  return (
    <section id="howto" style={{ background: '#fff', borderTop: '2px solid #F0E6D8', borderBottom: '2px solid #F0E6D8' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '84px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 46 }}>
          <div
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontSize: 13,
              color: '#34B3F1',
            }}
          >
            {content.howto.kicker}
          </div>
          <h2
            style={{
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: 36,
              lineHeight: 1.12,
              margin: '12px 0 0',
            }}
          >
            {content.howto.title}
          </h2>
        </div>
        <div className={styles.howtoGrid}>
          {content.howto.steps.map((step) => (
            <div
              key={step.n}
              style={{
                position: 'relative',
                background: '#FFFBF5',
                border: '2px solid #F0E6D8',
                borderRadius: 22,
                padding: '30px 22px 26px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -18,
                  left: 22,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#FF7A1A',
                  color: '#fff',
                  fontFamily: fontDisplay,
                  fontWeight: 700,
                  fontSize: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 5px 0 #D9610C',
                }}
              >
                {step.n}
              </div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 19, margin: '10px 0 8px' }}>
                {step.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: '#6B6480' }}>{step.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          {content.howto.facts.map((fact) => (
            <span
              key={fact}
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 15,
                background: '#FFF1DD',
                color: '#C2560A',
                padding: '9px 18px',
                borderRadius: 999,
              }}
            >
              {fact}
            </span>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a
            href="/assets/rules.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: 15,
              color: '#fff',
              background: '#34B3F1',
              padding: '12px 24px',
              borderRadius: 999,
              textDecoration: 'none',
              boxShadow: '0 5px 0 #1C8FC9',
            }}
          >
            {content.howto.rulesPdf}
          </a>
        </div>
      </div>
    </section>
  );
}
