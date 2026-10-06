import React from 'react';
import { AgendaBlock } from '../types';
import { createGoogleCalendarUrl } from '../utils/calendarExport';

interface EventDetailModalProps {
  event: AgendaBlock;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose
}) => {
  const handleAddToCalendar = () => {
    const url = createGoogleCalendarUrl(
      `[SyncPass] ${event.title}`,
      `${event.subtitle}\n\nVenue: ${event.venue}\n\n${event.notes || ''}\n\nCurated by SyncPass`,
      event.venue,
      '20250808T100000Z',
      '20250808T120000Z'
    );
    window.open(url, '_blank');
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'business':
        return {
          label: 'Business Track',
          badgeBg: 'bg-[#8083ff]/20 text-[#c0c1ff] border-[#8083ff]/30',
          icon: 'corporate_fare'
        };
      case 'entertainment':
        return {
          label: 'Entertainment Track',
          badgeBg: 'bg-[#6f00be]/30 text-[#ddb7ff] border-[#6f00be]/40',
          icon: 'confirmation_number'
        };
      default:
        return {
          label: 'Logistics & Leave Track',
          badgeBg: 'bg-[#ff516a]/20 text-[#ffb2b7] border-[#ff516a]/30',
          icon: 'flight_takeoff'
        };
    }
  };

  const theme = getCategoryTheme(event.category);

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#171f33] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-5 bg-[#222a3d] border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[20px]`}>
              {theme.icon}
            </span>
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded border uppercase font-bold ${theme.badgeBg}`}>
              {theme.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div>
            <span className="font-mono text-[11px] text-[#908fa0] uppercase tracking-wider">
              {event.dayLabel} • {event.timeRange}
            </span>
            <h3 className="text-[22px] font-bold text-[#dae2fd] mt-1">
              {event.title}
            </h3>
            <p className="text-[14px] text-[#ddb7ff] font-medium mt-0.5">
              {event.subtitle}
            </p>
          </div>

          <div className="bg-[#222a3d] p-3.5 rounded-xl border border-white/[0.04] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-[#c0c1ff] mt-0.5">
              pin_drop
            </span>
            <div className="flex-1">
              <span className="font-mono text-[10px] text-[#908fa0] uppercase block">Venue / Address</span>
              <p className="text-[13px] text-[#dae2fd] font-medium">{event.venue}</p>
            </div>
          </div>

          {event.notes && (
            <div className="bg-[#060e20] p-3.5 rounded-xl border border-white/[0.04]">
              <span className="font-mono text-[10px] text-[#908fa0] uppercase block mb-1">
                Executive Notes &amp; Logistics
              </span>
              <p className="text-[13px] text-[#c7c4d7] leading-relaxed">{event.notes}</p>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-2 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-[#908fa0] hover:text-[#dae2fd] text-[13px] cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleAddToCalendar}
              className="px-4 py-2 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] font-bold rounded-lg text-[13px] flex items-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
