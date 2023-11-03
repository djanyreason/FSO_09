import Diary from './Diary';
import { NonSensitiveDiaryEntry } from '../types';

interface DiaryListProps {
  entries: NonSensitiveDiaryEntry[];
}

const DiaryList = (props: DiaryListProps) => {
  const { entries } = props;

  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <Diary key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default DiaryList;
