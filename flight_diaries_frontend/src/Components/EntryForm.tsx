import { useState } from 'react';
import { createEntry } from '../Services/diaryService';
import { Visibility, Weather, DiaryEntry } from '../types';
import axios from 'axios';

interface EntryFormProps {
  addEntry: (newFullEntry: DiaryEntry) => string | undefined;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [vis, setVisibility] = useState<Visibility | undefined>(undefined);
  const [wea, setWeather] = useState<Weather | undefined>(undefined);
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
      setComment('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        window.alert(error.response.data);
      else window.alert('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={doSubmit}>
        date:{' '}
        <input
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility:{' '}
        {(Object.keys(Visibility) as (keyof typeof Visibility)[]).map(
          (key): JSX.Element => (
            <span key={key}>
              <input
                type='radio'
                name='visibility'
                onChange={() => setVisibility(Visibility[key])}
              />
              {Visibility[key] + ' '}
            </span>
          )
        )}
        <br />
        weather:{' '}
        {(Object.keys(Weather) as (keyof typeof Weather)[]).map(
          (key): JSX.Element => (
            <span key={key}>
              <input
                type='radio'
                name='weather'
                onChange={() => setWeather(Weather[key])}
              />
              {Weather[key] + ' '}
            </span>
          )
        )}
        <br />
        comment:{' '}
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
