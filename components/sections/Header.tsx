'use client';

import { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const navLinks = (
    <>
      <a href="#about" className={styles.navLink} style={navLinkStyle} onClick={closeMenu}>
        {content.nav.about}
      </a>
      <a href="#chars" className={styles.navLink} style={navLinkStyle} onClick={closeMenu}>
        {content.nav.chars}
      </a>
      <a href="#howto" className={styles.navLink} style={navLinkStyle} onClick={closeMenu}>
        {content.nav.howto}
      </a>
      <a href="#gallery" className={styles.navLink} style={navLinkStyle} onClick={closeMenu}>
        {content.nav.gallery}
      </a>
      <a href="#media" className={styles.navLink} style={navLinkStyle} onClick={closeMenu}>
        {content.nav.media}
      </a>
      <a href="#contact" className={styles.navLink} style={navLinkStyle} onClick={closeMenu}>
        {content.nav.contact}
      </a>
    </>
  );

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
        <a href="#top" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }} onClick={closeMenu}>
          <Image src="/assets/logo.jpg" alt="Roomies" height={46} width={69} style={{ height: 46, width: 'auto', display: 'block' }} priority />
        </a>
        <nav className={styles.navDesktopNav} style={{ gap: 4, marginLeft: 'auto', flexWrap: 'wrap' }}>
          {navLinks}
        </nav>
        <div className={styles.navDesktopActions} style={{ alignItems: 'center', gap: 14, flexShrink: 0 }}>
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
        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            marginLeft: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 24,
            color: '#2A2440',
            flexShrink: 0,
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div
          className={styles.navMobileMenu}
          style={{
            borderTop: '2px solid #F0E6D8',
            padding: '14px 24px 20px',
            background: '#fff',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{navLinks}</nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 14 }}>
            {languageSwitcher}
            <a
              href="#notify"
              className={styles.ctaPill}
              onClick={closeMenu}
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
      )}
    </header>
  );
}
