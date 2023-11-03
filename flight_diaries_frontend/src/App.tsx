import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry, DiaryEntry } from './types';
import { getAllEntries } from './Services/diaryService';
import DiaryList from './Components/DiaryList';
import EntryForm from './Components/EntryForm';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((entries) => {
      setDiaries(entries);
    });
  }, []);

  const addEntry = (newFullEntry: DiaryEntry): string | undefined => {
    const { comment, ...newEntry } = newFullEntry;
    setDiaries(diaries.concat(newEntry));
    return comment;
  };

  return (
    <div>
      <EntryForm addEntry={addEntry} />
      <DiaryList entries={diaries} />
    </div>
  );
};

export default App;
