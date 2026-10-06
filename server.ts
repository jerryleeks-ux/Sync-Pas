import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import syncPasHandler from './api/sync-pas.ts';
import singaporeHolidaysHandler from './api/singapore-holidays.ts';
import developerEventsHandler from './api/developer-events.ts';
import ticketmasterHandler from './api/ticketmaster.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Endpoints
app.all('/api/health', (req, res) => healthHandler(req, res));
app.all('/api/sync-pas', (req, res) => syncPasHandler(req, res));
app.all('/api/sync-pass', (req, res) => syncPasHandler(req, res));
app.all('/api/singapore-holidays', (req, res) => singaporeHolidaysHandler(req, res));
app.all('/api/developer-events', (req, res) => developerEventsHandler(req, res));
app.all('/api/ticketmaster', (req, res) => ticketmasterHandler(req, res));

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SyncPass server running on port ${PORT}`);
  });
}

startServer();
