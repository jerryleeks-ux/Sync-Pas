import type { Request, Response } from 'express';

const DATA_GOV_SG_ENDPOINT =
  'https://data.gov.sg/api/action/datastore_search?resource_id=d_8ef23381f9417e4d4254ee8b4dcdb176';

export async function fetchSingaporeHolidays(limit: number = 100) {
  const url = `${DATA_GOV_SG_ENDPOINT}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Data.gov.sg API responded with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export default async function handler(req: Request, res: Response) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;
    const data = await fetchSingaporeHolidays(limit);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      source: 'data.gov.sg',
      resource_id: 'd_8ef23381f9417e4d4254ee8b4dcdb176',
      data
    });
  } catch (error: any) {
    console.error('Error fetching Singapore Public Holidays:', error);
    return res.status(502).json({
      success: false,
      source: 'data.gov.sg',
      error: error.message || 'Failed to fetch Singapore Public Holidays from data.gov.sg'
    });
  }
}
