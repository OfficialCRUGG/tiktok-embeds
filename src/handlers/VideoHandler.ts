import { FastifyReply, FastifyRequest } from 'fastify';

import { Catch } from '@dustinrouillard/fastify-utilities/modules/response';
import { Debug } from '@dustinrouillard/fastify-utilities/modules/logger';

import * as tiktok from 'tiktok-scraper';
import { getMetaTags, returnVideo } from '../helpers';

export function videoFile(request: FastifyRequest, reply: FastifyReply): void {
  try {
    const params = request.params as Record<string, string>;
    tiktok
      .getVideoMeta(`https://vm.tiktok.com/${params.id}/`)
      .then(async (data) => {
        const video = await returnVideo(data.collector[0].videoUrl, data.headers);

        reply.hijack();

        Object.keys(video.headers).forEach((key) => {
          reply.raw.setHeader(key, video.headers[key]);
        });

        video.data.pipe(reply.raw);
      })
      .catch((error) => {
        Debug(error);
        return Catch(reply, error);
      });
  } catch (error) {
    Debug(error);
    return Catch(reply, error);
  }
}

export function video(request: FastifyRequest, reply: FastifyReply): void {
  const agent = request.headers['user-agent'].toLowerCase();
  const params = request.params as Record<string, string>;
  if (agent.includes('discord') && !agent.includes('telegram')) {
    tiktok.getVideoMeta(`https://vm.tiktok.com/${params.id}/`).then((data) => {
      reply.type('text/html');
      reply.send(getMetaTags(data, request.protocol, request.hostname, params.id));
    });
  } else {
    const appUrl = process.env.URL || `${request.protocol}://${request.hostname}`;
    reply.redirect(`${appUrl}/${params.id}.mp4`);
  }
}
