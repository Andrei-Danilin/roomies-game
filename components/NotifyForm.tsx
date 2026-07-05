'use client';

import { useState } from 'react';
import type { Content } from '@/lib/content';
import { isValidEmail } from '@/lib/email';
import styles from './sections/sections.module.css';
import { fontDisplay, fontBody } from '@/lib/theme';

export default function NotifyForm({ content }: { content: Content['notify'] }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) {
      // Guards against a double submit (e.g. two rapid Enter presses) racing ahead of the
      // re-render that disables the button — the disabled attribute alone isn't enough.
      return;
    }
    const value = email.trim();
    if (!isValidEmail(value)) {
      setError(true);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      setError(false);
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
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
    <form onSubmit={handleSubmit} noValidate>
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
          disabled={submitting}
          className={styles.notifyButton}
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 17,
            color: '#FF4FA3',
            background: '#fff',
            border: 'none',
            cursor: submitting ? 'default' : 'pointer',
            opacity: submitting ? 0.7 : 1,
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
