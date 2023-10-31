import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises)
    return res.status(400).send({ error: 'parameters missing' });

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.reduce(
      (check: boolean, num): boolean => check || isNaN(Number(num)),
      false
    )
  )
    return res.status(400).send({ error: 'malformatted parameters' });

  const exerciseData = [] as number[];
  for (const n of daily_exercises) exerciseData.push(Number(n));

  const retData = calculateExercises(exerciseData, Number(target));

  return res.send(retData);
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
