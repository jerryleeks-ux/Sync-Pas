/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SmartSchedulesView } from './components/SmartSchedulesView';
import { ConcertsView } from './components/ConcertsView';
import { ConferencesView } from './components/ConferencesView';
import { LeaveOptimizerView } from './components/LeaveOptimizerView';
import { MyTripsView } from './components/MyTripsView';
import { LockBundleModal } from './components/LockBundleModal';
import { TMSeatingModal } from './components/TMSeatingModal';
import { EventDetailModal } from './components/EventDetailModal';
import { SyncIntegrationsModal } from './components/SyncIntegrationsModal';
import { INITIAL_BOOKED_TRIPS, CURATED_MATCHES } from './data/mockData';
import { AgendaBlock, BookedTrip, ConcertItem, ConferenceItem, CuratedMatch, PublicHoliday } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('smart-schedules');
  const [leaveBalance, setLeaveBalance] = useState<number>(14);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('SIN');
  const [bookedTrips, setBookedTrips] = useState<BookedTrip[]>(INITIAL_BOOKED_TRIPS);

  // Modals state
  const [selectedBundleMatch, setSelectedBundleMatch] = useState<CuratedMatch | null>(null);
  const [tmSeatingTarget, setTmSeatingTarget] = useState<{ title: string; venue: string } | null>(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState<AgendaBlock | null>(null);
  const [showIntegrationsModal, setShowIntegrationsModal] = useState<boolean>(false);

  const handleConfirmBooking = (newTrip: BookedTrip) => {
    setBookedTrips([newTrip, ...bookedTrips]);
    setSelectedBundleMatch(null);
    setCurrentTab('my-trips');
  };

  const handleSelectUpcomingWindow = () => {
    setCurrentTab('smart-schedules');
  };

  const handleSelectForBleisureFromConcerts = (concert: ConcertItem) => {
    // Find or create matching curated trip
    const match = CURATED_MATCHES.find((m) => m.entertainmentEvent.title.toLowerCase().includes(concert.artist.toLowerCase())) || CURATED_MATCHES[0];
    setSelectedBundleMatch(match);
  };

  const handlePairFromConferences = (conf: ConferenceItem) => {
    const match = CURATED_MATCHES.find((m) => m.businessEvent.title.toLowerCase().includes(conf.name.toLowerCase())) || CURATED_MATCHES[0];
    setSelectedBundleMatch(match);
  };

  const handleSelectHolidayWindow = (_holiday: PublicHoliday) => {
    setCurrentTab('smart-schedules');
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        leaveBalance={leaveBalance}
        onLeaveBalanceChange={setLeaveBalance}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onOpenIntegrations={() => setShowIntegrationsModal(true)}
      />

      {/* Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        selectedHub={selectedHub}
        onSelectHub={setSelectedHub}
        onOpenIntegrations={() => setShowIntegrationsModal(true)}
        onSelectUpcomingWindow={handleSelectUpcomingWindow}
      />

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        <main className="relative pt-20 flex-1 w-full bg-[#0b1326]">
          {currentTab === 'smart-schedules' && (
            <SmartSchedulesView
              onSelectMatch={(m) => setSelectedBundleMatch(m)}
              onOpenTMSeating={(title, venue) => setTmSeatingTarget({ title, venue })}
              onOpenEventDetail={(ev) => setSelectedEventDetail(ev)}
              onNavigateToLeaveOptimizer={() => setCurrentTab('annual-leave-optimizer')}
              leaveBalance={leaveBalance}
            />
          )}

          {currentTab === 'concerts-and-events' && (
            <ConcertsView
              onOpenTMSeating={(title, venue) => setTmSeatingTarget({ title, venue })}
              onSelectForBleisure={handleSelectForBleisureFromConcerts}
            />
          )}

          {currentTab === 'business-conferences' && (
            <ConferencesView
              onPairWithConcert={handlePairFromConferences}
            />
          )}

          {currentTab === 'annual-leave-optimizer' && (
            <LeaveOptimizerView
              leaveBalance={leaveBalance}
              onLeaveBalanceChange={setLeaveBalance}
              onSelectHolidayWindow={handleSelectHolidayWindow}
            />
          )}

          {currentTab === 'my-trips' && (
            <MyTripsView
              bookedTrips={bookedTrips}
              onExploreNewTrip={() => setCurrentTab('smart-schedules')}
              onCancelTrip={(id) => setBookedTrips(bookedTrips.filter((t) => t.id !== id))}
            />
          )}
        </main>
      </div>

      {/* Modal: Lock Bundle (Flight + Hotel + Ticket) */}
      {selectedBundleMatch && (
        <LockBundleModal
          match={selectedBundleMatch}
          onClose={() => setSelectedBundleMatch(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Modal: Ticketmaster Seating Map */}
      {tmSeatingTarget && (
        <TMSeatingModal
          concertTitle={tmSeatingTarget.title}
          venue={tmSeatingTarget.venue}
          onClose={() => setTmSeatingTarget(null)}
        />
      )}

      {/* Modal: Agenda Event Detail */}
      {selectedEventDetail && (
        <EventDetailModal
          event={selectedEventDetail}
          onClose={() => setSelectedEventDetail(null)}
        />
      )}

      {/* Modal: Sync Integrations */}
      {showIntegrationsModal && (
        <SyncIntegrationsModal
          onClose={() => setShowIntegrationsModal(false)}
        />
      )}
    </div>
  );
}
