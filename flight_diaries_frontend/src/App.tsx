import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import { getAllEntries } from './Services/diaryService';
import DiaryList from './Components/DiaryList';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((entries) => {
      setDiaries(entries);
    });
  }, []);

  return <DiaryList entries={diaries} />;
};

export default App;
