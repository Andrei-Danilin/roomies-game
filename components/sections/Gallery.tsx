import Image from 'next/image';
import type { Content } from '@/lib/content';
import { fontDisplay } from '@/lib/theme';

const photos = [
  { src: '/assets/board.jpg', alt: 'Game in progress', width: 1280, height: 960 },
  { src: '/assets/family.jpg', alt: 'The Roomies', width: 705, height: 1280 },
  { src: '/assets/characters.jpg', alt: 'The characters', width: 1280, height: 853 },
];

export default function Gallery({ content }: { content: Content }) {
  return (
    <section id="gallery" style={{ maxWidth: 1160, margin: '0 auto', padding: '84px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontSize: 13,
            color: '#8BC34A',
          }}
        >
          {content.gallery.kicker}
        </div>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 36,
            lineHeight: 1.12,
            margin: '12px 0 14px',
          }}
        >
          {content.gallery.title}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5B5470', maxWidth: 560, margin: '0 auto' }}>
          {content.gallery.intro}
        </p>
      </div>
      <div style={{ columnCount: 3, columnGap: 16 }}>
        {photos.map((photo) => (
          <div key={photo.src} style={{ breakInside: 'avoid', marginBottom: 16 }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 18,
                display: 'block',
                boxShadow: '0 10px 26px rgba(42,36,64,0.12)',
              }}
            />
          </div>
        ))}
        {[240, 300, 220].map((height, i) => (
          <div key={i} style={{ breakInside: 'avoid', marginBottom: 16 }}>
            <div
              style={{
                width: '100%',
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 16px',
                borderRadius: 18,
                background: '#FFFBF5',
                border: '2px dashed #F0E6D8',
                color: '#A59CB3',
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {content.gallery.drop}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
