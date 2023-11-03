import { NonSensitiveDiaryEntry } from '../types';

interface DiaryProps {
  entry: NonSensitiveDiaryEntry;
}

const Diary = (props: DiaryProps) => {
  const { entry } = props;

  return (
    <div>
      <h3>{entry.date}</h3>
      visibility: {entry.visibility}
      <br />
      weather: {entry.weather}
    </div>
  );
};

export default Diary;
