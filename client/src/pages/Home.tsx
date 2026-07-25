import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { CV } from '../components/sections/CV';
import { Contact } from '../components/sections/Contact';
import { SEO } from '../components/common/SEO';

export const Home = () => {
  return (
    <>
      <SEO />
      <Hero />
      <StatsBar />
      <About />
      <Skills />
      <Projects />
      <CV />
      <Contact />
    </>
  );
};
