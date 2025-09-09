
import React from 'react';
import type { View } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';
import { LinkIcon } from './icons/LinkIcon';

interface NavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-teal-500';
  const inactiveClasses = 'text-slate-500 hover:text-teal-600';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

export const Nav: React.FC<NavProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'eligibility', label: 'Check', icon: <CheckBadgeIcon /> },
    { id: 'faq', label: 'FAQ', icon: <QuestionMarkCircleIcon /> },
    { id: 'news', label: 'News', icon: <NewspaperIcon /> },
    { id: 'resources', label: 'Links', icon: <LinkIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-t-lg z-10">
      <div className="container mx-auto max-w-2xl flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id as View)}
          />
        ))}
      </div>
    </nav>
  );
};
