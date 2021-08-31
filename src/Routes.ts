import { FastifyInstance, RegisterOptions, FastifyRequest, FastifyReply } from 'fastify';
import * as VideoHandler from './handlers/VideoHandler';
import * as OembedHandler from './handlers/OembedHandler';

export function Routes(server: FastifyInstance, _options: RegisterOptions, next?: () => void): void {
  server.get('/', (_req: FastifyRequest, reply: FastifyReply) => {
    reply.redirect('https://github.com/OfficialCRUGG/tiktok-embeds');
  });

  server.get('/:id.mp4', VideoHandler.videoFile);
  server.get('/:id', VideoHandler.video);
  server.get('/:id/', VideoHandler.video);

  server.get('/oembed.json', OembedHandler.json);

  if (next) next();
}
