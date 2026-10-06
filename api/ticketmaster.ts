import type { Request, Response } from 'express';

const TICKETMASTER_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export async function fetchTicketmasterEvents(options: {
  apiKey: string;
  countryCode?: string;
  city?: string;
  classificationName?: string;
  keyword?: string;
  size?: number;
}) {
  const {
    apiKey,
    countryCode = 'AU',
    city = 'Melbourne',
    classificationName = 'Music',
    keyword,
    size = 20
  } = options;

  const url = new URL(TICKETMASTER_BASE_URL);
  url.searchParams.set('countryCode', countryCode);
  url.searchParams.set('city', city);
  url.searchParams.set('classificationName', classificationName);
  url.searchParams.set('size', size.toString());
  url.searchParams.set('apikey', apiKey);

  if (keyword) {
    url.searchParams.set('keyword', keyword);
  }

  // All Ticketmaster related requests need the header: KeyId: <TICKETMASTER_API_KEY>
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      KeyId: apiKey
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ticketmaster API responded with status ${response.status}: ${errorText || response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export default async function handler(req: Request, res: Response) {
  const apiKey =
    process.env.TICKETMASTER_API_KEY ||
    (req.headers['keyid'] as string) ||
    (req.headers['x-ticketmaster-key'] as string) ||
    (req.query.apikey as string);

  if (!apiKey) {
    return res.status(200).json({
      success: false,
      configured: false,
      source: 'ticketmaster',
      message:
        'TICKETMASTER_API_KEY environment variable is not configured yet. Please add TICKETMASTER_API_KEY in your environment secrets.',
      help:
        'Target endpoint: https://app.ticketmaster.com/discovery/v2/events.json?countryCode=AU&city=Melbourne&apikey=<TICKETMASTER_API_KEY> with header: KeyId: <TICKETMASTER_API_KEY>'
    });
  }

  try {
    const countryCode = (req.query.countryCode as string) || 'AU';
    const city = (req.query.city as string) || 'Melbourne';
    const classificationName = (req.query.classificationName as string) || 'Music';
    const keyword = req.query.keyword as string;
    const size = req.query.size ? parseInt(req.query.size as string, 10) : 20;

    const data = await fetchTicketmasterEvents({
      apiKey,
      countryCode,
      city,
      classificationName,
      keyword,
      size
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      configured: true,
      source: 'ticketmaster',
      params: { countryCode, city, classificationName },
      events: data._embedded?.events || [],
      page: data.page || null
    });
  } catch (error: any) {
    console.error('Error fetching Ticketmaster events:', error);
    return res.status(502).json({
      success: false,
      source: 'ticketmaster',
      error: error.message || 'Failed to fetch holiday concert events from Ticketmaster'
    });
  }
}
