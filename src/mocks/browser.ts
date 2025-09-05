import { setupWorker } from 'msw/browser';
import { authHandler } from './handlers/authHandler';
import { postHandler } from './handlers/postHandler';

export const worker = setupWorker(...authHandler, ...postHandler);

// worker 로깅
worker.events.on(
  'response:mocked',
  async ({ request, response, requestId }) => {
    let body: unknown = null;
    try {
      body = await response.clone().json();
    } catch {}
    console.log('[MSW][mocked]', requestId, response.status, request.url, body);
  }
);
