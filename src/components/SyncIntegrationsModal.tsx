import React, { useState } from 'react';

interface SyncIntegrationsModalProps {
  onClose: () => void;
}

export const SyncIntegrationsModal: React.FC<SyncIntegrationsModalProps> = ({
  onClose
}) => {
  const [gcalSynced, setGcalSynced] = useState<boolean>(true);
  const [spotifySynced, setSpotifySynced] = useState<boolean>(true);
  const [ticketmasterSynced, setTicketmasterSynced] = useState<boolean>(true);
  const [krisflyerNum, setKrisflyerNum] = useState<string>('KF889210439');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#171f33] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in">
        <div className="bg-[#222a3d] p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-[22px]">settings</span>
            <h3 className="text-[18px] font-bold text-[#dae2fd]">
              Sync Integrations &amp; Accounts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* Google Calendar */}
          <div className="flex items-center justify-between p-3.5 bg-[#222a3d] rounded-xl border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#8083ff] text-[24px]">calendar_month</span>
              <div>
                <div className="text-[14px] font-semibold text-[#dae2fd]">Google &amp; Apple Calendar</div>
                <div className="text-[11px] text-[#c7c4d7]">Auto-sync conference keynotes &amp; concert gates</div>
              </div>
            </div>
            <button
              onClick={() => setGcalSynced(!gcalSynced)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                gcalSynced ? 'bg-[#8083ff]' : 'bg-[#2d3449]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  gcalSynced ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Spotify */}
          <div className="flex items-center justify-between p-3.5 bg-[#222a3d] rounded-xl border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#1db954] text-[24px]">graphic_eq</span>
              <div>
                <div className="text-[14px] font-semibold text-[#dae2fd]">Spotify Music Sync</div>
                <div className="text-[11px] text-[#c7c4d7]">jerryleeks@gmail.com (Coldplay, Dua Lipa active)</div>
              </div>
            </div>
            <button
              onClick={() => setSpotifySynced(!spotifySynced)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                spotifySynced ? 'bg-[#1db954]' : 'bg-[#2d3449]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  spotifySynced ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Ticketmaster */}
          <div className="flex items-center justify-between p-3.5 bg-[#222a3d] rounded-xl border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ddb7ff] text-[24px]">confirmation_number</span>
              <div>
                <div className="text-[14px] font-semibold text-[#dae2fd]">Ticketmaster Verified Fan</div>
                <div className="text-[11px] text-[#c7c4d7]">SG &amp; Global partner priority pass enabled</div>
              </div>
            </div>
            <button
              onClick={() => setTicketmasterSynced(!ticketmasterSynced)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                ticketmasterSynced ? 'bg-[#8083ff]' : 'bg-[#2d3449]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  ticketmasterSynced ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Singapore Airlines KrisFlyer */}
          <div className="p-3.5 bg-[#222a3d] rounded-xl border border-white/[0.04] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb2b7] text-[20px]">flight</span>
                <span className="text-[13px] font-semibold text-[#dae2fd]">Singapore Airlines KrisFlyer</span>
              </div>
              <span className="font-mono text-[11px] text-[#34d399]">Elite Gold</span>
            </div>
            <input
              type="text"
              value={krisflyerNum}
              onChange={(e) => setKrisflyerNum(e.target.value)}
              placeholder="Enter KrisFlyer Number"
              className="bg-[#060e20] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[13px] font-mono text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8083ff]"
            />
          </div>

          {/* Live Serverless Connections Diagnostics */}
          <div className="p-3.5 bg-[#060e20] rounded-xl border border-white/[0.06] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#c0c1ff] uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">terminal</span>
                <span>Serverless Connection Diagnostics</span>
              </span>
              <span className="text-[10px] font-mono text-[#908fa0]">/api/* endpoints</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/health');
                    const json = await res.json();
                    alert(`Health Check (/api/health):\nStatus: ${json.status}\nTime: ${json.timestamp}\nServices: ${JSON.stringify(json.services, null, 2)}`);
                  } catch (e: any) {
                    alert(`Error calling /api/health: ${e.message}`);
                  }
                }}
                className="py-1.5 px-2 bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[11px] font-mono rounded border border-white/[0.04] transition-colors cursor-pointer text-center"
              >
                /api/health
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/singapore-holidays?limit=5');
                    const json = await res.json();
                    alert(`data.gov.sg Holidays (/api/singapore-holidays):\n- Status: ${json.success ? 'Success' : 'Failed'}\n- Sample: ${JSON.stringify(json.data?.result?.records?.slice(0, 2), null, 2)}`);
                  } catch (e: any) {
                    alert(`Error calling /api/singapore-holidays: ${e.message}`);
                  }
                }}
                className="py-1.5 px-2 bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[11px] font-mono rounded border border-white/[0.04] transition-colors cursor-pointer text-center"
              >
                /api/data-gov
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/sync-pas?countryCode=AU&city=Melbourne');
                    const json = await res.json();
                    const sgCount = json.sources?.singaporeHolidays?.recordCount ?? json.sources?.singaporeHolidays?.status;
                    const devCount = json.sources?.developerEvents?.eventCount ?? json.sources?.developerEvents?.status;
                    const tmStatus = json.sources?.ticketmaster?.status;
                    alert(`Sync-Pas (/api/sync-pas):\n- data.gov.sg: ${sgCount} records\n- developers.events: ${devCount} events\n- Ticketmaster: ${tmStatus} (${json.sources?.ticketmaster?.configured ? 'Key configured' : 'API Key required'})\n\nFull timestamp: ${json.timestamp}`);
                  } catch (e: any) {
                    alert(`Error calling /api/sync-pas: ${e.message}`);
                  }
                }}
                className="py-1.5 px-2 bg-[#8083ff]/20 hover:bg-[#8083ff]/30 text-[#c0c1ff] text-[11px] font-mono rounded border border-[#8083ff]/30 transition-colors cursor-pointer text-center font-bold"
              >
                /api/sync-pas
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-[#10b981]/20 border border-[#10b981]/40 rounded-lg text-center text-[#34d399] font-bold text-[12px]">
              ✓ Sync settings and API connections updated successfully!
            </div>
          )}

          <div className="mt-3 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[#908fa0] hover:text-[#dae2fd] text-[13px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] font-bold rounded-lg text-[13px] cursor-pointer shadow-md transition-colors"
            >
              Save Integrations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
