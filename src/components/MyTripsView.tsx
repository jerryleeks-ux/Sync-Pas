import React from 'react';
import { BookedTrip } from '../types';
import { exportTokyoTripToGoogleCalendar, downloadTokyoIcsFile } from '../utils/calendarExport';
import { TOKYO_AGENDA_BLOCKS } from '../data/mockData';

interface MyTripsViewProps {
  bookedTrips: BookedTrip[];
  onExploreNewTrip: () => void;
  onCancelTrip?: (id: string) => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  bookedTrips,
  onExploreNewTrip,
  onCancelTrip
}) => {
  const totalSaved = bookedTrips.reduce((acc, t) => acc + t.affiliateDiscount, 0);
  const totalPtoUsed = bookedTrips.reduce((acc, t) => acc + t.ptoDaysUsed, 0);
  const totalDaysUnlocked = bookedTrips.reduce((acc, t) => acc + t.tripDaysUnlocked, 0);

  return (
    <div className="flex flex-col w-full px-margin py-space-lg gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#131b2e] border border-white/[0.04] p-6 rounded-xl">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#c0c1ff] uppercase tracking-wider mb-2 font-semibold">
            <span className="material-symbols-outlined text-[16px]">luggage</span>
            <span>Personal Dual-Track Bleisure Vault</span>
            <span className="text-[#908fa0]">·</span>
            <span className="text-[#ffb2b7]">Calendar Synchronized</span>
          </div>
          <h1 className="text-[32px] lg:text-[38px] font-bold text-[#dae2fd]">
            My Planned &amp; Booked Trips
          </h1>
          <p className="text-[14px] text-[#c7c4d7] max-w-2xl mt-1">
            Confirmed flight legs, hotel bookings, Ticketmaster priority allocations, and calendar feeds.
          </p>
        </div>

        <button
          onClick={onExploreNewTrip}
          className="px-4 py-2 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] text-[13px] font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md self-start md:self-end"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Explore New Bleisure Window</span>
        </button>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">PTO Days Utilized</span>
          <div className="text-[28px] font-bold text-[#ffb2b7] font-mono mt-1">
            {totalPtoUsed} Days
          </div>
          <span className="text-[12px] text-[#c7c4d7]">Yielding {totalDaysUnlocked} continuous travel days</span>
        </div>

        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">Affiliate Savings Kept</span>
          <div className="text-[28px] font-bold text-[#c0c1ff] font-mono mt-1">
            S${totalSaved}
          </div>
          <span className="text-[12px] text-[#c7c4d7]">Via corporate Booking.com &amp; Expedia packages</span>
        </div>

        <div className="bg-[#171f33] border border-white/[0.06] p-4 rounded-xl">
          <span className="font-mono text-[11px] text-[#908fa0] uppercase">Upcoming Live Shows</span>
          <div className="text-[28px] font-bold text-[#ddb7ff] font-mono mt-1">
            {bookedTrips.length} Concert
          </div>
          <span className="text-[12px] text-[#c7c4d7]">Ticketmaster VIP Passes synced</span>
        </div>
      </div>

      {/* Trips Cards */}
      <div className="flex flex-col gap-4">
        {bookedTrips.length === 0 ? (
          <div className="bg-[#171f33] border border-dashed border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[48px] text-[#908fa0]">flight_takeoff</span>
            <h3 className="text-[18px] font-bold text-[#dae2fd] mt-2">No booked trips yet</h3>
            <p className="text-[13px] text-[#c7c4d7] max-w-sm mt-1">
              Select one of our curated dual-purpose matches to synchronize flights, hotel, and concert passes.
            </p>
            <button
              onClick={onExploreNewTrip}
              className="mt-4 px-4 py-2 bg-[#8083ff] text-[#0d0096] text-[13px] font-bold rounded-lg cursor-pointer"
            >
              Browse Matches
            </button>
          </div>
        ) : (
          bookedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#171f33] border border-white/[0.06] rounded-xl p-5 flex flex-col lg:flex-row justify-between gap-6 shadow-xl"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#ddb7ff] uppercase font-semibold">
                      {trip.destination}
                    </span>
                    <span className="text-[#908fa0]">·</span>
                    <span className="font-mono text-[11px] text-[#c0c1ff]">{trip.dates}</span>
                    <span className="bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30 font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase ml-2">
                      {trip.status}
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold text-[#dae2fd] mt-1">
                    {trip.matchTitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    <div className="p-2.5 bg-[#222a3d] rounded-lg border border-white/[0.04]">
                      <span className="font-mono text-[10px] text-[#908fa0] uppercase block">Flight Leg</span>
                      <span className="text-[12px] font-semibold text-[#dae2fd]">{trip.flightCode}</span>
                    </div>

                    <div className="p-2.5 bg-[#222a3d] rounded-lg border border-white/[0.04]">
                      <span className="font-mono text-[10px] text-[#908fa0] uppercase block">Accommodation</span>
                      <span className="text-[12px] font-semibold text-[#dae2fd]">{trip.hotelName}</span>
                    </div>

                    <div className="p-2.5 bg-[#222a3d] rounded-lg border border-white/[0.04]">
                      <span className="font-mono text-[10px] text-[#908fa0] uppercase block">Concert Pass</span>
                      <span className="text-[12px] font-semibold text-[#ddb7ff]">{trip.concertPass}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-4 text-[12px] font-mono text-[#c7c4d7]">
                  <span>PTO Used: <strong className="text-[#ffb2b7]">{trip.ptoDaysUsed}d</strong></span>
                  <span>Yield: <strong className="text-[#c0c1ff]">{trip.tripDaysUnlocked}d</strong></span>
                  <span>Total Paid: <strong className="text-[#dae2fd]">S${trip.totalPaid}</strong></span>
                  <span>Affiliate Rebate: <strong className="text-[#34d399]">-S${trip.affiliateDiscount}</strong></span>
                </div>
              </div>

              {/* Actions Box */}
              <div className="flex flex-row lg:flex-col justify-end gap-2.5 shrink-0 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-4 lg:pt-0 lg:pl-6">
                <button
                  onClick={() => {
                    const url = exportTokyoTripToGoogleCalendar();
                    window.open(url, '_blank');
                  }}
                  className="px-3.5 py-2 bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[12px] font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">calendar_add_on</span>
                  <span>Google Calendar</span>
                </button>

                <button
                  onClick={() => downloadTokyoIcsFile(TOKYO_AGENDA_BLOCKS)}
                  className="px-3.5 py-2 bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[12px] font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#ffb2b7]">download</span>
                  <span>Download .iCal</span>
                </button>

                {onCancelTrip && (
                  <button
                    onClick={() => onCancelTrip(trip.id)}
                    className="px-3 py-1.5 text-[#908fa0] hover:text-[#ffb4ab] text-[11px] font-mono transition-colors text-right cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
