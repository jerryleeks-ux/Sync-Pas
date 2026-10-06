import React, { useState } from 'react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  leaveBalance: number;
  onLeaveBalanceChange: (newBalance: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (cat: string) => void;
  onOpenIntegrations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  leaveBalance,
  onLeaveBalanceChange,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  onOpenIntegrations
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLeaveEditor, setShowLeaveEditor] = useState(false);
  const [tempLeave, setTempLeave] = useState(leaveBalance);

  const notifications = [
    {
      id: 1,
      title: 'Ticketmaster VIP Presale Active',
      text: 'Coldplay @ Tokyo Dome Arena VIP allocations unlocked for Singapore travelers.',
      time: '12m ago',
      icon: 'confirmation_number',
      color: 'text-secondary'
    },
    {
      id: 2,
      title: 'SQ634 Flight Price Drop',
      text: 'SIN ↔ HND dropped S$110 for National Day Aug 8 departure window.',
      time: '1h ago',
      icon: 'flight',
      color: 'text-primary'
    },
    {
      id: 3,
      title: 'Singapore MOM Holiday Sync',
      text: 'National Day 2025 long weekend detected: 1d PTO gives 4 continuous days.',
      time: '3h ago',
      icon: 'calendar_today',
      color: 'text-tertiary'
    }
  ];

  const navItems = [
    { id: 'smart-schedules', label: 'Smart Schedules' },
    { id: 'concerts-and-events', label: 'Concerts & Events (Ticketmaster)' },
    { id: 'business-conferences', label: 'Business Conferences' },
    { id: 'annual-leave-optimizer', label: 'Annual Leave Optimizer' },
    { id: 'my-trips', label: 'My Trips' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060e20]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 w-full px-6 flex items-center justify-between gap-4">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onTabChange('smart-schedules')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <img
              alt="SyncPass Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V8Hc0ZMgz_rK1lhdDd5vQA5AWI7gCWeIQlSMFHJbKlPnoJo0swcTXxHpGNluKQcXS8bbGAKaW9oDaMhyZ1MJXBe_2KfaqBN4FlvBOizrGxR0fGL1igR0VQciH_bhcAAh-niv_isb-SBN_DSHroni0u5yLfmchIgpbar1vpNQXfZu9FP6jAnjaJZxZesQwHmpLX6pK0F6FgsgAh10ewrlvlq4rxQIRMqVuSSC4B4ld4_TMAmwo9tOJ49Q"
            />
            <span className="font-headline-sm text-[20px] font-bold tracking-tight text-[#dae2fd]">
              SyncPass
            </span>
          </button>

          <div className="hidden xl:flex items-center bg-[#222a3d] border border-white/[0.04] rounded-lg px-2.5 py-1.5 gap-2 text-[#c7c4d7]">
            <span className="material-symbols-outlined text-[18px]">search</span>
            <input
              className="bg-transparent text-[#dae2fd] placeholder:text-[#908fa0] text-[12px] focus:outline-none w-56 font-sans"
              placeholder="Search metropolitan hub (e.g. Singapore, Tokyo)..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <span className="text-[#908fa0] text-[12px] px-1">|</span>
            <select
              aria-label="Event Type Filter"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="bg-transparent text-[#dae2fd] text-[12px] focus:outline-none pr-1 cursor-pointer font-sans"
            >
              <option className="bg-[#222a3d] text-[#dae2fd]" value="all">All Experiences</option>
              <option className="bg-[#222a3d] text-[#dae2fd]" value="concerts">Ticketmaster Concerts</option>
              <option className="bg-[#222a3d] text-[#dae2fd]" value="summits">Industry Summits</option>
              <option className="bg-[#222a3d] text-[#dae2fd]" value="festivals">Music Festivals</option>
            </select>
          </div>
        </div>

        {/* Central Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-1.5 transition-all text-[14px] cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8083ff] text-[#0d0096] font-semibold rounded-lg shadow-sm'
                    : 'text-[#c7c4d7] hover:text-[#dae2fd] hover:bg-[#222a3d] font-medium rounded-lg'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status & Profile Cluster */}
        <div className="flex items-center gap-3">
          {/* Leave Budget Badge with Click-to-Edit */}
          <div className="relative">
            <button
              onClick={() => {
                setTempLeave(leaveBalance);
                setShowLeaveEditor(!showLeaveEditor);
              }}
              title="Click to adjust your annual PTO balance"
              className="hidden sm:flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] border border-white/[0.06] px-3 py-1.5 rounded-lg text-[#dae2fd] font-mono text-[13px] font-medium transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">beach_access</span>
              <span>Leave: {leaveBalance}d</span>
              <span className="material-symbols-outlined text-[14px] text-[#908fa0]">edit</span>
            </button>

            {showLeaveEditor && (
              <div className="absolute right-0 mt-2 w-64 bg-[#171f33] border border-white/10 rounded-xl p-4 shadow-2xl z-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-[#908fa0] uppercase">Adjust PTO Balance</span>
                  <span className="font-mono text-[13px] font-bold text-[#c0c1ff]">{tempLeave} Days</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={tempLeave}
                  onChange={(e) => setTempLeave(Number(e.target.value))}
                  className="w-full accent-[#8083ff] h-1.5 bg-[#060e20] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#908fa0] font-mono mt-1">
                  <span>5d (MOM Min)</span>
                  <span>14d (Standard)</span>
                  <span>30d</span>
                </div>
                <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-white/[0.08]">
                  <button
                    onClick={() => setShowLeaveEditor(false)}
                    className="px-2.5 py-1 text-[12px] text-[#908fa0] hover:text-[#dae2fd]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onLeaveBalanceChange(tempLeave);
                      setShowLeaveEditor(false);
                    }}
                    className="px-3 py-1 bg-[#8083ff] text-[#0d0096] text-[12px] font-semibold rounded-md hover:bg-[#c0c1ff]"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative p-2 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ddb7ff] ring-2 ring-[#060e20]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#171f33] border border-white/10 rounded-xl p-3 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#dae2fd] font-semibold">Live Bleisure Signals</span>
                  <span className="text-[11px] text-[#8083ff]">3 Unread</span>
                </div>
                <div className="flex flex-col gap-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-[#222a3d]/70 hover:bg-[#222a3d] transition-colors flex items-start gap-2.5">
                      <span className={`material-symbols-outlined text-[18px] ${n.color} mt-0.5`}>
                        {n.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[#dae2fd]">{n.title}</span>
                          <span className="text-[10px] text-[#908fa0] font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#c7c4d7] mt-0.5">{n.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile & Country Indicator */}
          <div className="flex items-center gap-1.5 pl-1">
            <button
              onClick={onOpenIntegrations}
              className="relative group cursor-pointer focus:outline-none"
              title="Jerry Leeks • Singapore Base (Click for Integrations)"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 group-hover:ring-[#8083ff] transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxNj4Y2l7xYQi8XhSA3IjlOz8QBcBUzBE2pTo0Vdk44c1-BoC07-e9oSewww7h9meVtSv8yvM-RLVOkZTn6bfR7D1bFljUTM-BKxSjrJlxySmcJS5cM0Sj5GuVXwEtFbog1_UPwAIHTz4yH86hnH5ih7Z92KZ2Z0URGfvDvwdqXFYTBOYwZfHncT9eV6AVfZiHKSWyRoHoTHdk4j3xBM-CZI00QVymHc8okHl8mkORXBHBYCOtHyU"
              />
              <span className="absolute -bottom-0.5 -right-0.5 text-[10px] leading-none bg-[#060e20] rounded-full px-0.5 py-0.5 shadow">
                🇸🇬
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
