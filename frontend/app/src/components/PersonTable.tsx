import React from "react";
import { Person } from "../types"; // Person型を適切に定義する必要があります

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
                    <th className="px-6 py-3 text-left text-lg font-medium dark:text-white text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium dark:text-white text-gray-500 uppercase">
                      Birthday
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium dark:text-white text-gray-500 uppercase">
                      Official Site
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium dark:text-white text-gray-500 uppercase">
                      X(Twitter)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person) => (
                    <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-lg dark:text-white text-gray-900">
                        {person.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg dark:text-white text-gray-500">
                        {person.birthday}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg dark:text-white font-medium">
                        <a
                          href={person.official_site_url}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Official Site
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium dark:text-white">
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
        </div>
      </div>
    </div>
  );
};

export default PersonTable;
