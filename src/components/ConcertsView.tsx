import React, { useState } from 'react';
import { CONCERTS_DATABASE } from '../data/mockData';
import { ConcertItem } from '../types';

interface ConcertsViewProps {
  onOpenTMSeating: (concertTitle: string, venue: string) => void;
  onSelectForBleisure: (concert: ConcertItem) => void;
}

export const ConcertsView: React.FC<ConcertsViewProps> = ({
  onOpenTMSeating,
  onSelectForBleisure
}) => {
  const [selectedConcert, setSelectedConcert] = useState<ConcertItem>(CONCERTS_DATABASE[0]);
  const [isPlayingTrack, setIsPlayingTrack] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string>('all');

  const filteredConcerts = CONCERTS_DATABASE.filter((c) => {
    if (filterCity === 'all') return true;
    return c.city.toLowerCase().includes(filterCity.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full px-margin py-space-lg gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#131b2e] border border-white/[0.04] p-6 rounded-xl">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ddb7ff] uppercase tracking-wider mb-2 font-semibold">
            <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
            <span>Ticketmaster Verified Partner Feed</span>
            <span className="text-[#908fa0]">·</span>
            <span className="text-[#c0c1ff]">Spotify Discovery Sync</span>
          </div>
          <h1 className="text-[32px] lg:text-[38px] font-bold text-[#dae2fd]">
            Live Concerts &amp; Stadium Headliners
          </h1>
          <p className="text-[14px] text-[#c7c4d7] max-w-2xl mt-1">
            Global tours synchronized with Singapore public holiday long weekends and major international business summits.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'Tokyo', 'London', 'Singapore', 'Berlin', 'Sydney'].map((city) => (
            <button
              key={city}
              onClick={() => setFilterCity(city)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[12px] transition-colors cursor-pointer ${
                filterCity === city
                  ? 'bg-[#8083ff] text-[#0d0096] font-bold'
                  : 'bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd]'
              }`}
            >
              {city === 'all' ? 'All Cities' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Concert Cards & Live Spotify Preview Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Concerts List */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {filteredConcerts.map((concert) => {
            const isSelected = selectedConcert.id === concert.id;
            return (
              <div
                key={concert.id}
                onClick={() => setSelectedConcert(concert)}
                className={`bg-[#171f33] border rounded-xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 ${
                  isSelected
                    ? 'border-[#8083ff] shadow-[0_0_20px_rgba(128,131,255,0.15)] bg-[#1a233a]'
                    : 'border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="relative w-full sm:w-48 h-36 rounded-lg overflow-hidden shrink-0 bg-[#222a3d]">
                  <img
                    src={concert.image}
                    alt={concert.artist}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2 bg-[#060e20]/80 backdrop-blur-md px-2 py-0.5 rounded font-mono text-[10px] text-[#ddb7ff] font-bold">
                    {concert.date}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#ddb7ff] font-semibold uppercase">
                        {concert.city} • {concert.venue}
                      </span>
                      <span className="font-mono text-[12px] text-[#ffb2b7] font-bold">
                        From {concert.startingPrice}
                      </span>
                    </div>

                    <h3 className="text-[20px] font-bold text-[#dae2fd] mt-0.5">
                      {concert.artist}
                    </h3>
                    <p className="text-[13px] text-[#c7c4d7]">{concert.tour}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="bg-[#6f00be]/30 text-[#ddb7ff] border border-[#6f00be]/40 text-[11px] font-mono px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[13px]">verified</span>
                        {concert.vipStatus}
                      </span>
                      <span className="bg-[#222a3d] text-[#c0c1ff] text-[11px] font-mono px-2 py-0.5 rounded">
                        Paired: {concert.pairedConference}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTMSeating(concert.artist, concert.venue);
                      }}
                      className="text-[12px] text-[#ddb7ff] hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">stadium</span>
                      <span>View Stadium Seating Map</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectForBleisure(concert);
                      }}
                      className="px-3 py-1.5 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] text-[12px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Build Bleisure Trip
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail & Spotify Hub */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#171f33] border border-white/[0.06] rounded-xl p-5 sticky top-24 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <span className="material-symbols-outlined text-[#1db954] text-[22px]">graphic_eq</span>
              <div>
                <h4 className="text-[15px] font-bold text-[#dae2fd]">Spotify Verified Artist Hub</h4>
                <p className="font-mono text-[11px] text-[#908fa0]">{selectedConcert.spotifyStreams}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="font-mono text-[11px] text-[#908fa0] uppercase tracking-wider">
                Tour Setlist Preview
              </span>
              <div className="flex flex-col gap-2 mt-2">
                {selectedConcert.topTracks?.map((track, i) => (
                  <div
                    key={i}
                    onClick={() => setIsPlayingTrack(isPlayingTrack === track ? null : track)}
                    className="p-2.5 bg-[#222a3d] hover:bg-[#2d3449] rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] text-[#908fa0] w-4">{i + 1}</span>
                      <span className="text-[13px] text-[#dae2fd] font-medium">{track}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#1db954] text-[18px]">
                      {isPlayingTrack === track ? 'pause_circle' : 'play_circle'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket Tier Breakdown */}
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-[#908fa0] uppercase tracking-wider">
                  Ticketmaster Allocations
                </span>
                <span className="text-[11px] font-mono text-[#ffb2b7]">SyncPass Priority</span>
              </div>
              <div className="flex flex-col gap-2">
                {selectedConcert.categories.map((cat, idx) => (
                  <div key={idx} className="p-2.5 bg-[#060e20] rounded-lg border border-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#dae2fd]">{cat.name}</span>
                      <span className="font-mono text-[13px] text-[#ddb7ff] font-bold">
                        S${cat.price}
                      </span>
                    </div>
                    <ul className="mt-1 text-[11px] text-[#908fa0] list-disc list-inside">
                      {cat.perks.map((p, pIdx) => (
                        <li key={pIdx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenTMSeating(selectedConcert.artist, selectedConcert.venue)}
              className="mt-5 w-full py-2.5 bg-gradient-to-r from-[#8083ff] to-[#6f00be] hover:opacity-95 text-white font-bold rounded-lg text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">local_activity</span>
              <span>Reserve via Ticketmaster Partner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
