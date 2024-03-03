import React from "react";
import { Person } from "../types"; // To Do Person型を適切に定義する

interface PersonTableProps {
  people: Person[];
}

const PersonTable: React.FC<PersonTableProps> = ({ people }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col" style={{ width: 1000 }}>
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xl font-medium dark:text-white text-gray-500 uppercase">
                      声優
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium dark:text-white text-gray-500 uppercase">
                      出演数
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium dark:text-white text-gray-500 uppercase">
                      誕生日
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium dark:text-white text-gray-500 uppercase">
                      公式サイト
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium dark:text-white text-gray-500 uppercase">
                      公式X(Twitter)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person) => (
                    <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-xl dark:text-white text-gray-500">
                        <a
                          href={`http://localhost:3020/people/${person.id}`}
                          className="hover:underline"
                        >
                          {person.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-500 dark:text-white">
                        {person.work_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl dark:text-white text-gray-500">
                        {person.birthday}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl dark:text-white font-medium">
                        <a
                          href={person.official_site_url}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Official Site
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium dark:text-white">
                        <a
                          href={person.twitter_url}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-white"
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
          <a className="m-5 dark:text-white text-gray-500">
            *出演数は本アプリでの記録に基づくもので、実際とは異なる場合があります
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonTable;
