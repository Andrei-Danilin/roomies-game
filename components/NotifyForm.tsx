'use client';

import { useState } from 'react';
import type { Content } from '@/lib/content';
import styles from './sections/sections.module.css';
import { fontDisplay, fontBody } from '@/lib/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NotifyForm({ content }: { content: Content['notify'] }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError(true);
      return;
    }
    // TODO: wire to POST /api/notify (MailerLite) in a future issue.
    setError(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: '#fff',
          color: '#2A2440',
          fontFamily: fontDisplay,
          fontWeight: 600,
          fontSize: 18,
          padding: '16px 28px',
          borderRadius: 999,
        }}
      >
        {content.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 520, margin: '0 auto' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          placeholder={content.placeholder}
          style={{
            flex: 1,
            minWidth: 240,
            fontFamily: fontBody,
            fontSize: 16,
            fontWeight: 600,
            padding: '15px 20px',
            borderRadius: 999,
            border: 'none',
            outline: 'none',
            color: '#2A2440',
          }}
        />
        <button
          type="submit"
          className={styles.notifyButton}
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 17,
            color: '#FF4FA3',
            background: '#fff',
            border: 'none',
            cursor: 'pointer',
            padding: '15px 30px',
            borderRadius: 999,
            boxShadow: '0 6px 0 rgba(0,0,0,0.12)',
          }}
        >
          {content.button}
        </button>
      </div>
      {error && (
        <div
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            marginTop: 14,
            background: 'rgba(0,0,0,0.18)',
            display: 'inline-block',
            padding: '7px 16px',
            borderRadius: 999,
          }}
        >
          {content.error}
        </div>
      )}
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 16 }}>{content.privacy}</div>
    </form>
  );
}
