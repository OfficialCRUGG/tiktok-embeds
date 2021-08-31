import { FastifyReply, FastifyRequest } from 'fastify';

import { Catch } from '@dustinrouillard/fastify-utilities/modules/response';
import { Debug } from '@dustinrouillard/fastify-utilities/modules/logger';

import * as tiktok from 'tiktok-scraper';
import { getMetaTags, returnVideo } from '../helpers';
import { hostname } from 'os';

export function json(request: FastifyRequest, reply: FastifyReply): void {
  const query = request.query as Record<string, string>;
  try {
    const json = {
      author_name: query.description || null,
      author_url: query.url || null,
      provider_name: query.siteTitle,
      provider_url: query.siteUrl,
      title: query.title,
      type: 'video',
      version: '1.0',
    };

    reply.type('application/json');
    reply.send(JSON.stringify(json));
  } catch (error) {
    Debug(error);
    return Catch(reply, error);
  }
}
