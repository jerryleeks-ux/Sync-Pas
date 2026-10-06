import React, { useState } from 'react';
import { CONFERENCES_DATABASE } from '../data/mockData';
import { ConferenceItem } from '../types';

interface ConferencesViewProps {
  onPairWithConcert: (conf: ConferenceItem) => void;
}

export const ConferencesView: React.FC<ConferencesViewProps> = ({
  onPairWithConcert
}) => {
  const [selectedConference, setSelectedConference] = useState<ConferenceItem>(CONFERENCES_DATABASE[0]);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredConferences = CONFERENCES_DATABASE.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.theme.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full px-margin py-space-lg gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#131b2e] border border-white/[0.04] p-6 rounded-xl">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#c0c1ff] uppercase tracking-wider mb-2 font-semibold">
            <span className="material-symbols-outlined text-[16px]">business_center</span>
            <span>Global Executive Summits &amp; Keynotes</span>
            <span className="text-[#908fa0]">·</span>
            <span className="text-[#ffb2b7]">Corporate Expense Compliant</span>
          </div>
          <h1 className="text-[32px] lg:text-[38px] font-bold text-[#dae2fd]">
            Business Conferences &amp; Keynotes
          </h1>
          <p className="text-[14px] text-[#c7c4d7] max-w-2xl mt-1">
            Premier technology, FinTech, and enterprise summits paired with weekend live concerts to justify dual-purpose corporate travel.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search conference or theme..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-[#222a3d] border border-white/[0.06] rounded-lg px-3 py-2 pl-9 text-[13px] text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8083ff]"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#908fa0] text-[18px]">
            search
          </span>
        </div>
      </div>

      {/* Conference Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredConferences.map((conf) => (
          <div
            key={conf.id}
            className="bg-[#171f33] border border-white/[0.06] rounded-xl p-5 hover:border-[#8083ff]/40 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] text-[#c0c1ff] uppercase font-semibold">
                    {conf.city} • {conf.dates}
                  </span>
                  <h3 className="text-[20px] font-bold text-[#dae2fd] mt-1">{conf.name}</h3>
                  <p className="text-[13px] text-[#ddb7ff] font-medium mt-0.5">{conf.theme}</p>
                </div>
                <span className="bg-[#222a3d] border border-white/[0.04] px-2.5 py-1 rounded text-[11px] font-mono text-[#ffb2b7] shrink-0 font-bold">
                  {conf.attendees}
                </span>
              </div>

              <div className="mt-4 bg-[#222a3d]/70 p-3 rounded-lg border border-white/[0.04]">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider block mb-1">
                  Keynote Speakers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {conf.keynoteSpeakers.map((spk, idx) => (
                    <span
                      key={idx}
                      className="bg-[#060e20] text-[#dae2fd] text-[11px] px-2 py-0.5 rounded border border-white/[0.04]"
                    >
                      {spk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider block mb-1">
                  Core Tracks &amp; Breakouts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {conf.trackHighlights.map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-[#131b2e] text-[#c7c4d7] text-[11px] px-2 py-0.5 rounded border border-white/[0.02]"
                    >
                      • {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] text-[#908fa0] uppercase">Paired Live Concert</div>
                <div className="text-[12px] font-mono text-[#ddb7ff] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
                  <span>{conf.pairedConcert}</span>
                </div>
              </div>

              <button
                onClick={() => onPairWithConcert(conf)}
                className="px-3.5 py-2 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] text-[12px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Sync with Concert</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
