import type { APIRoute } from 'astro';
import { buildLlms } from '../lib/llms';

export const GET: APIRoute = async ({ site }) =>
  new Response(await buildLlms(site, true), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
