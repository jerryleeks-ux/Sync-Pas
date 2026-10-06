export interface PublicHoliday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  observedDate?: string;
  ptoRecommendation: string;
  unlockedDays: number;
  leaveDaysCost: number;
}

export interface AgendaBlock {
  id: string;
  dayIndex: number; // 0 = Thu Aug 08, 1 = Fri Aug 09, 2 = Sat Aug 10, 3 = Sun Aug 11
  dayLabel: string;
  timeRange: string;
  title: string;
  subtitle: string;
  venue: string;
  category: 'business' | 'entertainment' | 'logistics';
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  isKeynote?: boolean;
  notes?: string;
  affiliatePerk?: string;
  locationLink?: string;
}

export interface CuratedMatch {
  id: string;
  destination: string;
  metroHubCode: string;
  airportCode: string;
  title: string;
  matchScore: number;
  matchLabel: string;
  yieldLabel: string;
  leaveCost: number;
  tripDays: number;
  leaveYieldText: string;
  heroImage: string;
  imageAlt: string;
  businessEvent: {
    type: string;
    dates: string;
    title: string;
    location: string;
    highlights: string;
  };
  entertainmentEvent: {
    partner: string;
    date: string;
    title: string;
    venue: string;
    tier: string;
  };
  scheduleSequence: Array<{
    dayNumber: number;
    dayName: string;
    code: string;
    status: string;
    statusColor: string;
  }>;
  bundlePrice: {
    flight: number;
    hotel: number;
    ticket: number;
    affiliateSaving: number;
    total: number;
    currency: string;
  };
  flightRoute: {
    outbound: string;
    inbound: string;
    airline: string;
    fare: string;
  };
  hotelInfo: {
    name: string;
    tier: string;
    discount: string;
  };
}

export interface ConcertItem {
  id: string;
  artist: string;
  tour: string;
  city: string;
  venue: string;
  date: string;
  ticketmasterUrl?: string;
  spotifyStreams?: string;
  topTracks?: string[];
  startingPrice: string;
  vipStatus: string;
  pairedConference: string;
  image: string;
  categories: Array<{
    name: string;
    price: number;
    perks: string[];
    available: boolean;
  }>;
}

export interface ConferenceItem {
  id: string;
  name: string;
  theme: string;
  city: string;
  venue: string;
  dates: string;
  attendees: string;
  keynoteSpeakers: string[];
  passPrice: string;
  pairedConcert: string;
  trackHighlights: string[];
}

export interface BookedTrip {
  id: string;
  destination: string;
  dates: string;
  matchTitle: string;
  ptoDaysUsed: number;
  tripDaysUnlocked: number;
  flightCode: string;
  hotelName: string;
  concertPass: string;
  totalPaid: number;
  affiliateDiscount: number;
  status: 'Confirmed' | 'Pending GCal Sync';
}
