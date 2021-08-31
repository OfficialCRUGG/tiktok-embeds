import { FastifyInstance, RegisterOptions } from 'fastify';
import * as VideoHandler from './handlers/VideoHandler';
import * as OembedHandler from './handlers/OembedHandler';

export function Routes(server: FastifyInstance, _options: RegisterOptions, next?: () => void): void {
  server.get('/:id.mp4', VideoHandler.videoFile);
  server.get('/:id', VideoHandler.video);

  server.get('/oembed.json', OembedHandler.json);

  if (next) next();
}
