import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CuratedMatch, BookedTrip } from '../types';

interface LockBundleModalProps {
  match: CuratedMatch;
  onClose: () => void;
  onConfirmBooking: (newTrip: BookedTrip) => void;
}

export const LockBundleModal: React.FC<LockBundleModalProps> = ({
  match,
  onClose,
  onConfirmBooking
}) => {
  const [selectedSeat, setSelectedSeat] = useState<string>('Arena Stand A3');
  const [roomTier, setRoomTier] = useState<string>('Executive King');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      const newTrip: BookedTrip = {
        id: `trip-${Date.now()}`,
        destination: match.destination,
        dates: match.businessEvent.dates + ', 2025',
        matchTitle: match.title,
        ptoDaysUsed: match.leaveCost,
        tripDaysUnlocked: match.tripDays,
        flightCode: match.flightRoute.outbound,
        hotelName: `${match.hotelInfo.name} (${roomTier})`,
        concertPass: `Ticketmaster VIP (${selectedSeat})`,
        totalPaid: match.bundlePrice.total,
        affiliateDiscount: match.bundlePrice.affiliateSaving,
        status: 'Confirmed'
      };

      setTimeout(() => {
        onConfirmBooking(newTrip);
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#171f33] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8083ff] to-[#6f00be] p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px]">travel</span>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider block opacity-90">
                SyncPass Executive Checkout
              </span>
              <h3 className="text-[20px] font-bold leading-tight">
                Lock Bundle: {match.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Flight Summary */}
          <div className="bg-[#222a3d] p-4 rounded-xl border border-white/[0.04]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#c0c1ff] uppercase font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">flight</span>
                <span>Flight Leg: Singapore Airlines</span>
              </span>
              <span className="text-[#34d399]">Direct Partner Fare</span>
            </div>
            <p className="text-[14px] text-[#dae2fd] font-semibold">{match.flightRoute.outbound}</p>
            <p className="text-[13px] text-[#c7c4d7] mt-0.5">{match.flightRoute.inbound}</p>
          </div>

          {/* Hotel & Tier Selection */}
          <div className="bg-[#222a3d] p-4 rounded-xl border border-white/[0.04]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#ddb7ff] uppercase font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">hotel</span>
                <span>Accommodation: {match.hotelInfo.name}</span>
              </span>
              <span className="text-[#ffb2b7]">{match.hotelInfo.discount}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Executive King', 'Panoramic Club Suite'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setRoomTier(tier)}
                  className={`p-2.5 rounded-lg text-[13px] font-semibold border text-left cursor-pointer transition-colors ${
                    roomTier === tier
                      ? 'bg-[#8083ff]/20 border-[#8083ff] text-[#dae2fd]'
                      : 'bg-[#171f33] border-white/[0.04] text-[#908fa0]'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Ticketmaster VIP Allocation */}
          <div className="bg-[#222a3d] p-4 rounded-xl border border-white/[0.04]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#ffb2b7] uppercase font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
                <span>Ticketmaster Live Pass</span>
              </span>
              <span className="text-[#c0c1ff]">Spotify Priority Verified</span>
            </div>
            <p className="text-[14px] text-[#dae2fd] font-semibold">
              {match.entertainmentEvent.title}
            </p>
            <div className="flex gap-2 mt-2">
              {['Arena Stand A3', 'VIP Pit Front Stage'].map((seat) => (
                <button
                  key={seat}
                  onClick={() => setSelectedSeat(seat)}
                  className={`p-2 rounded-lg text-[12px] font-mono border cursor-pointer transition-colors ${
                    selectedSeat === seat
                      ? 'bg-[#6f00be]/30 border-[#ddb7ff] text-[#ddb7ff] font-bold'
                      : 'bg-[#171f33] border-white/[0.04] text-[#908fa0]'
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Affiliate Rebate Ledger */}
          <div className="bg-[#060e20] p-4 rounded-xl border border-white/[0.06] flex flex-col gap-2 font-mono text-[13px]">
            <div className="flex justify-between text-[#c7c4d7]">
              <span>Flight ({match.bundlePrice.currency})</span>
              <span>{match.bundlePrice.currency}{match.bundlePrice.flight}</span>
            </div>
            <div className="flex justify-between text-[#c7c4d7]">
              <span>Hotel 3 Nights ({match.bundlePrice.currency})</span>
              <span>{match.bundlePrice.currency}{match.bundlePrice.hotel}</span>
            </div>
            <div className="flex justify-between text-[#c7c4d7]">
              <span>Ticketmaster VIP Pass</span>
              <span>{match.bundlePrice.currency}{match.bundlePrice.ticket}</span>
            </div>
            <div className="flex justify-between text-[#34d399] font-semibold">
              <span>Affiliate Corporate Subsidy (SyncPass Direct)</span>
              <span>-{match.bundlePrice.currency}{match.bundlePrice.affiliateSaving}</span>
            </div>
            <div className="pt-2 border-t border-white/[0.08] flex justify-between text-[#dae2fd] text-[16px] font-bold">
              <span>Total Bundle Cost</span>
              <span className="text-[#c0c1ff]">
                {match.bundlePrice.currency}{match.bundlePrice.total}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {isSuccess ? (
            <div className="p-3 bg-[#10b981]/20 border border-[#10b981]/40 rounded-xl text-center text-[#34d399] font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Bundle Locked! Adding to My Trips &amp; Calendar...</span>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#908fa0] hover:text-[#dae2fd] text-[13px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-gradient-to-r from-[#8083ff] to-[#6f00be] hover:opacity-95 text-white font-bold rounded-lg text-[14px] flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-75"
              >
                <span className={`material-symbols-outlined text-[18px] ${isProcessing ? 'animate-spin' : ''}`}>
                  {isProcessing ? 'sync' : 'lock'}
                </span>
                <span>{isProcessing ? 'Confirming with Airlines...' : 'Confirm & Lock S$280 Savings'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
