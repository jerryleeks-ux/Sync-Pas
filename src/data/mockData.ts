import { AgendaBlock, BookedTrip, ConcertItem, ConferenceItem, CuratedMatch, PublicHoliday } from '../types';

export const CURATED_MATCHES: CuratedMatch[] = [
  {
    id: 'tokyo-fintech-coldplay',
    destination: 'Tokyo, Japan',
    metroHubCode: 'TYO',
    airportCode: 'HND/NRT',
    title: 'FinTech Pulse + Coldplay Live',
    matchScore: 98,
    matchLabel: '98% MATCH • LONG WEEKEND SYNC',
    yieldLabel: 'Highest Yield',
    leaveCost: 1,
    tripDays: 4,
    leaveYieldText: '1d Leave = 4d Trip',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa89aK1Jw26MeGmSexFtUm-dl46PzN-6LjoDcxJq-83VInmb2TK7aalHfDVRv6NHlP1qiIVqt9Nb4HG5j6Z9EslrKW5o8MgcQuPI24tB3u_lE5zb_5RDgtggLpwGtL03DVAhLKuW_UEP8LXywo6JTzsvRfKwX_tGUBrkXCvJ2qIYWj5u7cPY8DJNHlpHvmgCyI-vTZJfvFqFZJD8g2yscGbGOTaMGnbdHW_VhvjmZDLrc3m3SL3ZM',
    imageAlt: 'Tokyo skyline at dusk with Tokyo Tower glowing orange and neon lights of Roppongi in deep indigo and violet shades',
    businessEvent: {
      type: 'Business Keynote',
      dates: 'Aug 8–9',
      title: 'Asia FinTech & AI Summit 2025',
      location: 'Tokyo Big Sight',
      highlights: 'Keynote by BoJ Governor + Generative Finance Panel with top Asian venture funds'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster Partner Tier',
      date: 'Aug 10',
      title: 'Coldplay: Music of the Spheres',
      venue: 'Tokyo Dome',
      tier: 'Arena VIP Pass Blocked • Spotify Synced'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→HND', code: 'Day 1', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 2, dayName: 'FinTech', code: 'Day 2', status: 'National Day', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 3, dayName: 'Coldplay', code: 'Day 3', status: 'Saturday', statusColor: 'text-[#908fa0]' },
      { dayNumber: 4, dayName: 'HND→SIN', code: 'Day 4', status: 'Sunday', statusColor: 'text-[#908fa0]' }
    ],
    bundlePrice: {
      flight: 820,
      hotel: 740,
      ticket: 380,
      affiliateSaving: 280,
      total: 1660,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ634 SIN 08:00 → HND 16:00',
      inbound: 'SQ635 HND 17:00 → SIN 23:15',
      airline: 'Singapore Airlines',
      fare: 'S$820'
    },
    hotelInfo: {
      name: 'Cerulean Tower Tokyu Hotel Shibuya',
      tier: 'Executive King Room with Late Check-out',
      discount: '15% Genius Perk'
    }
  },
  {
    id: 'london-saas-dualipa',
    destination: 'London, UK',
    metroHubCode: 'LON',
    airportCode: 'LHR',
    title: 'SaaS World + Dua Lipa Live',
    matchScore: 94,
    matchLabel: 'DEEP WORK + SONIC VIBES',
    yieldLabel: '300% Multiplier',
    leaveCost: 2,
    tripDays: 6,
    leaveYieldText: '2d Leave = 6d Trip',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZD-awwQ1UIxIKshSpPtGn2IcTJf5klcWu6DUMM7rGP982ad87wPXny_aCfn6AHwC87MbEPVl6ONIHXp38iRzGBcKb6_LVIrtWBsMdivlKhTkxJI-2KN_oouvrIsXUJTxaB6c-sU5gX7fsyvzDJMBZYiuMyixXA60bHB-CREKqF6-XHMC0CbdRrfCkQ_ZgN8PuOcRTsW1LipfM5mV5y3JzPRJLooJTd349cijhOp2H-LtXsFMnQtY',
    imageAlt: 'London skyline at twilight featuring the River Thames, modern glass architecture, moody reflections, London Eye',
    businessEvent: {
      type: 'Business Summit',
      dates: 'Sep 18–19',
      title: 'Global SaaS & Cloud Expo Europe',
      location: 'ExCeL London',
      highlights: 'Enterprise Cloud Architecture & C-Suite Breakouts across 12 keynote tracks'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster Alert',
      date: 'Sep 20',
      title: 'Dua Lipa: Radical Optimism Tour',
      venue: 'Wembley Stadium',
      tier: 'Club Wembley Tier 1 Access • Private Lounge Pass'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'ExCeL Day 1', code: 'Thu 18', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'Keynote', code: 'Fri 19', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Wembley', code: 'Sat 20', status: 'Weekend', statusColor: 'text-[#908fa0]' },
      { dayNumber: 4, dayName: 'West End', code: 'Mon 22', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' }
    ],
    bundlePrice: {
      flight: 1140,
      hotel: 980,
      ticket: 420,
      affiliateSaving: 320,
      total: 2220,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ308 SIN 09:00 → LHR 15:40',
      inbound: 'SQ317 LHR 11:25 → SIN 07:30 (+1)',
      airline: 'Singapore Airlines',
      fare: 'S$1,140'
    },
    hotelInfo: {
      name: 'The Hoxton, Holborn & Shoreditch',
      tier: 'Cosy Executive Double',
      discount: 'Expedia Corporate Package'
    }
  },
  {
    id: 'singapore-switch-f1',
    destination: 'Singapore Domestic',
    metroHubCode: 'SIN',
    airportCode: 'SIN',
    title: 'SWITCH + Singapore GP Nights',
    matchScore: 99,
    matchLabel: '0 DAYS PTO • DOMESTIC POWER BLOCK',
    yieldLabel: 'Zero Burn',
    leaveCost: 0,
    tripDays: 4,
    leaveYieldText: '0 Days PTO',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI8HvRrTiRMKOP9KoYbABRhnStzpsfvkU3U4bPLz-g62fgtGLg2NJvuwfZgfteL5EcLJ0egh2fg0UDH2GNQO7iMuUxMR0ftWih-3vXQivWlfAtvAV74BNgJbzCatSfb7jknqBWfkSJCRCCXVsixzUtLlv8RlMTYKjlqytL3gcJwIRK9f5hw_h4HEneh6ovy2miIuhRx-N490IMzmtw2gTKidgVR4wY7CMLXvVgSy3ldFmYycDE6Uw',
    imageAlt: 'Singapore Marina Bay illuminated at night during Grand Prix week, supercars racing past illuminated skyline',
    businessEvent: {
      type: 'Deep Tech Flagship',
      dates: 'Oct 28–30',
      title: 'SWITCH Singapore (Tech Week)',
      location: 'Marina Bay Sands Expo',
      highlights: 'Global Venture Matchmaking, Deep Tech Slingshot Finals, 15,000+ Founders'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster SG',
      date: 'Padang Stage',
      title: 'F1 Night Race Headliners',
      venue: 'Padang Main Stage',
      tier: 'Post-Race Live Concert Pass & VIP Pit Viewing'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'MBS Expo', code: 'Day 1', status: 'After Hours', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'Venture Pitch', code: 'Day 2', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Qualifying', code: 'Day 3', status: 'Friday Eve', statusColor: 'text-[#908fa0]' },
      { dayNumber: 4, dayName: 'Concert Set', code: 'Day 4', status: 'Weekend', statusColor: 'text-[#908fa0]' }
    ],
    bundlePrice: {
      flight: 0,
      hotel: 650,
      ticket: 480,
      affiliateSaving: 190,
      total: 940,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'Domestic Staycation (No Flight)',
      inbound: 'MRT Bayfront / City Hall',
      airline: 'Direct Access',
      fare: 'S$0'
    },
    hotelInfo: {
      name: 'Marina Bay Sands Hotel & Casino',
      tier: 'Harbour Suite Bleisure Access',
      discount: 'Priority Concierge Pass'
    }
  },
  {
    id: 'sydney-ai-billie',
    destination: 'Sydney, Australia',
    metroHubCode: 'SYD',
    airportCode: 'SYD',
    title: 'AI Innovate Oceania + Billie Eilish Live',
    matchScore: 92,
    matchLabel: 'PACIFIC HUB SYNC',
    yieldLabel: '3.5x Multiplier',
    leaveCost: 2,
    tripDays: 5,
    leaveYieldText: '2d Leave = 5d Trip',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sydney Harbour at twilight with Sydney Opera House illuminated with colored lights',
    businessEvent: {
      type: 'AI & Data Summit',
      dates: 'Nov 12–13',
      title: 'AI Innovate Oceania 2025',
      location: 'ICC Sydney, Darling Harbour',
      highlights: 'Autonomous Agents, LLM Deployment in Enterprise, APAC Keynotes'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster AU',
      date: 'Nov 14',
      title: 'Billie Eilish: Hit Me Hard and Soft Tour',
      venue: 'Qudos Bank Arena',
      tier: 'Lower Bowl Gold Tier • Express Check-in'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→SYD', code: 'Wed 12', status: 'Fly Night', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'ICC Keynote', code: 'Thu 13', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Billie Eilish', code: 'Fri 14', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 4, dayName: 'Bondi Coastal', code: 'Sat 15', status: 'Weekend', statusColor: 'text-[#908fa0]' }
    ],
    bundlePrice: {
      flight: 780,
      hotel: 690,
      ticket: 340,
      affiliateSaving: 210,
      total: 1600,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ231 SIN 00:45 → SYD 11:40',
      inbound: 'SQ222 SYD 16:10 → SIN 21:20',
      airline: 'Singapore Airlines',
      fare: 'S$780'
    },
    hotelInfo: {
      name: 'Sofitel Sydney Darling Harbour',
      tier: 'Luxury Skyline Harbour View',
      discount: '12% Bleisure Rate'
    }
  },
  {
    id: 'melbourne-austech-oasis',
    destination: 'Melbourne, Australia',
    metroHubCode: 'MEL',
    airportCode: 'MEL',
    title: 'AusTech Summit + Oasis Live',
    matchScore: 96,
    matchLabel: 'TICKETMASTER AU HIGHLIGHT',
    yieldLabel: 'Long Weekend Sync',
    leaveCost: 1,
    tripDays: 4,
    leaveYieldText: '1d Leave = 4d Trip',
    heroImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Melbourne skyline and Yarra River illuminated at twilight with modern bridges and city lights',
    businessEvent: {
      type: 'Developer & Cloud Summit',
      dates: 'Oct 16–17',
      title: 'AusTech & Cloud Innovation Expo',
      location: 'Melbourne Convention & Exhibition Centre (MCEC)',
      highlights: 'Distributed Systems, High-Concurrency APIs, VC pitch sessions'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster AU Partner',
      date: 'Oct 18',
      title: 'Oasis: Live ’25 Reunion Tour',
      venue: 'Marvel Stadium, Docklands',
      tier: 'Level 1 Reserved • Priority Fan Entry'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→MEL', code: 'Thu 16', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 2, dayName: 'MCEC Plenary', code: 'Fri 17', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Oasis Marvel', code: 'Sat 18', status: 'Weekend', statusColor: 'text-[#ddb7ff]' },
      { dayNumber: 4, dayName: 'MEL→SIN', code: 'Sun 19', status: 'Return', statusColor: 'text-[#908fa0]' }
    ],
    bundlePrice: {
      flight: 720,
      hotel: 640,
      ticket: 320,
      affiliateSaving: 240,
      total: 1440,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ227 SIN 21:00 → MEL 06:20 (+1)',
      inbound: 'SQ238 MEL 11:30 → SIN 17:15',
      airline: 'Singapore Airlines',
      fare: 'S$720'
    },
    hotelInfo: {
      name: 'W Melbourne, Flinders Lane',
      tier: 'Spectacular King Room',
      discount: '15% Genius Discount'
    }
  },
  {
    id: 'sanfrancisco-ai-brunomars',
    destination: 'San Francisco, USA',
    metroHubCode: 'SFO',
    airportCode: 'SFO/OAK',
    title: 'Disrupt AI Nexus + Bruno Mars Live',
    matchScore: 97,
    matchLabel: 'SILICON VALLEY POWER PASS',
    yieldLabel: '350% Multiplier',
    leaveCost: 3,
    tripDays: 7,
    leaveYieldText: '3d Leave = 7d Trip',
    heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'San Francisco Golden Gate Bridge at sunset with deep orange and indigo lighting',
    businessEvent: {
      type: 'Global Tech Flagship',
      dates: 'Oct 21–23',
      title: 'TechCrunch Disrupt & AI Builders Summit',
      location: 'Moscone Center West, San Francisco',
      highlights: 'Foundation Models, Autonomous Agent Demo Day, Y Combinator Network'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster US VIP',
      date: 'Oct 24',
      title: 'Bruno Mars: Live in the Bay',
      venue: 'Chase Center, Mission Bay',
      tier: 'Club Suite 102 • Pre-show Lounge Access'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→SFO', code: 'Mon 20', status: 'Non-stop SQ', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'Disrupt Day 1', code: 'Tue 21', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'AI Keynote', code: 'Wed 22', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 4, dayName: 'Bruno Mars', code: 'Fri 24', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' }
    ],
    bundlePrice: {
      flight: 1480,
      hotel: 1350,
      ticket: 490,
      affiliateSaving: 410,
      total: 2910,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ32 SIN 09:15 → SFO 08:35 (Same Day Non-stop)',
      inbound: 'SQ31 SFO 10:40 → SIN 18:30 (+1)',
      airline: 'Singapore Airlines (A350-900ULR)',
      fare: 'S$1,480'
    },
    hotelInfo: {
      name: '1 Hotel San Francisco, Embarcadero',
      tier: 'Ferry Building Skyline View',
      discount: 'Corporate Expedia Bleisure 18%'
    }
  },
  {
    id: 'seoul-ai-postmalone',
    destination: 'Seoul, South Korea',
    metroHubCode: 'SEL',
    airportCode: 'ICN/GMP',
    title: 'Korea AI Week + Post Malone Live',
    matchScore: 95,
    matchLabel: 'K-TECH & ENTERTAINMENT SYNC',
    yieldLabel: '4-Day Bleisure',
    leaveCost: 1,
    tripDays: 4,
    leaveYieldText: '1d Leave = 4d Trip',
    heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Seoul cityscape illuminated at night with N Seoul Tower and modern Gangnam high-rises',
    businessEvent: {
      type: 'Enterprise AI Summit',
      dates: 'Sep 04–05',
      title: 'Seoul AI & Semiconductor Forum',
      location: 'COEX Convention Center, Gangnam',
      highlights: 'High-Bandwidth Memory (HBM), LLM Hardware Accelerators, Samsung & SK Hynix Panels'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster KR',
      date: 'Sep 06',
      title: 'Post Malone: The Diamond Tour',
      venue: 'KSPO Dome, Olympic Park',
      tier: 'VIP Floor Stand • Fast Track'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→ICN', code: 'Thu 04', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 2, dayName: 'COEX Forum', code: 'Fri 05', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'KSPO Dome', code: 'Sat 06', status: 'Concert', statusColor: 'text-[#ddb7ff]' },
      { dayNumber: 4, dayName: 'ICN→SIN', code: 'Sun 07', status: 'Return', statusColor: 'text-[#908fa0]' }
    ],
    bundlePrice: {
      flight: 690,
      hotel: 580,
      ticket: 280,
      affiliateSaving: 190,
      total: 1360,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ608 SIN 00:10 → ICN 07:45',
      inbound: 'SQ609 ICN 16:35 → SIN 22:00',
      airline: 'Singapore Airlines',
      fare: 'S$690'
    },
    hotelInfo: {
      name: 'Grand InterContinental Seoul Parnas Gangnam',
      tier: 'Club InterContinental Suite',
      discount: '15% Genius Perk'
    }
  },
  {
    id: 'barcelona-mwc-coldplay',
    destination: 'Barcelona, Spain',
    metroHubCode: 'BCN',
    airportCode: 'BCN',
    title: 'Mobile World Tech + Coldplay Live',
    matchScore: 93,
    matchLabel: 'MEDITERRANEAN CIRCUIT',
    yieldLabel: '5-Day Power Trip',
    leaveCost: 2,
    tripDays: 5,
    leaveYieldText: '2d Leave = 5d Trip',
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Barcelona aerial view with Sagrada Familia and Mediterranean seaside bathed in sunset glow',
    businessEvent: {
      type: 'Telecommunications & Mobile Flagship',
      dates: 'Mar 03–04',
      title: 'MWC Barcelona & 4YFN Startup Congress',
      location: 'Fira Gran Via, L’Hospitalet',
      highlights: '6G Prototypes, Edge AI Infrastructure, European Venture Summits'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster ES',
      date: 'Mar 05',
      title: 'Coldplay: Music of the Spheres (Encore)',
      venue: 'Estadi Olímpic Lluís Companys, Montjuïc',
      tier: 'Pista Pista Front Stage'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→BCN', code: 'Mon 03', status: 'Direct Flight', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'MWC Day 1', code: 'Tue 04', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Coldplay Live', code: 'Wed 05', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 4, dayName: 'Gothic Quarter', code: 'Thu 06', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' }
    ],
    bundlePrice: {
      flight: 1240,
      hotel: 860,
      ticket: 350,
      affiliateSaving: 290,
      total: 2160,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ388 SIN 23:45 → BCN 08:30 (+1)',
      inbound: 'SQ387 BCN 12:00 → SIN 07:45 (+1)',
      airline: 'Singapore Airlines',
      fare: 'S$1,240'
    },
    hotelInfo: {
      name: 'W Barcelona, Barceloneta Beach',
      tier: 'Fabulous Mediterranean View Room',
      discount: 'Corporate Bleisure Rate'
    }
  },
  {
    id: 'austin-sxsw-theweeknd',
    destination: 'Austin, Texas, USA',
    metroHubCode: 'AUS',
    airportCode: 'AUS',
    title: 'SXSW Interactive + The Weeknd Live',
    matchScore: 94,
    matchLabel: 'CREATIVE TECH & LIVE SOUND',
    yieldLabel: '6-Day Bleisure',
    leaveCost: 2,
    tripDays: 6,
    leaveYieldText: '2d Leave = 6d Trip',
    heroImage: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Austin Texas skyline across Lady Bird Lake with twilight purple reflections',
    businessEvent: {
      type: 'Creative & Emerging Tech Convergence',
      dates: 'Mar 12–14',
      title: 'SXSW Interactive & AI Showcase',
      location: 'Austin Convention Center & 2nd St District',
      highlights: 'Spatial Computing, AI in Music & Film, Austin Tech Happy Hours'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster US Priority',
      date: 'Mar 15',
      title: 'The Weeknd: After Hours Til Dawn Stadium Tour',
      venue: 'Moody Center, University of Texas',
      tier: 'Floor GA VIP Pit'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→AUS', code: 'Wed 12', status: '1-Stop SFO', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'SXSW Keynote', code: 'Thu 13', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Startup Pitch', code: 'Fri 14', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 4, dayName: 'Moody Center', code: 'Sat 15', status: 'Concert', statusColor: 'text-[#ddb7ff]' }
    ],
    bundlePrice: {
      flight: 1560,
      hotel: 1120,
      ticket: 420,
      affiliateSaving: 360,
      total: 2740,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ32 SIN → SFO + UA1184 SFO → AUS',
      inbound: 'UA1922 AUS → SFO + SQ31 SFO → SIN',
      airline: 'Singapore Airlines + United',
      fare: 'S$1,560'
    },
    hotelInfo: {
      name: 'The LINE Austin, Downtown',
      tier: 'Lake View Studio',
      discount: 'Expedia Event Rate'
    }
  },
  {
    id: 'dubai-gitex-imaginedragons',
    destination: 'Dubai, UAE',
    metroHubCode: 'DXB',
    airportCode: 'DXB',
    title: 'GITEX Global + Imagine Dragons Live',
    matchScore: 96,
    matchLabel: 'MIDDLE EAST GATEWAY',
    yieldLabel: '4-Day Bleisure',
    leaveCost: 1,
    tripDays: 4,
    leaveYieldText: '1d Leave = 4d Trip',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Dubai Burj Khalifa and skyline glowing in deep violet dusk with Dubai Fountain',
    businessEvent: {
      type: 'Mega-Scale Tech & AI Expo',
      dates: 'Oct 14–15',
      title: 'GITEX Global & AI Everything',
      location: 'Dubai World Trade Centre (DWTC)',
      highlights: 'Sovereign AI Infrastructure, Smart Cities, 180,000 Global Tech Executives'
    },
    entertainmentEvent: {
      partner: 'Ticketmaster ME',
      date: 'Oct 16',
      title: 'Imagine Dragons: Loom World Tour',
      venue: 'Coca-Cola Arena, City Walk Dubai',
      tier: 'Golden Circle Standing • Fast Track'
    },
    scheduleSequence: [
      { dayNumber: 1, dayName: 'SIN→DXB', code: 'Tue 14', status: 'Direct Flight', statusColor: 'text-[#908fa0]' },
      { dayNumber: 2, dayName: 'GITEX DWTC', code: 'Wed 15', status: 'Work', statusColor: 'text-[#908fa0]' },
      { dayNumber: 3, dayName: 'Coca-Cola Arena', code: 'Thu 16', status: 'Take PTO', statusColor: 'text-[#ffb2b7]' },
      { dayNumber: 4, dayName: 'DXB→SIN', code: 'Fri 17', status: 'Return', statusColor: 'text-[#908fa0]' }
    ],
    bundlePrice: {
      flight: 850,
      hotel: 720,
      ticket: 310,
      affiliateSaving: 230,
      total: 1650,
      currency: 'S$'
    },
    flightRoute: {
      outbound: 'SQ494 SIN 15:10 → DXB 18:40',
      inbound: 'SQ495 DXB 20:00 → SIN 07:30 (+1)',
      airline: 'Singapore Airlines',
      fare: 'S$850'
    },
    hotelInfo: {
      name: '25hours Hotel One Central, DWTC',
      tier: 'Glamping Room with Trade Centre View',
      discount: '15% Genius Bleisure Rate'
    }
  }
];

export interface GlobalMetroHub {
  id: string;
  name: string;
  city: string;
  country: string;
  airportCode: string;
  region: 'Asia-Pacific' | 'Europe' | 'Americas' | 'Middle East';
  flightFromSin: string;
  directCarrier: string;
}

export const GLOBAL_METRO_HUBS: GlobalMetroHub[] = [
  // Asia-Pacific
  { id: 'singapore', name: 'Singapore Domestic', city: 'Singapore', country: 'Singapore', airportCode: 'SIN', region: 'Asia-Pacific', flightFromSin: '0h (Local Base)', directCarrier: 'MRT / Land Access' },
  { id: 'tokyo', name: 'Tokyo, Japan', city: 'Tokyo', country: 'Japan', airportCode: 'HND/NRT', region: 'Asia-Pacific', flightFromSin: '6h 50m Direct', directCarrier: 'Singapore Airlines (SQ634)' },
  { id: 'seoul', name: 'Seoul, South Korea', city: 'Seoul', country: 'South Korea', airportCode: 'ICN/GMP', region: 'Asia-Pacific', flightFromSin: '6h 15m Direct', directCarrier: 'Singapore Airlines (SQ608)' },
  { id: 'melbourne', name: 'Melbourne, Australia', city: 'Melbourne', country: 'Australia', airportCode: 'MEL', region: 'Asia-Pacific', flightFromSin: '7h 20m Direct', directCarrier: 'Singapore Airlines (SQ227)' },
  { id: 'sydney', name: 'Sydney, Australia', city: 'Sydney', country: 'Australia', airportCode: 'SYD', region: 'Asia-Pacific', flightFromSin: '7h 45m Direct', directCarrier: 'Singapore Airlines (SQ231)' },
  { id: 'hongkong', name: 'Hong Kong', city: 'Hong Kong', country: 'Hong Kong', airportCode: 'HKG', region: 'Asia-Pacific', flightFromSin: '3h 50m Direct', directCarrier: 'Cathay Pacific / SQ' },
  { id: 'bangkok', name: 'Bangkok, Thailand', city: 'Bangkok', country: 'Thailand', airportCode: 'BKK', region: 'Asia-Pacific', flightFromSin: '2h 25m Direct', directCarrier: 'Singapore Airlines / Thai' },
  { id: 'taipei', name: 'Taipei, Taiwan', city: 'Taipei', country: 'Taiwan', airportCode: 'TPE', region: 'Asia-Pacific', flightFromSin: '4h 40m Direct', directCarrier: 'EVA Air / SQ' },

  // Europe
  { id: 'london', name: 'London, United Kingdom', city: 'London', country: 'United Kingdom', airportCode: 'LHR', region: 'Europe', flightFromSin: '13h 25m Direct', directCarrier: 'Singapore Airlines (SQ308)' },
  { id: 'berlin', name: 'Berlin, Germany', city: 'Berlin', country: 'Germany', airportCode: 'BER', region: 'Europe', flightFromSin: '13h 10m', directCarrier: 'Scoot / Lufthansa' },
  { id: 'paris', name: 'Paris, France', city: 'Paris', country: 'France', airportCode: 'CDG', region: 'Europe', flightFromSin: '13h 40m Direct', directCarrier: 'Air France / SQ' },
  { id: 'amsterdam', name: 'Amsterdam, Netherlands', city: 'Amsterdam', country: 'Netherlands', airportCode: 'AMS', region: 'Europe', flightFromSin: '13h 30m Direct', directCarrier: 'KLM / SQ' },
  { id: 'barcelona', name: 'Barcelona, Spain', city: 'Barcelona', country: 'Spain', airportCode: 'BCN', region: 'Europe', flightFromSin: '14h 10m Direct', directCarrier: 'Singapore Airlines (SQ388)' },
  { id: 'zurich', name: 'Zurich, Switzerland', city: 'Zurich', country: 'Switzerland', airportCode: 'ZRH', region: 'Europe', flightFromSin: '12h 55m Direct', directCarrier: 'Swiss / SQ' },

  // Americas
  { id: 'sanfrancisco', name: 'San Francisco & Silicon Valley, USA', city: 'San Francisco', country: 'United States', airportCode: 'SFO', region: 'Americas', flightFromSin: '14h 50m Non-stop', directCarrier: 'Singapore Airlines (SQ32)' },
  { id: 'newyork', name: 'New York City, USA', city: 'New York', country: 'United States', airportCode: 'JFK/EWR', region: 'Americas', flightFromSin: '18h 40m Non-stop', directCarrier: 'Singapore Airlines (SQ24)' },
  { id: 'austin', name: 'Austin, Texas, USA', city: 'Austin', country: 'United States', airportCode: 'AUS', region: 'Americas', flightFromSin: '19h 20m 1-stop', directCarrier: 'SQ + United' },
  { id: 'losangeles', name: 'Los Angeles, USA', city: 'Los Angeles', country: 'United States', airportCode: 'LAX', region: 'Americas', flightFromSin: '15h 10m Non-stop', directCarrier: 'Singapore Airlines (SQ38)' },
  { id: 'toronto', name: 'Toronto, Canada', city: 'Toronto', country: 'Canada', airportCode: 'YYZ', region: 'Americas', flightFromSin: '20h 15m 1-stop', directCarrier: 'Air Canada / SQ' },

  // Middle East
  { id: 'dubai', name: 'Dubai, UAE', city: 'Dubai', country: 'United Arab Emirates', airportCode: 'DXB', region: 'Middle East', flightFromSin: '7h 15m Direct', directCarrier: 'Emirates / SQ' },
  { id: 'doha', name: 'Doha, Qatar', city: 'Doha', country: 'Qatar', airportCode: 'DOH', region: 'Middle East', flightFromSin: '7h 40m Direct', directCarrier: 'Qatar Airways' }
];

export const TOKYO_AGENDA_BLOCKS: AgendaBlock[] = [
  // Track A: Business
  {
    id: 'tokyo-biz-1',
    dayIndex: 0,
    dayLabel: 'THU • AUG 08',
    timeRange: '18:00 - 20:30',
    title: 'VIP Speaker Mixer',
    subtitle: 'Grand Hyatt Roppongi',
    venue: 'Grand Hyatt Tokyo • 6-10-3 Roppongi, Minato City',
    category: 'business',
    notes: 'Invitation-only networking with Bank of Japan delegates and sovereign wealth fund partners. Cocktail attire.'
  },
  {
    id: 'tokyo-biz-2',
    dayIndex: 1,
    dayLabel: 'FRI • AUG 09',
    timeRange: '09:00 - 17:00',
    title: 'Asia FinTech & AI Plenary',
    subtitle: 'Tokyo Big Sight Hall A',
    venue: 'Tokyo Big Sight • 3-11-1 Ariake, Koto City',
    category: 'business',
    badge: 'Keynote',
    badgeType: 'primary',
    isKeynote: true,
    notes: 'BoJ Governor opening statement on tokenized cross-border liquidity followed by AI infrastructure roundtable.'
  },
  {
    id: 'tokyo-biz-3',
    dayIndex: 2,
    dayLabel: 'SAT • AUG 10',
    timeRange: '10:00 - 12:30',
    title: 'Private LP Roundtables',
    subtitle: 'FinTech Founders Lounge',
    venue: 'Roppongi Hills Club • 51st Floor',
    category: 'business',
    notes: 'Closed door LP-GP venture matching with Sequoia Asia & SoftBank Vision Fund delegates.'
  },
  {
    id: 'tokyo-biz-4',
    dayIndex: 3,
    dayLabel: 'SUN • AUG 11',
    timeRange: 'All Day',
    title: 'Off-Duty',
    subtitle: 'No scheduled sessions',
    venue: 'Tokyo City',
    category: 'business',
    notes: 'Free day for leisure or travel back to Singapore.'
  },

  // Track B: Entertainment
  {
    id: 'tokyo-ent-1',
    dayIndex: 0,
    dayLabel: 'THU • AUG 08',
    timeRange: '21:30 - LATE',
    title: 'Vinyl Bar Oiran Night',
    subtitle: 'Shibuya Micro-lounge',
    venue: 'Oiran Warm Up Bar • Shibuya-ku, Tokyo',
    category: 'entertainment',
    notes: 'Curated vinyl DJ sets with local natural wine pairings. VIP corner table reserved for SyncPass members.'
  },
  {
    id: 'tokyo-ent-2',
    dayIndex: 1,
    dayLabel: 'FRI • AUG 09',
    timeRange: '19:30 - 22:00',
    title: 'Omakase Ginza Session',
    subtitle: 'Reserved Bleisure Concierge',
    venue: 'Ginza Iwa • 8-5-6 Ginza, Chuo City',
    category: 'entertainment',
    notes: '18-course seasonal Edomae sushi experience with sake pairing after the FinTech plenary.'
  },
  {
    id: 'tokyo-ent-3',
    dayIndex: 2,
    dayLabel: 'SAT • AUG 10',
    timeRange: '17:00 Gates • 19:30 Show',
    title: 'Coldplay Live at Tokyo Dome',
    subtitle: 'Gate 22 Arena Stand A3',
    venue: 'Tokyo Dome • 1-3-61 Koraku, Bunkyo City',
    category: 'entertainment',
    badge: 'TICKETMASTER VIP',
    badgeType: 'secondary',
    isKeynote: true,
    notes: 'Music of the Spheres World Tour. Includes early stadium entry, exclusive merch bundle, and dedicated VIP lounge access.'
  },
  {
    id: 'tokyo-ent-4',
    dayIndex: 3,
    dayLabel: 'SUN • AUG 11',
    timeRange: '11:00 - 15:00',
    title: 'Daikanyama Vinyl Tour',
    subtitle: 'Tsutaya Books & Records',
    venue: 'Daikanyama T-Site • Sarugakucho, Shibuya City',
    category: 'entertainment',
    notes: 'Audio-phile listening lounges, indie bookstores, and mid-century architecture walk before airport departure.'
  },

  // Track C: Logistics & PTO
  {
    id: 'tokyo-log-1',
    dayIndex: 0,
    dayLabel: 'THU • AUG 08',
    timeRange: 'Dep SIN 08:00 • Arr HND 16:00',
    title: 'SQ634 (SIN → HND)',
    subtitle: 'PTO Day #1 Taken',
    venue: 'Changi Airport Terminal 3 → Haneda Terminal 3',
    category: 'logistics',
    badge: 'PTO #1',
    badgeType: 'tertiary',
    notes: 'Singapore Airlines B777-300ER. Seat 14A. Includes complimentary high-speed in-flight Wi-Fi for working on route.'
  },
  {
    id: 'tokyo-log-2',
    dayIndex: 1,
    dayLabel: 'FRI • AUG 09',
    timeRange: 'Singapore National Day • Paid Public Day Off',
    title: 'Singapore Public Holiday',
    subtitle: '0 PTO Spent • SG Holiday Anchor',
    venue: 'Singapore Gazette National Holiday',
    category: 'logistics',
    badge: '0 PTO Spent',
    badgeType: 'tertiary',
    notes: 'Statutory public holiday across Singapore. Full workday off with zero PTO deduction from your 14-day annual balance.'
  },
  {
    id: 'tokyo-log-3',
    dayIndex: 2,
    dayLabel: 'SAT • AUG 10',
    timeRange: 'Check-out Sun 12:00 • Late Lounge Access',
    title: 'Cerulean Tower Shibuya',
    subtitle: 'Booking.com Genius 15% Off',
    venue: '26-1 Sakuragaokacho, Shibuya City',
    category: 'logistics',
    badge: 'Booking.com',
    badgeType: 'outline',
    notes: 'High-floor suite with Mount Fuji views, concierge baggage storage, and direct express train to Haneda Airport.'
  },
  {
    id: 'tokyo-log-4',
    dayIndex: 3,
    dayLabel: 'SUN • AUG 11',
    timeRange: 'Dep HND 17:00 • Arr SIN 23:15',
    title: 'SQ635 (HND → SIN)',
    subtitle: 'Weekend Return • Ready for Mon Standup',
    venue: 'Haneda Terminal 3 → Changi Terminal 3',
    category: 'logistics',
    badge: 'On Schedule',
    badgeType: 'primary',
    notes: 'Singapore Airlines flight. Arrives in Singapore Sunday night at 23:15, allowing fresh start on Monday morning.'
  }
];

export const CONCERTS_DATABASE: ConcertItem[] = [
  {
    id: 'coldplay-tokyo',
    artist: 'Coldplay',
    tour: 'Music of the Spheres World Tour',
    city: 'Tokyo, Japan',
    venue: 'Tokyo Dome',
    date: 'Aug 10, 2025',
    spotifyStreams: '84.2M Monthly Listeners',
    topTracks: ['Yellow', 'Viva La Vida', 'A Sky Full of Stars', 'Fix You'],
    startingPrice: 'S$240',
    vipStatus: 'Ticketmaster VIP Tier 1 Access Active',
    pairedConference: 'Asia FinTech & AI Summit 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa89aK1Jw26MeGmSexFtUm-dl46PzN-6LjoDcxJq-83VInmb2TK7aalHfDVRv6NHlP1qiIVqt9Nb4HG5j6Z9EslrKW5o8MgcQuPI24tB3u_lE5zb_5RDgtggLpwGtL03DVAhLKuW_UEP8LXywo6JTzsvRfKwX_tGUBrkXCvJ2qIYWj5u7cPY8DJNHlpHvmgCyI-vTZJfvFqFZJD8g2yscGbGOTaMGnbdHW_VhvjmZDLrc3m3SL3ZM',
    categories: [
      { name: 'VIP Floor Experience', price: 480, perks: ['Front stage pit', 'Priority fast-track lane', 'Commemorative eco wristband'], available: true },
      { name: 'Arena Cat 1 Reserved', price: 340, perks: ['Lower tier central sightline', 'Dedicated merch lane'], available: true },
      { name: 'Upper Bowl Cat 2', price: 210, perks: ['Panoramic stadium acoustics', 'General entry'], available: true }
    ]
  },
  {
    id: 'dua-lipa-london',
    artist: 'Dua Lipa',
    tour: 'Radical Optimism Tour',
    city: 'London, UK',
    venue: 'Wembley Stadium',
    date: 'Sep 20, 2025',
    spotifyStreams: '79.5M Monthly Listeners',
    topTracks: ['Houdini', 'Levitating', 'Training Season', "Don't Start Now"],
    startingPrice: 'S$280',
    vipStatus: 'Club Wembley Priority Lounge',
    pairedConference: 'Global SaaS & Cloud Expo Europe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZD-awwQ1UIxIKshSpPtGn2IcTJf5klcWu6DUMM7rGP982ad87wPXny_aCfn6AHwC87MbEPVl6ONIHXp38iRzGBcKb6_LVIrtWBsMdivlKhTkxJI-2KN_oouvrIsXUJTxaB6c-sU5gX7fsyvzDJMBZYiuMyixXA60bHB-CREKqF6-XHMC0CbdRrfCkQ_ZgN8PuOcRTsW1LipfM5mV5y3JzPRJLooJTd349cijhOp2H-LtXsFMnQtY',
    categories: [
      { name: 'Club Wembley VIP Lounge', price: 540, perks: ['Pre-show champagne bar', 'Direct padded seat view', 'Official program'], available: true },
      { name: 'Golden Circle Standing', price: 360, perks: ['Runway adjacent', 'Early stadium entry'], available: true },
      { name: 'Standard Reserved', price: 180, perks: ['Level 2 corner seats'], available: true }
    ]
  },
  {
    id: 'f1-singapore',
    artist: 'F1 Night Race Headliners (Post Malone & Friends)',
    tour: 'Singapore Grand Prix Concert Series',
    city: 'Singapore Domestic',
    venue: 'Marina Bay Street Circuit • Padang Stage',
    date: 'Oct 03–05, 2025',
    spotifyStreams: 'Curated Global Artists',
    topTracks: ['Circles', 'Sunflower', 'Chemical', 'Rockstar'],
    startingPrice: 'S$380',
    vipStatus: 'Padang Grandstand + Concert All-Access',
    pairedConference: 'SWITCH Singapore (Tech Week)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI8HvRrTiRMKOP9KoYbABRhnStzpsfvkU3U4bPLz-g62fgtGLg2NJvuwfZgfteL5EcLJ0egh2fg0UDH2GNQO7iMuUxMR0ftWih-3vXQivWlfAtvAV74BNgJbzCatSfb7jknqBWfkSJCRCCXVsixzUtLlv8RlMTYKjlqytL3gcJwIRK9f5hw_h4HEneh6ovy2miIuhRx-N490IMzmtw2gTKidgVR4wY7CMLXvVgSy3ldFmYycDE6Uw',
    categories: [
      { name: '3-Day Padang Grandstand', price: 598, perks: ['Turn 9 views', 'Concert zone 4 access', 'Screen coverage'], available: true },
      { name: 'Single Day Friday Pass', price: 228, perks: ['Practice session + Friday headliner'], available: true }
    ]
  },
  {
    id: 'oasis-berlin',
    artist: 'Oasis',
    tour: 'Oasis Live ’25 Reunion Tour',
    city: 'Berlin, Germany',
    venue: 'Olympiastadion Berlin',
    date: 'Jul 26, 2025',
    spotifyStreams: '32.1M Monthly Listeners',
    topTracks: ["Wonderwall", "Don't Look Back in Anger", "Champagne Supernova", "Live Forever"],
    startingPrice: 'S$310',
    vipStatus: 'Verified Fan Allocation Reserved',
    pairedConference: 'Tech Open Air Berlin (TOA)',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    categories: [
      { name: 'Pitch Standing Front', price: 390, perks: ['Early entry', 'Souvenir badge'], available: true },
      { name: 'Grandstand Tier 1', price: 290, perks: ['Numbered central seats'], available: true }
    ]
  },
  {
    id: 'billie-sydney',
    artist: 'Billie Eilish',
    tour: 'Hit Me Hard and Soft: The Tour',
    city: 'Sydney, Australia',
    venue: 'Qudos Bank Arena',
    date: 'Nov 14, 2025',
    spotifyStreams: '91.8M Monthly Listeners',
    topTracks: ['Birds of a Feather', 'Lunch', 'Bad Guy', 'Ocean Eyes'],
    startingPrice: 'S$260',
    vipStatus: 'Ticketmaster AU Partner Reserve',
    pairedConference: 'AI Innovate Oceania',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    categories: [
      { name: 'Floor General Admission', price: 320, perks: ['Standing floor access'], available: true },
      { name: 'Lower Bowl Reserved', price: 250, perks: ['Optimal acoustics'], available: true }
    ]
  }
];

export const CONFERENCES_DATABASE: ConferenceItem[] = [
  {
    id: 'asia-fintech-tokyo',
    name: 'Asia FinTech & AI Summit 2025',
    theme: 'Sovereign Digital Assets & AI Wealth Engines',
    city: 'Tokyo, Japan',
    venue: 'Tokyo Big Sight • Odaiba',
    dates: 'Aug 8–9, 2025',
    attendees: '8,500+ Financial Executives',
    keynoteSpeakers: ['Kazuo Ueda (Governor, Bank of Japan)', 'Masayoshi Son (SoftBank)', 'Vitalik Buterin', 'Jenny Lee (GGV)'],
    passPrice: 'S$850 (Corporate Early Bird)',
    pairedConcert: 'Coldplay: Music of the Spheres (Tokyo Dome)',
    trackHighlights: ['Tokenized Treasury Settlements', 'RegTech & Compliance LLMs', 'Cross-Border APAC FX Rails']
  },
  {
    id: 'switch-singapore',
    name: 'SWITCH Singapore (Singapore Week of Innovation & Tech)',
    theme: 'Deep Tech, Space Systems & Health Innovation',
    city: 'Singapore Domestic',
    venue: 'Marina Bay Sands Expo & Convention Centre',
    dates: 'Oct 28–30, 2025',
    attendees: '15,000+ Founders & VCs',
    keynoteSpeakers: ['Enterprise Singapore Ministers', 'MIT Media Lab Directors', 'Temasek Holdings Leadership'],
    passPrice: 'S$350 (Free for SG Residents with Corporate Accreditation)',
    pairedConcert: 'Singapore Grand Prix Night Concerts',
    trackHighlights: ['Deep Tech Slingshot Global Finals', 'Quantum Computing Sandbox', 'Sustainable Urban Agri-Tech']
  },
  {
    id: 'saas-cloud-london',
    name: 'Global SaaS & Cloud Expo Europe',
    theme: 'Enterprise Scalability, Multi-Cloud & AI Security',
    city: 'London, UK',
    venue: 'ExCeL London',
    dates: 'Sep 18–19, 2025',
    attendees: '12,000+ Software Leaders',
    keynoteSpeakers: ['Satya Nadella (Keynote Telecast)', 'Guillermo Rauch (Vercel)', 'Florian Douetteau (Dataiku)'],
    passPrice: 'S$1,100 (Full Delegate Pass)',
    pairedConcert: 'Dua Lipa: Radical Optimism Tour (Wembley Stadium)',
    trackHighlights: ['Edge Computing & Inference Latency', 'Next-Gen FinOps', 'Zero Trust Enterprise IAM']
  },
  {
    id: 'toa-berlin',
    name: 'Tech Open Air Berlin (TOA 2025)',
    theme: 'Creative Technology, Philosophy & Future Mobility',
    city: 'Berlin, Germany',
    venue: 'Funkhaus Berlin',
    dates: 'Jul 24–25, 2025',
    attendees: '6,000+ Innovators & Artists',
    keynoteSpeakers: ['European Innovation Commissioner', 'Ableton Founder', 'Mistral AI Chief Scientist'],
    passPrice: 'S$720',
    pairedConcert: 'Oasis Live ’25 (Olympiastadion Berlin)',
    trackHighlights: ['Creative AI in Sound & Design', 'Decentralized Science (DeSci)', 'European Sovereign Cloud']
  }
];

export const SINGAPORE_PUBLIC_HOLIDAYS_2025: PublicHoliday[] = [
  {
    id: 'new-years',
    name: "New Year's Day",
    date: '2025-01-01',
    dayOfWeek: 'Wednesday',
    ptoRecommendation: 'Take Thu & Fri (Jan 2-3) to get a 5-day continuous holiday',
    unlockedDays: 5,
    leaveDaysCost: 2
  },
  {
    id: 'cny',
    name: 'Chinese New Year',
    date: '2025-01-29',
    dayOfWeek: 'Wednesday & Thursday',
    ptoRecommendation: 'Take Fri Jan 31 to unlock a 5-day holiday block (Jan 29 - Feb 2)',
    unlockedDays: 5,
    leaveDaysCost: 1
  },
  {
    id: 'hari-raya-puasa',
    name: 'Hari Raya Puasa',
    date: '2025-03-31',
    dayOfWeek: 'Monday',
    ptoRecommendation: 'Automatic 3-day long weekend (Sat Mar 29 - Mon Mar 31). Zero PTO needed!',
    unlockedDays: 3,
    leaveDaysCost: 0
  },
  {
    id: 'good-friday',
    name: 'Good Friday',
    date: '2025-04-18',
    dayOfWeek: 'Friday',
    ptoRecommendation: 'Automatic 3-day long weekend (Fri Apr 18 - Sun Apr 20). Take Mon Apr 21 for 4 days.',
    unlockedDays: 4,
    leaveDaysCost: 1
  },
  {
    id: 'labour-day',
    name: 'Labour Day',
    date: '2025-05-01',
    dayOfWeek: 'Thursday',
    ptoRecommendation: 'Take Fri May 2 to get a 4-day weekend (Thu May 1 - Sun May 4)',
    unlockedDays: 4,
    leaveDaysCost: 1
  },
  {
    id: 'vesak-day',
    name: 'Vesak Day',
    date: '2025-05-12',
    dayOfWeek: 'Monday',
    ptoRecommendation: 'Automatic 3-day long weekend. Pair with Tech Week for 9 days using 4 PTO.',
    unlockedDays: 9,
    leaveDaysCost: 4
  },
  {
    id: 'hari-raya-haji',
    name: 'Hari Raya Haji',
    date: '2025-06-07',
    dayOfWeek: 'Saturday (Observed Mon)',
    ptoRecommendation: 'Monday Jun 9 declared public holiday. 3-day weekend.',
    unlockedDays: 3,
    leaveDaysCost: 0
  },
  {
    id: 'national-day',
    name: 'National Day of Singapore',
    date: '2025-08-09',
    dayOfWeek: 'Saturday (Observed Fri/Mon)',
    ptoRecommendation: 'Take Thu Aug 8 -> Enjoy 4 to 5 Days in Tokyo / Bali with 1 day leave!',
    unlockedDays: 4,
    leaveDaysCost: 1
  },
  {
    id: 'deepavali',
    name: 'Deepavali',
    date: '2025-10-20',
    dayOfWeek: 'Monday',
    ptoRecommendation: 'Automatic 3-day long weekend (Sat Oct 18 - Mon Oct 20). Zero PTO required.',
    unlockedDays: 3,
    leaveDaysCost: 0
  },
  {
    id: 'christmas',
    name: 'Christmas Day',
    date: '2025-12-25',
    dayOfWeek: 'Thursday',
    ptoRecommendation: 'Take Fri Dec 26 -> Enjoy 4-day Christmas getaway (Dec 25 - Dec 28).',
    unlockedDays: 4,
    leaveDaysCost: 1
  }
];

export const INITIAL_BOOKED_TRIPS: BookedTrip[] = [
  {
    id: 'trip-tokyo-demo',
    destination: 'Tokyo, Japan',
    dates: 'Aug 8 – Aug 11, 2025',
    matchTitle: 'FinTech Pulse + Coldplay Live (Tokyo Dome)',
    ptoDaysUsed: 1,
    tripDaysUnlocked: 4,
    flightCode: 'SQ634 / SQ635 (Singapore Airlines)',
    hotelName: 'Cerulean Tower Tokyu Hotel Shibuya',
    concertPass: 'Ticketmaster VIP Arena Stand A3',
    totalPaid: 1660,
    affiliateDiscount: 280,
    status: 'Confirmed'
  }
];
