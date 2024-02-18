// services/workService.ts
import { Work } from '../types';

export const fetchWorks = async (): Promise<Work[]> => {
  const response = await fetch('http://localhost:3021/api/v1/works');
  if (!response.ok) {
    throw new Error('Failed to fetch works.');
  }
  const data: Work[] = await response.json();
  return data;
};
