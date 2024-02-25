// pages/people/index.tsx
import useSWR from "swr";
import { FC } from "react";

type Person = {
  id: number;
  name: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const People: FC = () => {
  const { data, error } = useSWR<Person[]>(
    "http://localhost:3021/api/v1/people",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((person) => (
        <li key={person.id}>
          {person.id}　{person.name}
        </li>
      ))}
    </ul>
  );
};

export default People;
