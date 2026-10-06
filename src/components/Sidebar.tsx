import React from 'react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  selectedHub: string;
  onSelectHub: (hub: string) => void;
  onOpenIntegrations: () => void;
  onSelectUpcomingWindow: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  selectedHub,
  onSelectHub,
  onOpenIntegrations,
  onSelectUpcomingWindow
}) => {
  const hubs = [
    { code: 'SIN', label: 'Singapore (SIN) - Base Hub', region: 'Asia-Pacific' },
    { code: 'HND', label: 'Tokyo (HND/NRT)', region: 'Asia-Pacific' },
    { code: 'ICN', label: 'Seoul (ICN)', region: 'Asia-Pacific' },
    { code: 'MEL', label: 'Melbourne (MEL)', region: 'Asia-Pacific' },
    { code: 'SYD', label: 'Sydney (SYD)', region: 'Asia-Pacific' },
    { code: 'HKG', label: 'Hong Kong (HKG)', region: 'Asia-Pacific' },
    { code: 'BKK', label: 'Bangkok (BKK)', region: 'Asia-Pacific' },
    { code: 'LHR', label: 'London (LHR)', region: 'Europe' },
    { code: 'BER', label: 'Berlin (BER)', region: 'Europe' },
    { code: 'CDG', label: 'Paris (CDG)', region: 'Europe' },
    { code: 'AMS', label: 'Amsterdam (AMS)', region: 'Europe' },
    { code: 'BCN', label: 'Barcelona (BCN)', region: 'Europe' },
    { code: 'SFO', label: 'San Francisco (SFO)', region: 'Americas' },
    { code: 'JFK', label: 'New York (JFK)', region: 'Americas' },
    { code: 'AUS', label: 'Austin (AUS)', region: 'Americas' },
    { code: 'DXB', label: 'Dubai (DXB)', region: 'Middle East' }
  ];

  const menuItems = [
    { id: 'smart-schedules', label: 'Smart Schedules', icon: 'calendar_month' },
    { id: 'concerts-and-events', label: 'Live Concerts', icon: 'confirmation_number' },
    { id: 'business-conferences', label: 'Conferences', icon: 'business_center' },
    { id: 'annual-leave-optimizer', label: 'Leave Optimizer', icon: 'tune' },
    { id: 'my-trips', label: 'My Trips', icon: 'luggage' }
  ];

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-[#131b2e] border-r border-white/[0.04] hidden md:flex flex-col justify-between py-6 px-4 z-40">
      <div className="flex flex-col gap-6">
        {/* Metro Hub Sync Dropdown */}
        <div className="px-2">
          <p className="font-mono text-[11px] text-[#908fa0] uppercase tracking-wider font-semibold">
            Metro Hub Sync
          </p>
          <div className="relative mt-1.5">
            <select
              aria-label="Metro Hub Sync"
              value={selectedHub}
              onChange={(e) => onSelectHub(e.target.value)}
              className="w-full bg-[#171f33] hover:bg-[#222a3d] border border-white/[0.06] text-[#dae2fd] text-[15px] font-semibold py-2 px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8083ff] cursor-pointer appearance-none flex items-center pr-8"
            >
              {hubs.map((hub) => (
                <option key={hub.code} value={hub.code} className="bg-[#171f33] text-[#dae2fd]">
                  {hub.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#c0c1ff] pointer-events-none text-[18px]">
              flight_takeoff
            </span>
          </div>
        </div>

        {/* Workspace View Nav */}
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] text-[#908fa0] uppercase px-2 tracking-wider font-semibold">
            Workspace View
          </p>
          <nav className="flex flex-col gap-1 mt-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-[14px] text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-sm'
                      : 'text-[#c7c4d7] hover:bg-[#222a3d] hover:text-[#dae2fd] font-normal'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Upcoming Window Callout Card */}
        <button
          onClick={onSelectUpcomingWindow}
          className="flex flex-col gap-1 px-3 py-3 bg-[#171f33] hover:bg-[#222a3d] border border-white/[0.06] rounded-xl text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between font-mono text-[11px] text-[#ddb7ff] font-semibold">
            <span className="uppercase tracking-wider">Upcoming Window</span>
            <span className="material-symbols-outlined text-[16px] text-[#ddb7ff] group-hover:scale-110 transition-transform">
              electric_bolt
            </span>
          </div>
          <p className="text-[15px] text-[#dae2fd] font-semibold mt-1">
            Vesak Day + Tech Week
          </p>
          <p className="text-[12px] text-[#c7c4d7] leading-relaxed">
            4 Leave days taken → 9 Days Bleisure block with Coldplay live in SG.
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-[#c0c1ff] font-medium">
            <span>Explore Bridging Strategy</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </button>
      </div>

      {/* Footer Area */}
      <div className="px-2 flex flex-col gap-1 border-t border-white/[0.06] pt-4">
        <button
          onClick={onOpenIntegrations}
          className="flex items-center gap-2 py-1.5 text-[#c7c4d7] hover:text-[#dae2fd] text-[13px] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          <span>Sync Integrations</span>
        </button>
        <div className="text-[#908fa0] font-mono text-[11px] pt-1">
          SyncPass v2.4 Global Exec
        </div>
      </div>
    </aside>
  );
};
