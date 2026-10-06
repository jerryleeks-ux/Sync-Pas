import React, { useState } from 'react';
import { AgendaBlock, CuratedMatch } from '../types';
import { CURATED_MATCHES, TOKYO_AGENDA_BLOCKS, GLOBAL_METRO_HUBS } from '../data/mockData';
import { downloadTokyoIcsFile, exportTokyoTripToGoogleCalendar } from '../utils/calendarExport';

interface SmartSchedulesViewProps {
  onSelectMatch: (match: CuratedMatch) => void;
  onOpenTMSeating: (concertTitle: string, venue: string) => void;
  onOpenEventDetail: (event: AgendaBlock) => void;
  onNavigateToLeaveOptimizer: () => void;
  leaveBalance: number;
}

export const SmartSchedulesView: React.FC<SmartSchedulesViewProps> = ({
  onSelectMatch,
  onOpenTMSeating,
  onOpenEventDetail,
  onNavigateToLeaveOptimizer,
  leaveBalance
}) => {
  const [leaveSlider, setLeaveSlider] = useState<number>(1);
  const [selectedMetro, setSelectedMetro] = useState<string>('all');
  const [holidayAnchorActive, setHolidayAnchorActive] = useState<boolean>(true);
  const [timelineTrackFilter, setTimelineTrackFilter] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Slider ratio descriptions
  const leaveRatioDescriptions = [
    'Take 0 Days → Get 2 Days (Domestic Staycation)',
    'Take 1 Day → Get 4 Days in Tokyo (Aug 8-11)',
    'Take 2 Days → Get 6 Days in London (Sep 18-22)',
    'Take 3 Days → Get 8 Days in Sydney / Melbourne',
    'Take 4 Days → Get 10 Days Super-Bleisure Circuit'
  ];

  const selectedHubObj = GLOBAL_METRO_HUBS.find((h) => h.id === selectedMetro);

  // Filter curated matches based on comprehensive global metro hub
  const displayedMatches = CURATED_MATCHES.filter((m) => {
    if (selectedMetro === 'all') return true;
    if (!selectedHubObj) return true;
    return (
      m.destination.toLowerCase().includes(selectedHubObj.city.toLowerCase()) ||
      m.id.toLowerCase().includes(selectedHubObj.id.toLowerCase()) ||
      m.metroHubCode.toLowerCase() === selectedHubObj.airportCode.toLowerCase() ||
      m.airportCode.toLowerCase().includes(selectedHubObj.airportCode.toLowerCase())
    );
  });

  const handleSyncItinerary = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast('Algorithmic engine synchronized: 3 live Ticketmaster VIP tiers and Singapore National Day flight bridges verified.');
      setTimeout(() => setSyncToast(null), 4500);
    }, 600);
  };

  const handlePushToGCal = (matchId: string) => {
    const url = exportTokyoTripToGoogleCalendar();
    window.open(url, '_blank');
    setSyncToast('Opening Google Calendar event creator with full dual-track agenda...');
    setTimeout(() => setSyncToast(null), 4000);
  };

  const handleDownloadIcs = () => {
    downloadTokyoIcsFile(TOKYO_AGENDA_BLOCKS);
    setSyncToast('Downloaded SyncPass_Tokyo_Master_Agenda.ics! Import directly into Apple Calendar, Google Calendar, or Outlook.');
    setTimeout(() => setSyncToast(null), 4500);
  };

  // Filter timeline agenda blocks based on chip selection
  const filterAgenda = (category: string) => {
    if (category === 'all') return true;
    if (category === 'business') return timelineTrackFilter === 'all' || timelineTrackFilter === 'business' || timelineTrackFilter === 'fintech';
    if (category === 'entertainment') return timelineTrackFilter === 'all' || timelineTrackFilter === 'entertainment';
    if (category === 'logistics') return true;
    return true;
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171f33] border border-[#8083ff]/40 text-[#dae2fd] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in max-w-md">
          <span className="material-symbols-outlined text-[#8083ff] text-[22px]">check_circle</span>
          <p className="text-[13px]">{syncToast}</p>
        </div>
      )}

      {/* Interactive State / Filter Control Bar */}
      <section className="px-margin py-space-lg flex flex-col gap-space-lg bg-[#131b2e] border-b border-white/[0.04] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div>
            <h1 className="font-display-lg text-[42px] lg:text-[48px] text-[#dae2fd] tracking-tight font-extrabold leading-tight">
              Smart Trip &amp; Event Schedules
            </h1>
            <p className="text-[15px] lg:text-[16px] text-[#c7c4d7] max-w-3xl mt-2 leading-relaxed">
              Synchronize high-impact business conferences with worldwide live concerts and maximize your Singapore annual leave with algorithmic precision.
            </p>
          </div>

          {/* Quick Status Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 bg-[#222a3d] border border-white/[0.06] px-4 py-2 rounded-xl shadow-inner">
              <span className="material-symbols-outlined text-[20px] text-[#ffb2b7]">celebration</span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider">Active Holiday Window</span>
                <span className="font-mono text-[13px] text-[#ffb2b7] font-semibold">SG National Day (Aug 9)</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-[#222a3d] border border-white/[0.06] px-4 py-2 rounded-xl shadow-inner">
              <span className="material-symbols-outlined text-[20px] text-[#ddb7ff]">graphic_eq</span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider">Entertainment Link</span>
                <span className="font-mono text-[13px] text-[#dae2fd] font-semibold flex items-center gap-1.5">
                  Spotify + TM Synced
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8083ff]"></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Parameter Filter Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 p-4 bg-[#171f33] border border-white/[0.06] rounded-xl shadow-md">
          {/* Leave Budget Slider */}
          <div className="xl:col-span-4 flex flex-col justify-center bg-[#222a3d] p-3 rounded-lg border border-white/[0.04]">
            <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
              <span className="text-[#c7c4d7] uppercase font-semibold">PTO Budget Allocation</span>
              <span className="text-[#ffb2b7] font-bold text-[12px]">{leaveRatioDescriptions[leaveSlider]}</span>
            </div>
            <input
              className="w-full accent-[#8083ff] h-1.5 bg-[#060e20] rounded-lg cursor-pointer"
              max="4"
              min="0"
              step="1"
              type="range"
              value={leaveSlider}
              onChange={(e) => setLeaveSlider(Number(e.target.value))}
            />
            <div className="flex justify-between font-mono text-[10px] text-[#908fa0] mt-1.5 px-0.5">
              <span className={leaveSlider === 0 ? 'text-[#c0c1ff] font-bold' : ''}>0d (Weekend)</span>
              <span className={leaveSlider === 1 ? 'text-[#c0c1ff] font-bold' : 'text-[#c0c1ff]'}>1d (Aug 8)</span>
              <span className={leaveSlider === 2 ? 'text-[#c0c1ff] font-bold' : ''}>2d (+100%)</span>
              <span className={leaveSlider === 3 ? 'text-[#c0c1ff] font-bold' : ''}>3d (+200%)</span>
              <span className={leaveSlider === 4 ? 'text-[#c0c1ff] font-bold' : ''}>4d (+350%)</span>
            </div>
          </div>

          {/* Comprehensive Global Target Metro Hub Selector */}
          <div className="xl:col-span-3 flex flex-col justify-center bg-[#222a3d] p-3 rounded-lg border border-white/[0.04]">
            <label className="font-mono text-[11px] text-[#c7c4d7] uppercase mb-1.5 flex items-center justify-between font-semibold" htmlFor="destination-select">
              <span>Target Metro Hub</span>
              <span className="text-[#c0c1ff] text-[10px] font-mono">
                {selectedHubObj ? selectedHubObj.flightFromSin : '20+ Global Gateways'}
              </span>
            </label>
            <div className="relative">
              <select
                id="destination-select"
                aria-label="Target Metro Hub"
                value={selectedMetro}
                onChange={(e) => setSelectedMetro(e.target.value)}
                className="w-full bg-[#060e20] text-[#dae2fd] text-[13px] font-semibold py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8083ff] cursor-pointer appearance-none border border-white/[0.04]"
              >
                <option value="all">All Global Metropolitan Hubs ({GLOBAL_METRO_HUBS.length} Gateways)</option>
                <optgroup label="Asia-Pacific (APAC)">
                  {GLOBAL_METRO_HUBS.filter(h => h.region === 'Asia-Pacific').map(hub => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} ({hub.airportCode})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Europe (EMEA)">
                  {GLOBAL_METRO_HUBS.filter(h => h.region === 'Europe').map(hub => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} ({hub.airportCode})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Americas (AMER)">
                  {GLOBAL_METRO_HUBS.filter(h => h.region === 'Americas').map(hub => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} ({hub.airportCode})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Middle East">
                  {GLOBAL_METRO_HUBS.filter(h => h.region === 'Middle East').map(hub => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} ({hub.airportCode})
                    </option>
                  ))}
                </optgroup>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#908fa0] pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
            {selectedHubObj && selectedHubObj.id !== 'singapore' && (
              <span className="text-[10px] text-[#908fa0] font-mono mt-1 truncate">
                Direct: {selectedHubObj.directCarrier}
              </span>
            )}
          </div>

          {/* SG Public Holiday Pairing Toggle */}
          <div className="xl:col-span-3 flex items-center justify-between bg-[#222a3d] p-3 rounded-lg border border-white/[0.04]">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] text-[#c7c4d7] uppercase font-semibold">SG Holiday Anchor</span>
              <span className="text-[14px] text-[#dae2fd] font-semibold">National Day Block</span>
              <span className="text-[12px] text-[#ddb7ff]">Aug 8 – Aug 12 (5-Day Max)</span>
            </div>
            <button
              onClick={() => setHolidayAnchorActive(!holidayAnchorActive)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                holidayAnchorActive ? 'bg-[#8083ff]' : 'bg-[#2d3449]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#060e20] shadow-md transform transition-transform ${
                  holidayAnchorActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Live Sync Refresher Action */}
          <div className="xl:col-span-2 flex items-center">
            <button
              onClick={handleSyncItinerary}
              disabled={isSyncing}
              className="w-full h-full min-h-[52px] bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] text-[15px] font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer disabled:opacity-75"
            >
              <span className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin' : ''}`}>
                {isSyncing ? 'sync' : 'hub'}
              </span>
              <span>{isSyncing ? 'Optimizing...' : 'Sync Itinerary'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Curated Hybrid Bleisure Itineraries (Grid) */}
      <section className="px-margin py-space-xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="font-mono text-[11px] text-[#c0c1ff] uppercase tracking-wider font-semibold">
              Algorithmic Recommendations
            </p>
            <h2 className="text-[28px] lg:text-[32px] text-[#dae2fd] font-bold tracking-tight">
              Curated Dual-Purpose Matches
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-[#171f33] border border-white/[0.06] px-3 py-1.5 rounded-lg">
            <span className="font-mono text-[11px] text-[#908fa0] uppercase">Match Precision:</span>
            <span className="font-mono text-[13px] text-[#dae2fd] font-semibold">
              Sorted by Leave ROI &amp; Ticket Tier
            </span>
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {displayedMatches.map((match) => (
            <div
              key={match.id}
              className="flex flex-col bg-[#171f33] border border-white/[0.06] rounded-xl shadow-xl overflow-hidden group hover:border-[#8083ff]/40 transition-all duration-300"
            >
              {/* Destination Visual Header (Clean, Top Ribbon Removed) */}
              <div className="relative h-48 w-full overflow-hidden bg-[#2d3449]">
                <img
                  alt={match.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={match.heroImage}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-[#171f33]/40 to-transparent"></div>
                {/* Clean Floating Badge Overlays */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="font-mono text-[10px] bg-[#060e20]/85 backdrop-blur-md text-[#c0c1ff] px-2.5 py-1 rounded font-semibold border border-white/[0.08] flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8083ff]"></span>
                    <span>{match.matchLabel}</span>
                  </span>
                  <span className="font-mono text-[10px] bg-[#060e20]/85 backdrop-blur-md text-[#ffb2b7] px-2 py-1 rounded font-semibold border border-white/[0.08] shadow-sm">
                    {match.yieldLabel}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-[#f0dbff] uppercase tracking-wider font-semibold">
                      {match.destination} • {match.airportCode}
                    </span>
                    <h3 className="text-[20px] lg:text-[22px] text-[#dae2fd] font-bold tracking-tight">
                      {match.title}
                    </h3>
                  </div>
                  <div className="bg-[#060e20]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-right border border-white/[0.06]">
                    <div className="font-mono text-[10px] text-[#908fa0] uppercase">Leave Yield</div>
                    <div className="font-mono text-[13px] text-[#ffb2b7] font-bold">
                      {match.leaveYieldText}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex flex-col gap-4">
                {/* Sync Components Split */}
                <div className="flex flex-col gap-2.5">
                  {/* Business Component */}
                  <div className="bg-[#222a3d] p-3 rounded-lg flex items-start gap-3 border border-white/[0.04]">
                    <div className="w-10 h-10 rounded-lg bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#c0c1ff] uppercase font-semibold">
                          {match.businessEvent.type}
                        </span>
                        <span className="font-mono text-[11px] text-[#908fa0]">
                          {match.businessEvent.dates}
                        </span>
                      </div>
                      <h4 className="text-[15px] text-[#dae2fd] font-semibold truncate">
                        {match.businessEvent.title}
                      </h4>
                      <p className="text-[12px] text-[#c7c4d7] line-clamp-1">
                        {match.businessEvent.location} • {match.businessEvent.highlights}
                      </p>
                    </div>
                  </div>

                  {/* Entertainment Component */}
                  <div className="bg-[#222a3d] p-3 rounded-lg flex items-start gap-3 border border-white/[0.04]">
                    <div className="w-10 h-10 rounded-lg bg-[#6f00be]/30 text-[#ddb7ff] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#ddb7ff] uppercase flex items-center gap-1 font-semibold">
                          <span>{match.entertainmentEvent.partner}</span>
                          <span className="material-symbols-outlined text-[12px] text-[#ddb7ff]">verified</span>
                        </span>
                        <span className="font-mono text-[11px] text-[#908fa0]">
                          {match.entertainmentEvent.date}
                        </span>
                      </div>
                      <h4 className="text-[15px] text-[#dae2fd] font-semibold truncate">
                        {match.entertainmentEvent.title}
                      </h4>
                      <p className="text-[12px] text-[#c7c4d7] line-clamp-1">
                        {match.entertainmentEvent.venue} • {match.entertainmentEvent.tier}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Micro Schedule Stepper (Interactive Tab) */}
                <div className="bg-[#060e20] p-3 rounded-lg flex flex-col gap-1 border border-white/[0.04]">
                  <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider font-semibold">
                    Optimized Sequence
                  </span>
                  <div className="grid grid-cols-4 gap-1 text-center font-mono text-[11px] pt-1">
                    {match.scheduleSequence.map((seq, idx) => (
                      <div key={idx} className="bg-[#222a3d] py-1.5 px-1 rounded flex flex-col items-center">
                        <span className="text-[#908fa0] text-[10px]">{seq.code}</span>
                        <span className="text-[#c0c1ff] font-bold truncate max-w-full">{seq.dayName}</span>
                        <span className={`text-[9px] ${seq.statusColor} font-semibold`}>{seq.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monetization / Booking Actions */}
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    onClick={() => onSelectMatch(match)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-[#8083ff] to-[#6f00be] hover:opacity-95 text-white text-[14px] font-bold rounded-lg flex items-center justify-between transition-opacity shadow-md cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">travel</span>
                      <span>Lock Bundle (Flight + Hotel)</span>
                    </span>
                    <span className="font-mono text-[11px] bg-[#060e20]/80 text-[#e1e0ff] px-2 py-0.5 rounded">
                      Save S${match.bundlePrice.affiliateSaving} Affil.
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenTMSeating(match.entertainmentEvent.title, match.entertainmentEvent.venue)}
                      className="py-2 px-3 bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[12px] font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#ddb7ff]">local_activity</span>
                      <span>TM Seating</span>
                    </button>
                    <button
                      onClick={() => handlePushToGCal(match.id)}
                      className="py-2 px-3 bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[12px] font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">calendar_add_on</span>
                      <span>Push to GCal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {displayedMatches.length === 0 && (
            <div className="col-span-3 p-12 bg-[#171f33] border border-dashed border-white/10 rounded-xl text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-[40px] text-[#908fa0]">flight_takeoff</span>
              <h3 className="text-[18px] font-bold text-[#dae2fd] mt-2">
                Curating Live Matches for {selectedHubObj?.name || 'this Gateway'}
              </h3>
              <p className="text-[13px] text-[#c7c4d7] mt-1 max-w-md">
                Direct flights from Singapore: {selectedHubObj?.flightFromSin} ({selectedHubObj?.directCarrier}). Switch to "All Global Metropolitan Hubs" or use our Leave Optimizer.
              </p>
              <button
                onClick={() => setSelectedMetro('all')}
                className="mt-4 px-4 py-2 bg-[#8083ff] text-[#0d0096] text-[13px] font-bold rounded-lg cursor-pointer"
              >
                View All Global Hubs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Dual-Track Timeline & Calendar Matrix */}
      <section className="px-margin py-space-lg flex flex-col gap-6 bg-[#060e20] border-y border-white/[0.04]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ddb7ff] uppercase tracking-wider mb-1 font-semibold">
              <span className="material-symbols-outlined text-[16px]">view_timeline</span>
              <span>Synchronized Multi-Track Engine</span>
            </div>
            <h2 className="text-[28px] lg:text-[32px] text-[#dae2fd] font-bold">
              {selectedHubObj && selectedHubObj.id !== 'all' && selectedHubObj.id !== 'singapore'
                ? `${selectedHubObj.city} Dual-Track Master Agenda`
                : 'Tokyo Dual-Track Master Agenda'}
            </h2>
            <p className="text-[14px] text-[#c7c4d7]">
              Aug 8 – Aug 12, 2025 • Real-time conflict resolution between professional obligations and live sets.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Tracks' },
              { id: 'business', label: 'Business Only' },
              { id: 'entertainment', label: 'Concerts Only' },
              { id: 'fintech', label: 'FinTech & AI' }
            ].map((chip) => {
              const isActive = timelineTrackFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setTimelineTrackFilter(chip.id)}
                  className={`px-3 py-1 rounded-full font-mono text-[12px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
                      : 'bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd]'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
            <button
              onClick={handleDownloadIcs}
              className="px-3 py-1 rounded-full bg-[#171f33] hover:bg-[#222a3d] text-[#ffb2b7] font-mono text-[12px] flex items-center gap-1 transition-colors cursor-pointer border border-[#ff516a]/30"
              title="Download RFC 5545 .ics calendar file"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              <span>Export .iCal</span>
            </button>
          </div>
        </div>

        {/* Timeline Grid System */}
        <div className="flex flex-col bg-[#171f33] border border-white/[0.06] rounded-xl shadow-lg p-4 gap-4 overflow-x-auto">
          {/* Timeline Header: Days Bar */}
          <div className="grid grid-cols-12 gap-3 min-w-[800px] border-b border-[#222a3d] pb-3">
            <div className="col-span-2 font-mono text-[11px] text-[#908fa0] uppercase font-semibold">
              Stream / Track
            </div>
            <div className="col-span-2 flex flex-col">
              <span className="font-mono text-[13px] text-[#dae2fd] font-bold">THU • AUG 08</span>
              <span className="font-mono text-[10px] text-[#ffb2b7]">Take PTO (1d)</span>
            </div>
            <div className="col-span-3 flex flex-col">
              <span className="font-mono text-[13px] text-[#dae2fd] font-bold">FRI • AUG 09</span>
              <span className="font-mono text-[10px] text-[#ffb2b7] bg-[#ff516a]/20 px-1 py-0.5 rounded w-max">
                SG National Day
              </span>
            </div>
            <div className="col-span-3 flex flex-col">
              <span className="font-mono text-[13px] text-[#dae2fd] font-bold">SAT • AUG 10</span>
              <span className="font-mono text-[10px] text-[#ddb7ff]">Weekend Leisure</span>
            </div>
            <div className="col-span-2 flex flex-col">
              <span className="font-mono text-[13px] text-[#dae2fd] font-bold">SUN • AUG 11</span>
              <span className="font-mono text-[10px] text-[#908fa0]">Weekend Return</span>
            </div>
          </div>

          {/* TRACK A: Business Track */}
          {filterAgenda('business') && (
            <div className="grid grid-cols-12 gap-3 min-w-[800px] items-center py-1">
              <div className="col-span-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8083ff] shrink-0"></span>
                <div>
                  <div className="text-[14px] text-[#dae2fd] font-semibold">Track A: Business</div>
                  <div className="font-mono text-[10px] text-[#908fa0] uppercase">Summits &amp; Mixers</div>
                </div>
              </div>

              {/* Thu Aug 08: Pre-Summit Check-in */}
              <div className="col-span-2">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[0])}
                  className="w-full text-left p-2.5 bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-[#c0c1ff] font-semibold">18:00 - 20:30</span>
                  <div className="text-[12px] text-[#dae2fd] font-semibold truncate group-hover:text-white">
                    VIP Speaker Mixer
                  </div>
                  <span className="font-mono text-[9px] text-[#908fa0] truncate">Grand Hyatt Roppongi</span>
                </button>
              </div>

              {/* Fri Aug 09: Full Summit Day */}
              <div className="col-span-3">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[1])}
                  className="w-full text-left p-2.5 bg-[#8083ff]/20 hover:bg-[#8083ff]/30 border border-[#8083ff]/40 rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#e1e0ff] font-bold">09:00 - 17:00</span>
                    <span className="font-mono text-[9px] bg-[#c0c1ff] text-[#1000a9] px-1.5 py-0.2 rounded font-bold uppercase">
                      Keynote
                    </span>
                  </div>
                  <div className="text-[12px] text-[#dae2fd] font-bold group-hover:text-white">
                    Asia FinTech &amp; AI Plenary
                  </div>
                  <span className="font-mono text-[10px] text-[#c7c4d7] truncate">Tokyo Big Sight Hall A</span>
                </button>
              </div>

              {/* Sat Aug 10: Closed Breakouts */}
              <div className="col-span-3">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[2])}
                  className="w-full text-left p-2.5 bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-[#c0c1ff] font-semibold">10:00 - 12:30</span>
                  <div className="text-[12px] text-[#dae2fd] font-semibold truncate group-hover:text-white">
                    Private LP Roundtables
                  </div>
                  <span className="font-mono text-[10px] text-[#908fa0] truncate">FinTech Founders Lounge</span>
                </button>
              </div>

              {/* Sun Aug 11: Free */}
              <div className="col-span-2">
                <div className="p-2.5 bg-[#222a3d]/40 border border-dashed border-white/[0.08] rounded-lg text-center font-mono text-[#908fa0] text-[11px] py-3.5">
                  Off-Duty
                </div>
              </div>
            </div>
          )}

          {/* TRACK B: Entertainment Track */}
          {filterAgenda('entertainment') && (
            <div className="grid grid-cols-12 gap-3 min-w-[800px] items-center py-1">
              <div className="col-span-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6f00be] shrink-0"></span>
                <div>
                  <div className="text-[14px] text-[#dae2fd] font-semibold">Track B: Entertainment</div>
                  <div className="font-mono text-[10px] text-[#908fa0] uppercase">Concerts &amp; Curated Night</div>
                </div>
              </div>

              {/* Thu Aug 08: Roppongi Night */}
              <div className="col-span-2">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[4])}
                  className="w-full text-left p-2.5 bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-[#ddb7ff] font-semibold">21:30 - LATE</span>
                  <div className="text-[12px] text-[#dae2fd] truncate group-hover:text-white font-medium">
                    Vinyl Bar Oiran Night
                  </div>
                  <span className="font-mono text-[9px] text-[#908fa0]">Shibuya Micro-lounge</span>
                </button>
              </div>

              {/* Fri Aug 09: Post-Keynote Dinner */}
              <div className="col-span-3">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[5])}
                  className="w-full text-left p-2.5 bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-[#ddb7ff] font-semibold">19:30 - 22:00</span>
                  <div className="text-[12px] text-[#dae2fd] font-semibold truncate group-hover:text-white">
                    Omakase Ginza Session
                  </div>
                  <span className="font-mono text-[10px] text-[#908fa0]">Reserved Bleisure Concierge</span>
                </button>
              </div>

              {/* Sat Aug 10: COLDPLAY HIGHLIGHT */}
              <div className="col-span-3">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[6])}
                  className="w-full text-left p-2.5 bg-[#6f00be]/30 hover:bg-[#6f00be]/40 border border-[#ddb7ff]/40 rounded-lg flex flex-col gap-1 shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#ddb7ff] font-bold">17:00 Gates • 19:30 Show</span>
                    <span className="font-mono text-[9px] bg-[#6f00be] text-white px-1.5 py-0.2 rounded uppercase font-bold">
                      Ticketmaster VIP
                    </span>
                  </div>
                  <div className="text-[12px] text-[#dae2fd] font-bold group-hover:text-white">
                    Coldplay Live at Tokyo Dome
                  </div>
                  <span className="font-mono text-[10px] text-[#ddb7ff] truncate">Gate 22 Arena Stand A3</span>
                </button>
              </div>

              {/* Sun Aug 11: Shibuya exploration */}
              <div className="col-span-2">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[7])}
                  className="w-full text-left p-2.5 bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-[#ddb7ff] font-semibold">11:00 - 15:00</span>
                  <div className="text-[12px] text-[#dae2fd] truncate group-hover:text-white font-medium">
                    Daikanyama Vinyl Tour
                  </div>
                  <span className="font-mono text-[9px] text-[#908fa0]">Tsutaya Books &amp; Records</span>
                </button>
              </div>
            </div>
          )}

          {/* TRACK C: Travel & Annual Leave Logistics Track */}
          {filterAgenda('logistics') && (
            <div className="grid grid-cols-12 gap-3 min-w-[800px] items-center py-1">
              <div className="col-span-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff516a] shrink-0"></span>
                <div>
                  <div className="text-[14px] text-[#dae2fd] font-semibold">Track C: Logistics &amp; PTO</div>
                  <div className="font-mono text-[10px] text-[#908fa0] uppercase">Flights &amp; Leave Yield</div>
                </div>
              </div>

              {/* Thu Aug 08: Flight SQ634 */}
              <div className="col-span-2">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[8])}
                  className="w-full text-left p-2.5 bg-[#2d3449] hover:bg-[#31394d] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#dae2fd] font-bold">SQ634 (SIN → HND)</span>
                    <span className="font-mono text-[9px] text-[#ffb2b7] font-bold">PTO #1</span>
                  </div>
                  <span className="text-[11px] text-[#c7c4d7]">Dep SIN 08:00 • Arr HND 16:00</span>
                </button>
              </div>

              {/* Fri Aug 09: Singapore National Day */}
              <div className="col-span-3">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[9])}
                  className="w-full text-left p-2.5 bg-[#ff516a]/15 hover:bg-[#ff516a]/25 border border-[#ff516a]/30 rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#ffb2b7] font-bold">Singapore Public Holiday</span>
                    <span className="font-mono text-[9px] bg-[#ffb2b7] text-[#67001b] px-1.5 py-0.2 rounded font-bold">
                      0 PTO Spent
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c7c4d7]">Singapore National Day • Paid Public Day Off</span>
                </button>
              </div>

              {/* Sat Aug 10: Hotel Stay */}
              <div className="col-span-3">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[10])}
                  className="w-full text-left p-2.5 bg-[#2d3449] hover:bg-[#31394d] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#dae2fd] font-bold">Cerulean Tower Shibuya</span>
                    <span className="font-mono text-[9px] text-[#c0c1ff]">Booking.com</span>
                  </div>
                  <span className="text-[11px] text-[#c7c4d7]">Check-out Sun 12:00 • Late Lounge Access</span>
                </button>
              </div>

              {/* Sun Aug 11: Flight Return */}
              <div className="col-span-2">
                <button
                  onClick={() => onOpenEventDetail(TOKYO_AGENDA_BLOCKS[11])}
                  className="w-full text-left p-2.5 bg-[#2d3449] hover:bg-[#31394d] border border-white/[0.04] rounded-lg flex flex-col gap-1 shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#dae2fd] font-bold">SQ635 (HND → SIN)</span>
                    <span className="font-mono text-[9px] text-[#c0c1ff]">On Schedule</span>
                  </div>
                  <span className="text-[11px] text-[#c7c4d7]">Dep HND 17:00 • Arr SIN 23:15</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition & Partner Affiliate Booking Callout Panel */}
      <section className="px-margin py-space-xl grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Partner Ecosystem Card */}
        <div className="lg:col-span-7 bg-[#171f33] border border-white/[0.06] rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ddb7ff] uppercase tracking-wider mb-2 font-semibold">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              <span>Verified Partner Network</span>
            </div>
            <h3 className="text-[24px] text-[#dae2fd] font-bold tracking-tight">
              Book Smart, Travel Smarter
            </h3>
            <p className="text-[14px] text-[#c7c4d7] mt-1.5 leading-relaxed">
              SyncPass automatically injects corporate-negotiated hotel discounts, Skyscanner deep-links, and official Ticketmaster concert priority allocation directly into your dual-track itinerary.
            </p>

            {/* Partner Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <button
                onClick={() => onOpenTMSeating('Coldplay: Music of the Spheres', 'Tokyo Dome')}
                className="bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] p-3 rounded-lg flex flex-col gap-1 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#dae2fd] font-bold group-hover:text-[#c0c1ff] transition-colors">
                    Ticketmaster
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0] group-hover:text-[#c0c1ff]">
                    arrow_outward
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#ddb7ff]">VIP Tier Alerts</span>
              </button>

              <button
                onClick={() => {
                  setSyncToast('Redirecting to Booking.com Genius rate for Tokyo & London hotels (15% Corporate discount applied).');
                  setTimeout(() => setSyncToast(null), 3500);
                }}
                className="bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] p-3 rounded-lg flex flex-col gap-1 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#dae2fd] font-bold group-hover:text-[#c0c1ff] transition-colors">
                    Booking.com
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0] group-hover:text-[#c0c1ff]">
                    arrow_outward
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#c0c1ff]">15% Genius Perks</span>
              </button>

              <button
                onClick={() => {
                  setSyncToast('Applying Expedia Bleisure Package Rate: S$280 bundled rebate unlocked.');
                  setTimeout(() => setSyncToast(null), 3500);
                }}
                className="bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] p-3 rounded-lg flex flex-col gap-1 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#dae2fd] font-bold group-hover:text-[#c0c1ff] transition-colors">
                    Expedia
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0] group-hover:text-[#c0c1ff]">
                    arrow_outward
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#ffb2b7]">Venue Package Rate</span>
              </button>

              <button
                onClick={() => {
                  setSyncToast('Querying Skyscanner direct flights SIN ↔ HND / SIN ↔ LHR with zero booking fee.');
                  setTimeout(() => setSyncToast(null), 3500);
                }}
                className="bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.04] p-3 rounded-lg flex flex-col gap-1 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[#dae2fd] font-bold group-hover:text-[#c0c1ff] transition-colors">
                    Skyscanner
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#908fa0] group-hover:text-[#c0c1ff]">
                    arrow_outward
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#c7c4d7]">Direct SIN Fare</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 bg-[#060e20]/60 border border-white/[0.04] p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[24px]">verified_user</span>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#dae2fd] font-semibold">Affiliate Transparency Guarantee</span>
                <span className="text-[12px] text-[#c7c4d7]">
                  We never mark up prices. Affiliate commissions directly subsidize AI itinerary optimization.
                </span>
              </div>
            </div>
            <span className="font-mono text-[12px] text-[#c0c1ff] font-bold hidden sm:inline-block">
              SyncPass Direct
            </span>
          </div>
        </div>

        {/* Annual Leave Optimizer Progress Summary */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#171f33] to-[#222a3d] border border-white/[0.06] rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#ffb2b7] uppercase tracking-wider font-semibold">
                Leave Efficiency Index
              </span>
              <span className="font-mono text-[12px] bg-[#ff516a]/20 text-[#ffb2b7] px-2 py-0.5 rounded font-bold border border-[#ff516a]/30">
                Status: Highly Optimized
              </span>
            </div>
            <h3 className="text-[24px] text-[#dae2fd] font-bold mt-2">
              PTO Utilization Blueprint
            </h3>

            {/* Leave Bar Chart Graphic */}
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-[13px]">
                <span className="text-[#dae2fd]">3 of {leaveBalance} Annual Days Allocated</span>
                <span className="text-[#c0c1ff] font-bold">{leaveBalance - 3} Days Free</span>
              </div>

              {/* Progress Multi-color Bar */}
              <div className="h-3 w-full bg-[#060e20] rounded-full overflow-hidden flex border border-white/[0.04]">
                <div className="bg-[#ffb2b7] w-[21%]" title="Spent PTO (3d)"></div>
                <div className="bg-[#6f00be] w-[14%]" title="Public Holidays (2d)"></div>
                <div className="bg-[#c0c1ff] w-[43%]" title="Travel Trip Days Earned (11d)"></div>
                <div className="bg-[#2d3449] flex-1" title="Remaining PTO"></div>
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-[#908fa0] pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ffb2b7] inline-block"></span> 3 PTO Used
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#6f00be] inline-block"></span> 2 SG Holidays
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#c0c1ff] inline-block"></span> 11 Trip Days
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2d3449] inline-block"></span> {leaveBalance - 3} PTO Free
                </span>
              </div>
            </div>

            {/* Highlight Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#060e20] border border-white/[0.04] p-3 rounded-lg">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase">Bleisure Efficiency</span>
                <div className="text-[24px] text-[#c0c1ff] font-extrabold mt-0.5 font-mono">3.6x</div>
                <span className="text-[11px] text-[#c7c4d7]">Trip days gained per PTO spent</span>
              </div>
              <div className="bg-[#060e20] border border-white/[0.04] p-3 rounded-lg">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase">Entertainment Sync</span>
                <div className="text-[24px] text-[#ddb7ff] font-extrabold mt-0.5 font-mono">2 Live Shows</div>
                <span className="text-[11px] text-[#c7c4d7]">Coldplay • Dua Lipa on lock</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <button
              onClick={onNavigateToLeaveOptimizer}
              className="text-[15px] text-[#c0c1ff] hover:text-[#e1e0ff] flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
            >
              <span>Open Full Leave Optimizer</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <span className="font-mono text-[11px] text-[#908fa0]">Q3–Q4 2025 Calendar</span>
          </div>
        </div>
      </section>
    </div>
  );
};
