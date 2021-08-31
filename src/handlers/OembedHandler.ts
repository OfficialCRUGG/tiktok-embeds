import { FastifyReply, FastifyRequest } from 'fastify';

import { Catch } from '@dustinrouillard/fastify-utilities/modules/response';
import { Debug } from '@dustinrouillard/fastify-utilities/modules/logger';

export function json(request: FastifyRequest, reply: FastifyReply): void {
  const query = request.query as Record<string, string>;
  try {
    const json = {
      author_name: query.description || null,
      author_url: query.url || null,
      provider_name: query.siteTitle || null,
      provider_url: query.siteUrl || null,
      title: query.title || null,
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
