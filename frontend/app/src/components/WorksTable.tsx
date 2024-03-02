import React from "react";
import { Work } from "../types";

interface WorksTableProps {
  works: Work[];
  person_id: number;
}

const WorksTable: React.FC<WorksTableProps> = ({ works, person_id }) => {
  return (
    <div className="flex flex-col">
      <div className="h-96 my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-lg dark:text-white font-medium text-gray-500 uppercase">
                    Thumbnail
                  </th>
                  <th className="px-6 py-3 text-left text-lg dark:text-white font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-lg dark:text-white font-medium text-gray-500 uppercase">
                    Character & Role
                  </th>
                  <th className="px-6 py-3 text-left text-lg dark:text-white font-medium text-gray-500 uppercase">
                    Season
                  </th>
                  <th className="px-6 py-3 text-left text-lg dark:text-white font-medium text-gray-500 uppercase">
                    Official Site
                  </th>
                  <th className="px-6 py-3 text-left text-lg dark:text-white font-medium text-gray-500 uppercase">
                    X(Twitter)
                  </th>
                </tr>
              </thead>
              <tbody>
                {works.map((work) => (
                  <tr key={work.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={work.image_url || "/default-image.png"}
                        alt={work.title}
                        className="h-20 w-20 rounded object-cover"
                        onError={(e: any) =>
                          (e.target.src = "/default-image.png")
                        }
                      />
                    </td>
                    <td className="text-wrap px-6 py-4 whitespace-nowrap dark:text-white text-xl text-gray-900">
                      {work.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white text-lg text-gray-500">
                      {work.casts
                        .filter((cast) => cast.person_id === person_id)
                        .map((cast) => (
                          <div key={cast.id}>{cast.character_name} 役</div>
                        ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white text-lg text-gray-500">
                      {work.year} : {work.season}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white text-right text-lg font-medium">
                      <a
                        href={work.official_site_url}
                        className="text-indigo-600 hover:text-indigo-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Site
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                      <a
                        href={work.twitter_url}
                        className="text-indigo-600 hover:text-indigo-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        X(Twitter)
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksTable;
