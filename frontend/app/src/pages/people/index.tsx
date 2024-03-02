// pages/people/index.tsx
import useSWR from "swr";
import { FC } from "react";
import PersonTable from "../../components/PersonTable";

type Person = {
  id: number;
  name: string;
  birthday: string;
  official_site_url: string;
  twitter_url: string;
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
      <div>
        <h1 className="text-2xl font-bold my-4">People</h1>
        <PersonTable people={data} />
      </div>
    </ul>
  );
};

export default People;
