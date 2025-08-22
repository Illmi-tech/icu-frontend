import AboutSection from '@/components/who-we-are/AboutSection';
import MissionVision from '@/components/who-we-are/MissionVision';
import Projects from '@/components/who-we-are/Projects';

export default function WhoWeArePage() {
  return (
    <main className="pt-20 bg-white">
      <AboutSection />
      <MissionVision />
      <Projects />
    </main>
  );
}
