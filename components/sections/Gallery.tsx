import Image from 'next/image';
import type { Content } from '@/lib/content';
import styles from './sections.module.css';
import { fontDisplay } from '@/lib/theme';

const photos = [
  { src: '/assets/gallery/gallery-01.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 905, height: 1280 },
  { src: '/assets/gallery/gallery-02.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 904, height: 1280 },
  { src: '/assets/gallery/gallery-03.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 905, height: 1280 },
  { src: '/assets/gallery/gallery-04.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 721, height: 1280 },
  { src: '/assets/gallery/gallery-05.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 720, height: 1280 },
  { src: '/assets/gallery/gallery-06.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 720, height: 1280 },
  { src: '/assets/gallery/gallery-07.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 721, height: 1280 },
  { src: '/assets/gallery/gallery-08.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 669, height: 1280 },
  { src: '/assets/gallery/gallery-09.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 1252, height: 1280 },
  { src: '/assets/gallery/gallery-10.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 705, height: 1280 },
  { src: '/assets/gallery/gallery-11.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 960, height: 1280 },
  { src: '/assets/gallery/gallery-12.jpg', alt: 'Roomies: Chaos Happens gallery photo', width: 899, height: 1280 },
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
      <div className={styles.galleryColumns}>
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
      </div>
    </section>
  );
}
