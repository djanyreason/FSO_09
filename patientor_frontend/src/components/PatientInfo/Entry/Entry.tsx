import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HospitalEntry from './HospitalEntry';

import { Entry as EntryType, Diagnosis } from '../../../types';

interface EntryProps {
  entry: EntryType;
  diagnoses: Diagnosis[];
}

const Entry = (props: EntryProps) => {
  const { entry, diagnoses } = props;

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    default:
      return null;
  }
};

export default Entry;
