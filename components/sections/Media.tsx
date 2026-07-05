import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

const TIKTOK_URL = 'https://www.tiktok.com/@roomies.show7';
const YOUTUBE_URL = 'http://www.youtube.com/@ShowRoomies';

export default function Media({ content }: { content: Content }) {
  return (
    <section id="media" style={{ background: '#fff', borderTop: '2px solid #F0E6D8', borderBottom: '2px solid #F0E6D8' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '84px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
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
            {content.media.kicker}
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
            {content.media.title}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tiktokCard}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              background: 'linear-gradient(135deg, #2A2440, #3A2F5C)',
              borderRadius: 24,
              padding: 32,
              boxShadow: '0 16px 38px rgba(42,36,64,0.16)',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              🎵
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, color: '#fff', margin: '18px 0 6px' }}>
              {content.media.tiktokTitle}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5, color: '#C9C3DB', marginBottom: 18 }}>
              {content.media.tiktokDesc}
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 15,
                color: '#2A2440',
                background: '#FFC83D',
                padding: '9px 18px',
                borderRadius: 999,
              }}
            >
              {content.media.tiktokCta} →
            </span>
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeCard}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              background: '#FFFBF5',
              border: '2px solid #F0E6D8',
              borderRadius: 24,
              padding: 32,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: '#FFE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              ▶️
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, margin: '18px 0 6px' }}>
              {content.media.ytTitle}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5, color: '#6B6480', marginBottom: 18 }}>
              {content.media.ytDesc}
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 15,
                color: '#2A2440',
                background: '#FFE2E2',
                padding: '9px 18px',
                borderRadius: 999,
              }}
            >
              {content.media.ytCta} →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
