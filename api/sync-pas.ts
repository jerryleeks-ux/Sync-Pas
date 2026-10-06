import type { Request, Response } from 'express';
import { fetchSingaporeHolidays } from './singapore-holidays';
import { fetchDeveloperEvents } from './developer-events';
import { fetchTicketmasterEvents } from './ticketmaster';

export interface SyncPasResponse {
  timestamp: string;
  sources: {
    singaporeHolidays: {
      status: 'success' | 'error';
      endpoint: string;
      recordCount?: number;
      records?: any[];
      error?: string;
    };
    developerEvents: {
      status: 'success' | 'error';
      endpoint: string;
      eventCount?: number;
      events?: any[];
      error?: string;
    };
    ticketmaster: {
      status: 'success' | 'skipped' | 'error';
      endpoint: string;
      configured: boolean;
      eventCount?: number;
      events?: any[];
      error?: string;
      notice?: string;
    };
  };
}

export default async function handler(req: Request, res: Response) {
  const tmApiKey =
    process.env.TICKETMASTER_API_KEY ||
    (req.headers['keyid'] as string) ||
    (req.headers['x-ticketmaster-key'] as string) ||
    (req.query.apikey as string);

  const dataGovApiKey =
    (req.headers['x-api-key'] as string) ||
    (req.query.data_gov_api_key as string);

  const countryCode = (req.query.countryCode as string) || 'AU';
  const city = (req.query.city as string) || 'Melbourne';
  const holidaysLimit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;

  const result: SyncPasResponse = {
    timestamp: new Date().toISOString(),
    sources: {
      singaporeHolidays: {
        status: 'error',
        endpoint:
          'https://data.gov.sg/api/action/datastore_search?resource_id=d_8ef23381f9417e4d4254ee8b4dcdb176'
      },
      developerEvents: {
        status: 'error',
        endpoint: 'https://developers.events/all-events.json'
      },
      ticketmaster: {
        status: 'skipped',
        endpoint: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&city=${city}`,
        configured: Boolean(tmApiKey)
      }
    }
  };

  // Run all 3 fetches concurrently with isolated fault tolerance
  const tasks: Promise<void>[] = [];

  // Task 1: Singapore Public Holidays (header: x-api-key: <DATA_GOV_API_KEY>)
  tasks.push(
    (async () => {
      try {
        const holidaysData = await fetchSingaporeHolidays(holidaysLimit, dataGovApiKey);
        const records = holidaysData.result?.records || [];
        result.sources.singaporeHolidays = {
          status: 'success',
          endpoint:
            'https://data.gov.sg/api/action/datastore_search?resource_id=d_8ef23381f9417e4d4254ee8b4dcdb176',
          recordCount: records.length,
          records
        };
      } catch (err: any) {
        console.error('Failed fetching data.gov.sg holidays in sync-pas:', err);
        result.sources.singaporeHolidays.status = 'error';
        result.sources.singaporeHolidays.error = err.message || 'data.gov.sg request failed';
      }
    })()
  );

  // Task 2: Developer Events
  tasks.push(
    (async () => {
      try {
        const eventsData = await fetchDeveloperEvents();
        const eventList = Array.isArray(eventsData) ? eventsData : [];
        result.sources.developerEvents = {
          status: 'success',
          endpoint: 'https://developers.events/all-events.json',
          eventCount: eventList.length,
          events: eventList.slice(0, 100)
        };
      } catch (err: any) {
        console.error('Failed fetching developer events in sync-pas:', err);
        result.sources.developerEvents.status = 'error';
        result.sources.developerEvents.error = err.message || 'developers.events request failed';
      }
    })()
  );

  // Task 3: Ticketmaster Concert Events
  tasks.push(
    (async () => {
      if (!tmApiKey) {
        result.sources.ticketmaster = {
          status: 'skipped',
          endpoint: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&city=${city}&apikey=<TICKETMASTER_API_KEY>`,
          configured: false,
          notice:
            'TICKETMASTER_API_KEY is not set. Include it in environment variables or request headers (KeyId: <TICKETMASTER_API_KEY>).'
        };
        return;
      }

      try {
        const tmData = await fetchTicketmasterEvents({
          apiKey: tmApiKey,
          countryCode,
          city,
          classificationName: 'Music',
          size: 20
        });

        const tmEvents = tmData._embedded?.events || [];
        result.sources.ticketmaster = {
          status: 'success',
          endpoint: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&city=${city}`,
          configured: true,
          eventCount: tmEvents.length,
          events: tmEvents
        };
      } catch (err: any) {
        console.error('Failed fetching Ticketmaster events in sync-pas:', err);
        result.sources.ticketmaster = {
          status: 'error',
          endpoint: `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&city=${city}`,
          configured: true,
          error: err.message || 'Ticketmaster API request failed'
        };
      }
    })()
  );

  await Promise.allSettled(tasks);

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(result);
}
