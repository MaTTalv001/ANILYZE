// pages/people/[id].tsx
import { useRouter } from "next/router";
import useSWR from "swr";
import { FC } from "react";
import TwitterTimeline from "/src/components/TwitterTimeline";
import WorkCardCast from "/src/components/WorkCardCast";

type PersonDetails = {
  id: number;
  name: string;
  name_en?: string; // 英語名がある場合に備えてオプショナルに
  twitter_url?: string; // Twitter URLがある場合に備えてオプショナルに
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
                  className="max-w-[8rem] bg-black border border-white flex  gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Official
                </a>

                {/* Twitterのリンク */}
                <a
                  href={data.twitter_url}
                  className="max-w-[8rem] bg-black border border-white hover:bg-gray-800 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
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
          <div className="flex-1 p-5">
            <TwitterTimeline
              twitterUrl={`https://twitter.com/${data.twitter_url}`}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5">
        <h2 className="text-3xl dark:text-white p-5">出演作品</h2>
        <div className="flex h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.works.map((work) => (
              <WorkCardCast key={work.id} work={work} person_id={data.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Person;
