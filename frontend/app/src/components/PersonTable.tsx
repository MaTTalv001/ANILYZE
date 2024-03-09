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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {people.map((person) => (
              <div
                key={person.id}
                className="overflow-hidden shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow duration-200 ease-in-out"
              >
                <div className="py-4 px-6">
                  <h3 className="font-bold text-xl mb-2 dark:text-white">
                    <a
                      href={`http://localhost:3020/people/${person.id}`}
                      className="hover:underline"
                    >
                      {person.name}
                    </a>
                  </h3>
                  <p className="text-gray-800 dark:text-white text-lg">
                    出演数: {person.work_count}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    誕生日: {person.birthday}
                  </p>
                  <div className="flex items-center mt-4">
                    <a
                      href={person.official_site_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 hover:underline"
                    >
                      公式サイト
                    </a>
                    <span className="mx-2">|</span>
                    <a
                      href={person.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 hover:underline"
                    >
                      X(Twitter)
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
