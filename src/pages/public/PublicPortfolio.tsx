import React, { useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useAudioFX } from '@/hooks/useAudioFX';
import { Project } from '@/data/projects';
import { usePortfolio } from '@/context/PortfolioContext';

// Components
import { CustomCursor, CursorState } from '@/components/common/CustomCursor';
import { GrainOverlay } from '@/components/common/GrainOverlay';
import { CinemaModal } from '@/components/common/CinemaModal';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Sections
import { Preloader } from '@/components/sections/Preloader';
import { Hero } from '@/components/sections/Hero';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Tools } from '@/components/sections/Tools';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

export const PublicPortfolio: React.FC = () => {
  const lenisRef = useSmoothScroll();
  const { isMuted, toggleSound, playClick, playHover } = useAudioFX();
  const { projects } = usePortfolio();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [contactInitialService, setContactInitialService] = useState('');

  // Cursor state
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    variant: 'default',
    visible: true,
  });

  const handleMouseEnterProject = useCallback((text: string = 'VIEW CUT') => {
    setCursorState({
      text,
      variant: 'project',
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorState({
      text: '',
      variant: 'default',
      visible: true,
    });
  }, []);

  const handleOpenReel = useCallback(() => {
    playClick();
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
    setIsCinemaOpen(true);
  }, [playClick, projects]);

  const handleSelectProject = useCallback((project: Project) => {
    playClick();
    setSelectedProject(project);
    setIsCinemaOpen(true);
  }, [playClick]);

  const handleCloseCinema = useCallback(() => {
    playClick();
    setIsCinemaOpen(false);
  }, [playClick]);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      lenisRef.current?.scrollTo(el, { offset: -60, duration: 1.4 });
    }
  }, [lenisRef]);

  const handleOpenContact = useCallback((serviceTitle?: string) => {
    if (serviceTitle) {
      setContactInitialService(serviceTitle);
    }
    const el = document.getElementById('contact');
    if (el) {
      lenisRef.current?.scrollTo(el, { offset: -60, duration: 1.4 });
    }
  }, [lenisRef]);

  const handleScrollToTop = useCallback(() => {
    lenisRef.current?.scrollTo(0, { duration: 1.5 });
  }, [lenisRef]);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F2F0EC] selection:bg-[#E50914] selection:text-white">
      
      {/* Cinematic Film Grain & Scanlines */}
      <GrainOverlay />

      {/* Desktop Custom Morphing Cursor */}
      <CustomCursor cursorState={cursorState} />

      {/* Preloader Sequence */}
      {isLoading && (
        <Preloader
          onComplete={() => {
            setIsLoading(false);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 200);
          }}
        />
      )}

      {/* Main Navigation Bar */}
      <Navbar
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact()}
        playClick={playClick}
        playHover={playHover}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenReel={handleOpenReel}
          onExploreWork={() => handleNavigate('showcase')}
          onOpenContact={() => handleOpenContact()}
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* Cinematic Vertical Reels Motion Showcase */}
        <ProjectShowcase
          onSelectProject={handleSelectProject}
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* About The Editor */}
        <About
          onOpenContact={() => handleOpenContact()}
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* Services & Capabilities */}
        <Services
          onOpenContact={(service) => handleOpenContact(service)}
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* The Editing Process */}
        <Process
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* Software Stack & Tools */}
        <Tools
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* Experience & Education */}
        <Experience
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />

        {/* Contact Section */}
        <Contact
          initialService={contactInitialService}
          onMouseEnterProject={handleMouseEnterProject}
          onMouseLeave={handleMouseLeave}
          playClick={playClick}
          playHover={playHover}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onOpenContact={() => handleOpenContact()}
        playClick={playClick}
        playHover={playHover}
      />

      {/* Cinema Fullscreen Modal Player */}
      <CinemaModal
        project={selectedProject}
        isOpen={isCinemaOpen}
        onClose={handleCloseCinema}
        onOpenContact={(title) => {
          handleCloseCinema();
          handleOpenContact(title);
        }}
        playClick={playClick}
      />

    </div>
  );
};
