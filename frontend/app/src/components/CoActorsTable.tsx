// 共演情報を取得する
import React, { useState } from "react";
import useSWR from "swr";
import { CoActorInfo } from "../types/types";
import GetPersonName from "../../services/GetPersonName";
import CoActorModal from "./CoActorModal";

type CoActorsTableProps = {
  id: string; // ここで id の型を定義
};

const CoActorsTable: React.FC<CoActorsTableProps> = ({ id }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorks, setSelectedWorks] = useState([]);
  const openModal = (works) => {
    setSelectedWorks(works);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const { data: coActorsData, error: coActorsError } = useSWR<CoActorInfo>(
    id ? `http://localhost:3021/api/v1/people/${id}/co_actors` : null,
    fetcher
  );

  // 共演情報を表示するテーブルの JSX
  if (coActorsError) return <div>Failed to load co-actors data.</div>;
  if (!coActorsData) return <div>Loading co-actors data...</div>;

  // coActorsData を使用してテーブルを構築
  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(coActorsData).map(([personId, info]) => (
          <div
            key={personId}
            className="h-36 overflow-hidden bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              <a
                href={`http://localhost:3020/people/${info.person_id}`}
                className="hover:underline"
              >
                {info.name}
              </a>
            </h3>
            <p className="mt-1 text-2xl font-medium uppercase text-gray-700 dark:text-gray-200">
              共演回数: {info.count}
            </p>
            <button
              onClick={() => openModal(info.works)}
              className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              共演作品
            </button>
          </div>
        ))}
      </div>
      <CoActorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        works={selectedWorks}
      />
      ;
    </div>
  );
};

export default CoActorsTable;
