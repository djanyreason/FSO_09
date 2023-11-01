import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRouter';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3032;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
