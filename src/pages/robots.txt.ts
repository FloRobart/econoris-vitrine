import type { APIRoute } from 'astro';

/**
 * Tous les robots sont autorisés, y compris ceux des moteurs IA :
 * être lu par eux est la condition pour être cité dans leurs réponses.
 */
const AI_BOTS = [
  'GPTBot', // OpenAI (entraînement)
  'OAI-SearchBot', // ChatGPT Search
  'ChatGPT-User', // ChatGPT quand un utilisateur demande une page
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini
  'Applebot-Extended',
  'Bingbot', // alimente aussi Copilot et ChatGPT Search
  'DuckAssistBot',
  'MistralAI-User',
  'CCBot',
];

export const GET: APIRoute = ({ site }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
