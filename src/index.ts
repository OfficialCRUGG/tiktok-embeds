import { config } from 'dotenv';
import { Log, SetConfig } from '@dustinrouillard/fastify-utilities/modules/logger';
import { Logger, Missing } from '@dustinrouillard/fastify-utilities/modules/request';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import { Routes } from './Routes';

config();

SetConfig({ disableTimestamp: true });

const server = fastify();

// Logger
server.register(Logger());

// CORS
server.register(fastifyCors, {
  origin: (_origin, cb) => {
    cb(null, true);
  },
});

// Routes
server.register(Routes);
server.register(Missing);

// Listen
server.listen(process.env.PORT || 6465, '0.0.0.0', () => Log(`Backend running on ${process.env.PORT || 6465}`));
