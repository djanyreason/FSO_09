This folder contains the backend for the Patientor project which is developed in exercise 9.8-9.13 and 9.20-9.29 of Full Stack Open part 9: 
* https://fullstackopen.com/en/part9/typing_an_express_app#exercises-9-8-9-9
* https://fullstackopen.com/en/part9/typing_an_express_app#exercises-9-10-9-11
* https://fullstackopen.com/en/part9/typing_an_express_app#exercises-9-12-9-13
* https://fullstackopen.com/en/part9/grande_finale_patientor#exercises-9-20-9-21
* https://fullstackopen.com/en/part9/grande_finale_patientor#exercises-9-22-9-29

This is an Express app using TypeScript which handles API calls to a database of diagnoses and patients. All of the data is stored locally in the /data subfolder. Data modification is done in runtime memory - this backend does not make any changes to these files.

This project focuses on typing, defining utility types, definiting Enums, proofing and guarding types, and using UnionOmit types.

This app has the following routes:
* GET /api/ping - a test route that returns 'pong'
* GET /api/diagnoses - returns all diagnoses in the database
* GET /api/patients - returns all patients in the database
* GET /api/patients/:id - returns the patient with id 'id', or returns an error
* POST /api/patients - if the header contains a correctly formatted and typed new patient, adds the patient to the database; otherwise returns an appropriate error
* POST /api/patients/:id/entries - if there is a patient of id 'id', and the header contains a correctly typed and formatted visit entry, adds the entry to the patient's entries array
