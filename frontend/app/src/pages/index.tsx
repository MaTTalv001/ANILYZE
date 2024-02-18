// pages/index.tsx
import { useEffect, useState } from 'react';
import WorkCard from '../components/WorkCard';
import { fetchWorks } from '../services/workService';
import { Work } from '../types';

const HomePage = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const data = await fetchWorks();
        setWorks(data);
      } catch (error) {
        console.error('Failed to load works:', error);
      }
    };

    loadWorks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
};

export default HomePage;
