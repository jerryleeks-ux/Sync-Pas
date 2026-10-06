import React, { useState } from 'react';

interface TMSeatingModalProps {
  concertTitle: string;
  venue: string;
  onClose: () => void;
}

export const TMSeatingModal: React.FC<TMSeatingModalProps> = ({
  concertTitle,
  venue,
  onClose
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('Arena Stand A3 (SyncPass VIP)');
  const [ticketQty, setTicketQty] = useState<number>(1);
  const [isReserved, setIsReserved] = useState<boolean>(false);

  const sections = [
    {
      id: 'arena-a3',
      name: 'Arena Stand A3 (SyncPass VIP)',
      price: 380,
      color: 'bg-[#8083ff]',
      borderColor: 'border-[#8083ff]',
      description: 'Front stage view, direct sightline to runway, dedicated VIP hospitality lounge.'
    },
    {
      id: 'vip-pit',
      name: 'VIP Pit Front Stage (Golden Circle)',
      price: 480,
      color: 'bg-[#6f00be]',
      borderColor: 'border-[#ddb7ff]',
      description: 'Standing directly at the main stage barrier with early fast-track entry.'
    },
    {
      id: 'cat-1',
      name: 'Cat 1 Lower Bowl Reserved (Gate 22)',
      price: 290,
      color: 'bg-[#222a3d]',
      borderColor: 'border-white/20',
      description: 'Padded stadium seats with optimal acoustic surround balance.'
    },
    {
      id: 'cat-2',
      name: 'Cat 2 Balcony Club Tier',
      price: 190,
      color: 'bg-[#171f33]',
      borderColor: 'border-white/10',
      description: 'Elevated panoramic stadium tier with private bar access.'
    }
  ];

  const currentSection = sections.find((s) => s.name === selectedSection) || sections[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#171f33] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-fade-in my-8">
        {/* Header */}
        <div className="bg-[#222a3d] p-5 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[26px] text-[#ddb7ff]">stadium</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#ddb7ff] uppercase font-bold">
                  Ticketmaster Partner Portal
                </span>
                <span className="bg-[#10b981]/20 text-[#34d399] font-mono text-[10px] px-1.5 py-0.2 rounded font-bold">
                  Live Feed
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#dae2fd]">
                {concertTitle} • {venue}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Stadium Interactive Layout Visual */}
        <div className="p-6 flex flex-col gap-6">
          <div className="bg-[#060e20] p-6 rounded-xl border border-white/[0.04] flex flex-col items-center justify-center relative">
            <div className="w-48 py-2 bg-[#8083ff]/30 border border-[#8083ff] text-center rounded-lg text-[13px] font-mono font-bold text-[#c0c1ff] mb-6 tracking-widest uppercase">
              ★ MAIN STAGE ★
            </div>

            {/* Simulated Stadium Seating Layout */}
            <div className="w-full max-w-md flex flex-col gap-3">
              {/* Pit */}
              <button
                onClick={() => setSelectedSection(sections[1].name)}
                className={`w-full py-2.5 rounded-lg font-mono text-[12px] font-bold text-center transition-all cursor-pointer border ${
                  selectedSection === sections[1].name
                    ? 'bg-[#6f00be] border-[#ddb7ff] text-white shadow-lg scale-102'
                    : 'bg-[#6f00be]/30 border-[#ddb7ff]/30 text-[#ddb7ff] hover:bg-[#6f00be]/50'
                }`}
              >
                VIP PIT FRONT STAGE (S$480)
              </button>

              {/* Arena Floor Left & Right */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedSection(sections[0].name)}
                  className={`py-4 rounded-lg font-mono text-[12px] font-bold text-center transition-all cursor-pointer border ${
                    selectedSection === sections[0].name
                      ? 'bg-[#8083ff] border-white text-[#0d0096] shadow-xl scale-102 ring-2 ring-[#c0c1ff]'
                      : 'bg-[#8083ff]/30 border-[#8083ff]/40 text-[#dae2fd] hover:bg-[#8083ff]/50'
                  }`}
                >
                  ARENA STAND A3 (VIP SYNC)
                  <span className="block text-[10px] opacity-80 mt-0.5">S$380</span>
                </button>

                <button
                  onClick={() => setSelectedSection('Arena Stand A4')}
                  className="py-4 rounded-lg font-mono text-[12px] font-bold text-center bg-[#222a3d]/60 border border-white/10 text-[#908fa0] hover:text-[#dae2fd]"
                >
                  ARENA STAND A4
                  <span className="block text-[10px] opacity-80 mt-0.5">S$380</span>
                </button>
              </div>

              {/* Lower Bowl */}
              <button
                onClick={() => setSelectedSection(sections[2].name)}
                className={`w-full py-3 rounded-lg font-mono text-[12px] font-semibold text-center transition-all cursor-pointer border ${
                  selectedSection === sections[2].name
                    ? 'bg-[#222a3d] border-[#8083ff] text-white shadow-md'
                    : 'bg-[#171f33] border-white/[0.06] text-[#c7c4d7] hover:bg-[#222a3d]'
                }`}
              >
                LOWER BOWL RESERVED (GATE 22) • S$290
              </button>

              {/* Club / Upper Tier */}
              <button
                onClick={() => setSelectedSection(sections[3].name)}
                className={`w-full py-2.5 rounded-lg font-mono text-[11px] text-center transition-all cursor-pointer border ${
                  selectedSection === sections[3].name
                    ? 'bg-[#222a3d] border-[#8083ff] text-white shadow-md'
                    : 'bg-[#0f172a] border-white/[0.04] text-[#908fa0] hover:bg-[#171f33]'
                }`}
              >
                CLUB BALCONY &amp; UPPER TIER • S$190
              </button>
            </div>

            <span className="mt-4 font-mono text-[10px] text-[#908fa0]">
              Click any section above to select and view real-time Ticketmaster allocation
            </span>
          </div>

          {/* Selected Tier Info & Checkout Box */}
          <div className="bg-[#222a3d] p-4 rounded-xl border border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <span className="font-mono text-[11px] text-[#ddb7ff] uppercase font-bold">
                Selected Seating Tier
              </span>
              <h4 className="text-[16px] font-bold text-[#dae2fd] mt-0.5">{currentSection.name}</h4>
              <p className="text-[12px] text-[#c7c4d7] mt-0.5">{currentSection.description}</p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 bg-[#171f33] px-2 py-1 rounded-lg border border-white/[0.06]">
                <button
                  onClick={() => setTicketQty(Math.max(1, ticketQty - 1))}
                  className="px-2 text-[#908fa0] hover:text-white font-bold"
                >
                  -
                </button>
                <span className="font-mono text-[13px] text-[#dae2fd]">{ticketQty}</span>
                <button
                  onClick={() => setTicketQty(Math.min(4, ticketQty + 1))}
                  className="px-2 text-[#908fa0] hover:text-white font-bold"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="font-mono text-[10px] text-[#908fa0] uppercase block">Total</span>
                <span className="font-mono text-[18px] text-[#c0c1ff] font-bold">
                  S${currentSection.price * ticketQty}
                </span>
              </div>
            </div>
          </div>

          {isReserved ? (
            <div className="p-3 bg-[#10b981]/20 border border-[#10b981]/40 rounded-xl text-center text-[#34d399] font-bold">
              ✓ Priority Seats Temporarily Held for 15:00 minutes! Link with Bleisure Bundle to finalize.
            </div>
          ) : (
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#908fa0] hover:text-[#dae2fd] text-[13px] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => setIsReserved(true)}
                className="px-5 py-2.5 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] font-bold rounded-lg text-[13px] flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Hold My Seat Tier</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
