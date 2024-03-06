import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import Loading from "../../components/Loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Works: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<WorkDetails>(
    id ? `http://localhost:3021/api/v1/works/${id}` : null,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  return <>{data.title}</>;
};

export default Works;
