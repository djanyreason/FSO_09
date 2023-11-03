import { useState } from 'react';
import { createEntry } from '../Services/diaryService';
import { Visibility, Weather, DiaryEntry } from '../types';

interface EntryFormProps {
  addEntry: (newFullEntry: DiaryEntry) => string | undefined;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [vis, setVisibility] = useState<string>('');
  const [wea, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const { addEntry } = props;

  const doSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const visibility = vis as Visibility;
      const weather = wea as Weather;
      const newDiary = await createEntry({
        date,
        visibility,
        weather,
        comment
      });
      addEntry(newDiary);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={doSubmit}>
        date
        <input value={date} onChange={(event) => setDate(event.target.value)} />
        <br />
        visibility
        <input
          value={vis}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />
        weather
        <input
          value={wea}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br />
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default EntryForm;
