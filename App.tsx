
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { InfoSection } from './components/InfoSection';
import { EligibilityChecker } from './components/EligibilityChecker';
import { FAQ } from './components/FAQ';
import { NewsUpdates } from './components/NewsUpdates';
import { Resources } from './components/Resources';

export type View = 'home' | 'eligibility' | 'faq' | 'news' | 'resources';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <InfoSection />;
      case 'eligibility':
        return <EligibilityChecker />;
      case 'faq':
        return <FAQ />;
      case 'news':
        return <NewsUpdates />;
      case 'resources':
        return <Resources />;
      default:
        return <InfoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="p-4 pb-24">
        <div className="container mx-auto max-w-2xl">
          {renderContent()}
        </div>
      </main>
      <Nav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;
