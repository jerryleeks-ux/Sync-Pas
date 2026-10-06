import React, { useState } from 'react';
import { SINGAPORE_PUBLIC_HOLIDAYS_2025 } from '../data/mockData';
import { PublicHoliday } from '../types';

interface LeaveOptimizerViewProps {
  leaveBalance: number;
  onLeaveBalanceChange: (newBalance: number) => void;
  onSelectHolidayWindow: (holiday: PublicHoliday) => void;
}

export const LeaveOptimizerView: React.FC<LeaveOptimizerViewProps> = ({
  leaveBalance,
  onLeaveBalanceChange,
  onSelectHolidayWindow
}) => {
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([
    'national-day',
    'vesak-day',
    'cny'
  ]);
  const [targetTripDays, setTargetTripDays] = useState<number>(4);

  const toggleHoliday = (id: string) => {
    if (selectedHolidays.includes(id)) {
      setSelectedHolidays(selectedHolidays.filter((h) => h !== id));
    } else {
      setSelectedHolidays([...selectedHolidays, id]);
    }
  };

  // Calculate total PTO spent vs days unlocked
  const totalPtoSpent = SINGAPORE_PUBLIC_HOLIDAYS_2025
    .filter((h) => selectedHolidays.includes(h.id))
    .reduce((acc, curr) => acc + curr.leaveDaysCost, 0);

  const totalTripDaysUnlocked = SINGAPORE_PUBLIC_HOLIDAYS_2025
    .filter((h) => selectedHolidays.includes(h.id))
    .reduce((acc, curr) => acc + curr.unlockedDays, 0);

  const efficiencyMultiplier = totalPtoSpent > 0 ? (totalTripDaysUnlocked / totalPtoSpent).toFixed(1) : '∞';

  const downloadSingaporeHolidaysIcs = () => {
    let ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SyncPass//Singapore MOM Public Holidays 2025//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Singapore Public Holidays & Bleisure Windows 2025'
    ];

    SINGAPORE_PUBLIC_HOLIDAYS_2025.forEach((h, idx) => {
      const cleanDate = h.date.replace(/-/g, '');
      ics.push(
        'BEGIN:VEVENT',
        `UID:sg-holiday-${h.id}-${idx}@syncpass.app`,
        `DTSTAMP:20250101T000000Z`,
        `DTSTART;VALUE=DATE:${cleanDate}`,
        `SUMMARY:[SG HOLIDAY] ${h.name}`,
        `DESCRIPTION:${h.ptoRecommendation}\\n\\nLeave cost: ${h.leaveDaysCost}d | Trip yield: ${h.unlockedDays}d.`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    ics.push('END:VCALENDAR');

    const blob = new Blob([ics.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Singapore_Bleisure_Holidays_2025.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full px-margin py-space-lg gap-6">
      {/* Hero Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-[#131b2e] border border-white/[0.04] p-6 rounded-xl">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ffb2b7] uppercase tracking-wider mb-2 font-semibold">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Singapore Ministry of Manpower (MOM) Official Alignment</span>
          </div>
          <h1 className="text-[32px] lg:text-[38px] font-bold text-[#dae2fd]">
            Singapore Annual Leave Optimizer
          </h1>
          <p className="text-[14px] text-[#c7c4d7] max-w-2xl mt-1 leading-relaxed">
            Algorithmic bridging calculates how to convert 14 days of statutory annual leave into up to 42 consecutive travel days by pairing weekends, public holidays, and remote work policies.
          </p>
        </div>

        <button
          onClick={downloadSingaporeHolidaysIcs}
          className="px-4 py-2.5 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] text-[13px] font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md self-start lg:self-end"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
          <span>Download SG 2025 Bleisure .iCal</span>
        </button>
      </div>

      {/* Analytics KPI Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">Annual Leave Quota</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[28px] font-bold text-[#dae2fd] font-mono">{leaveBalance}</span>
            <span className="text-[12px] text-[#908fa0]">Days/Year</span>
          </div>
          <span className="text-[11px] text-[#c0c1ff] mt-2">Adjustable via top header</span>
        </div>

        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">PTO Days Spent</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[28px] font-bold text-[#ffb2b7] font-mono">{totalPtoSpent}</span>
            <span className="text-[12px] text-[#908fa0]">of {leaveBalance} days</span>
          </div>
          <span className="text-[11px] text-[#908fa0] mt-2">{leaveBalance - totalPtoSpent} days remaining</span>
        </div>

        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">Trip Days Unlocked</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[28px] font-bold text-[#c0c1ff] font-mono">{totalTripDaysUnlocked}</span>
            <span className="text-[12px] text-[#c0c1ff]">Continuous Days</span>
          </div>
          <span className="text-[11px] text-[#908fa0] mt-2">Across {selectedHolidays.length} holiday windows</span>
        </div>

        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl flex flex-col justify-between">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">Bleisure ROI Multiplier</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[28px] font-bold text-[#ddb7ff] font-mono">{efficiencyMultiplier}x</span>
            <span className="text-[12px] text-[#ddb7ff]">Efficiency</span>
          </div>
          <span className="text-[11px] text-[#ffb2b7] mt-2">Top 5% executive leave optimization</span>
        </div>
      </div>

      {/* Main Holiday Matrix Table */}
      <div className="bg-[#171f33] border border-white/[0.06] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#222a3d] border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#dae2fd]">
              Singapore 2025 Public Holiday Schedule &amp; Leave Bridging
            </h3>
            <p className="text-[12px] text-[#908fa0]">
              Select which holiday windows to include in your personalized annual vacation plan.
            </p>
          </div>
          <span className="font-mono text-[11px] text-[#c0c1ff] bg-[#171f33] px-2.5 py-1 rounded border border-white/[0.06]">
            11 Statutory Public Holidays
          </span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {SINGAPORE_PUBLIC_HOLIDAYS_2025.map((holiday) => {
            const isSelected = selectedHolidays.includes(holiday.id);
            return (
              <div
                key={holiday.id}
                onClick={() => toggleHoliday(holiday.id)}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#1e273f]' : 'hover:bg-[#1a233a]'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border mt-0.5 sm:mt-0 transition-colors ${
                      isSelected
                        ? 'bg-[#8083ff] border-[#8083ff] text-[#0d0096]'
                        : 'border-[#908fa0]/50 bg-transparent'
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-[#dae2fd]">
                        {holiday.name}
                      </span>
                      <span className="font-mono text-[11px] bg-[#222a3d] text-[#c7c4d7] px-2 py-0.5 rounded">
                        {holiday.date} ({holiday.dayOfWeek})
                      </span>
                    </div>
                    <p className="text-[12px] text-[#ddb7ff] mt-0.5">
                      💡 {holiday.ptoRecommendation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-8 sm:pl-0">
                  <div className="text-right">
                    <span className="font-mono text-[11px] text-[#908fa0] uppercase block">
                      Cost vs Yield
                    </span>
                    <span className="font-mono text-[13px] font-bold text-[#dae2fd]">
                      <span className="text-[#ffb2b7]">{holiday.leaveDaysCost}d PTO</span> →{' '}
                      <span className="text-[#c0c1ff]">{holiday.unlockedDays}d Trip</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectHolidayWindow(holiday);
                    }}
                    className="px-3 py-1.5 bg-[#222a3d] hover:bg-[#2d3449] text-[#c0c1ff] text-[12px] font-medium rounded-lg transition-colors border border-white/[0.04]"
                  >
                    View Matches
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
