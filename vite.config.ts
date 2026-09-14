import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'node:https'
import type { Plugin } from 'vite'

function anthropicProxy(): Plugin {
  return {
    name: 'anthropic-proxy',
    configureServer(server) {
      server.middlewares.use('/api/anthropic/v1/messages', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405);
          res.end();
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => {
          const body = Buffer.concat(chunks);
          const raw = req.headers['x-api-key'];
          const apiKey = Array.isArray(raw) ? raw[0] : (raw ?? '');

          console.log('[Anthropic] key prefix:', apiKey.slice(0, 24) + '...');

          const proxyReq = https.request(
            {
              hostname: 'api.anthropic.com',
              port: 443,
              path: '/v1/messages',
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-length': body.length,
              },
            },
            (proxyRes) => {
              const parts: Buffer[] = [];
              proxyRes.on('data', (c: Buffer) => parts.push(c));
              proxyRes.on('end', () => {
                const responseBody = Buffer.concat(parts);
                console.log('[Anthropic] status:', proxyRes.statusCode);
                console.log('[Anthropic] body:', responseBody.toString().slice(0, 300));
                res.writeHead(proxyRes.statusCode ?? 500, { 'content-type': 'application/json' });
                res.end(responseBody);
              });
            }
          );

          proxyReq.on('error', (err: Error) => {
            console.error('[Anthropic] request error:', err.message);
            res.writeHead(502);
            res.end(JSON.stringify({ error: { message: err.message } }));
          });

          proxyReq.end(body);
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), anthropicProxy()],
})
