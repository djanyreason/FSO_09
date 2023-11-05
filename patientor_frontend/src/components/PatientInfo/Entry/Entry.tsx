import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HospitalEntry from './HospitalEntry';

import { Entry as EntryType } from '../../../types';

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
  const { entry } = props;

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return null;
  }
};

export default Entry;
