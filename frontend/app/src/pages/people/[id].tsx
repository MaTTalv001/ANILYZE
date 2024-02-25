// pages/people/[id].tsx
import { useRouter } from "next/router";
import useSWR from "swr";
import { FC } from "react";

type PersonDetails = {
  id: number;
  name: string;
  works: Array<{
    id: number;
    title: string;
    casts: Array<{
      id: number;
      role: string;
    }>;
  }>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Person: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<PersonDetails>(
    id ? `http://localhost:3021/api/v1/people/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>Works</h2>
      <ul>
        {data?.works?.map((work) => (
          <li key={work.id}>
            {work.title}
            <ul>
              {work.casts.map((cast) => (
                <li key={cast.id}>{cast.role}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Person;
