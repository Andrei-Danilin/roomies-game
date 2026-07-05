import Image from 'next/image';
import type { Content } from '@/lib/content';
import { fontDisplay } from '@/lib/theme';

export default function About({ content }: { content: Content }) {
  return (
    <section id="about" style={{ maxWidth: 1100, margin: '0 auto', padding: '84px 24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: -12,
              background: '#C7EBA0',
              borderRadius: 30,
              transform: 'rotate(-2.5deg)',
            }}
          />
          <Image
            src="/assets/board.jpg"
            alt="Roomies game board"
            width={800}
            height={600}
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              borderRadius: 22,
              display: 'block',
              boxShadow: '0 18px 44px rgba(42,36,64,0.2)',
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontSize: 13,
              color: '#FF7A1A',
            }}
          >
            {content.about.kicker}
          </div>
          <h2
            style={{
              fontFamily: fontDisplay,
              fontWeight: 700,
              fontSize: 36,
              lineHeight: 1.12,
              margin: '12px 0 18px',
            }}
          >
            {content.about.title}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.62, color: '#5B5470', margin: '0 0 16px' }}>
            {content.about.body1}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.62, color: '#5B5470', margin: '0 0 24px' }}>
            {content.about.body2}
          </p>
          <div
            style={{
              borderLeft: '5px solid #FF4FA3',
              padding: '6px 0 6px 18px',
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: 22,
              color: '#2A2440',
              fontStyle: 'italic',
            }}
          >
            &quot;{content.about.quote}&quot;
          </div>
        </div>
      </div>
    </section>
  );
}
