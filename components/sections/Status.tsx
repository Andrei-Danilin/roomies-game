import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

export default function Status({ content }: { content: Content }) {
  return (
    <section style={{ background: '#2A2440', color: '#fff' }}>
      <div
        className={styles.statusGrid}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '46px 24px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontSize: 13,
              color: '#FFC83D',
            }}
          >
            {content.status.kicker}
          </div>
          <h2
            style={{
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: 30,
              margin: '10px 0 10px',
              lineHeight: 1.15,
            }}
          >
            {content.status.title}
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: '#C9C3DB', maxWidth: 640 }}>
            {content.status.body}
          </p>
        </div>
        <a
          href="#contact"
          className={styles.statusCta}
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            fontSize: 17,
            color: '#2A2440',
            background: '#FFC83D',
            textDecoration: 'none',
            padding: '14px 26px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 0 #C99A1C',
          }}
        >
          {content.status.cta}
        </a>
      </div>
    </section>
  );
}
