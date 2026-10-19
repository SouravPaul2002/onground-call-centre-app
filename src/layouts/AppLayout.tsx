import React, { useState } from 'react';
import type { PageId } from '../types';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { Dashboard } from '../pages/Dashboard';
import { CallsToMake } from '../pages/CallsToMake';
import { IncomingCalls } from '../pages/IncomingCalls';
import { RecentCalls } from '../pages/RecentCalls';
import { PractiseCall } from '../pages/PractiseCall';
import { Calendar } from '../pages/Calendar';
import { PulseHome } from '../pages/PulseHome';
import { PulseChannel } from '../pages/PulseChannel';
import { LeadsModal } from '../components/LeadsModal';

export const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [leadsModalOpen, setLeadsModalOpen] = useState(false);
  const [leadsModalIndex, setLeadsModalIndex] = useState(0);

  const handleOpenLeadModal = (index: number = 0) => {
    setLeadsModalIndex(index);
    setLeadsModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={setCurrentPage}
            onOpenLeadModal={() => handleOpenLeadModal(0)}
          />
        );
      case 'calls-to-make':
        return <CallsToMake />;
      case 'incoming':
        return <IncomingCalls />;
      case 'recent':
        return <RecentCalls />;
      case 'practise-call':
        return <PractiseCall onNavigate={setCurrentPage} />;
      case 'calendar':
        return <Calendar />;
      case 'pulse':
        return <PulseHome onNavigate={setCurrentPage} />;
      case 'pulse-channel':
        return <PulseChannel onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} onOpenLeadModal={() => handleOpenLeadModal(0)} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onSelectPage={setCurrentPage} />
      <div className="app-main-viewport">
        <Topbar />
        <main className="app-main">
          {renderPage()}
        </main>
      </div>

      {/* Screen 8: Leads Modal */}
      <LeadsModal
        isOpen={leadsModalOpen}
        onClose={() => setLeadsModalOpen(false)}
        initialIndex={leadsModalIndex}
        onStartCall={() => {
          setLeadsModalOpen(false);
          setCurrentPage('calls-to-make');
        }}
      />
    </div>
  );
};

