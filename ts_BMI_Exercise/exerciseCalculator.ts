export interface analysis {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInfo {
  target: number;
  dailyHours: number[];
}

const validateArgs = (args: string[]): boolean => {
  if (args.length === 0) return true;
  return isNaN(Number(args[0])) ? false : validateArgs(args.slice(1));
};

const parseExerciseArgs = (args: string[]): ExerciseInfo => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (validateArgs(args.slice(2))) {
    return {
      target: Number(args[2]),
      dailyHours: args.slice(3).map((arg) => Number(arg))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const generateDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return 'Great job! Keep up the good work!';
    case 2:
      return "You're almost there, just a little extra push this week!";
    case 1:
      return "Let's think about setting a more manageable target and working up from there!";
    default:
      return "Well that shouldn't have happened...";
  }
};

export const calculateExercises = (
  dailyHours: number[],
  target: number
): analysis => {
  const average =
    dailyHours.reduce((total, hour) => hour + total, 0) / dailyHours.length;
  const rating = average >= target ? 3 : average >= target / 2 ? 2 : 1;
  const retObj = {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.reduce(
      (total, hour) => (hour > 0 ? total + 1 : total),
      0
    ),
    success: average >= target,
    rating,
    ratingDescription: generateDescription(rating),
    target,
    average
  };

  return retObj;
};

try {
  const { target, dailyHours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
