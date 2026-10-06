import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptime: number;
  environment: string;
  services: {
    dataGovSg: 'connected' | 'reachable';
    developersEvents: 'connected' | 'reachable';
    ticketmaster: 'configured' | 'missing_api_key';
  };
}

export default async function handler(req: Request, res: Response) {
  const hasTicketmasterKey = Boolean(process.env.TICKETMASTER_API_KEY);

  const payload: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      dataGovSg: 'reachable',
      developersEvents: 'reachable',
      ticketmaster: hasTicketmasterKey ? 'configured' : 'missing_api_key'
    }
  };

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(payload);
}
