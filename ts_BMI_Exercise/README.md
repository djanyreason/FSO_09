This folder contains the BMI Exercise project which is developed in exercise 9.1-9.7 of Full Stack Open part 9: 
* https://fullstackopen.com/en/part9/first_steps_with_type_script#exercises-9-1-9-3
* https://fullstackopen.com/en/part9/first_steps_with_type_script#exercises-9-4-9-5
* https://fullstackopen.com/en/part9/first_steps_with_type_script#exercises-9-6-9-7

This is an Express app using TypeScript which returns BMI calculations and exercise plan summaries. It focuses on basics of TypeScript type defintions, narrowing, arrays, and asserions.

This app has three routes:
* GET /hello - a test route that returns 'Hello Full Stack!'
* GET /bmi - if height and weight are specified in the request header, returns BMI; otherwise returns 400 with appropriate error message
* POST /exercises - if the header includes a 'daily_exercises' array of numbers and a 'target' number, returns an object with a summary of the exercise data; otherwise returns 400 with appropriate error message
