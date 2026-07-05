import Image from 'next/image';
import type { Content } from '@/lib/content';
import { fontDisplay } from '@/lib/theme';

const TIKTOK_URL = 'https://www.tiktok.com/@roomies.show7';

export default function Footer({ content }: { content: Content }) {
  return (
    <footer style={{ background: '#2A2440', color: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#fff', padding: '12px 18px', borderRadius: 18 }}>
          <Image src="/assets/logo.jpg" alt="Roomies" width={75} height={50} style={{ height: 50, width: 'auto', display: 'block' }} />
        </div>
        <p
          style={{
            fontFamily: fontDisplay,
            fontWeight: 500,
            fontSize: 18,
            color: '#C9C3DB',
            margin: '22px auto 0',
            maxWidth: 440,
          }}
        >
          {content.footer.tagline}
        </p>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', margin: '26px 0 0' }}>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFC83D', textDecoration: 'none', fontFamily: fontDisplay, fontWeight: 600, fontSize: 15 }}
          >
            TikTok
          </a>
          <a
            href="mailto:info@chaoshappens.com"
            style={{ color: '#FFC83D', textDecoration: 'none', fontFamily: fontDisplay, fontWeight: 600, fontSize: 15 }}
          >
            info@chaoshappens.com
          </a>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            marginTop: 32,
            paddingTop: 22,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
            fontSize: 13,
            color: '#8A8199',
          }}
        >
          <span>© 2026 Roomies: Chaos Happens · chaoshappens.com</span>
          <span>{content.footer.made}</span>
        </div>
      </div>
    </footer>
  );
}
