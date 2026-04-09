import { useLocation } from 'react-router-dom';
import { Hero } from '../Hero';
import { AboutSection } from '../UI/AboutSection';
import { AppPromo } from '../UI/AppPromo/AppPromo';
import { TeamSection } from '../UI/TeamSection/TeamSection';
import { TipsSection } from '../UI/TipsSection';
import { TrustBlock } from '../UI/TrustBlock';
import { useEffect } from 'react';

export const MainPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <section>
      <Hero />
      <div
        className="pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40"
      >
        <TrustBlock />
        <div id="about">
          <AboutSection />
        </div>

        <AppPromo />
        <TipsSection />
        <TeamSection />
      </div>
    </section>
  );
};
