import React from 'react';
import '../../landing.css';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { LogosBar } from './LogosBar';
import { SocraticFeatureSection } from './SocraticFeatureSection';
import { BentoGridSection } from './BentoGridSection';
import { WorkflowSection } from './WorkflowSection';
import { DownloadSection } from './DownloadSection';
import { BottomCTA } from './BottomCTA';
import { LandingFooter } from './LandingFooter';

interface LandingPageViewProps {
  onOpenDashboard: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onOpenDashboard }) => {
  const scrollToDownload = () => {
    const el = document.getElementById('download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cs-landing-wrapper">
      <LandingNavbar onOpenDashboard={onOpenDashboard} />
      
      <main>
        <HeroSection
          onOpenDashboard={onOpenDashboard}
          onDownloadClick={scrollToDownload}
        />
        <LogosBar />
        <SocraticFeatureSection />
        <BentoGridSection />
        <WorkflowSection />
        <DownloadSection />
        <BottomCTA
          onOpenDashboard={onOpenDashboard}
          onDownloadClick={scrollToDownload}
        />
      </main>

      <LandingFooter onOpenDashboard={onOpenDashboard} />
    </div>
  );
};
