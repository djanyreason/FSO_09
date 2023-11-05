import {
  NewPatient,
  Gender,
  Entry,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
  SickLeave,
  DischargeInfo
} from './types';
import diagnosisService from './services/diagnosisService';

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

const parseEntry = (entry: unknown): Entry => {
  if (
    typeof entry !== 'object' ||
    entry === null ||
    !('id' in entry) ||
    !isString(entry.id)
  )
    throw new Error(`Malformatted entry`);
  const id = entry.id;
  return { ...toNewEntry(entry), id };
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) throw new Error(`Entries not an array`);
  return entries.map((entry) => parseEntry(entry));
};

export const toNewPatient = (object: unknown): NewPatient => {
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
      gender: parseGender(object.gender),
      entries: 'entries' in object ? parseEntries(object.entries) : []
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCode = (dc: unknown): string => {
  if (!isString(dc)) throw new Error(`Diagnosis Code is not a string`);
  if (
    !diagnosisService
      .getDiagnoses()
      .map((diag) => diag.code)
      .includes(dc)
  )
    throw new Error(`Diagnosis Code ${dc} not recognized`);
  return dc;
};

const parseDiagnosisCodes = (dcs: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(dcs)) throw new Error(`Diagnosis Codes is not an array`);
  return dcs.map((dc) => parseDiagnosisCode(dc));
};

const parseHCR = (hcr: unknown): HealthCheckRating => {
  if (isNaN(Number(hcr)))
    throw new Error('Health Check Rating is not a number');
  if (!Object.values(HealthCheckRating).includes(Number(hcr)))
    throw new Error('Health Check Rating is not valid');
  return Number(hcr);
};

const parseSickLeave = (sl: unknown): SickLeave => {
  if (
    typeof sl != 'object' ||
    sl === null ||
    !('startDate' in sl) ||
    !('endDate' in sl)
  )
    throw new Error('Sick Leave malformatted');

  return {
    startDate: parseDate(sl.startDate),
    endDate: parseDate(sl.endDate)
  };
};

const parseDischargeInfo = (discharge: unknown): DischargeInfo => {
  if (
    typeof discharge != 'object' ||
    discharge === null ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  )
    throw new Error('Discharge Info malformatted');

  return {
    date: parseDate(discharge.date),
    criteria: parseStringMember(discharge.criteria, 'Discharge Criteria')
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  if (
    'date' in object &&
    'specialist' in object &&
    'description' in object &&
    'type' in object
  ) {
    const baseEntryObj = {
      date: parseDate(object.date),
      specialist: parseStringMember(object.specialist, 'specialist'),
      description: parseStringMember(object.description, 'description'),
      type: parseStringMember(object.type, 'type')
    };
    if ('diagnosisCodes' in object)
      Object.assign(baseEntryObj, {
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      });
    console.log(baseEntryObj);

    switch (baseEntryObj.type) {
      case 'HealthCheck': {
        if ('healthCheckRating' in object) {
          return {
            ...baseEntryObj,
            type: baseEntryObj.type,
            healthCheckRating: parseHCR(object.healthCheckRating)
          };
        }
        break;
      }
      case 'OccupationalHealthcare': {
        if ('employerName' in object) {
          if ('sickLeave' in object)
            Object.assign(baseEntryObj, {
              sickLeave: parseSickLeave(object.sickLeave)
            });
          return {
            ...baseEntryObj,
            type: baseEntryObj.type,
            employerName: parseStringMember(
              object.employerName,
              'Employer Name'
            )
          };
        }
        break;
      }
      case 'Hospital': {
        if ('discharge' in object)
          Object.assign(baseEntryObj, {
            discharge: parseDischargeInfo(object.discharge)
          });
        return {
          ...baseEntryObj,
          type: baseEntryObj.type
        };
      }
      default:
        throw new Error('Invalid Entry Type');
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};
