import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './lib/logger.ts';
import errorHandler from './middlewares/errorHandler.ts';
import appointmentRoute from './routes/appointment.routes.ts';

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use(appointmentRoute);

app.use((_request, response) => {
	response.status(404).json({
		message: 'Not found'
	});
});

app.use(errorHandler);

export default app;
