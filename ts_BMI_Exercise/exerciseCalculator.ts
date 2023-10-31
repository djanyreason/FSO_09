interface analysis {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

const calculateExercises = (dailyHours: number[], target: number): analysis => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
