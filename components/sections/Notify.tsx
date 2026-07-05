import type { Content } from '@/lib/content';
import NotifyForm from '@/components/NotifyForm';
import { fontDisplay } from '@/lib/theme';

export default function Notify({ content }: { content: Content }) {
  return (
    <section id="notify" style={{ maxWidth: 1100, margin: '0 auto', padding: '84px 24px' }}>
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #FF7A1A, #FF4FA3)',
          borderRadius: 32,
          padding: '60px 40px',
          textAlign: 'center',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(255,79,163,0.28)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 40,
            width: 50,
            height: 50,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 60,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {content.notify.kicker}
          </div>
          <h2
            style={{
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: 34,
              lineHeight: 1.15,
              color: '#fff',
              margin: '12px auto 14px',
              maxWidth: 620,
            }}
          >
            {content.notify.title}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.92)', maxWidth: 540, margin: '0 auto 28px' }}>
            {content.notify.body}
          </p>
          <NotifyForm content={content.notify} />
        </div>
      </div>
    </section>
  );
}
