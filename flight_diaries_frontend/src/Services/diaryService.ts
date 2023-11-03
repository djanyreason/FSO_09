import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const createEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post<NewDiaryEntry>(baseUrl, object);
  return response.data;
};
