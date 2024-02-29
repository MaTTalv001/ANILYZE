// WorkCardCast.tsx
import React from "react";
import { Work } from "../types";

interface Cast {
  id: number;
  person_id: number;
  character_name: string;
  role: string;
}

interface WorkCardCastProps {
  work: Work;
  person_id: number; // person_idを受け取るように追加
}

const WorkCardCast: React.FC<WorkCardCastProps> = ({ work, person_id }) => {
  // 特定のperson_idに一致するcastsをフィルタリング
  const matchingCasts = work.casts.filter(
    (cast) => cast.person_id === person_id
  );

  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="h-64 flex flex-col justify-center items-center bg-blue-600 rounded-lg">
        <img
          src={work.image_url || "/default-image.png"}
          alt={work.title}
          className="object-cover h-full w-full rounded-lg"
          onError={(e: any) => (e.target.src = "/default-image.png")}
        />
      </div>
      <div className="p-4 md:p-6">
        <span className="mt-3 text-gray-500">
          {work.year} : {work.season}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
          {work.title}
        </h3>
        {/* ここにキャラクター名と役割を表示 */}
        {matchingCasts.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Characters:
            </h4>
            <ul>
              {matchingCasts.map((cast) => (
                <li
                  key={cast.id}
                  className="text-xl text-gray-600 dark:text-gray-400"
                >
                  {cast.character_name}　役
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <a
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-bl-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800"
          href={work.official_site_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Site
        </a>
        <a
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-br-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800"
          href={work.twitter_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Official X (Twitter)
        </a>
      </div>
    </div>
  );
};

export default WorkCardCast;
