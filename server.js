import express from 'express';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import dotenv from 'dotenv';

dotenv.config()
const app = express();

app.get('/', (req, res) => {
  throw new Error('error');
  res.send('Welcome!');
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}...`);
});
