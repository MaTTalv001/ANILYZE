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

  console.log(data);

  return (
    <>
      <div className="py-10 px-20 pb-5">
        <img
          src={data.image_url || "/default-image.png"}
          alt={data.title}
          className="object-cover h-full w-full rounded-lg cursor-pointer"
          onError={(e) => (e.currentTarget.src = "/default-image.png")}
        />
        <h1 className="py-3 text-3xl dark:text-white px-10">{data.title}</h1>
        <div className="flex flex-col md:flex-row  gap-8 px-10 py-3">
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
        <ul>
          <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.casts?.map((cast, index) => (
              <li key={index} className="mb-4 last:mb-0">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {cast.character_name} {/* キャラクター名 */}
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      CV:{" "}
                      <a
                        href={`/people/${data.people[index].person_id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                      >
                        {" "}
                        {data.people[index].name}{" "}
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Works;
