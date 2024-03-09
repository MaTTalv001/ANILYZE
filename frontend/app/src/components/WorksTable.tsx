import React from "react";
import { Work } from "../types";
import Link from "next/link";

interface WorksTableProps {
  works: Work[];
  person_id: number;
}

const WorksTable: React.FC<WorksTableProps> = ({ works, person_id }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {works.map((work) => (
        <div key={work.id} className="p-4 md:w-1/2 lg:w-1/3">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row">
                <div className="md:mr-4">
                  <a href={`/works/${work.id}`}>
                    <img
                      src={work.image_url || "/default-image.png"}
                      alt={work.title}
                      className="h-20 w-20 md:h-24 md:w-24 rounded object-cover"
                      onError={(e) => (e.target.src = "/default-image.png")}
                    />
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    <a href={`/works/${work.id}`}>{work.title}</a>
                  </h3>
                  <div className="mt-2 text-gray-500 dark:text-gray-400">
                    {work.casts
                      .filter((cast) => cast.person_id === person_id)
                      .map((cast) => (
                        <div key={cast.id}>{cast.character_name} 役</div>
                      ))}
                  </div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {work.year} : {work.season}
                  </p>
                  <a
                    href={work.official_site_url}
                    className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Official Site
                  </a>
                  <a
                    href={work.twitter_url}
                    className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X(Twitter)
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-slate-900 dark:border-gray-700">
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                Last updated 5 mins ago
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorksTable;
