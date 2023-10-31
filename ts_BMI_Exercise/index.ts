import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) res.status(400).json({ error: 'missing parameters' });
  else if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.status(400).json({ error: 'malformatted parameters' });
  else {
    const responseJSON = {
      height: Number(height),
      weight: Number(weight),
      bmi: calculateBmi(Number(height), Number(weight))
    };
    res.json(responseJSON);
  }
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
