const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74));
