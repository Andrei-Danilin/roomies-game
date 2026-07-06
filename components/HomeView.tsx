import type { Content, Locale } from '@/lib/content';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Status from '@/components/sections/Status';
import About from '@/components/sections/About';
import Needs from '@/components/sections/Needs';
import Chars from '@/components/sections/Chars';
import HowTo from '@/components/sections/HowTo';
import Gallery from '@/components/sections/Gallery';
import Media from '@/components/sections/Media';
import Notify from '@/components/sections/Notify';
import Contact from '@/components/sections/Contact';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

export default function HomeView({ content, locale }: { content: Content; locale: Locale }) {
  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', background: '#FFF8EF', color: '#2A2440', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header content={content} languageSwitcher={<LanguageSwitcher locale={locale} />} />
      <a id="top" />
      <Hero content={content} />
      <Status content={content} />
      <About content={content} />
      <Needs content={content} />
      <Chars content={content} />
      <HowTo content={content} />
      <Gallery content={content} />
      <Media content={content} />
      <Notify content={content} />
      <Contact content={content} />
      <Faq content={content} />
      <Footer content={content} />
    </div>
  );
}
