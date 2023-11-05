import { Entry as EntryType } from '../types';

import { Typography } from '@mui/material';

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
  const entry = props.entry;

  return (
    <div>
      <br />
      <Typography variant='body1'>
        {entry.date} <em>{entry.description}</em>
      </Typography>
      {!entry.diagnosisCodes ? (
        <></>
      ) : (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Entry;
