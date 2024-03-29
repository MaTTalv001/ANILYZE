// pages/people/[id].tsx
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import TwitterTimeline from "../../components/TwitterTimeline";
import WorksTable from "../../components/WorksTable";
import LineChart from "../../components/LineChart";
import CoActorsTable from "../../components/CoActorsTable";
import Loading from "../../components/Loading";

type PersonDetails = {
  id: number;
  name: string;
  name_en?: string; // 英語名がある場合に備えてオプショナルに
  twitter_url?: string; // Twitter URLがある場合に備えてオプショナルに
  official_site_url?: string;
  works: Array<{
    id: number;
    title: string;
    year?: number; // 年がある場合に備えてオプショナルに
    season?: string; // シーズンがある場合に備えてオプショナルに
    image_url?: string; // 画像URLがある場合に備えてオプショナルに
    official_site_url?: string; // 公式サイトURLがある場合に備えてオプショナルに
    twitter_url?: string; // 作品のTwitter URLがある場合に備えてオプショナルに
    casts: Array<{
      id: number;
      character_name: string;
      person_id: number; // 追加：キャストの人物ID
      role?: string; // 役割がある場合に備えてオプショナルに
    }>;
  }>;
};
// worksByYear の型を定義
type WorksByYear = {
  [year: string]: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Person: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [worksByYear, setWorksByYear] = useState<WorksByYear>({});
  const { data, error } = useSWR<PersonDetails>(
    id ? `http://localhost:3021/api/v1/people/${id}` : null,
    fetcher
  );
  useEffect(() => {
    if (id !== undefined) {
      fetch(`http://localhost:3021/api/v1/people/${id}/works_by_year`)
        .then((response) => response.json())
        .then((linedata) => {
          setWorksByYear(linedata);
          console.log("Received data:", linedata); // この行をコールバック関数の内部に移動
        });
    }
  }, [id]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  return (
    <>
      <div className="container mx-auto pt-10">
        <h1 className="text-4xl dark:text-white px-10">{data.name}</h1>
        <h2 className="text-xl  dark:text-white px-10">{data.name_en}</h2>
        <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-5 mx-auto"></div>
        <div className="lg:flex">
          <div className="min-w-[40rem] flex-2 p-5">
            <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <div className="mt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 sm:gap-12">
                {/* 出演数 */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    出演数
                  </h4>
                  <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
                    50+
                  </p>
                  <p className="mt-1 text-gray-500">様々な作品に</p>
                </div>

                {/* 推し数 */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    推し数
                  </h4>
                  <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
                    100+
                  </p>
                  <p className="mt-1 text-gray-500">ファンからの支持</p>
                </div>
              </div>
              <div className="md:mt-20 flex flex-col md:flex-row  gap-8">
                {/* 公式サイトのリンク */}
                <a
                  href={data.official_site_url}
                  className="max-w-[8rem] bg-black border border-white flex  gap-2 bg-black hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Official
                </a>

                {/* Twitterのリンク */}
                <a
                  href={data.twitter_url}
                  className="max-w-[8rem] bg-black border border-white hover:bg-gray-800 flex items-center justify-center gap-2 bg-black hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  {/* 新しいTwitterロゴ */}　
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 1200 1227"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                  </svg>
                  　
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <LineChart worksByYear={worksByYear} />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5">
        <h2 className="text-3xl dark:text-white p-5">出演作品</h2>
        <WorksTable works={data.works} person_id={data.id} />
      </div>
      {/* <div className="container mx-auto px-5">
        <h2 className="text-3xl dark:text-white p-5">X Post</h2>
        <div className="flex-1">
          <TwitterTimeline
            twitterUrl={`https://twitter.com/${data.twitter_url}`}
          />
        </div>
  </div> */}

      <div className="container mx-auto pt-5 px-5">
        <h2 className="text-3xl dark:text-white p-5">共演の多い声優</h2>
        <CoActorsTable id={data.id.toString()} />
      </div>
    </>
  );
};

export default Person;
