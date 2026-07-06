import Image from 'next/image';
import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

const TIKTOK_URL = 'https://www.tiktok.com/@roomies.show7';

export default function Hero({ content }: { content: Content }) {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 70px' }}>
      <div className={styles.heroGrid}>
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              border: '2px solid #FFE0BA',
              color: '#E0640A',
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: 14,
              padding: '7px 16px',
              borderRadius: 999,
              boxShadow: '0 3px 0 #F4E3CF',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: '#5BC23C',
                display: 'inline-block',
              }}
            />
            {content.hero.badge}
          </div>
          <div
            style={{
              margin: '22px 0 0',
              display: 'inline-block',
              background: '#fff',
              padding: '16px 22px',
              borderRadius: 24,
              boxShadow: '0 14px 38px rgba(42,36,64,0.12)',
            }}
          >
            <Image
              src="/assets/logo.jpg"
              alt="Roomies: Chaos Happens"
              width={420}
              height={280}
              style={{ display: 'block', width: 'min(420px, 70vw)', height: 'auto' }}
              priority
            />
          </div>
          <p
            style={{
              margin: '26px 0 0',
              fontSize: 19,
              lineHeight: 1.55,
              color: '#5B5470',
              fontWeight: 600,
              maxWidth: 520,
            }}
          >
            {content.hero.pitch}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
            <span
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 15,
                background: '#FFF1DD',
                color: '#C2560A',
                padding: '8px 16px',
                borderRadius: 999,
              }}
            >
              👥 {content.hero.players}
            </span>
            <span
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 15,
                background: '#E7F6FF',
                color: '#1E83BE',
                padding: '8px 16px',
                borderRadius: 999,
              }}
            >
              🎂 {content.hero.age}
            </span>
            <span
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 15,
                background: '#FFEAF4',
                color: '#D62E83',
                padding: '8px 16px',
                borderRadius: 999,
              }}
            >
              ✨ {content.hero.learn}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <a
              href="#notify"
              className={styles.heroPrimaryCta}
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 18,
                color: '#fff',
                background: '#FF7A1A',
                textDecoration: 'none',
                padding: '15px 30px',
                borderRadius: 999,
                boxShadow: '0 6px 0 #D9610C',
              }}
            >
              {content.hero.cta1}
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroSecondaryCta}
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 18,
                color: '#2A2440',
                background: '#fff',
                textDecoration: 'none',
                padding: '15px 30px',
                borderRadius: 999,
                border: '2px solid #ECE0CE',
                boxShadow: '0 6px 0 #ECE0CE',
              }}
            >
              ▶ {content.hero.cta2}
            </a>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: -14,
              background: '#FFE08A',
              borderRadius: 36,
              transform: 'rotate(-3deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: -14,
              background: '#B6E3F7',
              borderRadius: 36,
              transform: 'rotate(2.5deg)',
            }}
          />
          <Image
            src="/assets/family.jpg"
            alt="The Roomies"
            width={705}
            height={1280}
            priority
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              borderRadius: 28,
              display: 'block',
              boxShadow: '0 22px 50px rgba(42,36,64,0.22)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
