import type { Request, Response } from 'express';

const DEVELOPERS_EVENTS_ENDPOINT = 'https://developers.events/all-events.json';

export async function fetchDeveloperEvents() {
  const response = await fetch(DEVELOPERS_EVENTS_ENDPOINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`developers.events responded with status ${response.status}: ${response.statusText}`);
  }

  const events = await response.json();
  return events;
}

export default async function handler(req: Request, res: Response) {
  try {
    const rawEvents = await fetchDeveloperEvents();
    const city = (req.query.city as string)?.toLowerCase();
    const country = (req.query.country as string)?.toLowerCase();
    const topic = (req.query.topic as string)?.toLowerCase();

    let filtered = Array.isArray(rawEvents) ? rawEvents : [];

    if (city) {
      filtered = filtered.filter((ev: any) =>
        ev.city?.toLowerCase().includes(city) ||
        ev.location?.toLowerCase().includes(city)
      );
    }

    if (country) {
      filtered = filtered.filter((ev: any) =>
        ev.country?.toLowerCase().includes(country) ||
        ev.location?.toLowerCase().includes(country)
      );
    }

    if (topic) {
      filtered = filtered.filter((ev: any) =>
        ev.name?.toLowerCase().includes(topic) ||
        ev.description?.toLowerCase().includes(topic) ||
        (Array.isArray(ev.topics) && ev.topics.some((t: string) => t.toLowerCase().includes(topic)))
      );
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      source: 'developers.events',
      total: filtered.length,
      events: filtered.slice(0, 100)
    });
  } catch (error: any) {
    console.error('Error fetching developer events:', error);
    return res.status(502).json({
      success: false,
      source: 'developers.events',
      error: error.message || 'Failed to fetch developer conferences from developers.events'
    });
  }
}
