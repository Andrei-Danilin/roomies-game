import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

const TIKTOK_URL = 'https://www.tiktok.com/@roomies.show7';

export default function Contact({ content }: { content: Content }) {
  return (
    <section id="contact" style={{ background: '#fff', borderTop: '2px solid #F0E6D8', borderBottom: '2px solid #F0E6D8' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '84px 24px', textAlign: 'center' }}>
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
          {content.contact.kicker}
        </div>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.14,
            margin: '12px auto 14px',
            maxWidth: 560,
          }}
        >
          {content.contact.title}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5B5470', maxWidth: 520, margin: '0 auto 40px' }}>
          {content.contact.body}
        </p>
        <div className={styles.contactGrid}>
          <a
            href="mailto:info@chaoshappens.com"
            className={styles.contactEmailCard}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              background: '#FFFBF5',
              border: '2px solid #F0E6D8',
              borderRadius: 22,
              padding: 26,
            }}
          >
            <div style={{ fontSize: 28 }}>✉️</div>
            <div
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 13,
                color: '#A59CB3',
                textTransform: 'uppercase',
                letterSpacing: 1,
                margin: '14px 0 4px',
              }}
            >
              {content.contact.emailLabel}
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 17, color: '#2A2440' }}>
              info@chaoshappens.com
            </div>
          </a>
          <div
            style={{
              background: '#FFFBF5',
              border: '2px solid #F0E6D8',
              borderRadius: 22,
              padding: 26,
            }}
          >
            <div style={{ fontSize: 28 }}>📍</div>
            <div
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 13,
                color: '#A59CB3',
                textTransform: 'uppercase',
                letterSpacing: 1,
                margin: '14px 0 4px',
              }}
            >
              {content.contact.locationLabel}
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 17, color: '#2A2440' }}>
              {content.contact.location}
            </div>
          </div>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactSocialCard}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              background: '#FFFBF5',
              border: '2px solid #F0E6D8',
              borderRadius: 22,
              padding: 26,
            }}
          >
            <div style={{ fontSize: 28 }}>🎵</div>
            <div
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 13,
                color: '#A59CB3',
                textTransform: 'uppercase',
                letterSpacing: 1,
                margin: '14px 0 4px',
              }}
            >
              {content.contact.socialLabel}
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 17, color: '#2A2440' }}>
              @roomies.show7
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
