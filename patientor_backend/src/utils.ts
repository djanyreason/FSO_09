import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringMember = (member: unknown, title: string): string => {
  if (!isString(member)) {
    throw new Error(`Incorrect ${title}: ${member}`);
  }

  return member;
};

const parseSSN = (ssn: unknown): string => {
  if (
    !isString(ssn) ||
    ssn.length < 10 ||
    ssn[6] != '-' ||
    isNaN(Number(ssn.slice(0, 6)))
  ) {
    throw new Error('Incorrect ssn: ' + ssn);
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(
      `Incorrect gender:  ${gender}- please enter 'male', 'female', or 'non-binary`
    );
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringMember(object.name, 'name'),
      occupation: parseStringMember(object.occupation, 'occupation'),
      ssn: parseSSN(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender)
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
