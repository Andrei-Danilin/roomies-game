import Image from 'next/image';
import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

const navLinkStyle: React.CSSProperties = {
  fontFamily: fontDisplay,
  fontWeight: 500,
  fontSize: 15,
  color: '#2A2440',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: 10,
};

export default function Header({
  content,
  languageSwitcher,
}: {
  content: Content;
  languageSwitcher?: React.ReactNode;
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #F0E6D8',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image src="/assets/logo.jpg" alt="Roomies" height={46} width={69} style={{ height: 46, width: 'auto', display: 'block' }} priority />
        </a>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' }}>
          <a href="#about" className={styles.navLink} style={navLinkStyle}>
            {content.nav.about}
          </a>
          <a href="#chars" className={styles.navLink} style={navLinkStyle}>
            {content.nav.chars}
          </a>
          <a href="#howto" className={styles.navLink} style={navLinkStyle}>
            {content.nav.howto}
          </a>
          <a href="#gallery" className={styles.navLink} style={navLinkStyle}>
            {content.nav.gallery}
          </a>
          <a href="#media" className={styles.navLink} style={navLinkStyle}>
            {content.nav.media}
          </a>
          <a href="#contact" className={styles.navLink} style={navLinkStyle}>
            {content.nav.contact}
          </a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          {languageSwitcher}
          <a
            href="#notify"
            className={styles.ctaPill}
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: 15,
              color: '#fff',
              background: '#FF7A1A',
              textDecoration: 'none',
              padding: '10px 18px',
              borderRadius: 999,
              boxShadow: '0 4px 0 #D9610C',
              whiteSpace: 'nowrap',
            }}
          >
            {content.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
