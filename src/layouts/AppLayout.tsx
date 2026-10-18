import React, { useState } from 'react';
import type { PageId } from '../types';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../pages/Dashboard';
import { CallsToMake } from '../pages/CallsToMake';
import { IncomingCalls } from '../pages/IncomingCalls';
import { RecentCalls } from '../pages/RecentCalls';
import { PractiseCall } from '../pages/PractiseCall';
import { Calendar } from '../pages/Calendar';
import { PulseHome } from '../pages/PulseHome';
import { PulseChannel } from '../pages/PulseChannel';

export const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calls-to-make':
        return <CallsToMake />;
      case 'incoming':
        return <IncomingCalls />;
      case 'recent':
        return <RecentCalls />;
      case 'practise-call':
        return <PractiseCall />;
      case 'calendar':
        return <Calendar />;
      case 'pulse':
        return <PulseHome />;
      case 'pulse-channel':
        return <PulseChannel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onSelectPage={setCurrentPage} />
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
};
