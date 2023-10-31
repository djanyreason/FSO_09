interface BodyDims {
  height: number;
  weight: number;
}

const parseBMIArgs = (args: string[]): BodyDims => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (10000 * weight) / (height * height);
  if (bmi < 16) return 'Underweight (Severe malnutrition)';
  else if (bmi < 17) return 'Underweight (Moderate malnutrition)';
  else if (bmi < 18.5) return 'Underweight (Moderate malnutrition)';
  else if (bmi < 25)
    return 'Normal range (based on actual observed health outcomes, underweight)';
  else if (bmi < 30)
    return 'Overweight (based on actual observed health outcomes, healthy weight)';
  else if (bmi < 35) return 'Obese (Class I)';
  else if (bmi < 40) return 'Obese (Class II)';
  else return 'Obese (Class III)';
};

try {
  const { height, weight } = parseBMIArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
