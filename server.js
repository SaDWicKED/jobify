import express from 'express';

import { mongoConnect } from './db/connect.js';

import authRouter from './routes/authRoutes.js';

import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoConnect();
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}...`)
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
